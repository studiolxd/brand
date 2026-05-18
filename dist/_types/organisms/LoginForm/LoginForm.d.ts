import './LoginForm.css';
export interface LoginFormProps {
    onSubmit?: (data: {
        email: string;
        password: string;
    }) => void;
    errors?: string[];
    loading?: boolean;
    title?: string;
}
export declare function LoginForm({ onSubmit, errors, loading, title, }: LoginFormProps): import("react/jsx-runtime").JSX.Element;
