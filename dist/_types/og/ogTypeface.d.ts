/**
 * El nombre de la familia de marca, tal y como lo registran `ogFonts()` y lo
 * pide `ogCard()`.
 *
 * Sale del primer nombre de `--font-family-sans` en vez de escribirse a mano
 * para que no puedan separarse: satori empareja el `fontFamily` de un nodo con
 * el `name` de una fuente cargada por cadena exacta, y si los dos lados se
 * escriben aparte, el día que la sans cambie la tarjeta sale con la fuente de
 * respaldo sin avisar de nada. El resto del stack (`system-ui`, `sans-serif`)
 * no viaja: fuera del navegador no existe, y satori no tiene a qué recurrir.
 */
export declare const OG_FONT_FAMILY: string;
