import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TimeField } from './TimeField';
import { BrandMessagesProvider } from '../../messages/BrandMessagesProvider';
import { brandMessagesFixture as ES } from '../../../../.storybook/brandMessagesFixture';

/** Los dos desplegables leen su cromo del catálogo: aquí lo monta el test. */
function conCatalogo(ui: React.ReactElement) {
  return <BrandMessagesProvider messages={ES}>{ui}</BrandMessagesProvider>;
}

describe('TimeField — `required` (D73)', () => {
  it('sin `required` ningún desplegable es obligatorio', () => {
    render(conCatalogo(<TimeField label="Hora de inicio" />));
    for (const combo of screen.getAllByRole('combobox')) expect(combo).not.toHaveAttribute('aria-required');
  });

  it('con `required` lo llevan los dos desplegables, no el grupo (ARIA 1.2 no lo admite en `group`)', () => {
    render(conCatalogo(<TimeField label="Hora de inicio" required />));
    expect(screen.getByRole('group', { name: 'Hora de inicio' })).not.toHaveAttribute('aria-required');
    const combos = screen.getAllByRole('combobox');
    expect(combos).toHaveLength(2);
    for (const combo of combos) expect(combo).toHaveAttribute('aria-required', 'true');
  });
});
