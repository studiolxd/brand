package com.studiolxd.brand.components.datepickerfield

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.tooling.preview.Preview
import com.studiolxd.brand.support.BrandControlSize
import com.studiolxd.brand.support.BrandPreviewSurface
import com.studiolxd.brand.tokens.BrandSpacing
import java.time.LocalDate

/** La fecha de las stories de React: el 18 de mayo de 2026. */
internal val previewDate: LocalDate = LocalDate.of(2026, 5, 18)

/** Todas las variantes de `DatePickerField`: vacío, con fecha, ayuda, error, solo lectura, deshabilitado y las tres tallas. */
@Composable
internal fun DatePickerFieldPreviewContent() {
    var empty by remember { mutableStateOf<LocalDate?>(null) }
    var picked by remember { mutableStateOf<LocalDate?>(previewDate) }
    Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s5)) {
        BrandDatePickerField("Fecha de inicio", empty, { empty = it })
        BrandDatePickerField("Con fecha", picked, { picked = it }, helperText = "La fecha en la que empieza el contrato.")
        BrandDatePickerField("Con error", empty, { empty = it }, errorMessage = "Elige una fecha.", helperText = "La fecha en la que empieza el contrato.")
        BrandDatePickerField("Solo lectura", previewDate, {}, readOnly = true)
        BrandDatePickerField("Deshabilitado", previewDate, {}, enabled = false)
        BrandControlSize.entries.forEach { size ->
            BrandDatePickerField("Talla ${size.value}", empty, { empty = it }, size = size)
        }
    }
}

@Preview(name = "DatePickerField — claro", showBackground = true, widthDp = 360, heightDp = 1000)
@Composable
internal fun DatePickerFieldPreviewLight() = BrandPreviewSurface(dark = false) { DatePickerFieldPreviewContent() }

@Preview(name = "DatePickerField — oscuro", showBackground = true, widthDp = 360, heightDp = 1000)
@Composable
internal fun DatePickerFieldPreviewDark() = BrandPreviewSurface(dark = true) { DatePickerFieldPreviewContent() }
