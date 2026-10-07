package com.studiolxd.brand.components.tag

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.style.TextOverflow
import com.studiolxd.brand.support.BrandBasicText
import com.studiolxd.brand.support.BrandLineBox
import com.studiolxd.brand.support.LocalBrandTextStyle
import com.studiolxd.brand.support.ProvideBrandContent
import com.studiolxd.brand.support.brandBaseTextStyle
import com.studiolxd.brand.tokens.BrandTagTokens as T

/** `Tag` `variant`: la variante de color. Mismos casos y mismos valores que React. */
enum class TagVariant(val value: String) {
    Primary("primary"),
    Accent1("accent-1"),
    Accent2("accent-2"),
    Support1("support-1"),
    Support2("support-2"),
    Neutral("neutral"),
    Info("info"),
    Warning("warning"),
    Success("success"),
    Danger("danger"),
}

@Composable
private fun TagVariant.background(): Color = when (this) {
    TagVariant.Primary -> T.primaryBg
    TagVariant.Accent1 -> T.accent1Bg
    TagVariant.Accent2 -> T.accent2Bg
    TagVariant.Support1 -> T.support1Bg
    TagVariant.Support2 -> T.support2Bg
    TagVariant.Neutral -> T.neutralBg
    TagVariant.Info -> T.infoBg
    TagVariant.Warning -> T.warningBg
    TagVariant.Success -> T.successBg
    TagVariant.Danger -> T.dangerBg
}.current

@Composable
private fun TagVariant.foreground(): Color = when (this) {
    TagVariant.Primary -> T.primaryColor
    TagVariant.Accent1 -> T.accent1Color
    TagVariant.Accent2 -> T.accent2Color
    TagVariant.Support1 -> T.support1Color
    TagVariant.Support2 -> T.support2Color
    TagVariant.Neutral -> T.neutralColor
    TagVariant.Info -> T.infoColor
    TagVariant.Warning -> T.warningColor
    TagVariant.Success -> T.successColor
    TagVariant.Danger -> T.dangerColor
}.current

/**
 * Una etiqueta de la marca (el `Tag` de React): texto corto sobre un relleno de color, de esquinas totalmente
 * redondeadas. Los pares fondo/texto salen de `tag.*`; los de `Primary` e `Info` se invierten en oscuro. El texto
 * crece con la fuente del sistema (sp) y la etiqueta con él.
 *
 * Es solo texto: TalkBack lo lee como una frase más (no es un control), igual que el `<span>` de React.
 *
 * ```kotlin
 * BrandTag("Administrador", variant = TagVariant.Primary)
 * BrandTag("Pagado", variant = TagVariant.Success)
 * ```
 */
@Composable
fun BrandTag(
    text: String,
    modifier: Modifier = Modifier,
    variant: TagVariant = TagVariant.Neutral,
) {
    BrandTag(modifier, variant) { BrandBasicText(text, style = LocalBrandTextStyle.current, maxLines = 1, softWrap = false, overflow = TextOverflow.Clip) }
}

/** Un [BrandTag] con contenido propio (un texto con icono, por ejemplo). Hereda color y tipografía de la etiqueta. */
@Composable
fun BrandTag(
    modifier: Modifier = Modifier,
    variant: TagVariant = TagVariant.Neutral,
    content: @Composable () -> Unit,
) {
    val foreground = variant.foreground()
    ProvideBrandContent(
        color = foreground,
        textStyle = brandBaseTextStyle(T.fontSize, T.fontWeight, T.lineHeight, color = foreground),
    ) {
        Box(
            modifier = modifier
                .background(variant.background(), RoundedCornerShape(T.borderRadius))
                .padding(vertical = T.paddingBlock, horizontal = T.paddingInline)
                .semantics(mergeDescendants = true) { },
        ) {
            // `line-height: 1` (`tag.line-height`) es una caja de una sola «em». El texto ya la trae (la tipografía del contenido
            // lleva la caja de línea de CSS); la caja fija es para lo que no es texto, como un icono de `1em` junto a él.
            BrandLineBox(T.fontSize, T.lineHeight) { content() }
        }
    }
}
