package com.studiolxd.brand

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.width
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.layout
import androidx.compose.ui.unit.Constraints
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.studiolxd.brand.components.button.ButtonVariant
import com.studiolxd.brand.components.confirmdialog.BrandConfirmPhrase
import com.studiolxd.brand.components.confirmdialog.ConfirmDialogPreviewCard
import com.studiolxd.brand.components.confirmdialog.ConfirmDialogState
import com.studiolxd.brand.components.dialog.BrandDialogButton
import com.studiolxd.brand.components.sheet.BrandSheetContent
import com.studiolxd.brand.components.text.BrandParagraph
import com.studiolxd.brand.components.toast.BrandToastCard
import com.studiolxd.brand.components.toast.LocalToastEntrance
import com.studiolxd.brand.components.toast.ToastAction
import com.studiolxd.brand.components.toast.ToastCenter
import com.studiolxd.brand.components.toast.ToastHost
import com.studiolxd.brand.components.toast.ToastIntent
import com.studiolxd.brand.components.toast.ToastItem
import com.studiolxd.brand.components.toast.ToastPosition
import com.studiolxd.brand.tokens.BrandSpacing
import kotlin.time.Duration
import org.junit.Rule
import org.junit.Test

/** Mide el lienzo del tamaño dado sin el margen del lienzo de capturas (16 dp por lado): el contenido arranca en la esquina. */
private fun Modifier.bleed(): Modifier = layout { measurable, constraints ->
    val margin = BrandSpacing.s4.roundToPx()
    val placeable = measurable.measure(Constraints(maxWidth = constraints.maxWidth + 2 * margin, maxHeight = constraints.maxHeight + 2 * margin))
    layout(constraints.maxWidth, constraints.maxHeight) { placeable.place(-margin, -margin) }
}

/** Una captura de `contentWidth × contentHeight` dp de contenido, con el margen del sistema alrededor. */
private fun app.cash.paparazzi.Paparazzi.snap(name: String, contentWidth: Int, contentHeight: Int, content: @Composable () -> Unit) {
    brandComparison(name, contentWidth + 32, contentHeight + 32, content)
}

@Composable
private fun SheetSample(width: Dp, height: Dp, hideClose: Boolean = false, withFooter: Boolean = true) {
    BrandSheetContent(
        title = "Filtros",
        description = "Afina los resultados de la lista.",
        onClose = {},
        modifier = Modifier.width(width).height(height),
        hideClose = hideClose,
        footer = if (!withFooter) null else ({
            BrandDialogButton("Cancelar", onClick = {}, variant = ButtonVariant.Outline)
            BrandDialogButton("Aplicar", onClick = {})
        }),
    ) { BrandParagraph("El cuerpo del cajón: lo que cada pantalla quiera poner entre la cabecera y el pie.") }
}

/**
 * Capturas de Sheet, ConfirmDialog y Toast. Sheet y ConfirmDialog son presentaciones en su propia ventana (que
 * Paparazzi no fotografía): se capturan su contenido (cabecera, cuerpo, pie) y su tarjeta en un lienzo fijo, a dos
 * anchos —apilado (390) y en fila (560)—. Claro y oscuro. Graba con `./gradlew :brand:recordPaparazziDebug`.
 */
class OverlaysSnapshotTest {
    @get:Rule
    val paparazzi = brandPaparazzi(160, 160)

    // MARK: Sheet

    @Test
    fun sheetStackedFooter() = paparazzi.snap("sheet-stacked", 390, 440) { SheetSample(390.dp, 440.dp) }

    @Test
    fun sheetRowFooter() = paparazzi.snap("sheet-row", 560, 440) { SheetSample(560.dp, 440.dp) }

    @Test
    fun sheetWithoutFooterOrClose() = paparazzi.snap("sheet-plain", 390, 260) {
        BrandSheetContent(title = "Detalle", onClose = {}, modifier = Modifier.width(390.dp).height(260.dp), hideClose = true) {
            BrandParagraph("Un cajón sin aspa ni pie.")
        }
    }

    // MARK: ConfirmDialog

    @Test
    fun confirmDestructiveStacked() = paparazzi.snap("confirm-destructive-stacked", 390, 440) {
        ConfirmDialogPreviewCard(Modifier.width(390.dp), destructive = true)
    }

    @Test
    fun confirmDestructiveRow() = paparazzi.snap("confirm-destructive-row", 560, 330) {
        ConfirmDialogPreviewCard(Modifier.width(560.dp), destructive = true)
    }

    @Test
    fun confirmPrimaryWithSecondaryAction() = paparazzi.snap("confirm-secondary-row", 560, 330) {
        ConfirmDialogPreviewCard(Modifier.width(560.dp), destructive = false, secondary = true)
    }

    @Test
    fun confirmPhraseMismatch() = paparazzi.snap("confirm-phrase-mismatch", 560, 440) {
        val phrase = BrandConfirmPhrase("Casa del lago", "Escribe «Casa del lago» para confirmar", "No coincide con el nombre de la vivienda.")
        ConfirmDialogPreviewCard(
            Modifier.width(560.dp), destructive = true, phrase = phrase,
            state = ConfirmDialogState(phrase.value, typed = "Casa del", attempted = true),
        )
    }

    @Test
    fun confirmPending() = paparazzi.snap("confirm-pending", 560, 330) {
        ConfirmDialogPreviewCard(Modifier.width(560.dp), destructive = true, state = ConfirmDialogState(null, pending = true))
    }

    // MARK: Toast

    private fun item(intent: ToastIntent, action: Boolean = false) = ToastItem(
        id = intent.value, title = "Aviso ${intent.value}", intent = intent, description = "Segunda línea del aviso.",
        action = if (action) ToastAction("Deshacer") {} else null,
    )

    @Test
    fun toastCards() = paparazzi.snap("toast-intents", 360, 640) {
        Column(Modifier.width(360.dp), verticalArrangement = Arrangement.spacedBy(BrandSpacing.s2)) {
            ToastIntent.entries.forEach { BrandToastCard(item(it), onClose = {}) }
        }
    }

    @Test
    fun toastCardsWithAction() = paparazzi.snap("toast-action", 360, 330) {
        Column(Modifier.width(360.dp), verticalArrangement = Arrangement.spacedBy(BrandSpacing.s2)) {
            BrandToastCard(item(ToastIntent.Default, action = true), onClose = {})
            BrandToastCard(item(ToastIntent.Warning, action = true), onClose = {})
        }
    }

    @Test
    fun toastWithoutClose() = paparazzi.snap("toast-no-close", 360, 120) {
        Column(Modifier.width(360.dp), verticalArrangement = Arrangement.spacedBy(BrandSpacing.s2)) {
            BrandToastCard(item(ToastIntent.Success), onClose = {}, closeButton = false)
        }
    }

    @Composable
    private fun Stack(expand: Boolean, position: ToastPosition = ToastPosition.BottomRight) {
        val center = remember {
            ToastCenter().apply {
                success("Primer aviso", description = "El más antiguo.", duration = Duration.INFINITE)
                message("Segundo aviso", duration = Duration.INFINITE)
                error("Tercer aviso", description = "El más nuevo, delante.", duration = Duration.INFINITE)
            }
        }
        androidx.compose.runtime.CompositionLocalProvider(LocalToastEntrance provides false) {
            Box(Modifier.fillMaxSize().bleed()) { ToastHost(center = center, position = position, expand = expand) }
        }
    }

    @Test
    fun toastStackCollapsed() = paparazzi.brandComparison("toast-stack-collapsed", 400, 260) { Stack(expand = false) }

    @Test
    fun toastStackExpanded() = paparazzi.brandComparison("toast-stack-expanded", 400, 380) { Stack(expand = true) }

    @Test
    fun toastStackTopCenter() = paparazzi.brandComparison("toast-stack-top-center", 400, 260) { Stack(expand = false, position = ToastPosition.TopCenter) }
}

/**
 * Las parejas con Storybook (`native/android/Comparisons/`): los mismos casos y los mismos lienzos que los de SwiftUI
 * (`OverlaysSnapshotTests.testComparison…`), sin el margen del lienzo.
 */
class OverlaysComparisonSnapshotTest {
    @get:Rule
    val paparazzi = brandPaparazzi(160, 160)

    @Test
    fun sheet() = paparazzi.brandComparison("sheet-con-pie", 320, 560) {
        Box(Modifier.bleed()) { SheetSample(320.dp, 560.dp) }
    }

    @Test
    fun confirmDialog() = paparazzi.brandComparison("confirm-destructivo", 550, 250) {
        Box(Modifier.bleed()) { ConfirmDialogPreviewCard(Modifier.width(550.dp), destructive = true) }
    }

    @Test
    fun toastNeutral() = paparazzi.brandComparison("toast-neutro", 360, 53) {
        Box(Modifier.bleed()) { BrandToastCard(ToastItem("n", "Cambios guardados"), onClose = {}) }
    }

    @Test
    fun toastError() = paparazzi.brandComparison("toast-error", 360, 53) {
        Box(Modifier.bleed()) { BrandToastCard(ToastItem("e", "No se pudo guardar el proyecto", ToastIntent.Error), onClose = {}) }
    }

    @Test
    fun toastIntents() = paparazzi.brandComparison("toast-intents", 360, 640) {
        Box(Modifier.bleed()) {
            Column(Modifier.width(360.dp), verticalArrangement = Arrangement.spacedBy(BrandSpacing.s2)) {
                ToastIntent.entries.forEach {
                    BrandToastCard(
                        ToastItem(it.value, "Aviso ${it.value}", it, "Segunda línea del aviso."),
                        onClose = {},
                    )
                }
            }
        }
    }
}
