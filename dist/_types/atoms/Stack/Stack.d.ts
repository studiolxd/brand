import type { ReactNode } from 'react';
import './Stack.css';
export interface StackProps {
    /** Aire entre piezas: base o amplio. */
    gap?: 'md' | 'lg';
    /**
     * Orden en móvil (por debajo de `md`): el del JSX o el inverso. En
     * escritorio manda siempre el JSX. Invierte solo el orden visual —no el del
     * DOM ni el de tabulación—, así que solo para piezas donde eso no importa
     * (un enlace de vuelta sobre la cabecera).
     */
    mobileOrder?: 'normal' | 'reverse';
    children: ReactNode;
    className?: string;
}
/**
 * Apila piezas con aire por token. Es el envoltorio explícito de «estas piezas
 * van juntas» (una cabecera y su enlace de vuelta en una celda de `Columns`),
 * sin fondo ni semántica: `div.stack`.
 */
export declare function Stack({ gap, mobileOrder, children, className }: StackProps): import("react/jsx-runtime").JSX.Element;
