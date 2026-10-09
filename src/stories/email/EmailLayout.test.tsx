/*
 * Estas afirmaciones son las cicatrices del correo que se portó al DS: cada
 * una corresponde a un fallo real que tenía el layout original o a una decisión
 * que no puede perderse en un refactor. Se comprueban sobre el HTML renderizado
 * y no sobre el árbol de React porque lo que llega a la bandeja es el HTML.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { ReactElement } from 'react';
import { render } from 'react-email';
import { describe, expect, it } from 'vitest';

import { EMAIL_LOGO_FILENAME } from '../../assets/brand-assets';
import { EmailButton, EmailHeading, EmailNote, EmailText } from './EmailPrimitives';
import { EmailLayout, type EmailOptOut } from './EmailLayout';
import { emailLogo, emailPalette, emailToken } from './emailTheme';
import { emailTokens } from './emailTokens';

const URL =
  'https://bricks.slxd.app/verificar-correo?token=8f3a1c9e4b274d6a9f012c5e7a8b3d40&uid=41827&redirect=%2Fpanel';

const mensaje = (
  <EmailLayout preview="Confirma tu correo" appName="Bricks">
    <EmailHeading>Confirma tu correo</EmailHeading>
    <EmailText>Hola, Ana.</EmailText>
    <EmailButton href={URL} fallbackLabel="O copia y pega esta dirección:">
      Confirmar
    </EmailButton>
    <EmailNote>El enlace caduca en 24 horas.</EmailNote>
  </EmailLayout>
);

const html = (element: ReactElement) => render(element);

describe('EmailLayout', () => {
  it('usa la sans del sistema, no la mono de código', async () => {
    const out = await html(mensaje);

    expect(out).toContain('Google Sans Flex');
    expect(out).not.toContain('Google Sans Code');
  });

  it('pone el logotipo como imagen con alt y medidas explícitas', async () => {
    const out = await html(mensaje);

    // PNG, no SVG: Gmail y Outlook no renderizan SVG.
    expect(out).toContain(EMAIL_LOGO_FILENAME);
    expect(out).not.toContain('logomark.svg');
    // Muchos clientes bloquean las imágenes: sin alt no se sabe quién escribe.
    // La imagen es siempre el logotipo «Studio LXD», sea cual sea la app que
    // manda el correo: el alt describe la imagen, no al remitente.
    expect(emailLogo.alt).toBe('Studio LXD');
    expect(out).toContain('alt="Studio LXD"');
    expect(out).not.toContain('alt="Bricks"');
    // Rectangular: es el logotipo completo, no el isotipo cuadrado.
    expect(out).toContain(`width="${emailLogo.width}"`);
    expect(out).toContain(`height="${emailLogo.height}"`);
    expect(emailLogo.width).not.toBe(emailLogo.height);
  });

  it('saca el logotipo de su celda en vez de darle padding a la celda', async () => {
    // La celda de la banda de marca (el Container que envuelve el logotipo)
    // ya no lleva padding: lo desplazaba hacia dentro respecto al recuadro
    // del mensaje, que comparte el mismo maxWidth y por tanto el mismo borde
    // izquierdo. El logotipo se alinea con `marginLeft` negativo en vez de
    // padding en la celda — 2026-09-14.
    const out = await html(mensaje);

    // La celda inmediatamente anterior al <img> es la de la banda de marca.
    expect(out).toContain('<td style="padding:0">');

    const negativo = `-${Number.parseFloat(emailToken('--email-brand-padding-inline'))}px`;
    const img = out.match(/<img[^>]*>/)?.[0] ?? '';
    expect(img).toContain(`margin-left:${negativo}`);
    expect(img).toContain(`margin-bottom:${emailToken('--email-brand-padding-block')}`);
  });

  it('sirve los assets desde la base que le pasen', async () => {
    const out = await html(
      <EmailLayout preview="p" appName="Bricks" assetsBaseUrl="https://cdn.example.com/e/">
        <EmailText>Hola</EmailText>
      </EmailLayout>,
    );

    expect(out).toContain(`https://cdn.example.com/e/${EMAIL_LOGO_FILENAME}`);
    // La barra final de la base no puede duplicarse en la URL.
    expect(out).not.toContain(`e//${EMAIL_LOGO_FILENAME}`);
  });

  it('pide el correo siempre en claro, en todas las capas', async () => {
    // Decisión del operador: el correo va SIEMPRE en claro (el nuevo Outlook
    // para Mac lo pintaba oscuro, con el PNG del logotipo como un rectángulo
    // blanco suelto). No hay paleta oscura: lo que hay son capas que piden no
    // pintarlo así. Outlook Windows clásico y Gmail Android invierten igual.
    const out = await html(mensaje);
    const hojas = [...out.matchAll(/<style>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n');

    // 1. Las metas y el `color-scheme` de la hoja.
    expect(out).toContain('<meta name="color-scheme" content="light only"/>');
    expect(out).toContain('<meta name="supported-color-schemes" content="light only"/>');
    expect(hojas).toContain(':root { color-scheme: light only; supported-color-schemes: light only; }');

    // 2. Los fondos que sobreviven a la inversión: lienzo, banda del logotipo,
    //    recuadro y pie llevan `background-image` además de `background-color`.
    const lienzo = emailPalette.canvas;
    const caja = emailPalette.background;
    expect(out).toContain(`background-image:linear-gradient(${lienzo}, ${lienzo})`);
    expect(out).toContain(`background-image:linear-gradient(${caja}, ${caja})`);

    // 3. La media query que reafirma los colores claros con `!important`.
    expect(hojas).toContain('@media (prefers-color-scheme: dark)');
    const oscuro = hojas.slice(hojas.indexOf('@media (prefers-color-scheme: dark)'));
    expect(oscuro).toContain(`.email-canvas { background-color: ${lienzo} !important;`);
    expect(oscuro).toContain(`.email-text { color: ${emailPalette.text} !important; }`);
    expect(oscuro).toContain(`.email-link { color: ${emailPalette.text} !important; }`);
    expect(oscuro).toContain(`.email-button { background-color: ${emailToken('--email-button-bg')} !important;`);

    // 4. Las reglas con las que Outlook.com y el nuevo Outlook marcan lo que
    //    recolorean: la tinta con `ogsc`, el fondo con `ogsb`.
    expect(hojas).toContain(`[data-ogsc] .email-text { color: ${emailPalette.text} !important; }`);
    expect(hojas).toContain(`[data-ogsb] .email-canvas { background-color: ${lienzo} !important;`);
  });

  it('el hover del botón lleva su degradado, también en la media query oscura', async () => {
    // El botón lleva inline un `background-image` de su color de reposo: sin un
    // degradado de hover con `!important`, taparía el `background-color` del hover.
    const out = await html(mensaje);
    const hoja = [...out.matchAll(/<style>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n');
    const hover = emailToken('--email-button-hover-bg');
    const regla = `a.email-button:hover {\n    background-color: ${hover} !important;\n    background-image: linear-gradient(${hover}, ${hover}) !important;`;

    expect(hoja).toContain(regla);
    // Y repetida dentro de la media query, después de las forzadas.
    const oscuro = hoja.slice(hoja.indexOf('@media (prefers-color-scheme: dark)'));
    expect(oscuro.indexOf(regla)).toBeGreaterThan(oscuro.indexOf('.email-button { background-color'));
    expect(oscuro).toContain(regla);
  });

  it('el lienzo, la banda, el recuadro y el pie llevan las clases a las que apuntan las reglas', async () => {
    const out = await html(
      <EmailLayout
        preview="p"
        appName="Bricks"
        optOut={{ unsubscribeUrl: 'https://example.com/baja', manageLabel: 'Para dejar de recibir,', unsubscribeLabel: 'baja' }}
      >
        <EmailText>Hola</EmailText>
      </EmailLayout>,
    );

    expect(out).toMatch(/<body[^>]*class="email-canvas"/);
    // Banda del logotipo, recuadro (con su borde) y pie de baja.
    expect(out).toMatch(/class="email-surface"/);
    expect(out).toMatch(/class="email-surface email-box"/);
    expect(out.match(/class="email-canvas"/g)!.length).toBeGreaterThanOrEqual(3);
  });

  it('el recuadro del mensaje lleva `background-image`, no solo `background-color`', async () => {
    const out = await html(mensaje);
    const recuadro = out.match(/<table[^>]*class="email-surface email-box"[^>]*>/)?.[0] ?? '';

    expect(recuadro).toContain(`background-color:${emailPalette.background}`);
    expect(recuadro).toContain(
      `background-image:linear-gradient(${emailPalette.background}, ${emailPalette.background})`,
    );
  });

  it('lleva la hoja mínima de lo que no puede ir inline', async () => {
    // Una pseudoclase es lo único que no cabe en un atributo `style`.
    const out = await html(mensaje);
    const hojas = [...out.matchAll(/<style>([\s\S]*?)<\/style>/g)].map((m) => m[1]);

    expect(hojas.some((hoja) => hoja.includes('a:hover'))).toBe(true);
    // El hover del botón es la otra pseudoclase, y engancha por la clase del
    // botón, no por `a`: el enlace de respaldo y los de baja no se ponen amarillos.
    expect(hojas.some((hoja) => hoja.includes('a.email-button:hover'))).toBe(true);
    // Las clases `email-*` no dan estilo —todo va inline—: son los ganchos de
    // las reglas de modo claro forzado. Que cada una que aparece en el HTML
    // exista como gancho en la hoja, y no al revés.
    const clases = new Set([...out.matchAll(/class="([^"]*email-[^"]*)"/g)].flatMap((m) => m[1].split(' ')));
    const hoja = hojas.join('\n');
    for (const clase of clases) expect(hoja).toContain(`.${clase} `);
  });

  it('no escribe ningún valor a mano: todo sale de los tokens', async () => {
    const out = await html(mensaje);
    const declarados = new Set(Object.values(emailTokens).map((v) => v.toLowerCase()));
    // El `(?<!&)` deja fuera las entidades HTML (`&#8202;`, el pelo de espacio
    // con el que react-email rellena la línea de vista previa).
    const hexes = new Set([...out.matchAll(/(?<![&\w])#[0-9a-f]{3,8}\b/gi)].map((m) => m[0].toLowerCase()));

    for (const hex of hexes) expect(declarados).toContain(hex);
  });

  it('solo pinta el pie de baja cuando se le pasa', async () => {
    expect(await html(mensaje)).not.toContain('baja');

    const conBaja = await html(
      <EmailLayout
        preview="p"
        appName="Bricks"
        optOut={{
          unsubscribeUrl: 'https://example.com/baja',
          manageLabel: 'Para dejar de recibir estos avisos,',
          unsubscribeLabel: 'date de baja',
        }}
      >
        <EmailText>Hola</EmailText>
      </EmailLayout>,
    );
    expect(conBaja).toContain('https://example.com/baja');
    expect(conBaja).toContain('Para dejar de recibir estos avisos,');
    expect(conBaja).toContain('date de baja');
  });

  it('el pie de baja no trae castellano puesto: sin su texto, avisa de cuál falta', async () => {
    // El correo no lee el `BrandMessagesProvider` (se escribe en el idioma de
    // quien lo recibe, fuera del árbol de la app), así que no hay catálogo de
    // respaldo: el tipo exige los textos, y quien se los salte con un `as`
    // recibe el error, no un «date de baja» dentro de un correo en alemán.
    const sinTextos = { unsubscribeUrl: 'https://example.com/baja' } as unknown as EmailOptOut;
    await expect(
      html(
        <EmailLayout preview="p" appName="Bricks" optOut={sinTextos}>
          <EmailText>Hola</EmailText>
        </EmailLayout>,
      ),
    ).rejects.toThrow(/optOut\.unsubscribeLabel/);

    const sinPreferencias = {
      unsubscribeUrl: 'https://example.com/baja',
      preferencesUrl: 'https://example.com/preferencias',
      unsubscribeLabel: 'Abmelden',
    } as unknown as EmailOptOut;
    await expect(
      html(
        <EmailLayout preview="p" appName="Bricks" optOut={sinPreferencias}>
          <EmailText>Hola</EmailText>
        </EmailLayout>,
      ),
    ).rejects.toThrow(/optOut\.manageBeforeLabel/);
  });

  it('el componente no trae ninguno de los textos del pie cableado', () => {
    const fuente = readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'EmailLayout.tsx'), 'utf8')
      // Solo el código: los comentarios citan los textos para explicarlos.
      .replace(/\/\*[\s\S]*?\*\//g, '');
    for (const texto of ['Para dejar de recibir', 'Darse de baja', 'date de baja', 'gestiona tus preferencias']) {
      expect(fuente).not.toContain(texto);
    }
  });

  it('en el pie sin cuenta no ofrece preferencias, solo el motivo y la baja', async () => {
    // Quien recibe el correo sin cuenta no puede abrir la pantalla de
    // preferencias del hub: ofrecérsela es prometerle algo que no existe.
    const out = await html(
      <EmailLayout
        preview="p"
        appName="Bricks"
        optOut={{
          unsubscribeUrl: 'https://example.com/baja',
          reasonLabel: 'Recibes este correo porque participas en una revisión de contenido.',
          unsubscribeLabel: 'Dejar de recibir estos correos.',
        }}
      >
        <EmailText>Hola</EmailText>
      </EmailLayout>,
    );

    expect(out).toContain('Recibes este correo porque participas en una revisión de contenido.');
    expect(out).toContain('Dejar de recibir estos correos.');
    expect(out).toContain('https://example.com/baja');
    // Ni el enlace a preferencias ni los textos del pie con cuenta.
    expect(out).not.toContain('preferencias</a>');
    expect(out).not.toContain('gestiona tus preferencias');
    expect(out).not.toContain('date de baja');
    expect(out).not.toContain('Para dejar de recibir estos avisos');
  });

  it('pone bajo el botón la misma dirección, entera y en texto', async () => {
    // Hay clientes que destrozan los botones, y la gente reenvía correos y los
    // abre en otro dispositivo: el enlace en texto es el plan B del correo.
    const out = await html(mensaje);

    // La dirección aparece dos veces: en el href del botón y como texto.
    expect(out.split(URL.replace(/&/g, '&amp;')).length - 1).toBe(2);
    expect(out).toContain('O copia y pega esta dirección:');
    // Entera, sin acortar, y no dentro de un <a> con otro texto.
    expect(out).not.toContain('…');
    // Y con el corte de palabra que evita la barra horizontal, en sus dos
    // dialectos: `word-break` para los clientes modernos, `word-wrap` para el
    // motor de Word de Outlook.
    // Y en su propia línea, debajo de la frase: una dirección que arranca a
    // media línea entra ya partida y cuesta encontrarle el principio.
    expect(out).toContain('O copia y pega esta dirección:<br/>');
    const respaldo = out.match(/<span [^>]*style="[^"]*word-break[^"]*"/)?.[0] ?? '';
    expect(respaldo).toContain('word-break:break-all');
    expect(respaldo).toContain('word-wrap:break-word');
    // Con `overflow` la dirección se cortaría de la vista, que es justo lo
    // contrario de lo que se pide de ella.
    expect(respaldo).not.toContain('overflow');
  });

  it('deja traducir todo texto que emite por su cuenta', async () => {
    const out = await html(
      <EmailLayout
        preview="p"
        appName="Bricks"
        locale="de"
        optOut={{
          unsubscribeUrl: 'https://example.com/baja',
          preferencesUrl: 'https://example.com/preferencias',
          unsubscribeLabel: 'Abmelden',
          manageBeforeLabel: ' oder ',
          managePreferencesLabel: 'Einstellungen verwalten',
          manageAfterLabel: '.',
        }}
      >
        <EmailText>Hallo</EmailText>
      </EmailLayout>,
    );

    expect(out).toContain('lang="de"');
    expect(out).toContain('Abmelden');
    expect(out).toContain('Einstellungen verwalten');
    expect(out).not.toContain('gestiona tus preferencias');
  });
});
