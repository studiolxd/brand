/*
 * El contrato de las primitivas de bloque, comprobado sobre el HTML renderizado
 * y no sobre el árbol de React: lo que llega a la bandeja es el HTML, y las
 * decisiones que hay que vigilar aquí son justo las que el árbol no enseña —si
 * una lista es una `<ul>`, si un tono es un relleno, si un color salió del
 * token o de la mano de alguien.
 */
import type { ReactElement } from 'react';
import { render } from 'react-email';
import { describe, expect, it } from 'vitest';

import {
  EmailDivider,
  EmailHeading,
  EmailList,
  EmailListItem,
  EmailQuote,
  EmailTag,
  EmailText,
} from './EmailPrimitives';
import { EmailLayout } from './EmailLayout';
import { emailTokens } from './emailTokens';

const correo = (contenido: ReactElement) =>
  render(
    <EmailLayout preview="Contrato" appName="Studio LXD">
      {contenido}
    </EmailLayout>,
  );

describe('EmailHeading', () => {
  it('sin `level` es el h1 del mensaje', async () => {
    const out = await correo(<EmailHeading>Tres licitaciones nuevas</EmailHeading>);

    expect(out).toContain('<h1');
    expect(out).toContain(emailTokens['--email-heading-font-size']);
  });

  it('`level={2}` es el título de un bloque, dos peldaños por debajo', async () => {
    const out = await correo(<EmailHeading level={2}>Riesgos</EmailHeading>);

    expect(out).toContain('<h2');
    expect(out).toContain(`font-size:${emailTokens['--email-heading-2-font-size']}`);
  });

  it('el de bloque lleva aire por encima; el del mensaje, no', async () => {
    const bloque = await correo(<EmailHeading level={2}>Riesgos</EmailHeading>);
    const mensaje = await correo(<EmailHeading>Riesgos</EmailHeading>);

    expect(bloque).toContain(`margin:${emailTokens['--email-heading-2-margin-block-start']} 0`);
    expect(mensaje).toContain('margin:0 0');
  });

  it('no es una versalita gris: ni mayúsculas forzadas ni tinta secundaria', async () => {
    const out = await correo(<EmailHeading level={2}>Riesgos</EmailHeading>);

    expect(out).not.toContain('text-transform:uppercase');
    expect(out).toContain(emailTokens['--email-heading-2-color']);
  });
});

describe('EmailList', () => {
  it('es una lista de verdad, no párrafos con un bolo delante', async () => {
    const out = await correo(
      <EmailList>
        <EmailListItem>Uno</EmailListItem>
        <EmailListItem>Dos</EmailListItem>
      </EmailList>,
    );

    expect(out).toContain('<ul');
    expect(out.match(/<li/g)).toHaveLength(2);
    expect(out).not.toContain('•');
  });

  it('«ordered» la vuelve numerada', async () => {
    const out = await correo(
      <EmailList ordered>
        <EmailListItem>Primero</EmailListItem>
      </EmailList>,
    );

    expect(out).toContain('<ol');
  });

  it('el sangrado va en la lista, que es lo único que respeta el motor de Word', async () => {
    const out = await correo(
      <EmailList>
        <EmailListItem>Uno</EmailListItem>
      </EmailList>,
    );

    expect(out).toContain(`padding-left:${emailTokens['--email-list-padding-inline-start']}`);
  });
});

describe('EmailTag', () => {
  /*
   * Los tres son rellenos, y lo decide el aviso: el amarillo de marca da 1,50:1
   * sobre blanco y no llega al 3:1 de WCAG como tinta. Si alguien le quita el
   * fondo a uno, deja de parecerse a los otros dos.
   */
  it.each([
    ['success', '--email-tone-success-bg', '--email-tone-success-color'],
    ['warning', '--email-tone-warning-bg', '--email-tone-warning-color'],
    ['error', '--email-tone-error-bg', '--email-tone-error-color'],
  ] as const)('el tono %s es un relleno con su tinta emparejada', async (tone, bg, color) => {
    const out = await correo(<EmailText><EmailTag tone={tone}>Veredicto</EmailTag></EmailText>);

    expect(out).toContain(`background-color:${emailTokens[bg]}`);
    expect(out).toContain(`color:${emailTokens[color]}`);
  });

  it('es inline-block, para que el padding vertical empuje la línea', async () => {
    const out = await correo(<EmailText><EmailTag tone="success">Nuevo</EmailTag></EmailText>);

    expect(out).toContain('display:inline-block');
  });
});

describe('EmailQuote', () => {
  it('marca con una barra en la tinta secundaria, y sin tono', async () => {
    const out = await correo(<EmailQuote><EmailText>Sus palabras</EmailText></EmailQuote>);

    expect(out).toContain(
      `border-left:${emailTokens['--email-quote-border-width']} solid ${emailTokens['--email-quote-border-color']}`,
    );
  });
});

describe('EmailDivider', () => {
  it('anula el relieve que el `<hr>` trae de serie antes de pintar su línea', async () => {
    const out = await correo(<EmailDivider />);

    expect(out).toContain('border:0');
    expect(out).toContain(
      `border-top:${emailTokens['--email-divider-width']} solid ${emailTokens['--email-divider-color']}`,
    );
  });
});

describe('las primitivas de bloque', () => {
  /*
   * La razón de ser de todo esto: que ninguna app vuelva a escribir un hex. Los
   * tres que hoy están copiados a mano en el correo de validación de
   * `lmsmarketplace` —#006616, #ffcd00 y #b30000— salen de aquí.
   */
  it('no pintan un solo color que no venga de un token del correo', async () => {
    const out = await correo(
      <>
        <EmailHeading level={2}>Bloque</EmailHeading>
        <EmailText><EmailTag tone="warning">Con avisos</EmailTag></EmailText>
        <EmailQuote><EmailText>Cita</EmailText></EmailQuote>
        <EmailList><EmailListItem>Uno</EmailListItem></EmailList>
        <EmailDivider />
      </>,
    );

    const propios = new Set(Object.values(emailTokens).map((valor) => valor.toLowerCase()));
    const hexes = new Set((out.toLowerCase().match(/#[0-9a-f]{3,8}\b/g) ?? []));

    expect([...hexes].filter((hex) => !propios.has(hex))).toEqual([]);
  });
});
