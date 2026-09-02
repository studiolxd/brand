import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
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
