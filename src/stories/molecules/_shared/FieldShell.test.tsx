import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { ReactElement } from 'react';
import { BrandMessagesProvider } from '../../messages/BrandMessagesProvider';
import { brandMessagesFixture as ES } from '../../../../.storybook/brandMessagesFixture';
import { AsyncMultiSelectField } from '../AsyncMultiSelectField/AsyncMultiSelectField';
import { AsyncSelectField } from '../AsyncSelectField/AsyncSelectField';
import { AutocompleteField } from '../AutocompleteField/AutocompleteField';
import { CheckboxField } from '../CheckboxField/CheckboxField';
import { ColorPickerField } from '../ColorPickerField/ColorPickerField';
import { DatePickerField } from '../DatePickerField/DatePickerField';
import { DateTimeField } from '../DateTimeField/DateTimeField';
import { DropdownField } from '../DropdownField/DropdownField';
import { FileUploadField } from '../FileUploadField/FileUploadField';
import { InputField } from '../InputField/InputField';
import { InputPhoneField } from '../InputPhoneField/InputPhoneField';
import { MultiSelectField } from '../MultiSelectField/MultiSelectField';
import { NumberInputField } from '../NumberInputField/NumberInputField';
import { OtpField } from '../OtpField/OtpField';
import { PasswordField } from '../PasswordField/PasswordField';
import { RadioField } from '../RadioField/RadioField';
import { RecurrenceField } from '../RecurrenceField/RecurrenceField';
import { SelectField } from '../SelectField/SelectField';
import { SwitcherField } from '../SwitcherField/SwitcherField';
import { TextareaField } from '../TextareaField/TextareaField';
import { TimeField } from '../TimeField/TimeField';

/*
 * La misma batería para los 21 `*Field`: todos montan su armazón con
 * `FieldShell`, así que todos tienen que cumplir lo mismo. Cada caso dice
 * DÓNDE mirar (el control, o el grupo en los compuestos) y qué parte del
 * contrato no le aplica, con el porqué.
 */

const ID = 'campo';
const LABEL = 'Etiqueta';
const HELP = 'Texto de ayuda';
const ERROR = 'Texto de error';

interface Shared {
  labelHidden?: boolean;
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
}

type Query = () => HTMLElement;
const byId = (id: string): Query => () => document.getElementById(id)!;

interface Case {
  name: string;
  render: (p: Shared) => ReactElement;
  /** El elemento que la etiqueta nombra. */
  named: Query;
  /** El que lleva `aria-describedby`. Default: `named`. */
  described?: Query;
  /** El que lleva `aria-invalid`; `null` si no aplica. Default: `named`. */
  invalid?: Query | null;
  /** Cómo se anuncia `required`, y dónde; `null` si el campo no lo admite. */
  required: { how: 'native' | 'aria'; on?: Query } | null;
  /** Si el campo admite `labelHidden`. */
  labelHidden?: boolean;
}

const noSearch = async () => [];

/** Quita del reparto lo que el campo no admite. */
function drop<K extends keyof Shared>(p: Shared, ...keys: K[]): Omit<Shared, K> {
  const rest = { ...p };
  for (const k of keys) delete rest[k];
  return rest;
}

const CASES: Case[] = [
  {
    name: 'AsyncMultiSelectField',
    render: (p) => <AsyncMultiSelectField id={ID} label={LABEL} onSearch={noSearch} {...p} />,
    named: byId(ID),
    required: { how: 'aria' },
  },
  {
    name: 'AsyncSelectField',
    render: (p) => <AsyncSelectField id={ID} label={LABEL} onSearch={noSearch} {...p} />,
    named: byId(ID),
    required: { how: 'aria' },
  },
  {
    name: 'AutocompleteField',
    render: (p) => <AutocompleteField id={ID} label={LABEL} options={[]} {...p} />,
    named: byId(ID),
    required: { how: 'native' },
  },
  {
    name: 'CheckboxField',
    render: (p) => <CheckboxField id={ID} label={LABEL} {...p} />,
    named: byId(ID),
    required: { how: 'aria' },
  },
  {
    // El disparador es un botón que abre un diálogo: `aria-required` no está
    // permitido en `role="button"`. Decisión de diseño pendiente.
    name: 'ColorPickerField',
    render: (p) => <ColorPickerField id={ID} label={LABEL} {...drop(p, 'required')} />,
    named: byId(ID),
    required: null,
  },
  {
    name: 'DatePickerField',
    render: (p) => <DatePickerField id={ID} label={LABEL} {...p} />,
    named: byId(ID),
    required: { how: 'native' },
  },
  {
    // Compuesto: la etiqueta nombra el campo de fecha y el grupo; la ayuda y
    // el error describen el grupo. `required` va en el campo de la fecha.
    name: 'DateTimeField',
    render: (p) => <DateTimeField id={ID} label={LABEL} {...p} />,
    named: byId(`${ID}-date`),
    described: () => screen.getByRole('group', { name: LABEL }),
    invalid: byId(`${ID}-date`),
    required: { how: 'native', on: byId(`${ID}-date`) },
  },
  {
    // El disparador es un botón que abre un menú: como en ColorPickerField.
    name: 'DropdownField',
    render: (p) => (
      <DropdownField id={ID} label={LABEL} items={[]} {...drop(p, 'required')}>Valor</DropdownField>
    ),
    named: byId(ID),
    required: null,
  },
  {
    name: 'FileUploadField',
    render: (p) => <FileUploadField id={ID} label={LABEL} {...p} />,
    named: byId(ID),
    required: { how: 'native' },
  },
  {
    name: 'InputField',
    render: (p) => <InputField id={ID} label={LABEL} {...p} />,
    named: byId(ID),
    required: { how: 'native' },
  },
  {
    name: 'InputPhoneField',
    render: (p) => <InputPhoneField id={ID} label={LABEL} {...p} />,
    named: byId(ID),
    required: { how: 'native' },
  },
  {
    name: 'MultiSelectField',
    render: (p) => <MultiSelectField id={ID} label={LABEL} options={[{ value: 'a', label: 'A' }]} {...p} />,
    named: byId(ID),
    required: { how: 'aria' },
  },
  {
    name: 'NumberInputField',
    render: (p) => <NumberInputField id={ID} label={LABEL} {...p} />,
    named: byId(ID),
    required: { how: 'native' },
  },
  {
    // Compuesto: la etiqueta nombra el grupo de celdas (cada celda conserva
    // su «Dígito N de M»); `required` va en cada celda.
    name: 'OtpField',
    render: (p) => <OtpField id={ID} label={LABEL} length={4} {...p} />,
    named: () => screen.getByRole('group', { name: LABEL }),
    required: { how: 'native', on: byId(`${ID}-0`) },
  },
  {
    name: 'PasswordField',
    render: (p) => <PasswordField id={ID} label={LABEL} {...p} />,
    named: byId(ID),
    required: { how: 'native' },
  },
  {
    name: 'RadioField',
    render: (p) => <RadioField id={ID} label={LABEL} name="r" value="a" {...p} />,
    named: byId(ID),
    required: { how: 'native' },
  },
  {
    // Editor compuesto: la «etiqueta» es el `legend` del `fieldset`; la ayuda
    // y el error describen el grupo. Sin `aria-invalid` (no hay un control
    // único que marcar), sin `required` (`null` es un valor válido: «no se
    // repite») y sin `labelHidden` (el `legend` del `Fieldset` no se oculta).
    name: 'RecurrenceField',
    render: (p) => (
      <RecurrenceField id={ID} legend={LABEL} value={null} onValueChange={() => {}} {...drop(p, 'required', 'labelHidden')} />
    ),
    named: () => screen.getByRole('group', { name: LABEL }),
    invalid: null,
    required: null,
    labelHidden: false,
  },
  {
    name: 'SelectField',
    render: (p) => <SelectField id={ID} label={LABEL} options={[{ value: 'a', label: 'A' }]} {...p} />,
    named: byId(ID),
    required: { how: 'aria' },
  },
  {
    name: 'SwitcherField',
    render: (p) => <SwitcherField id={ID} label={LABEL} {...p} />,
    named: byId(ID),
    required: { how: 'aria' },
  },
  {
    name: 'TextareaField',
    render: (p) => <TextareaField id={ID} label={LABEL} {...p} />,
    named: byId(ID),
    required: { how: 'native' },
  },
  {
    // Compuesto: dos desplegables; la etiqueta nombra el grupo.
    name: 'TimeField',
    render: (p) => <TimeField id={ID} label={LABEL} {...p} />,
    named: () => screen.getByRole('group', { name: LABEL }),
    required: { how: 'aria' },
  },
];

function mount(c: Case, p: Shared = {}) {
  return render(<BrandMessagesProvider messages={ES}>{c.render(p)}</BrandMessagesProvider>);
}

describe('FieldShell — contrato común de los *Field', () => {
  it('cubre los 21 campos', () => {
    expect(CASES).toHaveLength(21);
  });

  describe.each(CASES)('$name', (c) => {
    const described = () => (c.described ?? c.named)();

    it('la etiqueta da nombre accesible al control', () => {
      mount(c);
      expect(c.named()).toHaveAccessibleName(LABEL);
    });

    it('sin ayuda ni error no emite `aria-describedby`', () => {
      mount(c);
      // FileUpload describe además su propia zona (`-hint`): solo se mira lo del armazón.
      const ids = (described().getAttribute('aria-describedby') ?? '').split(' ');
      expect(ids).not.toContain(`${ID}-error`);
      expect(ids).not.toContain(`${ID}-helper`);
    });

    it('la ayuda y el error van en `aria-describedby`, error primero, y existen', () => {
      mount(c, { helperText: HELP, errorMessage: ERROR });
      const ids = (described().getAttribute('aria-describedby') ?? '').split(' ');
      expect(ids.indexOf(`${ID}-error`)).toBeGreaterThanOrEqual(0);
      expect(ids.indexOf(`${ID}-helper`)).toBeGreaterThan(ids.indexOf(`${ID}-error`));
      expect(document.getElementById(`${ID}-helper`)).toHaveTextContent(HELP);
      expect(document.getElementById(`${ID}-error`)).toHaveTextContent(ERROR);
      expect(document.getElementById(`${ID}-error`)).toHaveAttribute('role', 'alert');
    });

    if (c.invalid !== null) {
      it('un mensaje de error pone `aria-invalid`', () => {
        const { unmount } = mount(c);
        expect((c.invalid ?? c.named)()).not.toHaveAttribute('aria-invalid', 'true');
        unmount();
        mount(c, { errorMessage: ERROR });
        expect((c.invalid ?? c.named)()).toHaveAttribute('aria-invalid', 'true');
      });
    }

    if (c.required) {
      const { how, on } = c.required;
      it(`\`required\` se anuncia (${how === 'native' ? 'atributo nativo' : 'aria-required'})`, () => {
        const target = () => (on ?? c.named)();
        const { unmount } = mount(c);
        expect(target()).not.toHaveAttribute(how === 'native' ? 'required' : 'aria-required');
        unmount();
        mount(c, { required: true });
        if (how === 'native') expect(target()).toBeRequired();
        else expect(target()).toHaveAttribute('aria-required', 'true');
      });
    }

    if (c.labelHidden !== false) {
      it('`labelHidden` oculta la etiqueta a la vista y conserva el nombre', () => {
        mount(c, { labelHidden: true });
        const text = screen.getAllByText(LABEL).find((el) => el.tagName !== 'OPTION')!;
        expect(text.closest('.visually-hidden')).not.toBeNull();
        expect(c.named()).toHaveAccessibleName(LABEL);
      });
    }
  });
});

describe('FieldShell — el `aria-describedby` del consumidor se suma, no se pisa', () => {
  const CONSUMER: Array<[string, (d: string) => ReactElement]> = [
    ['InputField', (d) => <InputField id={ID} label={LABEL} helperText={HELP} aria-describedby={d} />],
    ['TextareaField', (d) => <TextareaField id={ID} label={LABEL} helperText={HELP} aria-describedby={d} />],
    ['NumberInputField', (d) => <NumberInputField id={ID} label={LABEL} helperText={HELP} aria-describedby={d} />],
    ['PasswordField', (d) => <PasswordField id={ID} label={LABEL} helperText={HELP} aria-describedby={d} />],
    ['RadioField', (d) => <RadioField id={ID} label={LABEL} helperText={HELP} aria-describedby={d} />],
  ];

  it.each(CONSUMER)('%s', (_name, ui) => {
    render(<BrandMessagesProvider messages={ES}>{ui('pista-propia')}</BrandMessagesProvider>);
    expect(document.getElementById(ID)).toHaveAttribute('aria-describedby', `${ID}-helper pista-propia`);
  });
});
