package com.studiolxd.brand.components.field

import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.selection.toggleable
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.clearAndSetSemantics
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.sp
import com.studiolxd.brand.icon.BrandIcon
import com.studiolxd.brand.icon.BrandIconName
import com.studiolxd.brand.icon.BrandIconSize
import com.studiolxd.brand.support.LocalBrandIconTextSize
import com.studiolxd.brand.support.brandFocusRing
import com.studiolxd.brand.support.collectBrandInteractionState
import com.studiolxd.brand.tokens.BrandInputFieldTokens as F
import com.studiolxd.brand.tokens.BrandSchemeValue

/** Un glifo de campo (lupa, aspa, ojo): un icono `size = Text` al tamaño del token, que crece con la escala de fuente. */
@Composable
internal fun BrandFieldGlyph(icon: BrandIconName, size: Dp, color: Color) {
    CompositionLocalProvider(LocalBrandIconTextSize provides size.value.sp) {
        BrandIcon(icon, size = BrandIconSize.Text, color = color)
    }
}

/**
 * Un botón de icono al final de un campo (borrar en `InputField`, mostrar contraseña en `PasswordField`). La tinta y el
 * anillo de foco por defecto son los de `input-field.search.clear-*`; `PasswordField` pasa los de `password-field.toggle-*`.
 *
 * Conserva su hueco aunque no se vea ([visible] = `false`: transparente, sin clic y fuera de TalkBack) para que el
 * texto no salte al escribir. Con [pressed] distinto de `null` es un botón de dos estados (`aria-pressed`): TalkBack
 * anuncia el estado (`ToggleableState`) y [onClick] se llama al alternarlo. Con [enabled] = `false` se ve pero no responde.
 */
@Composable
internal fun BrandFieldIconButton(
    icon: BrandIconName,
    label: String,
    slot: Dp,
    iconSize: Dp,
    visible: Boolean = true,
    enabled: Boolean = true,
    pressed: Boolean? = null,
    color: BrandSchemeValue<Color> = F.searchClearColor,
    ringColor: BrandSchemeValue<Color> = F.searchClearFocusRingColor,
    ringWidth: Dp = F.searchClearFocusRingWidth,
    ringOffset: Dp = F.searchClearFocusRingOffset,
    onClick: () -> Unit,
) {
    val source = remember { MutableInteractionSource() }
    val state = source.collectBrandInteractionState()
    Box(
        Modifier
            .size(slot)
            .alpha(if (visible) 1f else 0f)
            .then(
                if (visible) {
                    // El anillo va hacia dentro de la caja: el botón está a ras del borde del campo.
                    Modifier
                        .brandFocusRing(state.focusVisible, ringColor.current, ringWidth, -(ringOffset + ringWidth))
                        .then(
                            if (pressed == null) {
                                Modifier.clickable(interactionSource = source, indication = null, enabled = enabled, role = Role.Button, onClick = onClick)
                            } else {
                                Modifier.toggleable(value = pressed, interactionSource = source, indication = null, enabled = enabled, role = Role.Button) { onClick() }
                            },
                        )
                        .semantics { contentDescription = label }
                } else {
                    Modifier.clearAndSetSemantics { }
                },
            ),
        contentAlignment = Alignment.Center,
    ) { BrandFieldGlyph(icon, iconSize, color.current) }
}
