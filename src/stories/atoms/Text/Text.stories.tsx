import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Text } from './Text';
import { Paragraph } from '../Paragraph/Paragraph';
import { Stack } from '../Stack/Stack';

const meta: Meta<typeof Text> = {
  title: 'Atoms/Text',
  component: Text,
  parameters: { layout: 'padded' },
  argTypes: {
    as: { control: { type: 'inline-radio' }, options: ['span', 'em', 'strong'] },
    tone: { control: { type: 'inline-radio' }, options: ['default', 'muted', 'destructive', 'success'] },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

/** Dentro de una frase, sin salirse de ella. */
export const PorDefecto: Story = {
  render: () => (
    <Paragraph>
      El curso se publica con la matriculación abierta y <Text as="strong">no se puede deshacer</Text>.
    </Paragraph>
  ),
};

/** `lang` marca un fragmento en otro idioma: el lector cambia de voz. */
export const OtroIdioma: Story = {
  render: () => (
    <Stack>
      <Paragraph>
        El enfoque del itinerario es el <Text lang="en">learning by doing</Text>: se aprende produciendo.
      </Paragraph>
      <Paragraph>
        El segmento original decía <Text lang="de">Fortbildung</Text> y la traducción propuesta es «formación continua».
      </Paragraph>
      <Paragraph>
        Un idioma de derecha a izquierda dentro de la frase necesita también su dirección:{' '}
        <Text lang="ar" dir="rtl">التعلم عن بعد</Text>.
      </Paragraph>
    </Stack>
  ),
};

/** Énfasis con carga: la palabra que dice que algo se pierde. */
export const IntencionDestructiva: Story = {
  render: () => (
    <Stack>
      <Paragraph>
        Al confirmar se <Text as="strong" tone="destructive">borran</Text> las 42 respuestas ya enviadas.
      </Paragraph>
      <Paragraph>
        La revisión terminó <Text as="strong" tone="success">sin incidencias</Text>.
      </Paragraph>
      <Paragraph>
        Publicado el 12 de agosto <Text tone="muted">(hace tres semanas)</Text>.
      </Paragraph>
    </Stack>
  ),
};

/** Los tres significados: ninguno, énfasis de lectura e importancia. */
export const Significado: Story = {
  render: () => (
    <Stack>
      <Paragraph>Sin marcar: <Text>una palabra</Text>.</Paragraph>
      <Paragraph>Con énfasis de lectura: <Text as="em">esta</Text> y no otra.</Paragraph>
      <Paragraph>Con importancia: <Text as="strong">no se puede deshacer</Text>.</Paragraph>
    </Stack>
  ),
};

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  render: () => (
    <Stack>
      <Paragraph>
        Al confirmar se <Text as="strong" tone="destructive">borran</Text> las respuestas ya enviadas.
      </Paragraph>
      <Paragraph>
        La revisión terminó <Text as="strong" tone="success">sin incidencias</Text>{' '}
        <Text tone="muted">(hace tres semanas)</Text>.
      </Paragraph>
    </Stack>
  ),
};

export const TestIdiomaYTono: Story = {
  name: 'Test — el fragmento lleva su idioma y su intención',
  tags: ['!dev'],
  render: () => (
    <Paragraph>
      El enfoque es el <Text lang="en">learning by doing</Text> y al confirmar se{' '}
      <Text as="strong" tone="destructive">borran</Text> las respuestas.
    </Paragraph>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('learning by doing')).toHaveAttribute('lang', 'en');

    const destructivo = canvas.getByText('borran');
    await expect(destructivo.tagName).toBe('STRONG');
    await expect(destructivo).toHaveClass('text--destructive');
  },
};
