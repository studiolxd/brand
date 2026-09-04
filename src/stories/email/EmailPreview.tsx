/*
 * El visor de correos del catálogo.
 *
 * Un correo es un documento HTML completo —`<html>`, `<head>`, `<body>`—, así
 * que no se puede montar dentro de la página de Storybook: hay que renderizarlo
 * a texto con `render()` de react-email y meterlo en un `<iframe>`, que es
 * además lo más parecido a lo que hace un cliente de correo.
 *
 * No forma parte del paquete: vive aquí para que los correos de la suite se
 * puedan mirar sin mandarse uno a sí mismo, que hasta hoy era la única forma.
 */
import { useEffect, useRef, useState, type ReactElement } from 'react';
import { render } from 'react-email';

import { emailDarkModeCss, emailPalette } from './emailTheme';

/**
 * Saca las declaraciones de dentro de `@media (prefers-color-scheme: dark)`.
 *
 * En un cliente de verdad las activa el sistema operativo; dentro de un iframe
 * del catálogo eso no se puede pedir, así que el visor las aplica sin la media
 * query. Son las MISMAS reglas —se leen del mismo sitio que el correo—, solo
 * que sin la condición: lo que se ve es exactamente el override que aplicaría
 * Apple Mail, no una imitación.
 */
function reglasOscuras(css: string): string {
  const inicio = css.indexOf('@media (prefers-color-scheme: dark)');
  if (inicio === -1) return '';
  const abre = css.indexOf('{', inicio);
  let nivel = 0;
  for (let i = abre; i < css.length; i += 1) {
    if (css[i] === '{') nivel += 1;
    else if (css[i] === '}') {
      nivel -= 1;
      if (nivel === 0) return css.slice(abre + 1, i);
    }
  }
  return '';
}

/*
 * Un documento que entra por `srcDoc` tiene URL base `about:srcdoc`, así que
 * una ruta relativa —la que usan las stories para servir el logotipo y la
 * fuente desde `public/`— no resuelve contra nada. Este `<base>` le devuelve la
 * del catálogo.
 *
 * Es un apaño del visor y solo del visor: en un correo de verdad la URL del
 * logotipo es absoluta y este problema no existe. Por eso NO se arregla metiendo
 * una URL absoluta en el componente.
 */
const base = () => `<base href="${document.baseURI}">`;

/** Marca el bloque que añade el visor, para distinguirlo del CSS del correo. */
export const MARCA_OSCURA = 'vista previa: reglas oscuras sin media query';

export interface EmailPreviewProps {
  /** El correo: un `EmailLayout` con su contenido. */
  children: ReactElement;
  /** `dark` aplica las reglas oscuras del propio correo, sin la media query. */
  theme?: 'light' | 'dark';
}

export function EmailPreview({ children, theme = 'light' }: EmailPreviewProps) {
  const [html, setHtml] = useState('');
  const [height, setHeight] = useState(480);
  const iframe = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    let vigente = true;
    void render(children).then((salida) => {
      if (!vigente) return;
      const oscuro =
        theme === 'dark'
          ? `<style>/* ${MARCA_OSCURA} */${reglasOscuras(emailDarkModeCss)}</style>`
          : '';
      setHtml(salida.replace('<head>', `<head>${base()}`).replace('</head>', `${oscuro}</head>`));
    });
    return () => {
      vigente = false;
    };
  }, [children, theme]);

  /* El iframe no crece con su contenido: hay que medirlo y darle la altura. */
  const medir = () => {
    const documento = iframe.current?.contentDocument;
    if (documento?.body) setHeight(documento.body.scrollHeight);
  };

  return (
    <iframe
      ref={iframe}
      title="Vista previa del correo"
      srcDoc={html}
      onLoad={medir}
      style={{
        backgroundColor: emailPalette[theme].background,
        border: 0,
        display: 'block',
        height,
        width: '100%',
      }}
    />
  );
}
