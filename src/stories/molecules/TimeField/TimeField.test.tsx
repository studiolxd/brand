import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TimeField } from './TimeField';
import { BrandMessagesProvider } from '../../messages/BrandMessagesProvider';
import { brandMessagesFixture as ES } from '../../../../.storybook/brandMessagesFixture';

/** Los dos desplegables leen su cromo del catálogo: aquí lo monta el test. */
function conCatalogo(ui: React.ReactElement) {
  return <BrandMessagesProvider messages={ES}>{ui}</BrandMessagesProvider>;
}

describe('TimeField — `required`', () => {
  it('sin `required` el grupo no se anuncia como obligatorio', () => {
    render(conCatalogo(<TimeField label="Hora de inicio" />));
    expect(screen.getByRole('group', { name: 'Hora de inicio' })).not.toHaveAttribute('aria-required');
  });

  it('con `required` lo propaga al grupo del TimeSelect', () => {
    render(conCatalogo(<TimeField label="Hora de inicio" required />));
    expect(screen.getByRole('group', { name: 'Hora de inicio' })).toHaveAttribute('aria-required', 'true');
  });
});
