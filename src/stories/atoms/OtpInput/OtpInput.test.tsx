import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OtpInput } from './OtpInput';
import { OtpField } from '../../molecules/OtpField/OtpField';

describe('OtpInput — nombre accesible del grupo', () => {
  it('suelto, el grupo se llama con el default castellano', () => {
    render(<OtpInput length={6} />);
    expect(screen.getByRole('group', { name: 'Código de verificación' })).toBeInTheDocument();
  });

  it('`groupLabel` traduce ese nombre', () => {
    render(<OtpInput length={6} groupLabel="Verification code" />);
    expect(screen.getByRole('group', { name: 'Verification code' })).toBeInTheDocument();
  });

  it('un `aria-label` explícito prevalece sobre `groupLabel`', () => {
    render(<OtpInput length={6} aria-label="Código SMS" groupLabel="Código de verificación" />);
    expect(screen.getByRole('group', { name: 'Código SMS' })).toBeInTheDocument();
  });

  it('dentro de OtpField manda la etiqueta del campo, no el default', () => {
    render(<OtpField label="Código enviado por SMS" length={4} />);
    expect(screen.getByRole('group', { name: 'Código enviado por SMS' })).toBeInTheDocument();
    expect(screen.queryByRole('group', { name: 'Código de verificación' })).not.toBeInTheDocument();
  });
});

describe('OtpInput — formulario nativo', () => {
  it('el input oculto lleva el código completo en el FormData del form', async () => {
    render(
      <form data-testid="form">
        <OtpInput length={4} name="otp" />
      </form>,
    );

    const form = screen.getByTestId('form') as HTMLFormElement;
    const inputs = screen.getAllByRole('textbox');
    await userEvent.click(inputs[0]);
    await userEvent.keyboard('1234');

    expect(new FormData(form).get('otp')).toBe('1234');
  });

  it('`form.reset()` vacía a la vez las celdas y el input oculto', async () => {
    render(
      <form data-testid="form">
        <OtpInput length={4} name="otp" />
        <button type="reset">Reset</button>
      </form>,
    );

    const form = screen.getByTestId('form') as HTMLFormElement;
    const inputs = screen.getAllByRole('textbox');
    await userEvent.click(inputs[0]);
    await userEvent.keyboard('1234');
    expect(new FormData(form).get('otp')).toBe('1234');

    await userEvent.click(screen.getByRole('button', { name: 'Reset' }));

    expect(new FormData(form).get('otp')).toBe('');
    inputs.forEach((input) => expect(input).toHaveValue(''));
  });

  it('sin `name`, no se añade ningún input oculto', () => {
    render(<OtpInput length={4} />);
    // El único input oculto posible sería el propio del código completo.
    expect(document.querySelector('input[type="hidden"]')).not.toBeInTheDocument();
  });
});
