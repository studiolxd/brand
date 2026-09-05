import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { OnboardingPage } from './OnboardingPage';
import { Button } from '../../atoms/Button/Button';
import { AvatarUpload } from '../../molecules/AvatarUpload/AvatarUpload';
import { PageIntro } from '../../molecules/PageIntro/PageIntro';
import { Stack } from '../../atoms/Stack/Stack';

/** Lo que admite un logotipo: sin GIF, porque un logotipo animado no es un logotipo. */
const FORMATOS = 'image/jpeg,image/png,image/webp';
const PESO_MAXIMO = 5 * 1024 * 1024;

interface Args {
  theme: 'light' | 'dark';
}

function Logotipo({ theme }: Args) {
  return (
    <OnboardingPage
      current={2}
      theme={theme}
      primaryAction={<Button variant="primary">Continuar</Button>}
      exitAction={<Button variant="text">Omitir</Button>}
    >
      <Stack align="stretch">
        <PageIntro title="Sube tu logo" />
        {/* Sin `size`: la talla `lg` de la superficie pública la reparte
            `OnboardingShell` a todo el paso. */}
        <AvatarUpload
          name="Ayuntamiento de Sant Cugat"
          // Lo que distingue a una organización de una persona.
          shape="square"
          accept={FORMATOS}
          maxSize={PESO_MAXIMO}
          outputMimeType="image/png"
          buttonLabel="Subir"
          buttonAccessibleLabel="Subir logo"
          formatsLabel="JPEG, PNG o WebP"
          maxSizeHint={(max) => `máx. ${max}`}
          invalidTypeError={(formatos) => `Formato no admitido. Se aceptan ${formatos}.`}
          tooLargeError={(max) => `El archivo pesa demasiado. El máximo es ${max}.`}
          dropActiveMessage="Suelta la imagen sobre el logo para subirla"
          dropHintLabel="…o arrastra la imagen hasta el logo"
          cropTitle="Recorta tu logo"
          cropDescription="Arrastra para reposicionar. La vista previa muestra cómo se verá."
          cropCancelLabel="Cancelar"
          cropConfirmLabel="Guardar"
          cropCloseLabel="Cerrar"
          onChange={() => {}}
        />
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

/**
 * Paso 3 de 4: el logotipo, con la silueta cuadrada de una organización y la
 * talla del alta —`lg`, 192px— heredada de la plantilla, sin pedirla. El botón
 * se alinea al pie del logotipo y bajo él va la pista de que también se puede
 * arrastrar. Es el paso más omitible del alta, y lo dice. Con la organización
 * ya creada, el progreso vuelve a tener destinos.
 */
export const PorDefecto: Story = {};

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: { theme: 'dark' },
};

export const Contrato: Story = {
  name: 'Test — tercer paso, la subida en lg y dos pasos alcanzables',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvasElement).toHaveTextContent('Paso 3 de 4');
    await expect(canvas.getByRole('button', { name: 'Subir logo' })).toHaveClass('button--lg');
    await expect(canvas.getByRole('button', { name: 'Omitir' })).toHaveClass('button--text');
    await expect(canvas.queryByRole('button', { name: 'Atrás' })).toBeNull();
    const progreso = canvas.getByRole('list', { name: 'Progreso' });
    // La organización ya existe: se puede volver a ella y saltar al último paso.
    await expect(within(progreso).getAllByRole('button')).toHaveLength(2);
  },
};
