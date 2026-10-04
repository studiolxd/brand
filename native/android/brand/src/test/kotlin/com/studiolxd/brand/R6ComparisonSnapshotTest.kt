package com.studiolxd.brand

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.layout
import androidx.compose.ui.unit.Constraints
import androidx.compose.ui.unit.dp
import com.studiolxd.brand.components.banner.BannerVariant
import com.studiolxd.brand.components.banner.BrandBannerImpl
import com.studiolxd.brand.components.banner.PreviewBannerAction
import com.studiolxd.brand.components.banner.PreviewBannerMessage
import com.studiolxd.brand.components.banner.PreviewBannerNotice
import com.studiolxd.brand.components.button.BrandButton
import com.studiolxd.brand.components.button.ButtonVariant
import com.studiolxd.brand.components.datepickerfield.BrandDatePickerField
import com.studiolxd.brand.components.menu.BrandContextMenuTrigger
import com.studiolxd.brand.components.menu.BrandMenuPanel
import com.studiolxd.brand.components.menu.ContextMenuTriggerOrientation
import com.studiolxd.brand.components.menu.previewMenuItems
import com.studiolxd.brand.components.pageintro.BrandPageIntroImpl
import com.studiolxd.brand.components.tabs.BrandTabs
import com.studiolxd.brand.components.tabs.TabsOrientation
import com.studiolxd.brand.components.tabs.TabsVariant
import com.studiolxd.brand.components.tag.BrandTag
import com.studiolxd.brand.components.tag.TagVariant
import com.studiolxd.brand.components.text.BrandParagraph
import com.studiolxd.brand.components.text.HeadingLevel
import com.studiolxd.brand.support.BrandControlSize
import com.studiolxd.brand.tokens.BrandSpacing
import java.time.LocalDate
import java.util.Locale
import org.junit.Rule
import org.junit.Test

/** El salto a `md` de la web (768): las parejas se miden a 480, que en React es «móvil», así que ahí apilan. */
private val ReactMd = 768.dp

/** Quita el margen del lienzo de capturas (16 dp por lado): el contenido arranca en la esquina y ocupa el lienzo entero. */
private fun Modifier.bleed(): Modifier = layout { measurable, constraints ->
    val margin = BrandSpacing.s4.roundToPx()
    val placeable = measurable.measure(Constraints(maxWidth = constraints.maxWidth + 2 * margin))
    layout(constraints.maxWidth, placeable.height) { placeable.place(-margin, -margin) }
}

private val es = Locale.forLanguageTag("es-ES")
private val may18 = LocalDate.of(2026, 5, 18)

/**
 * Las capturas de las parejas con Storybook de los componentes de R6 (`native/android/Comparisons/`): los mismos casos y
 * los mismos lienzos que React (su captura @2x ÷ 2) y que SwiftUI. Cada una compone lo que la story compone.
 */
class R6ComparisonSnapshotTest {
    @get:Rule
    val paparazzi = brandPaparazzi(160, 160)

    // ── Banner: a ancho completo, sin margen ─────────────────────────────────────────────────────────────────────────

    @Composable
    private fun BannerPair(variant: BannerVariant, text: String, action: String?, dismiss: Boolean) {
        Box(Modifier.bleed()) {
            BrandBannerImpl(
                Modifier, variant, if (action != null) ({ PreviewBannerAction(action) }) else null,
                if (dismiss) ({}) else null, "Descartar", ReactMd,
            ) { androidx.compose.foundation.text.BasicText(text, style = com.studiolxd.brand.support.LocalBrandTextStyle.current) }
        }
    }

    @Test
    fun bannerInfo() = paparazzi.brandComparison("banner-info", 480, 82) { BannerPair(BannerVariant.Info, PreviewBannerMessage, null, false) }

    @Test
    fun bannerWarning() = paparazzi.brandComparison("banner-aviso", 480, 106) { BannerPair(BannerVariant.Warning, PreviewBannerNotice, null, false) }

    @Test
    fun bannerError() = paparazzi.brandComparison("banner-error", 480, 130) { BannerPair(BannerVariant.Error, PreviewBannerMessage, "Dejar de suplantar", false) }

    @Test
    fun bannerAction() = paparazzi.brandComparison("banner-accion", 480, 130) { BannerPair(BannerVariant.Info, PreviewBannerMessage, "Dejar de suplantar", false) }

    @Test
    fun bannerDismiss() = paparazzi.brandComparison("banner-cierre", 480, 154) { BannerPair(BannerVariant.Info, PreviewBannerMessage, "Dejar de suplantar", true) }

    // ── Tabs ─────────────────────────────────────────────────────────────────────────────────────────────────────────

    @Test
    fun tabsUnderline() = paparazzi.brandComparison("tabs-underline", 480, 155) {
        Column {
            BrandTabs("General", {}) { tab("General", "General"); tab("Seguridad", "Seguridad"); tab("Notificaciones", "Notificaciones") }
            Spacer(Modifier.height(BrandSpacing.s4))
            BrandParagraph("Configuración general de la cuenta: nombre, correo, zona horaria y preferencias de idioma.")
        }
    }

    @Test
    fun tabsPill() = paparazzi.brandComparison("tabs-pill", 480, 138) {
        Column {
            BrandTabs("Mes", {}, variant = TabsVariant.Pill) { tab("Semana", "Semana"); tab("Mes", "Mes"); tab("Año", "Año") }
            Spacer(Modifier.height(BrandSpacing.s4))
            BrandParagraph("Datos del último mes.")
        }
    }

    @Test
    fun tabsVertical() = paparazzi.brandComparison("tabs-vertical", 480, 213) {
        Row(horizontalArrangement = Arrangement.spacedBy(BrandSpacing.s4)) {
            BrandTabs("Perfil", {}, orientation = TabsOrientation.Vertical) {
                tab("Perfil", "Perfil"); tab("Equipo", "Equipo"); tab("Facturación", "Facturación"); tab("API", "API")
            }
            BrandParagraph("Información personal: foto de perfil, nombre y descripción.", Modifier.weight(1f))
        }
    }

    // ── DatePickerField ──────────────────────────────────────────────────────────────────────────────────────────────

    @Test
    fun datePickerEmpty() = paparazzi.brandComparison("datepicker-vacio", 480, 101) {
        BrandDatePickerField("Fecha de inicio", null, {}, locale = es, modifier = Modifier.width(320.dp))
    }

    @Test
    fun datePickerValue() = paparazzi.brandComparison("datepicker-valor", 480, 101) {
        BrandDatePickerField("Fecha de inicio", may18, {}, locale = es, modifier = Modifier.width(320.dp))
    }

    @Test
    fun datePickerError() = paparazzi.brandComparison("datepicker-error", 480, 159) {
        BrandDatePickerField(
            "Fecha de inicio", null, {}, locale = es, modifier = Modifier.width(320.dp),
            errorMessage = "Elige una fecha.", helperText = "La fecha en la que empieza el contrato.",
        )
    }

    @Test
    fun datePickerSizes() = paparazzi.brandComparison("datepicker-tallas", 480, 280) {
        Column(Modifier.width(320.dp), verticalArrangement = Arrangement.spacedBy(BrandSpacing.s4)) {
            BrandDatePickerField("Pequeño", null, {}, size = BrandControlSize.Sm, locale = es)
            BrandDatePickerField("Mediano", null, {}, size = BrandControlSize.Md, locale = es)
            BrandDatePickerField("Grande", null, {}, size = BrandControlSize.Lg, locale = es)
        }
    }

    @Test
    fun datePickerDisabled() = paparazzi.brandComparison("datepicker-deshabilitado", 480, 101) {
        BrandDatePickerField("Fecha de inicio", may18, {}, enabled = false, locale = es, modifier = Modifier.width(320.dp))
    }

    // ── PageIntro ────────────────────────────────────────────────────────────────────────────────────────────────────

    @Composable
    private fun IntroPair(
        title: String,
        description: String? = null,
        eyebrow: (@Composable () -> Unit)? = null,
        actions: (@Composable () -> Unit)? = null,
        content: (@Composable () -> Unit)? = null,
    ) = BrandPageIntroImpl(title, Modifier, HeadingLevel.H1, null, description, eyebrow, actions, content, ReactMd)

    @Test
    fun pageIntroSentence() = paparazzi.brandComparison("pageintro-frase", 480, 192) {
        IntroPair("¿Olvidaste tu contraseña?", "Ingresa tu correo y te enviaremos un enlace para restablecerla.")
    }

    @Test
    fun pageIntroAction() = paparazzi.brandComparison("pageintro-accion", 480, 128) {
        IntroPair("Miembros", actions = { BrandButton("Invitar miembro", onClick = {}) })
    }

    @Test
    fun pageIntroTwoActions() = paparazzi.brandComparison("pageintro-dos-acciones", 480, 180) {
        IntroPair("Webhooks", actions = {
            BrandButton("Crear webhook", onClick = {})
            BrandButton("Ver registro", onClick = {}, variant = ButtonVariant.Outline)
        })
    }

    @Test
    fun pageIntroEyebrow() = paparazzi.brandComparison("pageintro-eyebrow", 480, 412) {
        Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s7)) {
            IntroPair(
                "Automatizaciones",
                "Reglas que se disparan solas cuando algo cambia en la organización.",
                eyebrow = { BrandTag("Beta", variant = TagVariant.Info) },
                content = { BrandParagraph("Disponible solo para el plan Studio.") },
            )
            IntroPair(
                "Webhooks",
                eyebrow = { BrandTag("Beta", variant = TagVariant.Info) },
                actions = { BrandButton("Crear webhook", onClick = {}) },
            )
        }
    }

    // ── ContextMenu ──────────────────────────────────────────────────────────────────────────────────────────────────

    @Test
    fun contextMenuClosed() = paparazzi.brandComparison("contextmenu-cerrado", 480, 200) {
        // El lienzo de la pantalla es cuadrado: el alto del contenido es el de la pareja (200 dp menos los 32 de margen).
        Box(Modifier.fillMaxWidth().height(168.dp), contentAlignment = Alignment.Center) {
            BrandContextMenuTrigger({}, BrandControlSize.Md, ContextMenuTriggerOrientation.Horizontal, "Más opciones")
        }
    }

    /** El panel abierto: el contenido del `Popup` (layoutlib no pinta ventanas emergentes), a su ancho mínimo de 160 dp. */
    @Test
    fun contextMenuOpen() = paparazzi.brandComparison("contextmenu-abierto", 192, 231) {
        Box(Modifier.padding(0.dp)) { BrandMenuPanel(previewMenuItems, selection = null, limitHeight = false) {} }
    }
}
