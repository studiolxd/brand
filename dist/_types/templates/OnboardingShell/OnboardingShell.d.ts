import type { ReactNode } from 'react';
import './OnboardingShell.css';
export interface OnboardingShellProps {
    /** El cuerpo del paso: el formulario, la explicación, lo que toque. */
    children: ReactNode;
    /**
     * La marca, arriba a la izquierda: un `Logo`, o el `Logo` dentro del enlace
     * al inicio. El **alto lo impone la plantilla** —el mismo de la cabecera
     * pública, y con sus mismos peldaños en móvil—, así que la prop `size` del
     * `Logo` no decide el tamaño final: manda el sitio donde se pinta.
     */
    brand?: ReactNode;
    /**
     * Las preferencias globales de la pantalla: idioma y tema. Se pintan en un
     * **pie de chrome propio**, al final y separadas del pie de acciones del
     * paso — una preferencia global no es una acción del flujo y no puede
     * parecerlo. En el alta no hay cabecera pública —el usuario ya tiene sesión,
     * no hay nada que navegar—, así que estos dos son todo el chrome que queda.
     */
    switchers?: ReactNode;
    /**
     * El progreso: un `Stepper`. La ranura se monta siempre; es el `Stepper`
     * quien decide no pintarse cuando el flujo tiene un solo paso.
     */
    stepper?: ReactNode;
    /** La acción principal del paso, la de la derecha: «Continuar», «Terminar». */
    primaryAction?: ReactNode;
    /** «Atrás», a la izquierda de la principal. En el primer paso no se pasa. */
    backAction?: ReactNode;
    /**
     * La salida del paso: «Omitir por ahora», «Cerrar sesión». Va en `text` — es
     * la acción de menos peso de la pantalla y no debe competir con la
     * principal. Se pinta **después** de la principal: pegada a ella en
     * escritorio, y debajo y centrada en móvil.
     */
    exitAction?: ReactNode;
    /** Nombre accesible del grupo de acciones del pie. Default: «Acciones del paso» (castellano). */
    actionsLabel?: string;
    /** `id` del `main` (`main-content` por defecto, destino del `SkipLink`). */
    id?: string;
    /**
     * Con `false` no monta el marco público ni el `main`: solo la columna del
     * alta, para pintarla dentro de una app que ya tiene su `main`. Por defecto
     * `true`.
     */
    shell?: boolean;
    /** Se añade DESPUÉS de las clases propias del componente. */
    className?: string;
}
/**
 * La plantilla del alta: una columna centrada con la marca arriba, el progreso,
 * el paso y un pie de acciones. Cuelga de `PublicPageShell`, así que lee en la
 * **superficie pública** —cuerpo a 20px, controles `lg`—: el alta no es una
 * pantalla de aplicación, es la puerta.
 *
 * Lo que no lleva, a propósito:
 *
 * - **Cabecera pública.** En el alta el usuario ya tiene sesión; no hay sitio
 *   al que navegar y una barra de marketing solo invitaría a irse. Arriba queda
 *   solo la marca; idioma y tema bajan a la ranura de pie del marco, al borde
 *   inferior de la ventana y separados del pie de acciones del paso.
 * - **Una sola columna a lo ancho de la página.** El chrome ocupa el ancho
 *   normal de una página pública —la marca cae donde el ojo ya la espera de la
 *   pantalla de acceso—, y lo que se acota a la medida de lectura y se centra
 *   es solo la columna del paso: un formulario de cinco campos pegado al borde
 *   izquierdo de una pantalla de 27 pulgadas no se lee.
 *
 * El pie de acciones fija la jerarquía en un solo sitio, para que ninguna
 * pantalla del alta la reinvente: la principal a la derecha, «Atrás» a su
 * izquierda y la salida (`text`) pegada a la principal. En móvil, la misma
 * secuencia en columna: «Atrás», la principal a todo el ancho y la salida
 * centrada debajo. El orden del DOM es el visual en las dos, así que el foco
 * recorre lo mismo que lee el ojo.
 */
export declare function OnboardingShell({ children, brand, switchers, stepper, primaryAction, backAction, exitAction, actionsLabel, id, shell, className, }: OnboardingShellProps): import("react/jsx-runtime").JSX.Element;
