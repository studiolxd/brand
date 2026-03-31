import './Form.css';
interface FormProps {
    errors?: string[];
    onSubmit?: React.FormEventHandler<HTMLFormElement>;
    actions?: React.ReactNode;
    children: React.ReactNode;
}
export declare const Form: import("react").ForwardRefExoticComponent<FormProps & import("react").RefAttributes<HTMLFormElement>>;
export {};
