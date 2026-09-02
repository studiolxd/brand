import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TimeField } from './TimeField';

describe('TimeField — `required`', () => {
  it('sin `required` el grupo no se anuncia como obligatorio', () => {
    render(<TimeField label="Hora de inicio" />);
    expect(screen.getByRole('group', { name: 'Hora de inicio' })).not.toHaveAttribute('aria-required');
  });

  it('con `required` lo propaga al grupo del TimeSelect', () => {
    render(<TimeField label="Hora de inicio" required />);
    expect(screen.getByRole('group', { name: 'Hora de inicio' })).toHaveAttribute('aria-required', 'true');
  });
});
