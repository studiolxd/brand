import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { FieldRow, FieldRows } from './FieldRow';
import { InputField } from '../InputField/InputField';
import { SelectField } from '../SelectField/SelectField';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';
import { Form } from '../Form/Form';

const ROLES = [
  { value: 'admin', label: 'Administración' },
  { value: 'editor', label: 'Edición' },
  { value: 'lectura', label: 'Solo lectura' },
];

const INVITACIONES = [
  { id: '1', correo: 'nuria.serra@santcugat.cat', rol: 'admin' },
  { id: '2', correo: 'marc.oliva@santcugat.cat', rol: 'editor' },
  { id: '3', correo: '', rol: 'lectura' },
];

function Quitar({ correo, disabled }: { correo: string; disabled?: boolean }) {
  return (
    <Button
      variant="ghost"
      iconOnly
      disabled={disabled}
      aria-label={correo ? `Quitar a ${correo}` : 'Quitar la fila vacía'}
    >
      <Icon name="close" />
    </Button>
  );
}

/** La lista de invitaciones del alta: correo que crece, papel con su ancho y el aspa al final. */
function Invitaciones() {
  return (
    <FieldRows>
      {INVITACIONES.map((fila) => (
        <FieldRow key={fila.id} widths={['grow', 'md']} action={<Quitar correo={fila.correo} />}>
          <InputField
            id={`invitacion-correo-${fila.id}`}
            label="Correo electrónico"
            type="email"
            autoComplete="off"
            placeholder="nombre@organizacion.cat"
            defaultValue={fila.correo}
          />
          <SelectField
            id={`invitacion-rol-${fila.id}`}
            label="Papel"
            options={ROLES}
            defaultValue={fila.rol}
          />
        </FieldRow>
      ))}
    </FieldRows>
  );
}

const meta: Meta<typeof FieldRow> = {
  title: 'Molecules/FieldRow',
  component: FieldRow,
  parameters: { layout: 'padded' },
  args: { children: null },
  render: () => <Invitaciones />,
  argTypes: {
    widths: { control: { type: 'object' } },
    children: { table: { disable: true } },
    action: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};
export default meta;
type Story = StoryObj<typeof FieldRow>;

/**
 * El caso de verdad: tres filas, el campo largo absorbiendo el sobrante, el
 * papel con su ancho propio y la acción al final, fuera de la columna de
 * ningún campo. Las etiquetas se ven solo en la primera fila; en las otras
 * dos siguen ahí, ocultas.
 */
export const PorDefecto: Story = {};

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
};

/** La misma lista dentro de un `Form` de talla `lg`: la fila hereda la talla y el hueco de la etiqueta sube con ella. */
export const DentroDeUnFormulario: Story = {
  name: 'Dentro de un formulario',
  render: () => (
    <Form size="lg" onSubmit={(e) => e.preventDefault()} actions={<Button variant="outline">Añadir otra persona</Button>}>
      <Invitaciones />
    </Form>
  ),
};

/** En móvil los campos se apilan a ancho completo y la acción cae al final, alineada al margen. */
export const Movil: Story = {
  name: 'En móvil',
  globals: { viewport: { value: 'mobile1' } },
};

/**
 * Añadir y quitar filas. La lista con una sola fila no deja quitarla: eso lo
 * decide el consumidor, que es quien tiene el modelo — la fila no cuenta
 * filas ni sabe qué hace su acción.
 */
export const ListaEditable: Story = {
  name: 'Lista editable',
  render: function ListaEditableRender() {
    const [filas, setFilas] = useState([
      { id: 'a', correo: 'nuria.serra@santcugat.cat', rol: 'admin' },
      { id: 'b', correo: '', rol: 'lectura' },
    ]);
    const siguiente = useRef(0);
    return (
      <Form
        onSubmit={(e) => e.preventDefault()}
        actions={
          <Button
            variant="outline"
            onClick={() => setFilas((previas) => [...previas, { id: `n${(siguiente.current += 1)}`, correo: '', rol: 'lectura' }])}
          >
            Añadir otra persona
          </Button>
        }
      >
        <FieldRows empty="Todavía no has invitado a nadie.">
          {filas.map((fila) => (
            <FieldRow
              key={fila.id}
              widths={['grow', 'md']}
              action={
                <Button
                  variant="ghost"
                  iconOnly
                  disabled={filas.length === 1}
                  aria-label={fila.correo ? `Quitar a ${fila.correo}` : 'Quitar la fila vacía'}
                  onClick={() => setFilas((previas) => previas.filter((f) => f.id !== fila.id))}
                >
                  <Icon name="close" />
                </Button>
              }
            >
              <InputField id={`editable-correo-${fila.id}`} label="Correo electrónico" type="email" defaultValue={fila.correo} placeholder="nombre@organizacion.cat" />
              <SelectField id={`editable-rol-${fila.id}`} label="Papel" options={ROLES} defaultValue={fila.rol} />
            </FieldRow>
          ))}
        </FieldRows>
      </Form>
    );
  },
};

export const ContratoNombreAccesible: Story = {
  name: 'Test — cada fila conserva el nombre accesible de sus campos',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Las tres filas: el nombre accesible está en todas, no solo en la primera.
    await expect(canvas.getAllByLabelText('Correo electrónico')).toHaveLength(3);
    await expect(canvas.getAllByLabelText('Papel')).toHaveLength(3);
    // Y solo una etiqueta se ve: las otras dos van con `visually-hidden`.
    const etiquetas = canvasElement.querySelectorAll('label');
    const visibles = Array.from(etiquetas).filter((etiqueta) => !etiqueta.classList.contains('visually-hidden'));
    await expect(visibles).toHaveLength(2);
    // La acción no cuelga de la columna de ningún campo.
    const aspa = canvas.getAllByRole('button', { name: /^Quitar/ })[0];
    await expect(aspa.closest('.field-row__action')).not.toBeNull();
    await expect(aspa.closest('.field-row__cell')).toBeNull();
  },
};
