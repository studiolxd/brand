package com.studiolxd.brand.components.numberinputfield

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableDoubleStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.tooling.preview.Preview
import com.studiolxd.brand.support.BrandPreviewSurface
import com.studiolxd.brand.tokens.BrandSpacing

/** Todas las variantes de `NumberInputField`: límites, decimales, estados y tallas. */
@Composable
internal fun NumberInputFieldPreviewContent() {
    var quantity by remember { mutableDoubleStateOf(3.0) }
    var amount by remember { mutableDoubleStateOf(12.5) }
    Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s5)) {
        BrandNumberInputField("Cantidad", quantity, { quantity = it }, min = 0.0, max = 5.0, helperText = "Entre 0 y 5")
        BrandNumberInputField("Importe", amount, { amount = it }, step = 0.5, decimal = true)
        BrandNumberInputField("Con error", quantity, { quantity = it }, errorMessage = "Demasiadas unidades")
        BrandNumberInputField("Deshabilitado", quantity, { quantity = it }, enabled = false)
        BrandNumberInputField("Solo lectura", quantity, { quantity = it }, readOnly = true)
        NumberInputFieldSize.entries.forEach { size ->
            BrandNumberInputField("Talla ${size.value}", quantity, { quantity = it }, size = size)
        }
    }
}

@Preview(name = "NumberInputField — claro", showBackground = true, widthDp = 360, heightDp = 1200)
@Composable
internal fun NumberInputFieldPreviewLight() = BrandPreviewSurface(dark = false) { NumberInputFieldPreviewContent() }

@Preview(name = "NumberInputField — oscuro", showBackground = true, widthDp = 360, heightDp = 1200)
@Composable
internal fun NumberInputFieldPreviewDark() = BrandPreviewSurface(dark = true) { NumberInputFieldPreviewContent() }
