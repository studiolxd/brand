import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { OnboardingPage } from './OnboardingPage';
import { Button } from '../../atoms/Button/Button';
import { Steps } from '../../organisms/Steps/Steps';
import { Heading } from '../../atoms/Heading/Heading';
import { PageIntro } from '../../molecules/PageIntro/PageIntro';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import { Stack } from '../../atoms/Stack/Stack';

const CORREO = 'nuria.serra@santcugat.cat';

const QUE_PASARA = [
  {
    id: 'invitacion',
    title: 'Alguien te invita a su organización',
    description: 'La invitación la envía quien administre el espacio: normalmente, quien te pidió que te dieras de alta.',
    icon: 'send' as const,
  },
  {
    id: 'correo',
    title: `Te llega un correo a ${CORREO}`,
    description: 'Llega en cuanto te invitan. Si no lo ves, comprueba la carpeta de no deseado.',
    icon: 'inbox' as const,
  },
  {
    id: 'entrada',
    title: 'Aceptas y entras',
    description: 'Al abrir el enlace del correo entras directamente en el espacio de tu organización. Esta pantalla no vuelve a aparecer.',
    icon: 'check' as const,
  },
];

interface Args {
  theme: 'light' | 'dark';
}

function SalaDeEspera({ theme }: Args) {
  return (
    <OnboardingPage
      steps={[{ id: 'espera', label: 'Sala de espera' }]}
      current={0}
      theme={theme}
      exitAction={<Button variant="ghost">Cerrar sesión</Button>}
    >
      <Stack align="stretch" gap="lg">
        <PageIntro
          title="Tu perfil está listo"
          description={`Ahora toca esperar. Aquí solo se entra en una organización por invitación, así que no hay nada más que puedas hacer desde esta pantalla — y preferimos decírtelo a que lo descubras probando.`}
        />
        <section>
          <Heading level={2} size={5}>Qué pasará</Heading>
          <Steps items={QUE_PASARA} />
        </section>
        <Paragraph>
          Puedes cerrar sesión sin perder nada: tu perfil queda guardado y te espera aquí cuando abras el enlace del correo.
        </Paragraph>
      </Stack>
    </OnboardingPage>
  );
}

const meta: Meta<typeof SalaDeEspera> = {
  title: 'Pages/Onboarding · Sala de espera',
  component: SalaDeEspera,
  parameters: { layout: 'fullscreen' },
  args: { theme: 'light' },
  argTypes: { theme: { control: { type: 'radio' }, options: ['light', 'dark'], description: 'Tema que enseña el conmutador.' } },
};
export default meta;
type Story = StoryObj<typeof SalaDeEspera>;

/**
 * El usuario completó su perfil, no pertenece a ninguna organización y la
 * creación es solo por invitación: no puede hacer nada salvo esperar. Es un
 * flujo de un solo paso, así que el `Stepper` no se pinta — la misma plantilla
 * que las cuatro pantallas anteriores, sin condicionales.
 */
export const PorDefecto: Story = {};

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: { theme: 'dark' },
};

export const Contrato: Story = {
  name: 'Test — sin progreso, sin acción principal, con salida',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    await expect(canvasElement.querySelector('.stepper')).not.toBeInTheDocument();
    await expect(canvasElement).not.toHaveTextContent('Paso 1 de 1');
    const acciones = canvas.getByRole('group', { name: 'Acciones del paso' });
    const botones = within(acciones).getAllByRole('button');
    await expect(botones).toHaveLength(1);
    await expect(botones[0]).toHaveAccessibleName('Cerrar sesión');
    await expect(botones[0]).toHaveClass('button--ghost');
  },
};
