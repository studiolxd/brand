/**
 * Los nueve pesos que admite satori, que no acepta un `number` cualquiera. Se
 * declara aquí —y no se importa de `satori`— porque satori no es dependencia
 * de este paquete: la tarjeta se arma con `ogCard()` y la renderiza la
 * aplicación, que es quien lo trae.
 */
export type OgFontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
/** Una cara, en la forma exacta que espera la opción `fonts` de satori. */
export interface OgFont {
    name: string;
    data: ArrayBuffer;
    weight: OgFontWeight;
    style: 'normal';
}
/**
 * Las caras de marca para la opción `fonts` de `ImageResponse`/`satori`.
 *
 * ```ts
 * new ImageResponse(ogCard({ … }), { ...OG_SIZE, fonts: await ogFonts() });
 * ```
 */
export declare function ogFonts(): Promise<OgFont[]>;
