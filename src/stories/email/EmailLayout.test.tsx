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
import { emailPalette } from './emailTheme';
import { emailTokens } from './emailTokens';

const mensaje = (
  <EmailLayout preview="Confirma tu correo" appName="Bricks">
    <EmailHeading>Confirma tu correo</EmailHeading>
    <EmailText>Hola, Ana.</EmailText>
    <EmailButton href="https://example.com/verificar">Confirmar</EmailButton>
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

  it('deja los estilos claros inline y el modo oscuro como override', async () => {
    const out = await html(mensaje);

    expect(out).toContain('@media (prefers-color-scheme: dark)');
    expect(out).toContain(`${emailPalette.light.background};`);
    expect(out).toContain('!important');
  });

  it('no cuelga ninguna regla oscura de <body> ni de <html>', async () => {
    // Gmail y la vista previa de Mailpit descartan <html>/<body> e inyectan el
    // contenido en su propio documento: un selector descendiente colgado de
    // ahí deja de matchear, y así se rompió el modo oscuro una vez.
    const out = await html(mensaje);
    const bloque = out.match(/@media \(prefers-color-scheme: dark\)[\s\S]*?\n {2}\}/)?.[0] ?? '';

    expect(bloque).not.toBe('');
    // Toda regla oscura arranca en una clase que el layout pone él mismo —
    // nada de `body .algo` ni de `html`.
    for (const selector of bloque.matchAll(/^\s*([^{@}]+)\{/gm)) {
      for (const parte of selector[1].split(',')) {
        expect(parte.trim()).toMatch(/^\.email-/);
      }
    }
  });

  it('mantiene la banda de marca fuera del modo oscuro', async () => {
    // Decisión de diseño: el logotipo cae siempre sobre blanco.
    const out = await html(mensaje);
    const bloque = out.match(/@media \(prefers-color-scheme: dark\)[\s\S]*?\n {2}\}/)?.[0] ?? '';

    expect(out).toContain('email-brand');
    expect(bloque).not.toContain('email-brand');
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
