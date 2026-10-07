import { VisuallyHidden } from '../../atoms/VisuallyHidden/VisuallyHidden';

/* ─────────────────────────────────────────────────────────────────────────────
 * El campo que sincroniza con el `<form>` el valor de un control que no es un
 * `<input>` (un botón que abre un panel: `ColorPicker`, `DropdownField`) y que,
 * cuando es obligatorio, lo valida. Interno.
 *
 * Sin `required` es el `<input type="hidden">` de siempre. Con `required` no
 * puede serlo: un campo oculto, igual que uno de solo lectura, no entra en la
 * validación del formulario. Pasa entonces a un campo de texto fuera de la
 * vista y del árbol de accesibilidad —el que se anuncia es el control, por su
 * grupo—, fuera del orden de tabulación, que devuelve el foco al disparador
 * cuando el navegador lo enfoca al no dejar enviar. Es la misma receta que
 * usa Base UI para sus selectores.
 * ───────────────────────────────────────────────────────────────────────────── */

export interface RequiredInputProps {
  name?: string;
  value: string;
  required?: boolean;
  /** El control al que se devuelve el foco cuando el navegador lo pide para avisar. */
  focusTarget?: () => HTMLElement | null | undefined;
}

const noop = () => {};

export function RequiredInput({ name, value, required = false, focusTarget }: RequiredInputProps) {
  if (!required) {
    return name ? <input type="hidden" name={name} value={value} /> : null;
  }
  return (
    <VisuallyHidden>
      <input
        type="text"
        name={name}
        value={value}
        required
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
        onChange={noop}
        onFocus={() => focusTarget?.()?.focus()}
      />
    </VisuallyHidden>
  );
}
