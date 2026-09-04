import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { OnboardingShell } from './OnboardingShell';
import { Stepper } from '../../molecules/Stepper/Stepper';
import { Logo } from '../../atoms/Logo/Logo';
import { LanguageSwitcher } from '../../molecules/LanguageSwitcher/LanguageSwitcher';
import { ThemeSwitcher } from '../../molecules/ThemeSwitcher/ThemeSwitcher';
import { Button } from '../../atoms/Button/Button';
import { Form } from '../../molecules/Form/Form';
import { InputField } from '../../molecules/InputField/InputField';
import { PageIntro } from '../../molecules/PageIntro/PageIntro';
import { Stack } from '../../atoms/Stack/Stack';

const PASOS = [
  { id: 'perfil', label: 'Perfil' },
  { id: 'organizacion', label: 'Organización' },
  { id: 'logotipo', label: 'Logotipo' },
  { id: 'invitaciones', label: 'Invitaciones' },
];

const conmutadores = (
  <>
    <LanguageSwitcher size="lg" value="es" languages={[{ code: 'es', label: 'Español' }, { code: 'en', label: 'English' }]} />
    <ThemeSwitcher size="lg" value="light" />
  </>
);

const cuerpo = (
  <Stack align="stretch">
    <PageIntro title="¿Cómo te llamas?" description="Así te verán tus compañeros de organización." />
    <Form size="lg" onSubmit={(e) => e.preventDefault()}>
      <InputField id="alta-nombre" label="Nombre y apellidos" autoComplete="name" />
    </Form>
  </Stack>
);

const meta: Meta<typeof OnboardingShell> = {
  title: 'Templates/OnboardingShell',
  component: OnboardingShell,
  parameters: { layout: 'fullscreen' },
  args: {
    brand: <Logo size="md" />,
    switchers: conmutadores,
    stepper: <Stepper steps={PASOS} current={1} />,
    children: cuerpo,
    backAction: <Button variant="outline" size="lg">Atrás</Button>,
    primaryAction: <Button variant="primary" size="lg">Continuar</Button>,
    exitAction: <Button variant="ghost" size="lg">Omitir por ahora</Button>,
  },
  argTypes: {
    brand: { table: { disable: true } },
    switchers: { table: { disable: true } },
    stepper: { table: { disable: true } },
    children: { table: { disable: true } },
    backAction: { table: { disable: true } },
    primaryAction: { table: { disable: true } },
    exitAction: { table: { disable: true } },
    id: { table: { disable: true } },
  },
};
export default meta;
type Story = StoryObj<typeof OnboardingShell>;

/** Un paso intermedio del alta: progreso, cuerpo y las tres acciones. */
export const PorDefecto: Story = {};

/** El primer paso: sin «Atrás», porque no hay a dónde volver. */
export const PrimerPaso: Story = {
  name: 'Primer paso',
  args: { stepper: <Stepper steps={PASOS} current={0} />, backAction: undefined },
};

/** El último paso: la principal cierra el alta y la salida deja de ser «omitir». */
export const UltimoPaso: Story = {
  name: 'Último paso',
  args: {
    stepper: <Stepper steps={PASOS} current={3} />,
    primaryAction: <Button variant="primary" size="lg">Terminar</Button>,
    exitAction: undefined,
  },
};

/**
 * Un flujo de un solo paso: el `Stepper` no se pinta y la plantilla se cierra
 * sola sobre el hueco. La ranura se pasa igual — no hay condicional en el
 * producto.
 */
export const FlujoDeUnPaso: Story = {
  name: 'Flujo de un solo paso',
  args: {
    stepper: <Stepper steps={[{ id: 'espera', label: 'Sala de espera' }]} current={0} />,
    backAction: undefined,
    primaryAction: undefined,
    exitAction: <Button variant="ghost" size="lg">Cerrar sesión</Button>,
  },
};

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
};

export const Contrato: Story = {
  name: 'Test — main acotado, progreso y jerarquía de acciones',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const main = canvas.getByRole('main');
    await expect(main).toHaveAttribute('id', 'main-content');
    await expect(canvasElement.querySelector('.site-shell')).toBeInTheDocument();
    await expect(canvasElement.querySelector('.site-header')).not.toBeInTheDocument();
    await expect(canvas.getByRole('list', { name: 'Progreso' })).toBeInTheDocument();
    const acciones = canvas.getByRole('group', { name: 'Acciones del paso' });
    await expect(within(acciones).getByRole('button', { name: 'Continuar' })).toHaveClass('button--primary');
    await expect(within(acciones).getByRole('button', { name: 'Omitir por ahora' })).toHaveClass('button--ghost');
    // La salida vive fuera del par «Atrás»/principal: es la señal de que no compite con la decisión.
    await expect(acciones.querySelector('.onboarding-shell__exit')).not.toBeNull();
    const decisiones = acciones.querySelector('.onboarding-shell__decisions')!;
    await expect(within(decisiones as HTMLElement).getAllByRole('button').map((b) => b.textContent)).toEqual(['Atrás', 'Continuar']);
  },
};

export const ContratoUnPaso: Story = {
  name: 'Test — con un solo paso no hay progreso',
  tags: ['!dev'],
  args: FlujoDeUnPaso.args,
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('.stepper')).not.toBeInTheDocument();
    // La ranura se monta igual, pero queda vacía: el CSS la saca de la rejilla.
    await expect(canvasElement.querySelector('.onboarding-shell__progress')).toBeEmptyDOMElement();
    await expect(canvasElement.querySelector('.onboarding-shell__decisions')?.textContent).toBe('');
  },
};
