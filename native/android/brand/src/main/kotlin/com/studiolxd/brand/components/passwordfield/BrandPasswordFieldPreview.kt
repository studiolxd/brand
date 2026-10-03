package com.studiolxd.brand.components.passwordfield

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.tooling.preview.Preview
import com.studiolxd.brand.support.BrandPreviewSurface
import com.studiolxd.brand.tokens.BrandSpacing

/** Todas las variantes de `PasswordField`: oculta, error, ayuda, deshabilitada y tallas. */
@Composable
internal fun PasswordFieldPreviewContent() {
    var empty by remember { mutableStateOf("") }
    var secret by remember { mutableStateOf("secreto123") }
    Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s5)) {
        BrandPasswordField("Contraseña", empty, { empty = it })
        BrandPasswordField("Contraseña", secret, { secret = it }, labelHidden = false, helperText = "Mínimo 8 caracteres")
        BrandPasswordField("Con error", secret, { secret = it }, labelHidden = false, errorMessage = "La contraseña no es correcta")
        BrandPasswordField("Deshabilitada", secret, { secret = it }, labelHidden = false, enabled = false)
        PasswordFieldSize.entries.forEach { size ->
            BrandPasswordField("Talla ${size.value}", secret, { secret = it }, labelHidden = false, size = size)
        }
    }
}

/**
 * Foco desde fuera: el campo recibe un [FocusRequester] y la pantalla le pide el foco al entrar (cursor en el campo y
 * teclado arriba). El mismo patrón vale para `BrandInputField` y `BrandNumberInputField`.
 */
@Composable
internal fun PasswordFieldFocusPreviewContent() {
    var password by remember { mutableStateOf("") }
    val focus = remember { FocusRequester() }
    LaunchedEffect(Unit) { focus.requestFocus() }
    BrandPasswordField("Contraseña", password, { password = it }, labelHidden = false, focusRequester = focus)
}

@Preview(name = "PasswordField — claro", showBackground = true, widthDp = 360, heightDp = 900)
@Composable
internal fun PasswordFieldPreviewLight() = BrandPreviewSurface(dark = false) { PasswordFieldPreviewContent() }

@Preview(name = "PasswordField — oscuro", showBackground = true, widthDp = 360, heightDp = 900)
@Composable
internal fun PasswordFieldPreviewDark() = BrandPreviewSurface(dark = true) { PasswordFieldPreviewContent() }

@Preview(name = "PasswordField — foco desde fuera", showBackground = true, widthDp = 360, heightDp = 160)
@Composable
internal fun PasswordFieldFocusPreview() = BrandPreviewSurface(dark = false) { PasswordFieldFocusPreviewContent() }
