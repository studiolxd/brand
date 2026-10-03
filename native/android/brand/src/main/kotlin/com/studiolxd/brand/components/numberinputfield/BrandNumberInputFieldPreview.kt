package com.studiolxd.brand.components.numberinputfield

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.tooling.preview.Preview
import com.studiolxd.brand.components.list.BrandListItem
import com.studiolxd.brand.support.BrandPreviewSurface
import com.studiolxd.brand.tokens.BrandSpacing

/** Todas las variantes de `NumberInputField`: límites, decimales, estados y tallas. */
@Composable
internal fun NumberInputFieldPreviewContent() {
    var quantity by remember { mutableStateOf<Double?>(3.0) }
    var empty by remember { mutableStateOf<Double?>(null) }
    var amount by remember { mutableStateOf<Double?>(12.5) }
    Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s5)) {
        BrandNumberInputField("Cantidad", quantity, { quantity = it }, min = 0.0, max = 5.0, helperText = "Entre 0 y 5")
        BrandNumberInputField("Importe", amount, { amount = it }, step = 0.5, decimal = true)
        BrandNumberInputField("Sin valor", empty, { empty = it }, min = 0.0, placeholder = "Sin indicar", helperText = "Déjalo vacío si no lo sabes")
        BrandNumberInputField("Con error", quantity, { quantity = it }, errorMessage = "Demasiadas unidades")
        BrandNumberInputField("Deshabilitado", quantity, { quantity = it }, enabled = false)
        BrandNumberInputField("Solo lectura", quantity, { quantity = it }, readOnly = true)
        NumberInputFieldSize.entries.forEach { size ->
            BrandNumberInputField("Talla ${size.value}", quantity, { quantity = it }, size = size)
        }
    }
}

/** El compacto como `trailing` de `BrandListItem`, con el aviso al confirmar (`commitMode = Blur`). */
@Composable
internal fun NumberInputFieldCompactPreviewContent() {
    var milk by remember { mutableStateOf<Double?>(2.0) }
    var eggs by remember { mutableStateOf<Double?>(12.0) }
    var bread by remember { mutableStateOf<Double?>(null) }
    Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s4)) {
        BrandListItem(text = "Leche entera", subtitle = "1 l", trailing = {
            BrandNumberInputField("Cantidad de leche", milk, { milk = it }, labelHidden = true, min = 0.0, max = 99.0, compact = true, commitMode = NumberInputCommitMode.Blur)
        })
        BrandListItem(text = "Huevos", trailing = {
            BrandNumberInputField("Cantidad de huevos", eggs, { eggs = it }, labelHidden = true, min = 0.0, max = 99.0, compact = true, commitMode = NumberInputCommitMode.Blur)
        })
        BrandListItem(text = "Pan de molde integral con semillas", trailing = {
            BrandNumberInputField("Cantidad de pan", bread, { bread = it }, labelHidden = true, placeholder = "–", compact = true)
        })
    }
}

/**
 * Foco desde fuera: el campo recibe un [FocusRequester] y la pantalla le pide el foco al entrar (cursor en el campo y
 * teclado arriba). El mismo patrón vale para `BrandInputField` y `BrandPasswordField`.
 */
@Composable
internal fun NumberInputFieldFocusPreviewContent() {
    var quantity by remember { mutableStateOf<Double?>(null) }
    val focus = remember { FocusRequester() }
    LaunchedEffect(Unit) { focus.requestFocus() }
    BrandNumberInputField("Cantidad", quantity, { quantity = it }, min = 0.0, focusRequester = focus)
}

@Preview(name = "NumberInputField — claro", showBackground = true, widthDp = 360, heightDp = 1200)
@Composable
internal fun NumberInputFieldPreviewLight() = BrandPreviewSurface(dark = false) { NumberInputFieldPreviewContent() }

@Preview(name = "NumberInputField — oscuro", showBackground = true, widthDp = 360, heightDp = 1200)
@Composable
internal fun NumberInputFieldPreviewDark() = BrandPreviewSurface(dark = true) { NumberInputFieldPreviewContent() }

@Preview(name = "NumberInputField — foco desde fuera", showBackground = true, widthDp = 360, heightDp = 160)
@Composable
internal fun NumberInputFieldFocusPreview() = BrandPreviewSurface(dark = false) { NumberInputFieldFocusPreviewContent() }
