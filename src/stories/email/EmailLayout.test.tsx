/*
 * Estas afirmaciones son las cicatrices del correo que se portó al DS: cada
 * una corresponde a un fallo real que tenía el layout original o a una decisión
 * que no puede perderse en un refactor. Se comprueban sobre el HTML renderizado
 * y no sobre el árbol de React porque lo que llega a la bandeja es el HTML.
 */
import type { ReactElement } from 'react';
import { render } from 'react-email';
import { describe, expect, it } from 'vitest';

import { EmailButton, EmailHeading, EmailNote, EmailText } from './EmailPrimitives';
import { EmailLayout } from './EmailLayout';
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
    expect(out).toContain('logo-v1.png');
    expect(out).not.toContain('logomark.svg');
    // Muchos clientes bloquean las imágenes: sin alt no se sabe quién escribe.
    expect(out).toContain('alt="Bricks"');
    expect(out).toMatch(/width="64"[^>]*height="64"|height="64"[^>]*width="64"/);
  });

  it('sirve los assets desde la base que le pasen', async () => {
    const out = await html(
      <EmailLayout preview="p" appName="Bricks" assetsBaseUrl="https://cdn.example.com/e/">
        <EmailText>Hola</EmailText>
      </EmailLayout>,
    );

    expect(out).toContain('https://cdn.example.com/e/logo-v1.png');
    // La barra final de la base no puede duplicarse en la URL.
    expect(out).not.toContain('e//logo-v1.png');
  });

  it('no gestiona modo oscuro', async () => {
    // Decisión del operador: el correo es solo claro. Esto no impide que
    // Outlook Windows o Gmail Android inviertan los colores por su cuenta; lo
    // que se deja de hacer es gestionarlo.
    const out = await html(mensaje);

    expect(out).not.toContain('prefers-color-scheme');
    expect(out).not.toContain('color-scheme');
    expect(out).not.toContain('supported-color-schemes');
  });

  it('lleva la hoja mínima de lo que no puede ir inline', async () => {
    // Una pseudoclase es lo único que no cabe en un atributo `style`.
    const out = await html(mensaje);
    const hojas = [...out.matchAll(/<style>([\s\S]*?)<\/style>/g)].map((m) => m[1]);

    expect(hojas.some((hoja) => hoja.includes('a:hover'))).toBe(true);
    // Y ninguna clase `email-*`: existían solo para enganchar el modo oscuro.
    expect(out).not.toContain('email-');
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
        optOut={{ unsubscribeUrl: 'https://example.com/baja' }}
      >
        <EmailText>Hola</EmailText>
      </EmailLayout>,
    );
    expect(conBaja).toContain('https://example.com/baja');
    expect(conBaja).toContain('date de baja');
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
    const respaldo = out.match(/<span style="[^"]*word-break[^"]*"/)?.[0] ?? '';
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
