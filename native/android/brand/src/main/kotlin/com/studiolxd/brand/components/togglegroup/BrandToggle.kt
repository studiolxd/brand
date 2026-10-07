package com.studiolxd.brand.components.togglegroup

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.RowScope
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.selection.selectable
import androidx.compose.foundation.selection.toggleable
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.dp
import com.studiolxd.brand.components.field.LocalBrandForcedFocus
import com.studiolxd.brand.components.field.animatedFieldColor
import com.studiolxd.brand.support.BrandControlSize
import com.studiolxd.brand.support.ProvideBrandContent
import com.studiolxd.brand.support.brandFocusRing
import com.studiolxd.brand.support.brandBaseTextStyle
import com.studiolxd.brand.support.collectBrandInteractionState
import com.studiolxd.brand.support.rememberReduceMotion
import com.studiolxd.brand.support.resolve
import com.studiolxd.brand.support.scaledByFontScale
import com.studiolxd.brand.tokens.BrandToggleTokens as T

/** Cómo se anuncia un toggle a TalkBack: botón suelto, radio (selección exclusiva) o casilla (selección múltiple). */
internal enum class ToggleRole { Button, Radio, Checkbox }

/**
 * El botón de dos estados de la marca (`Toggle` de React): pulsado o no. Es un **valor que se conmuta** (un filtro, una
 * opción elegida), no una acción: queda relleno mientras está pulsado. El *hover* marca el borde y no rellena.
 *
 * Es la pieza que usa [BrandToggleGroup]; suelta:
 *
 * ```kotlin
 * BrandToggle(onlyPending, { onlyPending = it }) { BasicText("Solo pendientes") }
 * ```
 *
 * **TalkBack**: botón con estado «activado/desactivado» (`toggleable`). La etiqueta del contenido es su nombre; con
 * [iconOnly], [contentDescription] es obligatorio en la práctica.
 *
 * @param size sin valor toma la del entorno ([com.studiolxd.brand.support.ProvideBrandControlSize]) y, si tampoco hay, `md`.
 * @param iconOnly botón cuadrado de solo icono: el lado es la altura de la talla.
 */
@Composable
fun BrandToggle(
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit,
    modifier: Modifier = Modifier,
    size: BrandControlSize? = null,
    iconOnly: Boolean = false,
    enabled: Boolean = true,
    contentDescription: String? = null,
    interactionSource: MutableInteractionSource? = null,
    content: @Composable RowScope.() -> Unit,
) {
    BrandToggleSurface(
        isOn = checked,
        onToggle = { onCheckedChange(!checked) },
        role = ToggleRole.Button,
        modifier = modifier,
        size = size,
        stretch = false,
        iconOnly = iconOnly,
        enabled = enabled,
        contentDescription = contentDescription,
        interactionSource = interactionSource,
        stateOverride = null,
        content = content,
    )
}

/**
 * La cara de un toggle: botón rectangular con borde, de la altura de la talla. [stateOverride] fija el estado de
 * interacción (hover, foco): lo usan las capturas.
 */
@Composable
internal fun BrandToggleSurface(
    isOn: Boolean,
    onToggle: () -> Unit,
    role: ToggleRole,
    modifier: Modifier,
    size: BrandControlSize?,
    stretch: Boolean,
    iconOnly: Boolean,
    enabled: Boolean,
    contentDescription: String?,
    interactionSource: MutableInteractionSource?,
    stateOverride: com.studiolxd.brand.support.BrandInteractionState?,
    content: @Composable RowScope.() -> Unit,
) {
    val resolved = size.resolve()
    val source = interactionSource ?: remember { MutableInteractionSource() }
    val state = stateOverride ?: source.collectBrandInteractionState()
    val reduceMotion = rememberReduceMotion()

    val height = when (resolved) {
        BrandControlSize.Sm -> T.smHeight
        BrandControlSize.Md -> T.height
        BrandControlSize.Lg -> T.lgHeight
    }.scaledByFontScale()
    val paddingInline = when (resolved) {
        BrandControlSize.Sm -> T.smPaddingInline
        BrandControlSize.Md -> T.paddingInline
        BrandControlSize.Lg -> T.lgPaddingInline
    }
    val fontSize: TextUnit = when (resolved) {
        BrandControlSize.Sm -> T.smFontSize
        BrandControlSize.Md -> T.fontSize
        BrandControlSize.Lg -> T.lgFontSize
    }
    // `toggle.border-radius` es 0: el sistema es rectangular.
    val shape: Shape = if (T.borderRadius > 0.dp) RoundedCornerShape(T.borderRadius) else RectangleShape

    val background = animatedFieldColor((if (isOn) T.pressedBg else T.bg).current, T.transitionDuration, T.transitionEasing, reduceMotion, "toggle-bg")
    val border = animatedFieldColor(
        (if (isOn) T.pressedBorderColor else if (state.hovered && enabled) T.hoverBorderColor else T.borderColor).current,
        T.transitionDuration, T.transitionEasing, reduceMotion, "toggle-border",
    )
    val foreground = animatedFieldColor((if (isOn) T.pressedColor else T.color).current, T.transitionDuration, T.transitionEasing, reduceMotion, "toggle-fg")

    val click = when (role) {
        ToggleRole.Radio -> Modifier.selectable(
            selected = isOn, interactionSource = source, indication = null, enabled = enabled, role = Role.RadioButton, onClick = onToggle,
        )
        ToggleRole.Checkbox -> Modifier.toggleable(
            value = isOn, interactionSource = source, indication = null, enabled = enabled, role = Role.Checkbox, onValueChange = { onToggle() },
        )
        ToggleRole.Button -> Modifier.toggleable(
            value = isOn, interactionSource = source, indication = null, enabled = enabled, role = Role.Button, onValueChange = { onToggle() },
        )
    }

    Box(
        modifier
            .alpha(if (enabled) 1f else T.disabledOpacity)
            .then(if (stretch) Modifier.fillMaxWidth() else Modifier)
            .brandFocusRing(state.focusVisible || LocalBrandForcedFocus.current, T.focusRingColor.current, T.focusRingWidth, T.focusRingOffset)
            .then(if (iconOnly) Modifier.size(height) else Modifier.heightIn(min = height))
            .background(background, shape)
            .border(T.borderWidth, border, shape)
            .then(click)
            .then(if (contentDescription != null) Modifier.semantics { this.contentDescription = contentDescription } else Modifier)
            .padding(horizontal = if (iconOnly) 0.dp else paddingInline),
        contentAlignment = Alignment.Center,
    ) {
        ProvideBrandContent(foreground, brandBaseTextStyle(fontSize, T.fontWeight, T.lineHeight, color = foreground)) {
            Row(horizontalArrangement = Arrangement.spacedBy(T.gap, Alignment.CenterHorizontally), verticalAlignment = Alignment.CenterVertically) {
                content()
            }
        }
    }
}
