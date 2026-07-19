import type { ComponentProps, ReactNode } from 'react';
import './MessageComposer.css';
export interface MessageComposerProps extends Omit<ComponentProps<'div'>, 'onChange'> {
    value: string;
    onChange: (value: string) => void;
    onSend: () => void;
    placeholder?: string;
    disabled?: boolean;
    sendLabel?: string;
    sendAriaLabel?: string;
    /** Contenido extra a la derecha del botón de enviar (p. ej. un botón de detener envío, o un selector de modelo). */
    actions?: ReactNode;
}
export declare function MessageComposer({ value, onChange, onSend, placeholder, disabled, sendLabel, sendAriaLabel, actions, className, ...rest }: MessageComposerProps): import("react/jsx-runtime").JSX.Element;
