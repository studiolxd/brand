import './MessageComposer.css';
export interface MessageComposerProps {
    /** Callback que recibe el texto cuando el usuario envía el mensaje. */
    onSend: (message: string) => void;
    placeholder?: string;
    disabled?: boolean;
}
export declare function MessageComposer({ onSend, placeholder, disabled }: MessageComposerProps): import("react/jsx-runtime").JSX.Element;
