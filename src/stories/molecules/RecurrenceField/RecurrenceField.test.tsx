import { describe, it, expect, vi } from 'vitest';
import { useState } from 'react';
import { render as renderRTL, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';
import { RecurrenceField } from './RecurrenceField';
import { buildRecurrenceRule, parseRecurrenceRule, type RecurrenceValue } from './recurrenceRule';
import { BrandMessagesProvider } from '../../messages/BrandMessagesProvider';
import { brandMessagesFixture as ES } from '../../../../.storybook/brandMessagesFixture';

const Catalogo = ({ children }: { children: ReactNode }) => (
  <BrandMessagesProvider messages={ES}>{children}</BrandMessagesProvider>
);

function render(ui: React.ReactElement) {
  return renderRTL(ui, { wrapper: Catalogo });
}

/** Igual que el formulario que lo monta: el valor lo guarda quien lo usa. */
function Editor({ inicial, onRule }: { inicial: RecurrenceValue | null; onRule?: (rule: string) => void }) {
  const [value, setValue] = useState<RecurrenceValue | null>(inicial);
  return (
    <RecurrenceField
      value={value}
      onValueChange={(siguiente) => {
        setValue(siguiente);
        onRule?.(buildRecurrenceRule(siguiente));
      }}
    />
  );
}

describe('RecurrenceField', () => {
  it('sin repetición solo enseña la frecuencia', () => {
    render(<RecurrenceField value={null} onValueChange={vi.fn()} />);
    expect(screen.getByRole('combobox', { name: ES.recurrenceField.frequency })).toBeInTheDocument();
    expect(screen.queryByRole('combobox', { name: ES.recurrenceField.end })).not.toBeInTheDocument();
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  it('elegir una frecuencia abre el resto del editor', async () => {
    const onRule = vi.fn();
    render(<Editor inicial={null} onRule={onRule} />);

    await userEvent.click(screen.getByRole('combobox', { name: ES.recurrenceField.frequency }));
    await userEvent.click(await screen.findByRole('option', { name: ES.recurrenceField.weekly }));

    expect(onRule).toHaveBeenCalledWith('FREQ=WEEKLY');
    expect(screen.getByRole('combobox', { name: ES.recurrenceField.end })).toBeInTheDocument();
  });

  it('los días de la semana solo salen en la frecuencia semanal', async () => {
    render(<Editor inicial={parseRecurrenceRule('FREQ=WEEKLY')} />);
    expect(screen.getByRole('button', { name: 'lunes' })).toBeInTheDocument();

    await userEvent.click(screen.getByRole('combobox', { name: ES.recurrenceField.frequency }));
    await userEvent.click(await screen.findByRole('option', { name: ES.recurrenceField.monthly }));

    expect(screen.queryByRole('button', { name: 'lunes' })).not.toBeInTheDocument();
  });

  it('los nombres de los días salen del locale, no del catálogo', () => {
    render(
      <RecurrenceField
        value={parseRecurrenceRule('FREQ=WEEKLY')}
        onValueChange={vi.fn()}
        locale="en-GB"
      />,
    );
    expect(screen.getByRole('button', { name: 'Monday' })).toBeInTheDocument();
  });

  it('con la semana en domingo, el domingo va primero', () => {
    const { container } = render(
      <RecurrenceField
        value={parseRecurrenceRule('FREQ=WEEKLY')}
        onValueChange={vi.fn()}
        weekStartsOn="sunday"
      />,
    );
    const primero = container.querySelector('.recurrence-field__weekdays button');
    expect(primero).toHaveAttribute('aria-label', 'domingo');
  });

  it('pulsar un día lo añade a la regla', async () => {
    const onRule = vi.fn();
    render(<Editor inicial={parseRecurrenceRule('FREQ=WEEKLY')} onRule={onRule} />);

    await userEvent.click(screen.getByRole('button', { name: 'miércoles' }));
    expect(onRule).toHaveBeenLastCalledWith('FREQ=WEEKLY;BYDAY=WE');
  });

  it('el final por fecha saca el campo de fecha, y el de número de veces el suyo', async () => {
    render(<Editor inicial={parseRecurrenceRule('FREQ=WEEKLY')} />);

    await userEvent.click(screen.getByRole('combobox', { name: ES.recurrenceField.end }));
    await userEvent.click(await screen.findByRole('option', { name: ES.recurrenceField.endUntil }));
    expect(screen.getByRole('textbox', { name: ES.recurrenceField.until })).toBeInTheDocument();


    await userEvent.click(screen.getByRole('combobox', { name: ES.recurrenceField.end }));
    await userEvent.click(await screen.findByRole('option', { name: ES.recurrenceField.endCount }));
    expect(screen.getByRole('textbox', { name: ES.recurrenceField.count })).toBeInTheDocument();
    expect(screen.queryByRole('textbox', { name: ES.recurrenceField.until })).not.toBeInTheDocument();
  });

  it('el intervalo lleva la etiqueta de su frecuencia', () => {
    render(<RecurrenceField value={parseRecurrenceRule('FREQ=MONTHLY')} onValueChange={vi.fn()} />);
    expect(
      screen.getByRole('textbox', { name: ES.recurrenceField.interval('monthly') }),
    ).toBeInTheDocument();
  });

  it('volver a «no se repite» devuelve null, no una regla vacía', async () => {
    const onValueChange = vi.fn();
    render(<RecurrenceField value={parseRecurrenceRule('FREQ=WEEKLY')} onValueChange={onValueChange} />);

    await userEvent.click(screen.getByRole('combobox', { name: ES.recurrenceField.frequency }));
    await userEvent.click(await screen.findByRole('option', { name: ES.recurrenceField.never }));

    expect(onValueChange).toHaveBeenCalledWith(null);
  });

  it('con `legend` se envuelve en un grupo con nombre', () => {
    render(<RecurrenceField value={null} onValueChange={vi.fn()} legend="Repetición" />);
    expect(screen.getByRole('group', { name: 'Repetición' })).toBeInTheDocument();
  });

  it('sin `legend` no monta grupo: el editor va suelto en el formulario', () => {
    render(<RecurrenceField value={null} onValueChange={vi.fn()} />);
    expect(screen.queryByRole('group')).not.toBeInTheDocument();
  });

  it('el grupo de días se nombra sin ser un `<label>`', () => {
    render(<RecurrenceField value={parseRecurrenceRule('FREQ=WEEKLY')} onValueChange={vi.fn()} />);
    expect(screen.getByRole('group', { name: ES.recurrenceField.weekdays })).toBeInTheDocument();
  });
});
