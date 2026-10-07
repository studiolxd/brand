export interface RequiredInputProps {
    name?: string;
    value: string;
    required?: boolean;
    /** El control al que se devuelve el foco cuando el navegador lo pide para avisar. */
    focusTarget?: () => HTMLElement | null | undefined;
}
export declare function RequiredInput({ name, value, required, focusTarget }: RequiredInputProps): import("react/jsx-runtime").JSX.Element | null;
