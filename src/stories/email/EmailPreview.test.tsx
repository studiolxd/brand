/*
 * El visor del catálogo solo tiene una responsabilidad que pueda romperse sin
 * que se note: aplicar las reglas oscuras del propio correo, y no una
 * imitación. Eso es lo que se comprueba aquí.
 */
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { EmailLayout } from './EmailLayout';
import { EmailPreview, MARCA_OSCURA } from './EmailPreview';
import { EmailText } from './EmailPrimitives';
import { emailPalette } from './emailTheme';

const correo = (
  <EmailLayout preview="Hola" appName="Bricks">
    <EmailText>Hola, Ana.</EmailText>
  </EmailLayout>
);

const marco = async () => {
  const iframe = screen.getByTitle('Vista previa del correo');
  await waitFor(() => expect(iframe.getAttribute('srcdoc')).toBeTruthy());
  return iframe.getAttribute('srcdoc') ?? '';
};

describe('EmailPreview', () => {
  it('deja el correo tal cual en claro', async () => {
    render(<EmailPreview>{correo}</EmailPreview>);
    const doc = await marco();

    expect(doc).toContain('@media (prefers-color-scheme: dark)');
    // Sin bloque extra: las reglas oscuras siguen dentro de su media query.
    expect(doc).not.toContain(MARCA_OSCURA);
  });

  it('aplica las reglas oscuras sin la media query', async () => {
    render(<EmailPreview theme="dark">{correo}</EmailPreview>);
    const doc = await marco();

    // Las mismas declaraciones del correo, repetidas fuera de la condición:
    // dentro de un iframe no se puede pedir el ajuste del sistema.
    expect(doc).toContain(`color: ${emailPalette.dark.text} !important;`);
    expect(doc).toContain(`background-color: ${emailPalette.dark.background} !important;`);
    // Y la banda de marca sigue sin override, también aquí.
    const inicio = doc.indexOf(MARCA_OSCURA);
    const inyectado = doc.slice(inicio, doc.indexOf('</style>', inicio));
    expect(inyectado).not.toContain('email-brand');
  });
});
