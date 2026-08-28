'use client';

import { createContext, useContext, useId, type ComponentProps } from 'react';
import { useRender } from '@base-ui/react/use-render';
import {
  Controller,
  FormProvider as RhfFormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import { Label } from '../../atoms/Label/Label';
import './FormField.css';

type Translate = (message: string) => string;

const FormTranslateContext = createContext<Translate | undefined>(undefined);

/**
 * Proveedor del formulario: el `FormProvider` de react-hook-form, expuesto
 * desde el DS para que los consumidores no tengan que importar dos sitios
 * para montar un campo, más `translate`: si los mensajes de error del
 * esquema son claves de traducción (una política compartida con el
 * servidor, por ejemplo), `FormMessage` y `FormRootMessage` las pasan por
 * aquí antes de pintarlas.
 */
export function FormProvider<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
  TTransformedValues = TFieldValues,
>({
  translate,
  children,
  ...form
}: ComponentProps<typeof RhfFormProvider<TFieldValues, TContext, TTransformedValues>> & { translate?: Translate }) {
  return (
    <FormTranslateContext.Provider value={translate}>
      <RhfFormProvider {...form}>{children}</RhfFormProvider>
    </FormTranslateContext.Provider>
  );
}

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = { name: TName };

const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

/**
 * Un campo controlado: envuelve el `Controller` de react-hook-form y publica
 * su `name` para que el resto de piezas del campo (label, control, mensaje)
 * sepan a qué error mirar.
 */
export const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  ...props
}: ControllerProps<TFieldValues, TName, TTransformedValues>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

type FormItemContextValue = { id: string };

const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

/**
 * Estado e ids del campo en el que se está: quién es, si tiene error y con
 * qué ids se enlazan su control, su ayuda y su mensaje.
 */
// eslint-disable-next-line react-refresh/only-export-components -- el hook viaja con su familia de componentes
export function useFormField() {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);
  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
}

/** Contenedor de un campo: reserva los ids que enlazan sus partes. */
export function FormItem({ className, ...props }: ComponentProps<'div'>) {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div className={['form-field', className].filter(Boolean).join(' ')} {...props} />
    </FormItemContext.Provider>
  );
}

/** Etiqueta del campo, ya apuntada a su control y marcada si hay error. */
export function FormLabel({ ...props }: ComponentProps<typeof Label>) {
  const { error, formItemId } = useFormField();

  return <Label data-error={Boolean(error)} htmlFor={formItemId} {...props} />;
}

/**
 * Envoltorio del control real (input, select, textarea…). No renderiza nodo
 * propio: fusiona en su hijo el `id`, el `aria-describedby` y el
 * `aria-invalid` que corresponden al campo.
 */
export function FormControl({ children, ...props }: { children: React.ReactElement<Record<string, unknown>> } & Record<string, unknown>) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return useRender({
    render: children,
    props: {
      id: formItemId,
      'aria-describedby': error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId,
      'aria-invalid': !!error,
      ...props,
    },
  });
}

/** Texto de ayuda del campo, enlazado al control por `aria-describedby`. */
export function FormDescription({ className, ...props }: ComponentProps<'p'>) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      id={formDescriptionId}
      className={['form-field__description', className].filter(Boolean).join(' ')}
      {...props}
    />
  );
}

/**
 * Mensaje de error del campo. Renderiza el error de react-hook-form si lo
 * hay, o sus children si no; sin ninguno de los dos no renderiza nada.
 */
export function FormMessage({ className, children, ...props }: ComponentProps<'p'>) {
  const { error, formMessageId } = useFormField();
  const translate = useContext(FormTranslateContext);
  const message = error ? String(error?.message ?? '') : '';
  const body = error ? (translate && message ? translate(message) : message) : children;

  if (!body) return null;

  return (
    <p
      id={formMessageId}
      role="alert"
      className={['form-field__message', className].filter(Boolean).join(' ')}
      {...props}
    >
      {body}
    </p>
  );
}

/**
 * Error del formulario entero (p. ej. "usuario o contraseña incorrectos"),
 * el que se pone con `form.setError("root", …)` y no cuelga de ningún campo.
 * Se coloca una vez al final del formulario: a diferencia de `FormMessage`
 * no tiene campo del que leer, así que va directo al `formState`.
 */
export function FormRootMessage({ className, ...props }: ComponentProps<'p'>) {
  const { formState } = useFormContext();
  const translate = useContext(FormTranslateContext);
  const raw = formState.errors.root?.message;
  const body = raw && translate ? translate(String(raw)) : raw;

  if (!body) return null;

  return (
    <p
      role="alert"
      className={['form-error', className].filter(Boolean).join(' ')}
      {...props}
    >
      {body}
    </p>
  );
}
