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
      exitAction={<Button variant="text">Omitir por ahora</Button>}
    >
      <Stack align="stretch">
        <PageIntro title="¿Cómo te llamas?" description="Es el nombre con el que te verán tus compañeros de organización. Puedes cambiarlo más adelante." />
        <Form id="alta-perfil" size="lg" onSubmit={(e) => e.preventDefault()}>
          <InputField id="alta-nombre" label="Nombre" autoComplete="given-name" defaultValue="" />
          <InputField id="alta-apellidos" label="Apellidos" autoComplete="family-name" />
          <InputField id="alta-puesto" label="Puesto" helperText="Opcional. Ayuda a tus compañeros a saber a quién escribir." />
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

/** Paso 1 de 4: el nombre. Sin «Atrás», porque no hay a dónde volver. */
export const PorDefecto: Story = {};

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: { theme: 'dark' },
};

export const Contrato: Story = {
  name: 'Test — un h1, main-content, primer paso sin Atrás',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    await expect(canvasElement.querySelector('main#main-content')).not.toBeNull();
    await expect(canvasElement).toHaveTextContent('Paso 1 de 4');
    await expect(canvas.queryByRole('button', { name: 'Atrás' })).toBeNull();
    await expect(canvas.getByRole('button', { name: 'Continuar' })).toHaveClass('button--primary');
    await expect(canvas.getByRole('button', { name: 'Omitir por ahora' })).toHaveClass('button--ghost');
  },
};
