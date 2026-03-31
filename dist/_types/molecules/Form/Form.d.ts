import './Form.css';
interface FormProps {
    errors?: string[];
    onSubmit?: React.FormEventHandler<HTMLFormElement>;
    actions?: React.ReactNode;
    children: React.ReactNode;
}
export declare function Form({ errors, onSubmit, actions, children }: FormProps): import("react/jsx-runtime").JSX.Element;
export {};
