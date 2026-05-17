import './Modal.css';
export interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    dark?: boolean;
}
export declare function Modal({ open, onClose, title, children, dark }: ModalProps): import("react/jsx-runtime").JSX.Element;
