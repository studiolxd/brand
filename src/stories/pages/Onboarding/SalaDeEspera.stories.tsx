import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { OnboardingPage } from './OnboardingPage';
import { Button } from '../../atoms/Button/Button';
import { PageIntro } from '../../molecules/PageIntro/PageIntro';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import { Columns } from '../../atoms/Columns/Columns';

const CORREO = 'nuria.serra@santcugat.cat';

interface Args {
  theme: 'light' | 'dark';
}

function SalaDeEspera({ theme }: Args) {
  return (
    <OnboardingPage steps={null} theme={theme} width="wide">
      <Columns columns={2} ratio="1:1" align="start">
        <PageIntro
          title="El acceso está restringido a invitaciones"
          description="Tu cuenta está lista, pero para entrar en una organización necesitas que alguien de su equipo te invite."
        >
          <Paragraph>Recibirás un correo en {CORREO} desde el que podrás aceptar la invitación.</Paragraph>
        </PageIntro>
        <Button block>Cerrar sesión</Button>
      </Columns>
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
 * flujo sin pasos, así que el `Stepper` no se monta — la misma plantilla que
 * las cuatro pantallas anteriores, sin condicionales. La única acción,
 * «Cerrar sesión», vive en su propia columna y no en el pie del marco: no hay
 * nada que confirmar ni cancelar, así que el pie de acciones del `Onboarding-
 * Shell` no se monta tampoco.
 */
export const PorDefecto: Story = {};

export const Contrato: Story = {
  name: 'Test — dos columnas, sin pie de acciones, con salida',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const titulo = await canvas.findByRole('heading', { level: 1, name: 'El acceso está restringido a invitaciones' });
    await expect(titulo).toBeInTheDocument();
    await expect(canvas.getByText('Tu cuenta está lista, pero para entrar en una organización necesitas que alguien de su equipo te invite.')).toBeInTheDocument();
    await expect(canvas.getByText(`Recibirás un correo en ${CORREO} desde el que podrás aceptar la invitación.`)).toBeInTheDocument();
    await expect(canvasElement.querySelector('.stepper')).not.toBeInTheDocument();
    await expect(canvasElement.querySelector('.onboarding-shell__actions')).not.toBeInTheDocument();
    const main = canvasElement.querySelector('#main-content') as HTMLElement;
    const botones = within(main).getAllByRole('button');
    await expect(botones).toHaveLength(1);
    await expect(botones[0]).toHaveAccessibleName('Cerrar sesión');
    await expect(botones[0]).toHaveClass('button--primary');
  },
};
