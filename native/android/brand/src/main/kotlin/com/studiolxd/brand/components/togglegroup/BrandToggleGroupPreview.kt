package com.studiolxd.brand.components.togglegroup

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.text.BasicText
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.tooling.preview.Preview
import com.studiolxd.brand.icon.BrandIconName
import com.studiolxd.brand.support.BrandControlSize
import com.studiolxd.brand.support.BrandPreviewSurface
import com.studiolxd.brand.support.LocalBrandTextStyle
import com.studiolxd.brand.tokens.BrandSpacing

/** Todas las variantes de `Toggle` y `ToggleGroup`: exclusivo, múltiple, tallas, vertical, solo icono, deshabilitado. */
@Composable
internal fun ToggleGroupPreviewContent() {
    var plan by remember { mutableStateOf<String?>("Anual") }
    var filters by remember { mutableStateOf(setOf("Pagadas")) }
    var single by remember { mutableStateOf(true) }
    Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s4)) {
        BrandToggleGroup(value = plan, onValueChange = { plan = it }, contentDescription = "Plan") {
            Item("Mensual", "Mensual")
            Item("Anual", "Anual")
        }
        BrandToggleGroup(filters, { filters = it }, multiple = true, size = ToggleGroupSize.Sm) {
            Item("Pagadas", "Pagadas")
            Item("Pendientes", "Pendientes")
            Item("Vencidas", "Vencidas")
        }
        BrandControlSize.entries.forEach { size ->
            BrandToggleGroup(value = plan, onValueChange = { plan = it }, size = size) {
                Item("Día", "Día")
                Item("Semana", "Semana")
                Item("Mes", "Mes")
            }
        }
        BrandToggleGroup(value = plan, onValueChange = { plan = it }, orientation = ToggleGroupOrientation.Vertical) {
            Item("Mensual", "Mensual")
            Item("Anual", "Anual")
        }
        BrandToggleGroup(value = "b", onValueChange = {}) {
            Item(BrandIconName.Grid, "Cuadrícula", "a")
            Item(BrandIconName.Menu, "Lista", "b")
            Item("Deshabilitado", "c", enabled = false)
        }
        BrandToggle(single, { single = it }) { BasicText("Solo pendientes", style = LocalBrandTextStyle.current) }
    }
}

@Preview(name = "ToggleGroup — claro", showBackground = true, widthDp = 420, heightDp = 900)
@Composable
internal fun ToggleGroupPreviewLight() = BrandPreviewSurface(dark = false) { ToggleGroupPreviewContent() }

@Preview(name = "ToggleGroup — oscuro", showBackground = true, widthDp = 420, heightDp = 900)
@Composable
internal fun ToggleGroupPreviewDark() = BrandPreviewSurface(dark = true) { ToggleGroupPreviewContent() }
