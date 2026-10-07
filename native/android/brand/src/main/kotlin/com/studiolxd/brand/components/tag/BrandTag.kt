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

/** `Tag` `tone`: el color del tag. Mismos casos y mismos valores que React. */
enum class TagTone(val value: String) {
    Primary("primary"),
    Accent1("accent-1"),
    Accent2("accent-2"),
    Support1("support-1"),
    Support2("support-2"),
    Neutral("neutral"),
    Info("info"),
    Warning("warning"),
    Success("success"),
    Error("error"),
    ;

    companion object {
        /** `danger` es `error` desde la v51 (el vocabulario de estado del sistema). Se retira en la v52. */
        @Deprecated("`danger` es `error` desde la v51. Se retira en la v52.", ReplaceWith("TagTone.Error"))
        val Danger: TagTone get() = Error
    }
}

/** El nombre de [TagTone] hasta la v50. Se retira en la v52. */
@Deprecated("La prop de color se llama `tone` desde la v51. Se retira en la v52.", ReplaceWith("TagTone"))
typealias TagVariant = TagTone

@Composable
private fun TagTone.background(): Color = when (this) {
    TagTone.Primary -> T.primaryBg
    TagTone.Accent1 -> T.accent1Bg
    TagTone.Accent2 -> T.accent2Bg
    TagTone.Support1 -> T.support1Bg
    TagTone.Support2 -> T.support2Bg
    TagTone.Neutral -> T.neutralBg
    TagTone.Info -> T.infoBg
    TagTone.Warning -> T.warningBg
    TagTone.Success -> T.successBg
    TagTone.Error -> T.dangerBg
}.current

@Composable
private fun TagTone.foreground(): Color = when (this) {
    TagTone.Primary -> T.primaryColor
    TagTone.Accent1 -> T.accent1Color
    TagTone.Accent2 -> T.accent2Color
    TagTone.Support1 -> T.support1Color
    TagTone.Support2 -> T.support2Color
    TagTone.Neutral -> T.neutralColor
    TagTone.Info -> T.infoColor
    TagTone.Warning -> T.warningColor
    TagTone.Success -> T.successColor
    TagTone.Error -> T.dangerColor
}.current

/**
 * Una etiqueta de la marca (el `Tag` de React): texto corto sobre un relleno de color, de esquinas totalmente
 * redondeadas. Los pares fondo/texto salen de `tag.*`; los de `Primary` e `Info` se invierten en oscuro. El texto
 * crece con la fuente del sistema (sp) y la etiqueta con él.
 *
 * Es solo texto: TalkBack lo lee como una frase más (no es un control), igual que el `<span>` de React.
 *
 * ```kotlin
 * BrandTag("Administrador", tone = TagTone.Primary)
 * BrandTag("Pagado", tone = TagTone.Success)
 * ```
 */
@Composable
fun BrandTag(
    text: String,
    modifier: Modifier = Modifier,
    tone: TagTone = TagTone.Neutral,
) {
    BrandTag(modifier, tone) { BrandBasicText(text, style = LocalBrandTextStyle.current, maxLines = 1, softWrap = false, overflow = TextOverflow.Clip) }
}

/** Un [BrandTag] con contenido propio (un texto con icono, por ejemplo). Hereda color y tipografía de la etiqueta. */
@Composable
fun BrandTag(
    modifier: Modifier = Modifier,
    tone: TagTone = TagTone.Neutral,
    content: @Composable () -> Unit,
) {
    val foreground = tone.foreground()
    ProvideBrandContent(
        color = foreground,
        textStyle = brandBaseTextStyle(T.fontSize, T.fontWeight, T.lineHeight, color = foreground),
    ) {
        Box(
            modifier = modifier
                .background(tone.background(), RoundedCornerShape(T.borderRadius))
                .padding(vertical = T.paddingBlock, horizontal = T.paddingInline)
                .semantics(mergeDescendants = true) { },
        ) {
            // `line-height: 1` (`tag.line-height`) es una caja de una sola «em». El texto ya la trae (la tipografía del contenido
            // lleva la caja de línea de CSS); la caja fija es para lo que no es texto, como un icono de `1em` junto a él.
            BrandLineBox(T.fontSize, T.lineHeight) { content() }
        }
    }
}

/** `variant` es `tone` desde la v51. Se retira en la v52. */
@Deprecated("`variant` es `tone` desde la v51. Se retira en la v52.", ReplaceWith("BrandTag(text, modifier, tone = variant)"))
@Composable
fun BrandTag(text: String, variant: TagTone, modifier: Modifier = Modifier) = BrandTag(text, modifier, variant)

/** `variant` es `tone` desde la v51. Se retira en la v52. */
@Deprecated("`variant` es `tone` desde la v51. Se retira en la v52.", ReplaceWith("BrandTag(modifier, tone = variant, content = content)"))
@Composable
fun BrandTag(variant: TagTone, modifier: Modifier = Modifier, content: @Composable () -> Unit) = BrandTag(modifier, variant, content)
