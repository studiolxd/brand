import { type ComponentProps } from 'react';
import { FormProvider as RhfFormProvider, type ControllerProps, type FieldPath, type FieldValues } from 'react-hook-form';
import { Label } from '../../atoms/Label/Label';
import './FormField.css';
type Translate = (message: string) => string;
/**
 * Proveedor del formulario: el `FormProvider` de react-hook-form, expuesto
 * desde el DS para que los consumidores no tengan que importar dos sitios
 * para montar un campo, más `translate`: si los mensajes de error del
 * esquema son claves de traducción (una política compartida con el
 * servidor, por ejemplo), `FormMessage` y `FormRootMessage` las pasan por
 * aquí antes de pintarlas.
 */
export declare function FormProvider<TFieldValues extends FieldValues = FieldValues, TContext = unknown, TTransformedValues = TFieldValues>({ translate, children, ...form }: ComponentProps<typeof RhfFormProvider<TFieldValues, TContext, TTransformedValues>> & {
    translate?: Translate;
}): import("react/jsx-runtime").JSX.Element;
/**
 * Un campo controlado: envuelve el `Controller` de react-hook-form y publica
 * su `name` para que el resto de piezas del campo (label, control, mensaje)
 * sepan a qué error mirar.
 */
export declare const FormField: <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>, TTransformedValues = TFieldValues>({ ...props }: ControllerProps<TFieldValues, TName, TTransformedValues>) => import("react/jsx-runtime").JSX.Element;
/**
 * Estado e ids del campo en el que se está: quién es, si tiene error y con
 * qué ids se enlazan su control, su ayuda y su mensaje.
 */
export declare function useFormField(): {
    invalid: boolean;
    isDirty: boolean;
    isTouched: boolean;
    isValidating: boolean;
    error?: import("react-hook-form").FieldError | undefined;
    id: string;
    name: string;
    formItemId: string;
    formDescriptionId: string;
    formMessageId: string;
    described: {
        description: boolean;
        message: boolean;
    };
    register: (part: "description" | "message", present: boolean) => void;
};
/** Contenedor de un campo: reserva los ids que enlazan sus partes. */
export declare function FormItem({ className, ...props }: ComponentProps<'div'>): import("react/jsx-runtime").JSX.Element;
/** Etiqueta del campo, ya apuntada a su control y marcada si hay error. */
export declare function FormLabel({ ...props }: ComponentProps<typeof Label>): import("react/jsx-runtime").JSX.Element;
/**
 * Envoltorio del control real (input, select, textarea…). No renderiza nodo
 * propio: fusiona en su hijo el `id`, el `aria-describedby` y el
 * `aria-invalid` que corresponden al campo.
 */
export declare function FormControl({ children, ...props }: {
    children: React.ReactElement<Record<string, unknown>>;
} & Record<string, unknown>): import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<any>>;
/** Texto de ayuda del campo, enlazado al control por `aria-describedby`. */
export declare function FormDescription({ className, ...props }: ComponentProps<'p'>): import("react/jsx-runtime").JSX.Element;
/**
 * Mensaje de error del campo. Renderiza el error de react-hook-form si lo
 * hay, o sus children si no; sin ninguno de los dos no renderiza nada.
 */
export declare function FormMessage({ className, children, ...props }: ComponentProps<'p'>): import("react/jsx-runtime").JSX.Element | null;
/**
 * Error del formulario entero (p. ej. "usuario o contraseña incorrectos"),
 * el que se pone con `form.setError("root", …)` y no cuelga de ningún campo.
 * Se coloca una vez al final del formulario: a diferencia de `FormMessage`
 * no tiene campo del que leer, así que va directo al `formState`.
 */
export declare function FormRootMessage({ className, ...props }: ComponentProps<'p'>): import("react/jsx-runtime").JSX.Element | null;
export {};
