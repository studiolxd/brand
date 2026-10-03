package com.studiolxd.brand.components.inputfield

import androidx.compose.foundation.clickable
import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsFocusedAsState
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.text.BasicText
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.clearAndSetSemantics
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.KeyboardCapitalization
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.studiolxd.brand.components.field.BrandFieldLayout
import com.studiolxd.brand.components.field.FieldHelperStyle
import com.studiolxd.brand.components.field.LocalBrandForcedFocus
import com.studiolxd.brand.components.field.animatedFieldColor
import com.studiolxd.brand.components.field.brandFieldBox
import com.studiolxd.brand.components.field.brandFieldSemantics
import com.studiolxd.brand.icon.BrandIcon
import com.studiolxd.brand.icon.BrandIconName
import com.studiolxd.brand.icon.BrandIconSize
import com.studiolxd.brand.support.BrandControlSize
import com.studiolxd.brand.support.LocalBrandIconTextSize
import com.studiolxd.brand.support.brandFocusRing
import com.studiolxd.brand.support.brandTextStyle
import com.studiolxd.brand.support.collectBrandInteractionState
import com.studiolxd.brand.support.rememberReduceMotion
import com.studiolxd.brand.support.resolve
import com.studiolxd.brand.support.scaledByFontScale
import com.studiolxd.brand.tokens.BrandInputFieldTokens as F
import com.studiolxd.brand.tokens.BrandInputTokens as T

/**
 * `InputField` `type`: el tipo de contenido (teclado, autocapitalización y rellenado automático adecuados). `search` no
 * está: para un campo de búsqueda, `kind = Search`.
 */
enum class InputFieldType(val value: String) {
    Text("text"),
    Email("email"),
    Password("password"),
    Number("number"),
    Tel("tel"),
    Url("url"),
}

/** `InputField` `kind`: `search` lo convierte en campo de búsqueda: lupa fija al inicio y tecla de intro «buscar». */
enum class InputFieldKind(val value: String) {
    Text("text"),
    Search("search"),
}

/** `InputField` `size`: la talla de control compartida. */
typealias InputFieldSize = BrandControlSize

/** El teclado de un tipo de campo: tipo de teclado, mayúsculas, corrector e intro. Interno y comprobable. */
internal fun inputKeyboardOptions(type: InputFieldType, kind: InputFieldKind): KeyboardOptions {
    if (kind == InputFieldKind.Search) {
        return KeyboardOptions(capitalization = KeyboardCapitalization.None, autoCorrectEnabled = false, keyboardType = KeyboardType.Text, imeAction = ImeAction.Search)
    }
    return when (type) {
        InputFieldType.Text -> KeyboardOptions(keyboardType = KeyboardType.Text, imeAction = ImeAction.Done)
        InputFieldType.Email -> KeyboardOptions(capitalization = KeyboardCapitalization.None, autoCorrectEnabled = false, keyboardType = KeyboardType.Email, imeAction = ImeAction.Done)
        InputFieldType.Password -> KeyboardOptions(capitalization = KeyboardCapitalization.None, autoCorrectEnabled = false, keyboardType = KeyboardType.Password, imeAction = ImeAction.Done)
        InputFieldType.Number -> KeyboardOptions(keyboardType = KeyboardType.Number, imeAction = ImeAction.Done)
        InputFieldType.Tel -> KeyboardOptions(keyboardType = KeyboardType.Phone, imeAction = ImeAction.Done)
        InputFieldType.Url -> KeyboardOptions(capitalization = KeyboardCapitalization.None, autoCorrectEnabled = false, keyboardType = KeyboardType.Uri, imeAction = ImeAction.Done)
    }
}

/**
 * Un campo de texto de la marca con su etiqueta, ayuda y mensaje de error (`InputField` de React).
 *
 * ```kotlin
 * BrandInputField("Correo", email, { email = it }, type = InputFieldType.Email, helperText = "Te escribiremos aquí")
 * BrandInputField("Nombre", name, { name = it }, errorMessage = "Obligatorio")
 * BrandInputField("Buscar", query, { query = it }, labelHidden = true, kind = InputFieldKind.Search, clearable = true)
 * ```
 *
 * Estados: reposo, foco (anillo interior), error ([error] o un [errorMessage]), deshabilitado ([enabled]) y de solo
 * lectura ([readOnly], el texto se puede seleccionar). La altura y el tamaño de letra crecen con la escala de fuente
 * del sistema. Toda la caja enfoca el campo al tocarla.
 *
 * **TalkBack**: la etiqueta es el nombre del control; el error se publica con `error()` y la ayuda como descripción de
 * estado, así que los textos visibles no se leen dos veces.
 *
 * @param labelHidden oculta la etiqueta a la vista (TalkBack la sigue leyendo). Sin [placeholder], el control usa la
 *   etiqueta como marcador de sitio.
 * @param clearable solo con `kind = Search`: un aspa al final del campo cuando hay texto.
 * @param clearLabel nombre accesible del aspa. Castellano por defecto («Borrar»).
 * @param passwordToggle con `type = Password`: un ojo al final para mostrar u ocultar la contraseña.
 * @param showPasswordLabel nombre accesible del ojo cuando la contraseña está oculta. Castellano por defecto.
 * @param hidePasswordLabel nombre accesible del ojo cuando la contraseña se ve. Castellano por defecto.
 * @param invalidLabel lo que lee TalkBack cuando el campo está en [error] sin [errorMessage]. Castellano por defecto.
 * @param onSubmit la tecla de intro (buscar o hecho).
 * @param size sin valor toma la del entorno ([com.studiolxd.brand.support.ProvideBrandControlSize]) y, si tampoco hay, `md`.
 */
@Composable
fun BrandInputField(
    label: String,
    value: String,
    onValueChange: (String) -> Unit,
    modifier: Modifier = Modifier,
    labelHidden: Boolean = false,
    type: InputFieldType = InputFieldType.Text,
    kind: InputFieldKind = InputFieldKind.Text,
    clearable: Boolean = false,
    clearLabel: String = "Borrar",
    onClear: (() -> Unit)? = null,
    placeholder: String? = null,
    readOnly: Boolean = false,
    enabled: Boolean = true,
    error: Boolean = false,
    errorMessage: String? = null,
    helperText: String? = null,
    size: InputFieldSize? = null,
    passwordToggle: Boolean = true,
    showPasswordLabel: String = "Mostrar contraseña",
    hidePasswordLabel: String = "Ocultar contraseña",
    invalidLabel: String = "Valor no válido",
    onSubmit: (() -> Unit)? = null,
    interactionSource: MutableInteractionSource? = null,
) {
    val resolved = size.resolve()
    val source = interactionSource ?: remember { MutableInteractionSource() }
    val focused by source.collectIsFocusedAsState()
    val reduceMotion = rememberReduceMotion()
    val focusRequester = remember { FocusRequester() }
    var revealed by remember { mutableStateOf(false) }

    val isSearch = kind == InputFieldKind.Search
    val isPassword = type == InputFieldType.Password && !isSearch
    val hasError = error || errorMessage != null
    val isFocused = (focused || LocalBrandForcedFocus.current) && enabled

    val height = when (resolved) {
        BrandControlSize.Sm -> T.smHeight
        BrandControlSize.Md -> T.height
        BrandControlSize.Lg -> T.lgHeight
    }.scaledByFontScale()
    val fontSize: TextUnit = when (resolved) {
        BrandControlSize.Sm -> T.smFontSize
        BrandControlSize.Md -> T.fontSize
        BrandControlSize.Lg -> T.lgFontSize
    }
    val paddingInline = when (resolved) {
        BrandControlSize.Sm -> T.smPaddingInline
        BrandControlSize.Md -> T.paddingInline
        BrandControlSize.Lg -> T.lgPaddingInline
    }
    val slot = when (resolved) {
        BrandControlSize.Sm -> F.searchSmSlotSize
        BrandControlSize.Md -> F.searchSlotSize
        BrandControlSize.Lg -> F.searchLgSlotSize
    }
    val iconSize = when (resolved) {
        BrandControlSize.Sm -> F.searchSmIconSize
        BrandControlSize.Md -> F.searchIconSize
        BrandControlSize.Lg -> F.searchLgIconSize
    }

    val textColor = when {
        !enabled -> T.disabledColor.current
        hasError -> T.errorColor.current
        else -> T.color.current
    }
    val placeholderColor = (if (hasError) T.errorPlaceholderColor else T.placeholderColor).current
    val background = animatedFieldColor(
        when {
            !enabled -> T.disabledBg.current
            hasError -> T.errorBg.current
            else -> T.bg.current
        },
        T.transitionDuration, T.transitionEasing, reduceMotion, "input-bg",
    )
    val border = animatedFieldColor(
        when {
            !enabled -> T.disabledBorderColor.current
            hasError -> (if (isFocused) T.errorFocusBorderColor else T.errorBorderColor).current
            else -> (if (isFocused) T.focusBorderColor else T.borderColor).current
        },
        T.transitionDuration, T.transitionEasing, reduceMotion, "input-border",
    )

    val showsClear = isSearch && clearable && value.isNotEmpty() && enabled && !readOnly
    val showsReveal = isPassword && passwordToggle
    val hasTrailingSlot = (isSearch && clearable) || showsReveal

    val textStyle = brandTextStyle(fontSize, T.fontWeight, T.lineHeight, color = textColor)
    val keyboardOptions = inputKeyboardOptions(type, kind)

    BrandFieldLayout(
        label = label,
        labelHidden = labelHidden,
        size = resolved,
        gap = F.gap,
        errorMessage = errorMessage,
        helperText = helperText,
        helper = FieldHelperStyle(F.helperFontSize, F.helperFontWeight, F.helperLineHeight, F.helperColor.current),
        modifier = modifier,
    ) {
        Row(
            Modifier
                .fillMaxWidth()
                .heightIn(min = height)
                .brandFieldBox(
                    radius = T.borderRadius,
                    borderWidth = T.borderWidth,
                    background = background,
                    border = border,
                    ringWidth = T.focusRingWidth,
                    ringInsetOffset = T.focusRingInsetOffset,
                    ringColor = (if (hasError) T.errorFocusRingColor else T.focusRingColor).current,
                    focused = isFocused,
                )
                .pointerInput(enabled, readOnly) { detectTapGestures { if (enabled) focusRequester.requestFocus() } }
                .padding(start = if (isSearch) 0.dp else paddingInline, end = if (hasTrailingSlot) 0.dp else paddingInline),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            if (isSearch) {
                Box(Modifier.size(slot).clearAndSetSemantics { }, contentAlignment = Alignment.Center) {
                    FieldGlyph(BrandIconName.Search, iconSize, F.searchIconColor.current)
                }
            }
            BasicTextField(
                value = value,
                onValueChange = onValueChange,
                modifier = Modifier
                    .weight(1f)
                    .focusRequester(focusRequester)
                    .brandFieldSemantics(label, hasError, errorMessage, helperText, invalidLabel),
                enabled = enabled,
                readOnly = readOnly,
                textStyle = textStyle,
                keyboardOptions = keyboardOptions,
                keyboardActions = KeyboardActions(onSearch = { onSubmit?.invoke() }, onDone = { onSubmit?.invoke() }),
                singleLine = true,
                visualTransformation = if (isPassword && !revealed) PasswordVisualTransformation() else VisualTransformation.None,
                interactionSource = source,
                cursorBrush = SolidColor(textColor),
                decorationBox = { inner ->
                    Box(contentAlignment = Alignment.CenterStart) {
                        val hint = placeholder ?: if (labelHidden) label else ""
                        if (value.isEmpty() && hint.isNotEmpty()) {
                            BasicText(hint, modifier = Modifier.clearAndSetSemantics { }, style = textStyle.copy(color = placeholderColor), maxLines = 1)
                        }
                        inner()
                    }
                },
            )
            if (isSearch && clearable) {
                FieldIconButton(
                    icon = BrandIconName.Close,
                    label = clearLabel,
                    visible = showsClear,
                    slot = slot,
                    iconSize = iconSize,
                    color = F.searchClearColor.current,
                    ringColor = F.searchClearFocusRingColor.current,
                    ringWidth = F.searchClearFocusRingWidth,
                    ringOffset = F.searchClearFocusRingOffset,
                ) {
                    onValueChange("")
                    focusRequester.requestFocus()
                    onClear?.invoke()
                }
            }
            if (showsReveal) {
                FieldIconButton(
                    icon = if (revealed) BrandIconName.EyeOff else BrandIconName.Eye,
                    label = if (revealed) hidePasswordLabel else showPasswordLabel,
                    visible = enabled,
                    slot = slot,
                    iconSize = iconSize,
                    color = F.searchClearColor.current,
                    ringColor = F.searchClearFocusRingColor.current,
                    ringWidth = F.searchClearFocusRingWidth,
                    ringOffset = F.searchClearFocusRingOffset,
                ) { revealed = !revealed }
            }
        }
    }
}

/** Un glifo de campo (lupa, aspa, ojo): un icono `size = Text` al tamaño del token, que crece con la escala de fuente. */
@Composable
private fun FieldGlyph(icon: BrandIconName, size: Dp, color: Color) {
    CompositionLocalProvider(LocalBrandIconTextSize provides size.value.sp) {
        BrandIcon(icon, size = BrandIconSize.Text, color = color)
    }
}

/**
 * Un botón de icono al final del campo (borrar, mostrar contraseña). Conserva su hueco aunque no se vea
 * ([visible] = `false`: transparente, sin clic y fuera de TalkBack) para que el texto no salte al escribir.
 */
@Composable
private fun FieldIconButton(
    icon: BrandIconName,
    label: String,
    visible: Boolean,
    slot: Dp,
    iconSize: Dp,
    color: Color,
    ringColor: Color,
    ringWidth: Dp,
    ringOffset: Dp,
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
                    // El anillo va hacia dentro de la caja: el aspa está a ras del borde del campo.
                    Modifier
                        .brandFocusRing(state.focusVisible, ringColor, ringWidth, -(ringOffset + ringWidth))
                        .clickable(interactionSource = source, indication = null, role = Role.Button, onClick = onClick)
                        .semantics { contentDescription = label }
                } else {
                    Modifier.clearAndSetSemantics { }
                },
            ),
        contentAlignment = Alignment.Center,
    ) { FieldGlyph(icon, iconSize, color) }
}
