package com.studiolxd.brand.support

import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.LineHeightStyle
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.em
import com.studiolxd.brand.typography.BrandFontFamily

/**
 * Un estilo de texto de la marca con el **interlineado de CSS**, listo para pintar: el de [brandBaseTextStyle] con la
 * caja de línea de CSS ya aplicada ([brandCssLineBox]), así que una línea mide exactamente `tamaño × lineHeight` y `n`
 * líneas, `n × lineHeight`, también con un interlineado más apretado que la fuente (títulos a `1.1`, controles a `1`).
 * Sustituye a [brandTextStyle]. Es `@Composable` porque la caja depende de la fuente medida en la densidad y la escala
 * de fuente vigentes; fuera de una composición, construye el `TextStyle` y píntalo con [BrandBasicText], que aplica la
 * caja al pintar.
 *
 * ```kotlin
 * BasicText("Tus viviendas", style = brandCssTextStyle(BrandFontSize.s6, BrandFontWeight.emphasis, BrandLineHeight.tight))
 * ```
 *
 * @param lineHeight múltiplo del tamaño (`line-height.*`).
 * @param letterSpacing fracción del tamaño (em, `letter-spacing.*`).
 */
@Composable
fun brandCssTextStyle(
    size: TextUnit,
    weight: FontWeight,
    lineHeight: Float,
    letterSpacing: Float = 0f,
    family: FontFamily = BrandFontFamily.sansAt(size),
    color: Color = Color.Unspecified,
): TextStyle = brandBaseTextStyle(size, weight, lineHeight, letterSpacing, family, color).brandCssLineBox()

/**
 * Un estilo de texto de la marca con el interlineado de CSS **solo cuando el interlineado cubre la fuente**: centra el
 * texto en una caja de `line-height` sin recortar. Con un interlineado más apretado (`1`, `1.1`, `1.3`), Compose deja la
 * primera y la última línea en el alto natural de la fuente y el texto sale más alto que en la web.
 *
 * **Obsoleto**: [brandCssTextStyle] (o pintar con [BrandBasicText]) da la caja de línea de CSS en todos los casos. Se
 * conserva sin cambios para no mover las pantallas que ya lo usan.
 *
 * @param lineHeight múltiplo del tamaño (`line-height.*`).
 * @param letterSpacing fracción del tamaño (em, `letter-spacing.*`).
 */
@Deprecated(
    message = "Usa brandCssTextStyle(…), que aplica la caja de línea de CSS (una línea mide tamaño × lineHeight, como en la web), o pinta el estilo con BrandBasicText.",
    replaceWith = ReplaceWith(
        "brandCssTextStyle(size, weight, lineHeight, letterSpacing, family, color)",
        "com.studiolxd.brand.support.brandCssTextStyle",
    ),
)
fun brandTextStyle(
    size: TextUnit,
    weight: FontWeight,
    lineHeight: Float,
    letterSpacing: Float = 0f,
    family: FontFamily = BrandFontFamily.sansAt(size),
    color: Color = Color.Unspecified,
): TextStyle = brandBaseTextStyle(size, weight, lineHeight, letterSpacing, family, color)

/**
 * La base de los estilos de texto de los componentes: `line-height` como caja de línea, centrando el texto en ella (sin
 * recortar arriba ni abajo), como en la web. El tamaño y el interlineado crecen juntos con la escala de fuente (`sp`).
 *
 * Con un interlineado más apretado que la fuente, la primera y la última línea se quedan en el alto natural: los textos
 * de los componentes lo corrigen al pintarse ([BrandBasicText], [ProvideBrandContent], [brandCssLineBox]). Interno; lo
 * público es [brandCssTextStyle].
 *
 * La familia por defecto es la sans con el eje de tamaño óptico a [size] ([BrandFontFamily.sansAt]).
 */
internal fun brandBaseTextStyle(
    size: TextUnit,
    weight: FontWeight,
    lineHeight: Float,
    letterSpacing: Float = 0f,
    family: FontFamily = BrandFontFamily.sansAt(size),
    color: Color = Color.Unspecified,
): TextStyle = TextStyle(
    color = color,
    fontSize = size,
    fontWeight = weight,
    fontFamily = family,
    lineHeight = size * lineHeight,
    letterSpacing = letterSpacing.em,
    lineHeightStyle = LineHeightStyle(LineHeightStyle.Alignment.Center, LineHeightStyle.Trim.None),
)
