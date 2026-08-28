import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { SiteFooter } from './SiteFooter';
import { LegalFooter } from '../LegalFooter/LegalFooter';
import { Button } from '../../atoms/Button/Button';
import { Heading } from '../../atoms/Heading/Heading';
import { Link } from '../../atoms/Link/Link';
import { List } from '../../atoms/List/List';
import { Stack } from '../../atoms/Stack/Stack';
import { Form } from '../../molecules/Form/Form';
import { InputField } from '../../molecules/InputField/InputField';

const columnas = [
  {
    id: 'servicios',
    title: 'Servicios',
    links: [
      { id: 'contenidos', label: 'Contenidos elearning', href: '#contenidos' },
      { id: 'plataformas', label: 'Plataformas LMS', href: '#plataformas' },
      { id: 'consultoria', label: 'Consultoría', href: '#consultoria' },
    ],
  },
  {
    id: 'estudio',
    title: 'Estudio',
    links: [
      { id: 'proyectos', label: 'Proyectos', href: '#proyectos' },
      { id: 'metodologia', label: 'Metodología', href: '#metodologia' },
      { id: 'contacto', label: 'Contacto', href: '#contacto' },
    ],
  },
  {
    id: 'redes',
    title: 'Redes',
    links: [
      { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com', external: true },
      { id: 'github', label: 'GitHub', href: 'https://github.com', external: true },
    ],
  },
];

const contacto = (
  <Stack gap="lg">
    <div>
      <Heading level={2} size={3}>Hablemos</Heading>
      <List type="plain">
        <li><Link href="mailto:hola@studiolxd.com">hola@studiolxd.com</Link></li>
        <li><Link href="tel:+34623752862">+34 623 752 862</Link></li>
      </List>
    </div>
    <Form actions={<Button type="submit">Suscribirme</Button>}>
      <InputField id="pie-newsletter" label="Correo electrónico" type="email" placeholder="tu@correo.com" />
    </Form>
  </Stack>
);

const legales = [
  { id: 'aviso', label: 'Aviso legal', href: '#aviso' },
  { id: 'privacidad', label: 'Política de privacidad', href: '#privacidad' },
  { id: 'cookies', label: 'Política de cookies', href: '#cookies' },
];

const meta: Meta<typeof SiteFooter> = {
  title: 'Sections/SiteFooter',
  component: SiteFooter,
  parameters: { layout: 'fullscreen' },
  args: {
    tagline: 'Diseñamos formación que se entiende, se usa y se mide.',
    columns: columnas,
    aside: contacto,
  },
  argTypes: { className: { table: { disable: true } }, id: { table: { disable: true } } },
};
export default meta;
type Story = StoryObj<typeof SiteFooter>;

/** El pie completo, sobre superficie oscura: marca, columnas y bloque de contacto. */
export const PorDefecto: Story = {};

/** Con el pie legal debajo, separado por la línea del sistema. */
export const ConPieLegal: Story = {
  name: 'Con pie legal',
  args: {
    legal: <LegalFooter links={legales} width="full" />,
  },
};

/** Sobre superficie clara: el pie no pinta color, así que voltea entero. */
export const SuperficieClara: Story = {
  name: 'Superficie clara',
  args: { surface: 'light', legal: <LegalFooter links={legales} width="full" /> },
};

/** Solo marca y enlaces: sin bloque de contacto. */
export const SoloEnlaces: Story = {
  name: 'Solo enlaces',
  args: { aside: undefined },
};

export const Contrato: Story = {
  name: 'Test — footer con columnas navegables y bloque legal',
  tags: ['!dev'],
  args: ConPieLegal.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const pie = canvasElement.querySelector('footer.site-footer')!;
    await expect(pie).toHaveClass('surface-dark');

    // Cada columna es un `nav` con nombre: se puede saltar a «Servicios».
    const servicios = canvas.getByRole('navigation', { name: 'Servicios' });
    await expect(within(servicios).getAllByRole('link')).toHaveLength(3);

    // Los externos llevan su target y su rel.
    const linkedin = canvas.getByRole('link', { name: 'LinkedIn' });
    await expect(linkedin).toHaveAttribute('target', '_blank');
    await expect(linkedin).toHaveAttribute('rel', 'noopener noreferrer');

    // El bloque legal cuelga del pie, no es un segundo pie de página.
    const legal = canvasElement.querySelector('.site-footer__legal .legal-footer')!;
    await expect(legal).toBeInTheDocument();
    await expect(canvas.getByRole('link', { name: 'Aviso legal' })).toBeInTheDocument();
  },
};
