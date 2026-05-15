import './DotsButton.css';
export interface DotsButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: 'sm' | 'md' | 'lg';
    orientation?: 'horizontal' | 'vertical';
}
export declare const DotsButton: import("react").ForwardRefExoticComponent<DotsButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
