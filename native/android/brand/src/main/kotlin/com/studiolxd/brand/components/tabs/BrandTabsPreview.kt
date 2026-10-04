package com.studiolxd.brand.components.tabs

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.text.BasicText
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.tooling.preview.Preview
import com.studiolxd.brand.components.text.BrandParagraph
import com.studiolxd.brand.support.BrandPreviewSurface
import com.studiolxd.brand.tokens.BrandSpacing

/** Todas las variantes de `Tabs`: subrayado, pill, vertical, con una pestaña deshabilitada y una barra que desplaza. */
@Composable
internal fun TabsPreviewContent() {
    var general by remember { mutableStateOf("General") }
    var period by remember { mutableStateOf("Mes") }
    var profile by remember { mutableStateOf("Perfil") }
    var disabled by remember { mutableStateOf("Uno") }
    var many by remember { mutableStateOf("General") }
    Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s5)) {
        BrandTabs(general, { general = it }, contentDescription = "Ajustes") {
            tab("General", "General"); tab("Seguridad", "Seguridad"); tab("Notificaciones", "Notificaciones")
        }
        BrandParagraph("Configuración general de la cuenta.")
        BrandTabs(period, { period = it }, variant = TabsVariant.Pill) {
            tab("Semana", "Semana"); tab("Mes", "Mes"); tab("Año", "Año")
        }
        Row(horizontalArrangement = Arrangement.spacedBy(BrandSpacing.s4)) {
            BrandTabs(profile, { profile = it }, orientation = TabsOrientation.Vertical) {
                tab("Perfil", "Perfil"); tab("Equipo", "Equipo"); tab("Facturación", "Facturación"); tab("API", "API")
            }
            BasicText("Información personal.", style = com.studiolxd.brand.support.LocalBrandTextStyle.current)
        }
        BrandTabs(disabled, { disabled = it }) { tab("Uno", "Uno"); tab("Dos", "Dos", enabled = false); tab("Tres", "Tres") }
        BrandTabs(many, { many = it }, variant = TabsVariant.Pill) {
            listOf("General", "Seguridad", "Notificaciones", "Facturación", "Integraciones").forEach { tab(it, it) }
        }
    }
}

@Preview(name = "Tabs — claro", showBackground = true, widthDp = 360, heightDp = 640)
@Composable
internal fun TabsPreviewLight() = BrandPreviewSurface(dark = false) { TabsPreviewContent() }

@Preview(name = "Tabs — oscuro", showBackground = true, widthDp = 360, heightDp = 640)
@Composable
internal fun TabsPreviewDark() = BrandPreviewSurface(dark = true) { TabsPreviewContent() }
