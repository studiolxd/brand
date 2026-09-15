import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Alert, AlertDescription } from '../Alert/Alert';
import { Button } from '../../atoms/Button/Button';
import { ConfirmDialog } from './ConfirmDialog';
import { BrandMessagesProvider } from '../../messages/BrandMessagesProvider';
import { brandMessagesFixtureEn as EN } from '../../../../.storybook/brandMessagesFixtureEn';

const meta = {
  title: 'Molecules/ConfirmDialog',
  component: ConfirmDialog,
} satisfies Meta<typeof ConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const base = {
  open: true,
  title: '¿Borrar la organización?',
  description: 'Se borrarán también sus proyectos y sus miembros. No se puede deshacer.',
  // `confirmLabel` es obligatoria y nombra lo que va a pasar: es donde se toma
  // la decisión. «Confirmar» no está en el catálogo a propósito.
  confirmLabel: 'Borrar la organización',
  onConfirm: () => {},
  onCancel: () => {},
};

export const PorDefecto: Story = {
  name: 'Por defecto',
  args: base,
};

/** La acción que no se puede deshacer cambia al lenguaje destructivo. */
export const Destructivo: Story = {
  args: { ...base, destructive: true },
};

/** `children` añade el detalle de lo que se va a perder. */
export const ConDetalle: Story = {
  name: 'Con detalle',
  args: {
    ...base,
    destructive: true,
    confirmLabel: 'Borrar',
    children: (
      <Alert variant="warning">
        <AlertDescription>
          Se borrarán 42 proyectos y 17 miembros perderán el acceso.
        </AlertDescription>
      </Alert>
    ),
  },
};

/**
 * Con una promesa, el diálogo se queda abierto y ocupado hasta que resuelve:
 * no se cierra en falso ni deja pulsar dos veces.
 */
export const ConPromesa: Story = {
  name: 'Con una acción en curso',
  args: base,
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="outline" destructive onClick={() => setOpen(true)}>
          Borrar la organización
        </Button>
        <ConfirmDialog
          {...args}
          open={open}
          destructive
          confirmLabel="Borrar"
          pendingLabel="Borrando…"
          onCancel={() => setOpen(false)}
          onConfirm={async () => {
            await new Promise((resolve) => setTimeout(resolve, 1200));
            setOpen(false);
          }}
        />
      </>
    );
  },
};

/**
 * Test: el diálogo abre con el foco en «Cancelar» —no en el botón que
 * destruye— y expone su título y su descripción.
 */
/**
 * Una **tercera acción** entre la de descartar y la principal: la variante de
 * la respuesta afirmativa que no se ofrece por defecto. El pie queda
 * descartar → intermedia → principal, que es el orden del sistema.
 */
export const AccionIntermedia: Story = {
  name: 'Con una acción intermedia',
  args: {
    ...base,
    title: '¿Permitir que el asistente use esta herramienta?',
    description: 'Va a consultar las calificaciones del curso en Moodle.',
    cancelLabel: 'Denegar',
    confirmLabel: 'Permitir',
    secondaryActionLabel: 'Permitir siempre',
    onSecondaryAction: () => {},
  },
};

export const TestFocoInicial: Story = {
  name: 'Test — foco inicial en cancelar',
  tags: ['!dev'],
  args: { ...base, destructive: true, confirmLabel: 'Borrar' },
  play: async () => {
    const dialog = await screenDialog();
    await expect(dialog).toHaveAccessibleName('¿Borrar la organización?');
    await expect(dialog).toHaveAccessibleDescription(/No se puede deshacer/);
    await waitFor(async () => {
      await expect(within(dialog).getByRole('button', { name: 'Cancelar' })).toHaveFocus();
    });
  },
};

/** Test: confirmar y cancelar avisan a quien corresponde. */
export const TestAcciones: Story = {
  name: 'Test — confirmar y cancelar',
  tags: ['!dev'],
  args: base,
  render: (args) => {
    const [ultimo, setUltimo] = useState('');
    return (
      <>
        <ConfirmDialog
          {...args}
          onConfirm={() => setUltimo('confirmado')}
          onCancel={() => setUltimo('cancelado')}
        />
        <p data-testid="ultimo">{ultimo}</p>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const dialog = await screenDialog();
    await userEvent.click(within(dialog).getByRole('button', { name: 'Borrar la organización' }));
    await expect(within(canvasElement).getByTestId('ultimo')).toHaveTextContent('confirmado');

    await userEvent.click(within(dialog).getByRole('button', { name: 'Cancelar' }));
    await expect(within(canvasElement).getByTestId('ultimo')).toHaveTextContent('cancelado');
  },
};

/** El diálogo se monta en un portal: se busca en el documento, no en el canvas. */
async function screenDialog(): Promise<HTMLElement> {
  return within(document.body).findByRole('dialog');
}

/**
 * Test: la acción intermedia va entre las otras dos en el DOM —de ahí sale su
 * sitio en las dos maquetas del pie— y avisa a quien corresponde. Sin ella, el
 * pie sigue teniendo dos botones.
 */
export const TestAccionIntermedia: Story = {
  name: 'Test — el sitio de la acción intermedia',
  tags: ['!dev'],
  args: base,
  render: (args) => {
    const [ultimo, setUltimo] = useState('');
    return (
      <>
        <ConfirmDialog
          {...args}
          cancelLabel="Denegar"
          confirmLabel="Permitir"
          secondaryActionLabel="Permitir siempre"
          onSecondaryAction={() => setUltimo('siempre')}
        />
        <p data-testid="ultimo">{ultimo}</p>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const dialog = await screenDialog();
    const pie = dialog.querySelector('.confirm-dialog__actions') as HTMLElement;
    const rotulos = Array.from(pie.querySelectorAll('button')).map((b) => b.textContent);
    await expect(rotulos).toEqual(['Denegar', 'Permitir siempre', 'Permitir']);

    await userEvent.click(within(dialog).getByRole('button', { name: 'Permitir siempre' }));
    await expect(within(canvasElement).getByTestId('ultimo')).toHaveTextContent('siempre');
  },
};

/**
 * **La barrera de teclear el identificador.** Con `confirmPhrase`, el diálogo
 * monta un campo bajo la pregunta y el botón de confirmar nace apagado: solo se
 * enciende cuando lo tecleado coincide con la frase exacta. Es el patrón de
 * «escribe el nombre de la organización para borrarla», que tres apps de la
 * suite se estaban maquetando por su cuenta, cada una de una manera.
 *
 * Sus dos textos —el rótulo del campo, que es donde se dice QUÉ hay que
 * teclear, y el mensaje de discrepancia— son obligatorios y sin default: el
 * diálogo no sabe qué se está borrando.
 */
export const FraseDeConfirmacion: Story = {
  name: 'Con frase de confirmación',
  args: {
    ...base,
    destructive: true,
    confirmLabel: 'Borrar la organización',
    confirmPhrase: 'acme',
    confirmPhraseLabel: 'Escribe acme para confirmar',
    confirmPhraseMismatch: 'El nombre no coincide.',
  },
};

/**
 * Test: el botón nace apagado, se enciende al coincidir, y el error del campo
 * aparece solo tras un intento —no mientras se teclea—.
 */
export const TestFraseDeConfirmacion: Story = {
  name: 'Test — la frase apaga el botón hasta que coincide',
  tags: ['!dev'],
  args: {
    ...base,
    destructive: true,
    confirmLabel: 'Borrar',
    confirmPhrase: 'acme',
    confirmPhraseLabel: 'Escribe acme para confirmar',
    confirmPhraseMismatch: 'El nombre no coincide.',
  },
  play: async ({ canvasElement }) => {
    const dialog = await screenDialog();
    const escena = within(dialog);
    const boton = escena.getByRole('button', { name: 'Borrar' });
    const campo = escena.getByLabelText('Escribe acme para confirmar');

    // Nace apagado, y el foco entra en el campo: es lo que hay que hacer, y no
    // es la acción que destruye.
    await expect(boton).toBeDisabled();
    await waitFor(async () => { await expect(campo).toHaveFocus(); });
    await expect(escena.queryByText('El nombre no coincide.')).not.toBeInTheDocument();

    // Mientras se teclea mal, NO se acusa: el error espera a un intento.
    await userEvent.type(campo, 'acm');
    await expect(escena.queryByText('El nombre no coincide.')).not.toBeInTheDocument();
    await expect(boton).toBeDisabled();

    // Intro con el campo a medias es un intento: ahí sí aparece el error.
    await userEvent.keyboard('{Enter}');
    await waitFor(async () => {
      await expect(escena.getByText('El nombre no coincide.')).toBeInTheDocument();
    });
    await expect(boton).toBeDisabled();

    // Seguir tecleando retira el error en vez de insistir.
    await userEvent.type(campo, 'e');
    await expect(escena.queryByText('El nombre no coincide.')).not.toBeInTheDocument();
    await waitFor(async () => { await expect(boton).toBeEnabled(); });

    void canvasElement;
  },
};

/** Test: con la frase coincidente, `Enter` en el campo confirma. */
export const TestFraseIntroConfirma: Story = {
  name: 'Test — con la frase puesta, Intro confirma',
  tags: ['!dev'],
  args: {
    ...base,
    confirmLabel: 'Borrar',
    confirmPhrase: 'acme',
    confirmPhraseLabel: 'Escribe acme para confirmar',
    confirmPhraseMismatch: 'El nombre no coincide.',
  },
  render: (args) => {
    const [ultimo, setUltimo] = useState('');
    return (
      <>
        <ConfirmDialog {...args} onConfirm={() => setUltimo('confirmado')} />
        <p data-testid="ultimo">{ultimo}</p>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const dialog = await screenDialog();
    const campo = within(dialog).getByLabelText('Escribe acme para confirmar');
    await userEvent.type(campo, 'acme');
    await userEvent.keyboard('{Enter}');
    await waitFor(async () => {
      await expect(within(canvasElement).getByTestId('ultimo')).toHaveTextContent('confirmado');
    });
  },
};

/**
 * El cromo del pie —«Cancelar» y el «Confirmando…» de la espera— sale del
 * catálogo; `confirmLabel` no, porque es donde se toma la decisión y tiene que
 * nombrar lo que va a pasar. Con el catálogo en inglés se ve la línea: el
 * botón de descartar cambia de idioma solo, y el principal sigue diciendo lo
 * que le pasa la pantalla.
 */
export const TextosDelProveedor: Story = {
  name: 'Textos desde el proveedor (otro idioma)',
  args: {
    ...base,
    destructive: true,
    title: 'Delete the organisation?',
    description: 'Its projects and members go with it. This cannot be undone.',
    confirmLabel: 'Delete the organisation',
  },
  render: (args) => (
    <BrandMessagesProvider messages={EN}>
      <ConfirmDialog {...args} />
    </BrandMessagesProvider>
  ),
};

/** Test: el cromo del pie sale del catálogo y `confirmLabel` sigue siendo de la pantalla. */
export const TestContratoProveedor: Story = {
  name: 'Test — el cromo del pie lee del proveedor, el confirmar no',
  tags: ['!dev'],
  args: {
    ...base,
    title: 'Delete the organisation?',
    confirmLabel: 'Delete the organisation',
  },
  render: (args) => (
    <BrandMessagesProvider messages={EN}>
      <ConfirmDialog {...args} />
    </BrandMessagesProvider>
  ),
  play: async () => {
    const dialog = await screenDialog();
    const escena = within(dialog);
    // El cromo, del catálogo.
    await expect(escena.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    await expect(escena.queryByRole('button', { name: 'Cancelar' })).toBeNull();
    // El aspa la lee el `Modal`, de `modal.close`.
    await expect(escena.getByRole('button', { name: 'Close' })).toBeInTheDocument();
    // El botón que decide, de la pantalla.
    await expect(escena.getByRole('button', { name: 'Delete the organisation' })).toBeInTheDocument();
  },
};
