export type FormSize = 'sm' | 'md' | 'lg';
/**
 * La talla que un `Form` reparte a sus campos y botones. Los componentes con
 * `size` la toman de aquí cuando el consumidor no se la pasa; sin `Form` (o
 * sin `size` en él) vale `md`.
 */
export declare const FormSizeContext: import("react").Context<FormSize | undefined>;
export declare function useFormSize(size?: FormSize): FormSize;
