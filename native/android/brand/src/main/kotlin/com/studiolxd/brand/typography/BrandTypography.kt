package com.studiolxd.brand.typography

import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.TextUnit
import com.studiolxd.brand.tokens.BrandFontSize
import com.studiolxd.brand.tokens.BrandFontWeight
import com.studiolxd.brand.tokens.BrandLetterSpacing
import com.studiolxd.brand.tokens.BrandLineHeight

/**
 * Los estilos de texto de la marca, hechos con los tokens de tipografía. Mismo mapa que `BrandTextStyle` en
 * SwiftUI y que `text.*` en la web: [body] = `text.*`, [bodySmall]/[bodyLarge] = `text.paragraph.small|large`,
 * [heading1]…[heading6] = `text.h1…h6`. Los tamaños siguen la superficie de aplicación (cuerpo de 16).
 *
 * El color no va en el estilo: lo pone quien lo usa, con un rol de `BrandTheme.colors`.
 *
 * **Interlineado**: son datos (tamaño, peso, `line-height`, tracking), no la caja de línea ya resuelta, que depende de la
 * fuente medida en la densidad y la escala de fuente vigentes y por eso no cabe en una constante. Para que midan lo que
 * en la web, píntalos con [com.studiolxd.brand.support.BrandBasicText] o aplícales
 * [com.studiolxd.brand.support.brandCssLineBox] antes de dárselos a un `BasicText` o a un `Text` de Material. Sin eso,
 * los de interlineado apretado (los títulos a `1.1` y `1.3`) salen más altos que en la web.
 */
object BrandTypography {
    private fun style(
        size: TextUnit,
        weight: FontWeight,
        lineHeight: Float,
        tracking: TextUnit,
        family: FontFamily = BrandFontFamily.sansAt(size),
    ) = TextStyle(
        fontFamily = family,
        fontSize = size,
        fontWeight = weight,
        lineHeight = size * lineHeight,
        letterSpacing = tracking,
    )

    /** Cuerpo de texto. */
    val body = style(BrandFontSize.s2, BrandFontWeight.default, BrandLineHeight.normal, BrandLetterSpacing.normal)

    /** Letra menor. */
    val bodySmall = style(BrandFontSize.s1, BrandFontWeight.default, BrandLineHeight.relaxed, BrandLetterSpacing.normal)

    /** Párrafo destacado. */
    val bodyLarge = style(BrandFontSize.s3, BrandFontWeight.default, BrandLineHeight.snug, BrandLetterSpacing.normal)

    /** Etiquetas de interfaz. */
    val label = style(BrandFontSize.s1, BrandFontWeight.emphasis, BrandLineHeight.normal, BrandLetterSpacing.normal)

    val heading1 = style(BrandFontSize.s7, BrandFontWeight.emphasis, BrandLineHeight.tight, BrandLetterSpacing.tight)
    val heading2 = style(BrandFontSize.s6, BrandFontWeight.emphasis, BrandLineHeight.tight, BrandLetterSpacing.tight)
    val heading3 = style(BrandFontSize.s5, BrandFontWeight.emphasis, BrandLineHeight.tight, BrandLetterSpacing.tight)
    val heading4 = style(BrandFontSize.s4, BrandFontWeight.emphasis, BrandLineHeight.snug, BrandLetterSpacing.tight)
    val heading5 = style(BrandFontSize.s3, BrandFontWeight.emphasis, BrandLineHeight.snug, BrandLetterSpacing.normal)
    val heading6 = style(BrandFontSize.s2, BrandFontWeight.emphasis, BrandLineHeight.snug, BrandLetterSpacing.normal)

    /** Código y valores técnicos, en la familia monoespaciada. */
    val code = style(BrandFontSize.s1, BrandFontWeight.default, BrandLineHeight.normal, BrandLetterSpacing.normal, BrandFontFamily.mono)
}
