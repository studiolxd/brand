package com.studiolxd.brand.components.emptystate

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.semantics.clearAndSetSemantics
import androidx.compose.ui.semantics.heading
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.sp
import com.studiolxd.brand.components.button.BrandButton
import com.studiolxd.brand.components.button.ButtonSize
import com.studiolxd.brand.components.button.ButtonVariant
import com.studiolxd.brand.icon.BrandIcon
import com.studiolxd.brand.icon.BrandIconName
import com.studiolxd.brand.icon.BrandIconSize
import com.studiolxd.brand.support.BrandBasicText
import com.studiolxd.brand.support.LocalBrandIconTextSize
import com.studiolxd.brand.support.ProvideBrandContent
import com.studiolxd.brand.support.brandTextStyle
import com.studiolxd.brand.support.scaledByFontScale
import com.studiolxd.brand.tokens.BrandEmptyStateTokens as T
import com.studiolxd.brand.tokens.BrandTextTokens as Text

/** `EmptyState` `size`: `Md` por defecto; `Sm` para huecos pequeños (una tarjeta, un panel). */
enum class EmptyStateSize(val value: String) {
    Sm("sm"),
    Md("md"),
}

/** La acción de un estado vacío (`action` en React: `label` + `onClick`; `href` no existe en nativo). */
class EmptyStateAction(val label: String, val perform: () -> Unit)

/**
 * El estado de una pantalla o lista sin nada que mostrar: icono, rótulo, frase que lo explica y una acción
 * (`BrandButton` outline, `Sm` en la talla `Sm`). El rótulo es un encabezado para TalkBack; el icono es decorativo.
 *
 * ```kotlin
 * BrandEmptyState(
 *     title = "Sin viviendas",
 *     description = "Añade tu primera vivienda para empezar.",
 *     icon = BrandIconName.Folder,
 *     action = EmptyStateAction("Añadir vivienda") { add() },
 * )
 * ```
 *
 * El rótulo no lleva punto y la descripción termina en punto (Foundations → Redacción).
 */
@Composable
fun BrandEmptyState(
    title: String,
    modifier: Modifier = Modifier,
    description: String? = null,
    icon: BrandIconName? = null,
    size: EmptyStateSize = EmptyStateSize.Md,
    action: EmptyStateAction? = null,
) {
    BrandEmptyStateImpl(title, modifier, description, size, action, icon?.let { name -> { BrandIcon(name, size = BrandIconSize.Text) } })
}

/** Un estado vacío con un icono propio (una ilustración, un `BrandIcon` con otro color). Ocupa la caja del token. */
@Composable
fun BrandEmptyState(
    title: String,
    iconContent: @Composable () -> Unit,
    modifier: Modifier = Modifier,
    description: String? = null,
    size: EmptyStateSize = EmptyStateSize.Md,
    action: EmptyStateAction? = null,
) {
    BrandEmptyStateImpl(title, modifier, description, size, action, iconContent)
}

@Composable
private fun BrandEmptyStateImpl(
    title: String,
    modifier: Modifier,
    description: String?,
    size: EmptyStateSize,
    action: EmptyStateAction?,
    icon: (@Composable () -> Unit)?,
) {
    val small = size == EmptyStateSize.Sm
    Column(
        modifier = modifier
            .fillMaxWidth()
            .padding(vertical = T.paddingBlock, horizontal = T.paddingInline),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(T.gap),
    ) {
        if (icon != null) {
            val box = if (small) T.iconSizeSm else T.iconSize
            Box(Modifier.size(box.scaledByFontScale()).clearAndSetSemantics { }, contentAlignment = Alignment.Center) {
                // El icono llena la caja del token (`icon-size` / `icon-size-sm`), como el `<svg>` al 100 % de React.
                ProvideBrandContent(
                    color = T.iconColor.current,
                    textStyle = brandTextStyle(box.value.sp, Text.fontWeight, Text.lineHeight),
                ) {
                    CompositionLocalProvider(LocalBrandIconTextSize provides box.value.sp) { icon() }
                }
            }
        }
        Column(horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(T.bodyGap)) {
            BrandBasicText(
                text = title,
                modifier = Modifier.semantics { heading() },
                style = brandTextStyle(
                    size = if (small) T.titleFontSizeSm else T.titleFontSize,
                    weight = T.titleFontWeight,
                    lineHeight = Text.lineHeight,
                    color = T.titleColor.current,
                ).copy(textAlign = TextAlign.Center),
            )
            if (description != null) {
                BrandBasicText(
                    text = description,
                    style = brandTextStyle(
                        size = if (small) T.descriptionFontSizeSm else T.descriptionFontSize,
                        weight = Text.fontWeight,
                        lineHeight = Text.lineHeight,
                        color = T.descriptionColor.current,
                    ).copy(textAlign = TextAlign.Center),
                )
            }
        }
        if (action != null) {
            BrandButton(action.label, onClick = action.perform, variant = ButtonVariant.Outline, size = if (small) ButtonSize.Sm else ButtonSize.Md)
        }
    }
}
