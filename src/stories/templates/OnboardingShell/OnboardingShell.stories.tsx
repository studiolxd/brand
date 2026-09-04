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
import { Columns } from '../../atoms/Columns/Columns';

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
    <PageIntro title="¿Cómo te llamas?" />
    <Form size="lg" onSubmit={(e) => e.preventDefault()}>
      <InputField id="alta-nombre" label="Nombre y apellidos" autoComplete="name" />
    </Form>
  </Stack>
);

/** El otro extremo: un paso que crece y empuja el pie fuera de la ventana. */
const cuerpoLargo = (
  <Stack align="stretch">
    <PageIntro title="Invita a tu equipo" />
    <Form size="lg" onSubmit={(e) => e.preventDefault()} actions={<Button variant="outline" size="lg">Añadir otra persona</Button>}>
      {['1', '2', '3', '4', '5'].map((fila, indice) => (
        <Columns key={fila} ratio="2:1" align="start">
          <InputField id={`alta-invitacion-${fila}`} label="Correo electrónico" labelHidden={indice > 0} type="email" placeholder="nombre@organizacion.cat" />
          <InputField id={`alta-papel-${fila}`} label="Papel" labelHidden={indice > 0} defaultValue="Edición" />
        </Columns>
      ))}
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
    exitAction: <Button variant="text" size="lg">Omitir por ahora</Button>,
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
 * El paso corto —un campo y los botones— con la ventana entera por delante: el
 * pie de preferencias cae al borde inferior en vez de quedarse pegado al
 * contenido. Se ve abriendo la story a pantalla completa; en el marco de la
 * documentación el lienzo mide lo que mide.
 */
export const PasoCorto: Story = {
  name: 'Paso corto',
  args: {
    stepper: <Stepper steps={PASOS} current={0} />,
    backAction: undefined,
    exitAction: undefined,
  },
};

/** El paso largo: la lista de invitaciones crece y es el contenido el que empuja el pie hacia abajo. */
export const PasoLargo: Story = {
  name: 'Paso largo',
  args: { stepper: <Stepper steps={PASOS} current={3} />, children: cuerpoLargo },
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
    exitAction: <Button variant="text" size="lg">Cerrar sesión</Button>,
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
    // El chrome va al ancho de la página; solo la columna del paso se acota.
    const paso = canvasElement.querySelector('.onboarding-shell__step')!;
    await expect(paso).toContainElement(canvas.getByRole('list', { name: 'Progreso' }));
    const barra = canvasElement.querySelector('.onboarding-shell__top')!;
    await expect(barra).not.toContainElement(canvasElement.querySelector('.onboarding-shell__switchers'));
    // La marca es chrome: va en la ranura de cabecera del marco, no dentro del
    // `main`. Es lo que la separa del aire del contenido (`space="xl"`) y le
    // deja el del chrome público.
    await expect(main).not.toContainElement(barra as HTMLElement);
    await expect(barra.parentElement).toBe(canvasElement.querySelector('.site-shell'));
    await expect(canvasElement.querySelector('.site-shell')!.firstElementChild).toBe(barra);
    // Las preferencias, en su propio pie y las últimas del documento: ni se
    // mezclan con las acciones del paso ni se tabulan antes que ellas.
    const ajustes = canvasElement.querySelector('.onboarding-shell__settings')!;
    await expect(ajustes.querySelector('.onboarding-shell__switchers')).not.toBeNull();
    await expect(paso.compareDocumentPosition(ajustes) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    // …y en la ranura de pie del marco, no dentro del `main`: es esa ranura la
    // que ya sujeta el pie al borde inferior cuando el paso es corto.
    await expect(main).not.toContainElement(ajustes as HTMLElement);
    const shell = canvasElement.querySelector('.site-shell')!;
    await expect(ajustes.parentElement).toBe(shell);
    await expect(shell.lastElementChild).toBe(ajustes);
    const acciones = canvas.getByRole('group', { name: 'Acciones del paso' });
    await expect(within(acciones).getByRole('button', { name: 'Continuar' })).toHaveClass('button--primary');
    await expect(within(acciones).getByRole('button', { name: 'Omitir por ahora' })).toHaveClass('button--text');
    // El marcado va en el orden del renglón de escritorio —«Atrás», la salida
    // y, cerrándolo, la principal—, que es también el del foco en las dos
    // disposiciones (WCAG 2.4.3): la columna de móvil se invierte sobre el par
    // de decisiones, sin `order` ni `row-reverse` sobre la fila.
    await expect(within(acciones).getAllByRole('button').map((b) => b.textContent)).toEqual(['Atrás', 'Omitir por ahora', 'Continuar']);
    const decisiones = acciones.querySelector('.onboarding-shell__decisions')!;
    await expect(within(decisiones as HTMLElement).getAllByRole('button').map((b) => b.textContent)).toEqual(['Omitir por ahora', 'Continuar']);
    await expect(decisiones).toContainElement(acciones.querySelector('.onboarding-shell__exit'));
  },
};

/**
 * El aire del chrome tiene que salir del chrome público, no de un número que
 * hoy coincida: se comprueba contra el valor resuelto de los propios tokens
 * públicos, así que cambiar `app-header.padding-block` o
 * `legal-footer.padding-block` mueve el alta con ellos y este test lo sigue.
 */
export const ContratoAireDelChrome: Story = {
  name: 'Test — el aire del chrome sale del chrome público',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const raiz = getComputedStyle(document.documentElement);
    const resuelto = (nombre: string) => {
      const sonda = document.createElement('div');
      sonda.style.paddingBlock = raiz.getPropertyValue(nombre);
      document.body.appendChild(sonda);
      const valor = getComputedStyle(sonda).paddingTop;
      sonda.remove();
      return valor;
    };

    // Arriba: el aire de la barra pública, el que le da alto a `SiteHeader`.
    const barra = getComputedStyle(canvasElement.querySelector('.onboarding-shell__top')!);
    await expect(barra.paddingTop).toBe(resuelto('--app-header-padding-block'));
    await expect(barra.paddingBottom).toBe(barra.paddingTop);

    // Abajo: el aire del pie público, arriba y abajo, como el `LegalFooter`.
    const ajustes = getComputedStyle(canvasElement.querySelector('.onboarding-shell__settings')!);
    await expect(ajustes.paddingTop).toBe(resuelto('--legal-footer-padding-block'));
    await expect(ajustes.paddingBottom).toBe(ajustes.paddingTop);

    // Y el aire del contenido sigue siendo el del `Container` con `space="xl"`:
    // gobierna el paso, que es para lo que está.
    const main = getComputedStyle(canvasElement.querySelector('main#main-content')!);
    await expect(main.paddingTop).toBe(resuelto('--container-padding-block-xl'));
    await expect(main.paddingBottom).toBe(main.paddingTop);
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
    // Sin principal, el par de decisiones queda con la salida sola.
    await expect(canvasElement.querySelector('.onboarding-shell__decisions')?.textContent).toBe('Cerrar sesión');
  },
};
