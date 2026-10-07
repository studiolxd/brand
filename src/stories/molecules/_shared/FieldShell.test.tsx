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
/** La etiqueta, con o sin la marca de opcional detrás: para buscar el grupo por su nombre. */
const LABEL_START = new RegExp(`^${LABEL}`);

interface Shared {
  labelHidden?: boolean;
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
  optional?: boolean;
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
  /**
   * Cómo se anuncia `required`, y dónde; `null` si el campo no lo admite.
   * `description`: el disparador es un botón, que no admite `aria-required`
   * (D73), y lo obligatorio va en su descripción («obligatorio»).
   */
  required: { how: 'native' | 'aria' | 'description'; on?: Query } | null;
  /** Si el campo admite `labelHidden`. */
  labelHidden?: boolean;
  /** Si el campo admite la marca `optional` (D70). */
  optional?: boolean;
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
    // permitido en `role="button"` (ni en `role="group"`). Lo obligatorio va
    // en su descripción (D73).
    name: 'ColorPickerField',
    render: (p) => <ColorPickerField id={ID} label={LABEL} {...p} />,
    named: byId(ID),
    required: { how: 'description' },
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
      <DropdownField id={ID} label={LABEL} items={[]} {...p}>Valor</DropdownField>
    ),
    named: byId(ID),
    required: { how: 'description' },
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
    named: () => screen.getByRole('group', { name: LABEL_START }),
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
    // Una opción suelta no es un campo que se pueda dejar vacío: sin `optional`.
    render: (p) => <RadioField id={ID} label={LABEL} name="r" value="a" {...drop(p, 'optional')} />,
    named: byId(ID),
    required: { how: 'native' },
    optional: false,
  },
  {
    // Editor compuesto: la «etiqueta» es el `legend` del `fieldset`; la ayuda
    // y el error describen el grupo. Sin `aria-invalid` (no hay un control
    // único que marcar) y sin `required` (`null` es un valor válido: «no se
    // repite»). `labelHidden` oculta el propio `legend` (`Fieldset
    // legendHidden`).
    name: 'RecurrenceField',
    render: (p) => (
      <RecurrenceField id={ID} legend={LABEL} value={null} onValueChange={() => {}} {...drop(p, 'required', 'optional')} />
    ),
    named: () => screen.getByRole('group', { name: LABEL }),
    invalid: null,
    required: null,
    // La leyenda no pasa por la etiqueta del armazón: sin `optional` por ahora.
    optional: false,
  },
  {
    name: 'SelectField',
    render: (p) => <SelectField id={ID} label={LABEL} options={[{ value: 'a', label: 'A' }]} {...p} />,
    named: byId(ID),
    required: { how: 'aria' },
  },
  {
    name: 'SwitcherField',
    // Un interruptor siempre tiene valor: sin `optional`.
    render: (p) => <SwitcherField id={ID} label={LABEL} {...drop(p, 'optional')} />,
    named: byId(ID),
    required: { how: 'aria' },
    optional: false,
  },
  {
    name: 'TextareaField',
    render: (p) => <TextareaField id={ID} label={LABEL} {...p} />,
    named: byId(ID),
    required: { how: 'native' },
  },
  {
    // Compuesto: dos desplegables; la etiqueta nombra el grupo. El grupo no
    // admite `aria-required` (D73): lo llevan los desplegables, que son
    // `combobox` y sí lo admiten; aquí se mira el de horas.
    name: 'TimeField',
    render: (p) => <TimeField id={ID} label={LABEL} {...p} />,
    named: () => screen.getByRole('group', { name: LABEL_START }),
    required: { how: 'aria', on: byId(ID) },
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
      const nombre = { native: 'atributo nativo', aria: 'aria-required', description: 'descripción «obligatorio»' }[how];
      it(`\`required\` se anuncia (${nombre})`, () => {
        const target = () => (on ?? c.named)();
        const { unmount } = mount(c);
        if (how === 'description') expect(target()).not.toHaveAccessibleDescription(/obligatorio/);
        else expect(target()).not.toHaveAttribute(how === 'native' ? 'required' : 'aria-required');
        unmount();
        mount(c, { required: true });
        if (how === 'native') expect(target()).toBeRequired();
        else if (how === 'aria') expect(target()).toHaveAttribute('aria-required', 'true');
        else {
          expect(target()).not.toHaveAttribute('aria-required');
          expect(target()).toHaveAccessibleDescription(/obligatorio$/);
          // Ningún ancestro lleva `aria-required` (ARIA 1.2 no lo admite en `group`).
          expect(target().closest('[aria-required]')).toBeNull();
        }
      });
    }

    if (c.optional !== false) {
      it('`optional` pinta «(opcional)» tras la etiqueta, dentro del nombre accesible', () => {
        const { unmount } = mount(c);
        expect(document.querySelector('.label__optional')).toBeNull();
        unmount();
        mount(c, { optional: true });
        expect(document.querySelector('.label__optional')).toHaveTextContent('(opcional)');
        expect(c.named()).toHaveAccessibleName(`${LABEL} (opcional)`);
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

describe('FieldShell — el obligatorio de un disparador que es un botón va en su descripción (D73)', () => {
  const GROUPED: Array<[string, (required: boolean) => ReactElement]> = [
    ['ColorPickerField', (required) => <ColorPickerField id={ID} label={LABEL} name="color" required={required} />],
    ['DropdownField', (required) => (
      <DropdownField id={ID} label={LABEL} items={[]} name="valor" required={required}>Valor</DropdownField>
    )],
  ];

  it.each(GROUPED)('%s: «obligatorio» describe el disparador y el `<form>` lo valida', (_name, ui) => {
    const { unmount } = render(<BrandMessagesProvider messages={ES}>{ui(false)}</BrandMessagesProvider>);
    expect(document.getElementById(`${ID}-required`)).toBeNull();
    // Sin `required`, el campo que va con el formulario sigue siendo el oculto de siempre.
    expect(document.querySelector('input[type="hidden"]')).not.toBeNull();
    unmount();

    const { container } = render(
      <BrandMessagesProvider messages={ES}>{ui(true)}</BrandMessagesProvider>,
    );
    // Sin grupo ni `aria-required` en ninguna parte (ARIA 1.2 no lo admite ni
    // en `button` ni en `group`).
    expect(screen.queryByRole('group')).toBeNull();
    expect(container.querySelector('[aria-required]')).toBeNull();
    // El disparador se sigue nombrando por la etiqueta, y lo obligatorio va
    // en su descripción: un texto oculto del catálogo (`field.required`).
    const trigger = document.getElementById(ID)!;
    expect(trigger).toHaveAccessibleName(LABEL);
    // (El de ColorPicker lleva antes el valor elegido.)
    expect(trigger).toHaveAccessibleDescription(/obligatorio$/);
    expect(document.getElementById(`${ID}-required`)!.closest('.visually-hidden')).not.toBeNull();
    // Un campo oculto no se valida: el obligatorio va en uno de texto, fuera de la vista.
    const input = container.querySelector('input')!;
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toBeRequired();
    expect(input).toHaveAttribute('tabindex', '-1');
    expect(input).toHaveAttribute('aria-hidden', 'true');
    expect((input as HTMLInputElement).validity.valueMissing).toBe(true);
    // El navegador lo enfoca para avisar: el foco vuelve al disparador.
    input.focus();
    expect(document.getElementById(ID)).toHaveFocus();
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

describe('FieldShell — «obligatorio» se suma a la ayuda y al error (D73)', () => {
  const SUMMED: Array<[string, Query, (p: Shared & { requiredLabel?: string }) => ReactElement]> = [
    ['ColorPickerField', byId(ID), (p) => <ColorPickerField id={ID} label={LABEL} {...p} />],
    ['DropdownField', byId(ID), (p) => <DropdownField id={ID} label={LABEL} items={[]} {...p}>Valor</DropdownField>],
  ];

  it.each(SUMMED)('%s: error, ayuda y obligatorio, en ese orden', (_name, target, ui) => {
    render(
      <BrandMessagesProvider messages={ES}>
        {ui({ required: true, helperText: HELP, errorMessage: ERROR })}
      </BrandMessagesProvider>,
    );
    // (El de ColorPicker antepone el id de su valor elegido.)
    expect(target().getAttribute('aria-describedby')).toMatch(
      new RegExp(`(^| )${ID}-error ${ID}-helper ${ID}-required$`),
    );
  });

  it.each(SUMMED)('%s: `requiredLabel` anula el catálogo', (_name, target, ui) => {
    render(<BrandMessagesProvider messages={ES}>{ui({ required: true, requiredLabel: 'necesario' })}</BrandMessagesProvider>);
    expect(target()).toHaveAccessibleDescription(/necesario$/);
  });
});
