package com.studiolxd.brand.components.switcherfield

import androidx.compose.animation.core.animateDpAsState
import androidx.compose.foundation.background
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.selection.toggleable
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.IntOffset
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.studiolxd.brand.components.field.LocalBrandForcedFocus
import com.studiolxd.brand.components.field.animatedFieldColor
import com.studiolxd.brand.support.BrandControlSize
import com.studiolxd.brand.support.brandFocusRing
import com.studiolxd.brand.support.brandTransition
import com.studiolxd.brand.support.collectBrandInteractionState
import com.studiolxd.brand.support.rememberReduceMotion
import com.studiolxd.brand.support.resolve
import com.studiolxd.brand.support.scaledByFontScale
import com.studiolxd.brand.support.toScaledDp
import com.studiolxd.brand.tokens.BrandFontSize
import com.studiolxd.brand.tokens.BrandSwitcherFieldTokens as F
import com.studiolxd.brand.tokens.BrandSwitcherTokens as T

/**
 * El interruptor de la marca (`Switcher`): pista redondeada con el pulgar a un lado. Con [label], toda la fila (pista y
 * etiqueta) conmuta, como el `<label>` de React; sin él, es solo la pista.
 *
 * ```kotlin
 * BrandSwitcher(notify, { notify = it }, label = { BrandText("Avisarme por correo") })
 * ```
 *
 * La altura y el ancho de la pista salen de `switcher.*` (`em` del cuerpo de 16 sp, que crece con la escala de fuente
 * del sistema). Estados: marcado (`track-bg-checked`), deshabilitado (opacidad), foco de teclado y error (anillo).
 *
 * **TalkBack**: se anuncia como interruptor (`Role.Switch`) con «activado/desactivado» del sistema. Sin etiqueta
 * visible, [contentDescription] es su nombre.
 *
 * @param size sin valor toma la del entorno ([com.studiolxd.brand.support.ProvideBrandControlSize]) y, si tampoco hay, `md`.
 * @param error marca el interruptor en error con un anillo.
 * @param contentDescription nombre accesible cuando no hay [label] visible.
 */
@Composable
fun BrandSwitcher(
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit,
    modifier: Modifier = Modifier,
    size: BrandControlSize? = null,
    error: Boolean = false,
    enabled: Boolean = true,
    contentDescription: String? = null,
    interactionSource: MutableInteractionSource? = null,
    label: (@Composable () -> Unit)? = null,
) {
    val resolved = size.resolve()
    val source = interactionSource ?: remember { MutableInteractionSource() }
    val state = source.collectBrandInteractionState()
    val reduceMotion = rememberReduceMotion()
    val em = BrandFontSize.s2.value

    val trackWidth: Dp = when (resolved) {
        BrandControlSize.Sm -> (T.smTrackWidth * em).sp.toScaledDp()
        BrandControlSize.Md -> (T.trackWidth * em).sp.toScaledDp()
        BrandControlSize.Lg -> T.lgTrackWidth.scaledByFontScale()
    }
    val trackHeight: Dp = when (resolved) {
        BrandControlSize.Sm -> (T.smTrackHeight * em).sp.toScaledDp()
        BrandControlSize.Md -> (T.trackHeight * em).sp.toScaledDp()
        BrandControlSize.Lg -> T.lgTrackHeight.scaledByFontScale()
    }
    val thumb: Dp = when (resolved) {
        BrandControlSize.Sm -> (T.smThumbSize * em).sp.toScaledDp()
        BrandControlSize.Md -> (T.thumbSize * em).sp.toScaledDp()
        BrandControlSize.Lg -> T.lgThumbSize.scaledByFontScale()
    }
    val padding = (T.trackPadding * em).sp.toScaledDp()
    val gap = when (resolved) {
        BrandControlSize.Sm -> F.smGap
        BrandControlSize.Md -> F.gap
        BrandControlSize.Lg -> F.lgGap
    }
    val paddingBlock = when (resolved) {
        BrandControlSize.Sm -> F.smPaddingBlock
        BrandControlSize.Md -> F.paddingBlock
        BrandControlSize.Lg -> F.lgPaddingBlock
    }

    val trackColor = animatedFieldColor(
        (if (checked) T.trackBgChecked else T.trackBg).current, T.transitionDuration, T.transitionEasing, reduceMotion, "switcher-track",
    )
    val thumbX by animateDpAsState(
        if (checked) trackWidth - padding * 2 - thumb else 0.dp,
        brandTransition(T.transitionDuration, T.transitionEasing, reduceMotion),
        label = "switcher-thumb",
    )

    Row(
        modifier
            .then(if (label != null) Modifier.fillMaxWidth() else Modifier)
            .alpha(if (enabled) 1f else T.disabledOpacity)
            .toggleable(
                value = checked,
                interactionSource = source,
                indication = null,
                enabled = enabled,
                role = Role.Switch,
                onValueChange = onCheckedChange,
            )
            .then(if (contentDescription != null) Modifier.semantics { this.contentDescription = contentDescription } else Modifier)
            .padding(vertical = paddingBlock),
        horizontalArrangement = Arrangement.spacedBy(gap),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Box(
            Modifier
                .size(trackWidth, trackHeight)
                .brandFocusRing(error, T.errorRingColor.current, T.errorRingWidth, T.errorRingOffset, T.trackBorderRadius)
                .brandFocusRing(state.focusVisible || LocalBrandForcedFocus.current, T.focusRingColor.current, T.focusRingWidth, T.focusRingOffset, T.trackBorderRadius)
                .background(trackColor, CircleShape),
            contentAlignment = Alignment.CenterStart,
        ) {
            Box(
                Modifier
                    .padding(start = padding)
                    .offset { IntOffset(thumbX.roundToPx(), 0) }
                    .size(thumb)
                    .background(T.thumbBg.current, CircleShape),
            )
        }
        if (label != null) Box(Modifier.weight(1f, fill = false)) { label() }
    }
}
