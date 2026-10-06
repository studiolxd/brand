/**
 * Convierte una longitud CSS (`4px`, `0.25rem`, `0.5em`) a píxeles. `rem` se
 * mide contra `<html>` y `em` contra `el` (por defecto, también `<html>`). Con
 * cualquier otra unidad (o ninguna) devuelve el número tal cual, y sin número,
 * 0: el token viaja siempre con el CSS del componente.
 */
export declare function cssLengthToPx(raw: string, el?: Element): number;
/**
 * `sideOffset` por defecto de un flotante a partir de su token. El Positioner
 * de Base UI necesita un número (su función de offset solo recibe medidas, no
 * el elemento), así que la función que devuelve lee la custom property sobre
 * `<html>` **en cada cálculo de posición**: un consumidor lo cambia
 * sobrescribiendo el token en la raíz, sin tocar el componente.
 *
 * Se crea a nivel de módulo (`const tokenSideOffset = sideOffsetFromToken('--tooltip-offset')`):
 * no toca el DOM hasta que Base UI la llama, ya en cliente.
 */
export declare function sideOffsetFromToken(property: `--${string}`): () => number;
