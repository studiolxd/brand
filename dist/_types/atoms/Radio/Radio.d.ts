import './Radio.css';
interface RadioProps {
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    id?: string;
    name?: string;
    value?: string;
    required?: boolean;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}
export declare function Radio({ checked, defaultChecked, disabled, id, name, value, required, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby, onChange, }: RadioProps): import("react/jsx-runtime").JSX.Element;
export {};
