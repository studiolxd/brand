/**
 * Si los campos de este formulario marcan solos lo opcional (D74). Lo reparte
 * `Form markOptional`: todo `*Field` sin `required` pinta « (opcional)» tras
 * la etiqueta, sin poner `optional` campo a campo. Mismo patrón que
 * `FormSizeContext`: sin `Form` (o sin `markOptional`), `false`.
 */
export declare const FormMarkOptionalContext: import("react").Context<boolean>;
/**
 * Si un campo lleva la marca de opcional: lo que pide el consumidor por
 * `optional` gana siempre —también `optional={false}`, que la apaga en un
 * campo concreto—; si no dice nada, la lleva cuando el formulario la reparte
 * y el campo no es `required`.
 */
export declare function useFieldOptional(optional: boolean | undefined, required: boolean | undefined): boolean;
