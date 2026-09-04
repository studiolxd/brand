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

import { emailPalette } from './emailTheme';

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

export interface EmailPreviewProps {
  /** El correo: un `EmailLayout` con su contenido. */
  children: ReactElement;
}

export function EmailPreview({ children }: EmailPreviewProps) {
  const [html, setHtml] = useState('');
  const [height, setHeight] = useState(480);
  const iframe = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    let vigente = true;
    void render(children).then((salida) => {
      if (!vigente) return;
      setHtml(salida.replace('<head>', `<head>${base()}`));
    });
    return () => {
      vigente = false;
    };
  }, [children]);

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
        backgroundColor: emailPalette.canvas,
        border: 0,
        display: 'block',
        height,
        width: '100%',
      }}
    />
  );
}
