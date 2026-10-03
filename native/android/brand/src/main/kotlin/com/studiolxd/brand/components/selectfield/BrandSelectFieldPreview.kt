package com.studiolxd.brand.components.selectfield

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.studiolxd.brand.components.field.BrandDropdownSurface
import com.studiolxd.brand.support.BrandControlSize
import com.studiolxd.brand.support.BrandPreviewSurface
import com.studiolxd.brand.tokens.BrandSpacing

internal val previewLanguages: List<BrandSelectEntry> = listOf(
    BrandSelectEntry.option("es", "Español"),
    BrandSelectEntry.option("en", "Inglés"),
    BrandSelectEntry.option("fr", "Francés"),
)

internal val previewCities: List<BrandSelectEntry> = listOf(
    BrandSelectEntry.group("España", listOf(BrandSelectOption("madrid", "Madrid"), BrandSelectOption("bcn", "Barcelona"))),
    BrandSelectEntry.group("Francia", listOf(BrandSelectOption("paris", "París"))),
)

/** Todas las variantes de `SelectField`: estados, grupos y tallas, y el desplegable abierto. */
@Composable
internal fun SelectFieldPreviewContent() {
    var language by remember { mutableStateOf("es") }
    var empty by remember { mutableStateOf("") }
    var city by remember { mutableStateOf("madrid") }
    Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s5)) {
        BrandSelectField("Idioma", language, { language = it }, previewLanguages, helperText = "Cambia el idioma de la app")
        BrandSelectField("Sin elegir", empty, { empty = it }, previewLanguages)
        BrandSelectField("Con error", empty, { empty = it }, previewLanguages, errorMessage = "Elige una opción")
        BrandSelectField("Deshabilitado", language, { language = it }, previewLanguages, enabled = false)
        BrandSelectField("Con grupos", city, { city = it }, previewCities)
        BrandControlSize.entries.forEach { size ->
            BrandSelectField("Talla ${size.value}", language, { language = it }, previewLanguages, size = size)
        }
    }
}

/** El desplegable abierto, tal como lo pinta el popup, con la opción elegida y un grupo. */
@Composable
internal fun SelectMenuPreviewContent() {
    Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s5)) {
        BrandDropdownSurface(minWidth = 160.dp) { BrandSelectMenu(previewLanguages, "en", BrandControlSize.Md) {} }
        BrandDropdownSurface(minWidth = 160.dp) { BrandSelectMenu(previewCities, "paris", BrandControlSize.Md) {} }
    }
}

@Preview(name = "SelectField — claro", showBackground = true, widthDp = 360, heightDp = 1000)
@Composable
internal fun SelectFieldPreviewLight() = BrandPreviewSurface(dark = false) { SelectFieldPreviewContent() }

@Preview(name = "SelectField — oscuro", showBackground = true, widthDp = 360, heightDp = 1000)
@Composable
internal fun SelectFieldPreviewDark() = BrandPreviewSurface(dark = true) { SelectFieldPreviewContent() }

@Preview(name = "SelectField — desplegable", showBackground = true, widthDp = 360, heightDp = 400)
@Composable
internal fun SelectMenuPreview() = BrandPreviewSurface(dark = false) { SelectMenuPreviewContent() }
