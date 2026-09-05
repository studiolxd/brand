/**
 * Si los campos de este trozo de árbol tienen que esconder su etiqueta a la
 * vista (conservándola para el lector de pantalla). Lo reparte `FieldRow`
 * cuando la fila no es la primera de la lista: las etiquetas se ven una vez,
 * arriba, pero cada campo sigue teniendo su nombre accesible en todas.
 *
 * `undefined` es «nadie ha dicho nada»: manda el default del campo.
 */
export declare const LabelHiddenContext: import("react").Context<boolean | undefined>;
/**
 * La talla de etiqueta que le toca a un campo: lo que pide el consumidor por
 * `labelHidden`, y si no lo dice, lo que reparta el contexto. Mismo patrón que
 * `useFormSize`: la prop del campo gana siempre al contexto.
 */
export declare function useLabelHidden(labelHidden?: boolean, fallback?: boolean): boolean;
