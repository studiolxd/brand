import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { OnboardingPage } from './OnboardingPage';
import { Button } from '../../atoms/Button/Button';
import { Form } from '../../molecules/Form/Form';
import { InputField } from '../../molecules/InputField/InputField';
import { PageIntro } from '../../molecules/PageIntro/PageIntro';
import { Stack } from '../../atoms/Stack/Stack';

interface Args {
  theme: 'light' | 'dark';
}

function Perfil({ theme }: Args) {
  return (
    <OnboardingPage
      current={0}
      theme={theme}
      primaryAction={<Button variant="primary" type="submit" form="alta-perfil">Continuar</Button>}
    >
      <Stack align="stretch">
        <PageIntro title="¿Cómo te llamas?" />
        <Form id="alta-perfil" size="lg" onSubmit={(e) => e.preventDefault()}>
          <InputField id="onboarding-name" label="Nombre completo" autoComplete="name" />
        </Form>
      </Stack>
    </OnboardingPage>
  );
}

const meta: Meta<typeof Perfil> = {
  title: 'Pages/Onboarding · Perfil',
  component: Perfil,
  parameters: { layout: 'fullscreen' },
  args: { theme: 'light' },
  argTypes: { theme: { control: { type: 'radio' }, options: ['light', 'dark'], description: 'Tema que enseña el conmutador.' } },
};
export default meta;
type Story = StoryObj<typeof Perfil>;

/**
 * Paso 1 de 4: el nombre con el que le verán sus compañeros. Es el único paso
 * obligatorio de todos, así que no tiene salida — y tampoco «Atrás», porque no
 * hay a dónde volver.
 */
export const PorDefecto: Story = {};

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: { theme: 'dark' },
};

export const Contrato: Story = {
  name: 'Test — un h1, main-content, un solo campo y sin salida',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    await expect(canvasElement.querySelector('main#main-content')).not.toBeNull();
    await expect(canvasElement).toHaveTextContent('Paso 1 de 4');
    await expect(canvas.queryByRole('button', { name: 'Atrás' })).toBeNull();
    await expect(canvas.getByLabelText('Nombre completo')).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Continuar' })).toHaveClass('button--primary');
    const acciones = canvas.getByRole('group', { name: 'Acciones del paso' });
    await expect(within(acciones).getAllByRole('button')).toHaveLength(1);
  },
};
