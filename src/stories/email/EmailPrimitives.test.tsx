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
  EmailCallout,
  EmailCode,
  EmailColumn,
  EmailColumns,
  EmailDivider,
  EmailKeyValue,
  EmailList,
  EmailListItem,
  EmailQuote,
  EmailSectionTitle,
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

describe('EmailSectionTitle', () => {
  it('va como h2, bajo el h1 del título del mensaje', async () => {
    const out = await correo(<EmailSectionTitle>Riesgos</EmailSectionTitle>);

    expect(out).toContain('<h2');
    expect(out).toContain('Riesgos');
  });

  it('no es una versalita gris: ni mayúsculas forzadas ni tinta secundaria', async () => {
    const out = await correo(<EmailSectionTitle>Riesgos</EmailSectionTitle>);

    expect(out).not.toContain('text-transform:uppercase');
    expect(out).toContain(emailTokens['--email-section-title-color']);
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

describe('EmailCallout', () => {
  /*
   * Los cuatro tonos son rellenos. Lo decide el aviso, que no puede ser otra
   * cosa: el amarillo de marca da 1,50:1 sobre blanco y no llega al 3:1 de
   * WCAG como tinta. Si alguien le quita el fondo a uno, deja de parecerse a
   * los otros tres.
   */
  it.each([
    ['info', '--email-tone-info-bg', '--email-tone-info-color'],
    ['success', '--email-tone-success-bg', '--email-tone-success-color'],
    ['warning', '--email-tone-warning-bg', '--email-tone-warning-color'],
    ['error', '--email-tone-error-bg', '--email-tone-error-color'],
  ] as const)('el tono %s es un relleno con su tinta emparejada', async (tone, bg, color) => {
    const out = await correo(<EmailCallout tone={tone}>Aviso</EmailCallout>);

    expect(out).toContain(`background-color:${emailTokens[bg]}`);
    expect(out).toContain(`color:${emailTokens[color]}`);
  });

  it('sin tono es «info», la voz de la casa', async () => {
    const out = await correo(<EmailCallout>Aviso</EmailCallout>);

    expect(out).toContain(`background-color:${emailTokens['--email-tone-info-bg']}`);
  });
});

describe('EmailTag', () => {
  it('comparte tabla de tonos con el recuadro: un error es del mismo rojo en los dos', async () => {
    const recuadro = await correo(<EmailCallout tone="error">Falló</EmailCallout>);
    const pastilla = await correo(<EmailText><EmailTag tone="error">Falló</EmailTag></EmailText>);

    expect(recuadro).toContain(`background-color:${emailTokens['--email-tone-error-bg']}`);
    expect(pastilla).toContain(`background-color:${emailTokens['--email-tone-error-bg']}`);
  });

  it('es inline-block, para que el padding vertical empuje la línea', async () => {
    const out = await correo(<EmailText><EmailTag>Nuevo</EmailTag></EmailText>);

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

describe('EmailColumns', () => {
  it('la calle la reparte la fila: la última columna se queda sin ella', async () => {
    const out = await correo(
      <EmailColumns>
        <EmailColumn width="50%">Izquierda</EmailColumn>
        <EmailColumn width="50%">Derecha</EmailColumn>
      </EmailColumns>,
    );

    expect(out).toContain(`padding-right:${emailTokens['--email-column-gutter']}`);
    expect(out).toContain('padding-right:0');
  });

  it('sin `gap`, que el motor de Word no conoce', async () => {
    const out = await correo(
      <EmailColumns>
        <EmailColumn>Sola</EmailColumn>
      </EmailColumns>,
    );

    expect(out).not.toContain('gap:');
  });
});

describe('EmailKeyValue', () => {
  it('etiqueta y valor van en el mismo párrafo, partidos por un salto', async () => {
    const out = await correo(<EmailKeyValue label="Importe">412.500,00 €</EmailKeyValue>);

    expect(out).toContain('Importe');
    expect(out).toContain('412.500,00 €');
    expect(out).toContain('<br');
    // Un solo <p>: en dos, el margen de párrafo se metería entre el nombre y su dato.
    expect(out.match(/412\.500,00/g)).toHaveLength(1);
  });

  it('la etiqueta va en la tinta secundaria y el valor en la normal', async () => {
    const out = await correo(<EmailKeyValue label="Importe">412.500,00 €</EmailKeyValue>);

    expect(out).toContain(`color:${emailTokens['--email-key-value-label-color']}`);
  });
});

describe('EmailCode', () => {
  it('va en mono y se corta, que es lo que hace que se pueda copiar entera', async () => {
    const out = await correo(<EmailCode>slxd_lk_7f2b9c41e08a4d5f</EmailCode>);

    expect(out).toContain('ui-monospace');
    expect(out).toContain('word-break:break-all');
    expect(out).toContain('word-wrap:break-word');
  });
});

describe('las primitivas de bloque', () => {
  /*
   * La razón de ser de todo esto: que ninguna app vuelva a escribir un hex. Los
   * tres que hoy están copiados a mano en `lmsmarketplace` salen de aquí.
   */
  it('no pintan un solo color que no venga de un token del correo', async () => {
    const out = await correo(
      <>
        <EmailSectionTitle>Bloque</EmailSectionTitle>
        <EmailCallout tone="warning">Aviso</EmailCallout>
        <EmailQuote><EmailText>Cita</EmailText></EmailQuote>
        <EmailCode>clave</EmailCode>
        <EmailDivider />
      </>,
    );

    const propios = new Set(Object.values(emailTokens).map((valor) => valor.toLowerCase()));
    const hexes = new Set((out.toLowerCase().match(/#[0-9a-f]{3,8}\b/g) ?? []));

    expect([...hexes].filter((hex) => !propios.has(hex))).toEqual([]);
  });
});
