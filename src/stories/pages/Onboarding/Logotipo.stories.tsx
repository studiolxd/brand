import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { OnboardingPage } from './OnboardingPage';
import { Button } from '../../atoms/Button/Button';
import { Form } from '../../molecules/Form/Form';
import { FileUploadField } from '../../molecules/FileUploadField/FileUploadField';
import { PageIntro } from '../../molecules/PageIntro/PageIntro';
import { Stack } from '../../atoms/Stack/Stack';

interface Args {
  theme: 'light' | 'dark';
}

function Logotipo({ theme }: Args) {
  return (
    <OnboardingPage
      current={2}
      theme={theme}
      backAction={<Button variant="outline">Atrás</Button>}
      primaryAction={<Button variant="primary" type="submit" form="alta-logotipo">Continuar</Button>}
      exitAction={<Button variant="ghost">Omitir por ahora</Button>}
    >
      <Stack align="stretch">
        <PageIntro title="Sube el logotipo" description="Aparecerá en la cabecera de tu espacio y en los documentos que generéis. Si aún no lo tienes a mano, puedes omitirlo y subirlo después." />
        <Form id="alta-logotipo" size="lg" onSubmit={(e) => e.preventDefault()}>
          <FileUploadField
            label="Logotipo de la organización"
            accept="image/png,image/jpeg,image/svg+xml"
            maxSize={2 * 1024 * 1024}
            maxFiles={1}
            helperText="PNG, JPG o SVG. Se ve mejor con fondo transparente."
          />
        </Form>
      </Stack>
    </OnboardingPage>
  );
}

const meta: Meta<typeof Logotipo> = {
  title: 'Pages/Onboarding · Logotipo',
  component: Logotipo,
  parameters: { layout: 'fullscreen' },
  args: { theme: 'light' },
  argTypes: { theme: { control: { type: 'radio' }, options: ['light', 'dark'], description: 'Tema que enseña el conmutador.' } },
};
export default meta;
type Story = StoryObj<typeof Logotipo>;

/** Paso 3 de 4: el logotipo. Es el paso más omitible del alta, y lo dice. */
export const PorDefecto: Story = {};

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: { theme: 'dark' },
};

export const Contrato: Story = {
  name: 'Test — tercer paso con la zona de subida',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvasElement).toHaveTextContent('Paso 3 de 4');
    await expect(canvas.getByLabelText('Logotipo de la organización')).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Omitir por ahora' })).toHaveClass('button--ghost');
  },
};
