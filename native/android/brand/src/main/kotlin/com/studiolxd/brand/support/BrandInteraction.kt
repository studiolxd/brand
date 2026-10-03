package com.studiolxd.brand.support

import androidx.compose.foundation.interaction.InteractionSource
import androidx.compose.foundation.interaction.collectIsFocusedAsState
import androidx.compose.foundation.interaction.collectIsHoveredAsState
import androidx.compose.foundation.interaction.collectIsPressedAsState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.Immutable
import androidx.compose.runtime.getValue
import androidx.compose.ui.platform.LocalInputModeManager
import androidx.compose.ui.input.InputMode

/**
 * El estado de interacción de un control, leído de su [InteractionSource]: pulsado, *hover* (puntero) y foco.
 * [focusVisible] es el foco **de teclado o DPAD**: con el dedo no hay anillo, como en cualquier control nativo.
 */
@Immutable
data class BrandInteractionState(
    val pressed: Boolean = false,
    val hovered: Boolean = false,
    val focused: Boolean = false,
    val focusVisible: Boolean = false,
)

/** Recoge el [BrandInteractionState] de un `InteractionSource` (el que se pasó a `clickable`). */
@Composable
fun InteractionSource.collectBrandInteractionState(): BrandInteractionState {
    val pressed by collectIsPressedAsState()
    val hovered by collectIsHoveredAsState()
    val focused by collectIsFocusedAsState()
    val keyboard = LocalInputModeManager.current.inputMode == InputMode.Keyboard
    return BrandInteractionState(pressed = pressed, hovered = hovered, focused = focused, focusVisible = focused && keyboard)
}
