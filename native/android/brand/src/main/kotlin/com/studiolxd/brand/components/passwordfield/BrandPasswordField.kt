package com.studiolxd.brand.components.passwordfield

import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsFocusedAsState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.compositionLocalOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.FocusRequester
import com.studiolxd.brand.components.field.BrandFieldIconButton
import com.studiolxd.brand.components.inputfield.BrandTextFieldImpl
import com.studiolxd.brand.components.inputfield.InputFieldKind
import com.studiolxd.brand.components.inputfield.InputFieldSize
import com.studiolxd.brand.components.inputfield.InputFieldType
import com.studiolxd.brand.icon.BrandIconName
import com.studiolxd.brand.support.BrandControlSize
import com.studiolxd.brand.support.resolve
import com.studiolxd.brand.tokens.BrandPasswordFieldTokens as T

/**
 * Con `true`, los campos de contraseña de este árbol arrancan con el texto a la vista. Solo para capturas y vistas
 * previas: layoutlib no puede pulsar el ojo. Interno.
 */
internal val LocalBrandPasswordRevealed = compositionLocalOf { false }

/** `PasswordField` `size`: la talla de control compartida (la misma que `InputField`). */
typealias PasswordFieldSize = InputFieldSize

/**
 * Un campo de contraseña con el ojo de mostrar y ocultar dentro de la caja (`PasswordField` de React).
 *
 * ```kotlin
 * BrandPasswordField("Contraseña", password, { password = it }, errorMessage = "Mínimo 8 caracteres")
 * BrandPasswordField("Contraseña", password, { password = it }, labelHidden = true)
 * ```
 *
 * Es un [com.studiolxd.brand.components.inputfield.BrandInputField] de tipo contraseña (mismas cajas, tallas, estados
 * y tokens) más el ojo al final. Con la contraseña oculta el campo es seguro: teclado de contraseña, sin corrector,
 * sin copiar ni cortar, y pide el relleno automático de contraseñas del sistema. Al alternar el ojo el campo conserva el
 * foco y la posición del cursor; la contraseña vuelve a estar oculta cuando el componente sale de pantalla (la
 * visibilidad no se guarda).
 *
 * **TalkBack**: el ojo es un botón de dos estados (`ToggleableState`) cuyo nombre depende del estado
 * ([showPasswordLabel] u [hidePasswordLabel]); su zona táctil llega a 48 dp. Como en React, la etiqueta se ve por
 * defecto; con [labelHidden] = `true` se oculta a la vista, TalkBack la sigue leyendo y sirve de marcador de sitio.
 *
 * **Foco desde fuera** (el `ref` de React): pasa un [FocusRequester] y llámale `requestFocus()`; va sobre el propio
 * campo de texto, así lleva el cursor y sube el teclado.
 * ```kotlin
 * val focus = remember { FocusRequester() }
 * BrandPasswordField("Contraseña", password, { password = it }, focusRequester = focus)
 * LaunchedEffect(Unit) { focus.requestFocus() }
 * ```
 *
 * @param labelHidden oculta la etiqueta a la vista. Por defecto `false`, como en React y en `InputField`.
 * @param showPasswordLabel nombre accesible del ojo cuando la contraseña está oculta. Castellano por defecto.
 * @param hidePasswordLabel nombre accesible del ojo cuando la contraseña se ve. Castellano por defecto.
 * @param invalidLabel lo que lee TalkBack cuando el campo está en [error] sin [errorMessage]. Castellano por defecto.
 * @param size sin valor toma la del entorno ([com.studiolxd.brand.support.ProvideBrandControlSize]) y, si tampoco hay, `md`.
 * @param interactionSource para observar el foco del campo de texto desde fuera; sin él, el campo usa uno propio.
 */
@Composable
fun BrandPasswordField(
    label: String,
    value: String,
    onValueChange: (String) -> Unit,
    modifier: Modifier = Modifier,
    labelHidden: Boolean = false,
    placeholder: String? = null,
    enabled: Boolean = true,
    error: Boolean = false,
    errorMessage: String? = null,
    helperText: String? = null,
    size: PasswordFieldSize? = null,
    showPasswordLabel: String = "Mostrar contraseña",
    hidePasswordLabel: String = "Ocultar contraseña",
    invalidLabel: String = "Valor no válido",
    focusRequester: FocusRequester? = null,
    interactionSource: MutableInteractionSource? = null,
) {
    val source = interactionSource ?: remember { MutableInteractionSource() }
    val focused by source.collectIsFocusedAsState()
    val requester = focusRequester ?: remember { FocusRequester() }
    val initiallyRevealed = LocalBrandPasswordRevealed.current
    val resolved = size.resolve()
    var revealed by remember { mutableStateOf(initiallyRevealed) }

    BrandTextFieldImpl(
        label = label,
        value = value,
        onValueChange = onValueChange,
        modifier = modifier,
        labelHidden = labelHidden,
        type = InputFieldType.Password,
        kind = InputFieldKind.Text,
        clearable = false,
        clearLabel = "",
        onClear = null,
        placeholder = placeholder,
        readOnly = false,
        enabled = enabled,
        error = error,
        errorMessage = errorMessage,
        helperText = helperText,
        size = size,
        invalidLabel = invalidLabel,
        onSubmit = null,
        interactionSource = source,
        focusRequester = requester,
        obscured = !revealed,
        gap = T.gap,
    ) {
        BrandFieldIconButton(
            icon = if (revealed) BrandIconName.EyeOff else BrandIconName.Eye,
            label = if (revealed) hidePasswordLabel else showPasswordLabel,
            slot = when (resolved) {
                BrandControlSize.Sm -> T.smToggleSize
                BrandControlSize.Md -> T.toggleSize
                BrandControlSize.Lg -> T.lgToggleSize
            },
            iconSize = when (resolved) {
                BrandControlSize.Sm -> T.smToggleIconSize
                BrandControlSize.Md -> T.toggleIconSize
                BrandControlSize.Lg -> T.lgToggleIconSize
            },
            color = T.toggleColor,
            ringColor = T.toggleFocusRingColor,
            ringWidth = T.toggleFocusRingWidth,
            ringOffset = T.toggleFocusRingOffset,
            enabled = enabled,
            pressed = revealed,
        ) {
            // El campo conserva el foco (y con él el cursor) al alternar: si lo tenía, se lo devolvemos.
            val hadFocus = focused
            revealed = !revealed
            if (hadFocus) requester.requestFocus()
        }
    }
}
