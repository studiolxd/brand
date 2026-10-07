import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { ReactElement } from 'react';
import { Form } from './Form';
import { InputField } from '../InputField/InputField';
import { TextareaField } from '../TextareaField/TextareaField';
import { SelectField } from '../SelectField/SelectField';
import { CheckboxField } from '../CheckboxField/CheckboxField';
import { BrandMessagesProvider } from '../../messages/BrandMessagesProvider';
import { brandMessagesFixture as ES } from '../../../../.storybook/brandMessagesFixture';

function mount(ui: ReactElement) {
  return render(<BrandMessagesProvider messages={ES}>{ui}</BrandMessagesProvider>);
}

const marcas = () => Array.from(document.querySelectorAll('.label__optional'));

describe('Form markOptional (D74)', () => {
  it('con tres obligatorios y uno que no, solo ese lleva la marca', () => {
    mount(
      <Form markOptional>
        <InputField id="nombre" label="Nombre" required />
        <TextareaField id="mensaje" label="Mensaje" required />
        <SelectField id="tema" label="Tema" options={[{ value: 'a', label: 'A' }]} required />
        <InputField id="telefono" label="Teléfono" />
      </Form>,
    );

    expect(marcas()).toHaveLength(1);
    expect(document.getElementById('telefono')).toHaveAccessibleName('Teléfono (opcional)');
    expect(document.getElementById('nombre')).toHaveAccessibleName('Nombre');
    expect(document.getElementById('mensaje')).toHaveAccessibleName('Mensaje');
    expect(document.getElementById('tema')).toHaveAccessibleName('Tema');
  });

  it('`optional={false}` la apaga en un campo concreto', () => {
    mount(
      <Form markOptional>
        <InputField id="telefono" label="Teléfono" />
        <CheckboxField id="newsletter" label="Newsletter" optional={false} />
      </Form>,
    );

    expect(marcas()).toHaveLength(1);
    expect(document.getElementById('newsletter')).toHaveAccessibleName('Newsletter');
    expect(document.getElementById('telefono')).toHaveAccessibleName('Teléfono (opcional)');
  });

  it('sin `markOptional`, nada cambia: solo marca el `optional` explícito', () => {
    mount(
      <Form>
        <InputField id="nombre" label="Nombre" required />
        <InputField id="telefono" label="Teléfono" />
        <InputField id="empresa" label="Empresa" optional />
      </Form>,
    );

    expect(marcas()).toHaveLength(1);
    expect(document.getElementById('telefono')).toHaveAccessibleName('Teléfono');
    expect(document.getElementById('empresa')).toHaveAccessibleName('Empresa (opcional)');
  });

  it('fuera de un `Form`, un campo sin `required` no se marca solo', () => {
    mount(<InputField id="buscar" label="Buscar" />);
    expect(marcas()).toHaveLength(0);
  });

  it('la marca sale del catálogo y `optionalLabel` la anula', () => {
    mount(
      <Form markOptional>
        <InputField id="telefono" label="Teléfono" optionalLabel="(si quieres)" />
      </Form>,
    );
    expect(screen.getByText('(si quieres)')).toHaveClass('label__optional');
  });
});
