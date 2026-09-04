/*
 * El visor solo tiene una responsabilidad que pueda romperse sin que se note:
 * devolverle al documento la URL base que `srcDoc` le quita. Sin eso el
 * logotipo y la fuente, que las stories sirven por ruta relativa desde
 * `public/`, no resuelven contra nada y el correo sale sin marca.
 */
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { EmailLayout } from './EmailLayout';
import { EmailPreview } from './EmailPreview';
import { EmailText } from './EmailPrimitives';

const correo = (
  <EmailLayout preview="Hola" appName="Bricks" assetsBaseUrl="/email">
    <EmailText>Hola, Ana.</EmailText>
  </EmailLayout>
);

describe('EmailPreview', () => {
  it('le devuelve al documento la URL base que srcDoc le quita', async () => {
    render(<EmailPreview>{correo}</EmailPreview>);
    const iframe = screen.getByTitle('Vista previa del correo');
    await waitFor(() => expect(iframe.getAttribute('srcdoc')).toBeTruthy());
    const doc = iframe.getAttribute('srcdoc') ?? '';

    expect(doc).toContain(`<base href="${document.baseURI}">`);
    // Y va dentro del <head>, antes de cualquier URL relativa.
    expect(doc.indexOf('<base')).toBeLessThan(doc.indexOf('/email/logo-v1.png'));
  });
});
