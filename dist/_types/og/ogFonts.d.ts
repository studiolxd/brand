/** Una cara, en la forma exacta que espera la opción `fonts` de satori. */
export interface OgFont {
    name: string;
    data: ArrayBuffer;
    weight: number;
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
