package com.studiolxd.brand.support

import androidx.compose.foundation.text.BasicText
import androidx.compose.foundation.text.InlineTextContent
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.platform.LocalFontFamilyResolver
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.TextLayoutResult
import androidx.compose.ui.text.TextMeasurer
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.LineHeightStyle
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.LayoutDirection
import androidx.compose.ui.unit.TextUnit
import java.util.concurrent.ConcurrentHashMap
import kotlin.math.ceil

/**
 * La **caja de línea de CSS** para cualquier interlineado: en la web una línea mide exactamente `line-height` y lo que
 * sobra o falta respecto a la fuente se reparte mitad arriba y mitad abajo, así que `n` líneas miden `n × line-height`.
 *
 * Compose solo lo hace cuando el interlineado **cubre** el alto natural de la fuente (23,7 dp a 16 sp con Google Sans
 * Flex, el 1,48 del cuerpo): es lo que da [brandBaseTextStyle] (`LineHeightStyle` `Fixed` sin recorte). Con uno más apretado
 * (`1`, `1.1`, `1.3`: controles y títulos) mantiene la PRIMERA línea y la ÚLTIMA en el alto natural y el texto sale más
 * alto que en la web. Para ese caso existe `LineHeightStyle.Mode.Tight` con `Trim.Both`, que sí deja cada línea en
 * `line-height` con los glifos centrados y desbordando su caja, como la web; pero con un interlineado holgado recorta el
 * medio interlineado de la primera y la última línea, así que no vale como valor fijo.
 *
 * Esta función elige entre los dos comparando el interlineado con el alto natural **medido** de la fuente (una línea de
 * muestra con el mismo tamaño, familia, peso y estilo, en la densidad y la escala de fuente vigentes; se mide una vez por
 * combinación). No depende de una cifra de la fuente escrita a mano: el alto natural que da Android no es el de `hhea`
 * (1,252 em) y podría variar entre versiones del sistema.
 *
 * La usan [BrandBasicText] y [ProvideBrandContent], que son por donde pasa el texto de los componentes; un texto que no
 * pase por ellos (un `BasicTextField`, cuyo cursor mide la línea) se queda con el comportamiento de Compose.
 *
 * Es pública para las apps: un estilo propio o uno de [com.studiolxd.brand.typography.BrandTypography] pintado con un
 * `BasicText` o un `Text` de Material mide lo que en la web si se le aplica antes.
 *
 * ```kotlin
 * Text("Tus viviendas", style = BrandTypography.heading2.brandCssLineBox())
 * ```
 */
@Composable
fun TextStyle.brandCssLineBox(): TextStyle {
    if (!lineHeight.isSp || !fontSize.isSp) return this
    val density = LocalDensity.current
    val resolver = LocalFontFamilyResolver.current
    val key = NaturalKey(fontFamily, fontSize, fontWeight, fontStyle, density.density, density.fontScale)
    val natural = remember(key, resolver) {
        NaturalHeights.getOrPut(key) {
            TextMeasurer(resolver, density, LayoutDirection.Ltr, cacheSize = 0)
                .measure("Hg", TextStyle(fontFamily = fontFamily, fontSize = fontSize, fontWeight = fontWeight, fontStyle = fontStyle))
                .size.height
        }
    }
    val box = with(density) { ceil(lineHeight.toPx()).toInt() }
    val wanted = if (box < natural) TightLineBox else FixedLineBox
    return if (lineHeightStyle == wanted) this else copy(lineHeightStyle = wanted)
}

/** Holgado: la caja es `line-height` y el texto va centrado en ella (el de [brandBaseTextStyle]). */
private val FixedLineBox = LineHeightStyle(LineHeightStyle.Alignment.Center, LineHeightStyle.Trim.None)

/** Apretado: cada línea, también la primera y la última, mide `line-height`; los glifos desbordan centrados. */
private val TightLineBox = LineHeightStyle(LineHeightStyle.Alignment.Center, LineHeightStyle.Trim.Both, LineHeightStyle.Mode.Tight)

private data class NaturalKey(
    val family: FontFamily?,
    val size: TextUnit,
    val weight: FontWeight?,
    val style: FontStyle?,
    val density: Float,
    val fontScale: Float,
)

private val NaturalHeights = ConcurrentHashMap<NaturalKey, Int>()

/**
 * `BasicText` con la caja de línea de CSS ([brandCssLineBox]): el texto de todos los componentes de la marca pasa por
 * aquí, así que un `line-height` de la web mide lo mismo en Compose con una línea o con varias. Las apps lo usan igual
 * que un `BasicText`, con un estilo de [com.studiolxd.brand.typography.BrandTypography] o propio.
 *
 * ```kotlin
 * BrandBasicText("Tus viviendas", style = BrandTypography.heading2.copy(color = BrandTheme.colors.text))
 * ```
 */
@Composable
fun BrandBasicText(
    text: String,
    modifier: Modifier = Modifier,
    style: TextStyle = TextStyle.Default,
    onTextLayout: ((TextLayoutResult) -> Unit)? = null,
    overflow: TextOverflow = TextOverflow.Clip,
    softWrap: Boolean = true,
    maxLines: Int = Int.MAX_VALUE,
    minLines: Int = 1,
) {
    BasicText(
        text = text, modifier = modifier, style = style.brandCssLineBox(), onTextLayout = onTextLayout,
        overflow = overflow, softWrap = softWrap, maxLines = maxLines, minLines = minLines,
    )
}

/** [BrandBasicText] para un texto con estilos por tramos (`AnnotatedString`). */
@Composable
fun BrandBasicText(
    text: AnnotatedString,
    modifier: Modifier = Modifier,
    style: TextStyle = TextStyle.Default,
    onTextLayout: ((TextLayoutResult) -> Unit)? = null,
    overflow: TextOverflow = TextOverflow.Clip,
    softWrap: Boolean = true,
    maxLines: Int = Int.MAX_VALUE,
    minLines: Int = 1,
    inlineContent: Map<String, InlineTextContent> = mapOf(),
) {
    BasicText(
        text = text, modifier = modifier, style = style.brandCssLineBox(), onTextLayout = onTextLayout,
        overflow = overflow, softWrap = softWrap, maxLines = maxLines, minLines = minLines, inlineContent = inlineContent,
    )
}
