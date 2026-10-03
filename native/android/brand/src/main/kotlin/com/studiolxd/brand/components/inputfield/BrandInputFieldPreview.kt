package com.studiolxd.brand.components.inputfield

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.tooling.preview.Preview
import com.studiolxd.brand.support.BrandPreviewSurface
import com.studiolxd.brand.tokens.BrandSpacing

/** Todas las variantes de `InputField`: estados, tipos, búsqueda y tallas. Lo usan las `@Preview` y las capturas. */
@Composable
internal fun InputFieldPreviewContent() {
    var empty by remember { mutableStateOf("") }
    var filled by remember { mutableStateOf("Ada Lovelace") }
    var query by remember { mutableStateOf("casa") }
    var secret by remember { mutableStateOf("secreto") }
    Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s5)) {
        BrandInputField("Nombre", empty, { empty = it }, placeholder = "Escribe tu nombre")
        BrandInputField("Con valor y ayuda", filled, { filled = it }, helperText = "Así te verán los demás")
        BrandInputField("Con error", empty, { empty = it }, errorMessage = "Este campo es obligatorio")
        BrandInputField("Deshabilitado", filled, { filled = it }, enabled = false)
        BrandInputField("Solo lectura", filled, { filled = it }, readOnly = true)
        BrandInputField("Correo", empty, { empty = it }, type = InputFieldType.Email, placeholder = "nombre@dominio.com")
        BrandInputField("Contraseña", secret, { secret = it }, type = InputFieldType.Password)
        BrandInputField("Buscar", query, { query = it }, kind = InputFieldKind.Search, clearable = true)
        InputFieldSize.entries.forEach { size ->
            BrandInputField("Talla ${size.value}", filled, { filled = it }, size = size)
        }
    }
}

@Preview(name = "InputField — claro", showBackground = true, widthDp = 360, heightDp = 1500)
@Composable
internal fun InputFieldPreviewLight() = BrandPreviewSurface(dark = false) { InputFieldPreviewContent() }

@Preview(name = "InputField — oscuro", showBackground = true, widthDp = 360, heightDp = 1500)
@Composable
internal fun InputFieldPreviewDark() = BrandPreviewSurface(dark = true) { InputFieldPreviewContent() }
