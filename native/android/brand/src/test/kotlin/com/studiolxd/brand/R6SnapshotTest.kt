package com.studiolxd.brand

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.width
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.studiolxd.brand.components.banner.BannerPreviewContent
import com.studiolxd.brand.components.banner.BannerTone
import com.studiolxd.brand.components.banner.BrandBanner
import com.studiolxd.brand.components.banner.PreviewBannerAction
import com.studiolxd.brand.components.banner.PreviewBannerMessage
import com.studiolxd.brand.components.datepickerfield.DatePickerFieldPreviewContent
import com.studiolxd.brand.components.field.LocalBrandForcedFocus
import com.studiolxd.brand.components.menu.BrandContextMenuTrigger
import com.studiolxd.brand.components.menu.BrandMenuImpl
import com.studiolxd.brand.components.menu.LocalBrandMenuAutoFocus
import com.studiolxd.brand.components.menu.BrandMenuItem
import com.studiolxd.brand.components.menu.BrandMenuPanel
import com.studiolxd.brand.components.menu.ContextMenuTriggerOrientation
import com.studiolxd.brand.components.menu.MenuPreviewContent
import com.studiolxd.brand.components.menu.previewMenuItems
import com.studiolxd.brand.components.menu.previewMenuRichItems
import com.studiolxd.brand.components.pageintro.PageIntroPreviewContent
import com.studiolxd.brand.components.tabs.BrandTab
import com.studiolxd.brand.components.tabs.BrandTabSurface
import com.studiolxd.brand.components.tabs.TabsOrientation
import com.studiolxd.brand.components.tabs.TabsPreviewContent
import com.studiolxd.brand.components.tabs.TabsVariant
import com.studiolxd.brand.support.BrandControlSize
import com.studiolxd.brand.support.BrandInteractionState
import com.studiolxd.brand.tokens.BrandSpacing
import java.lang.reflect.InvocationTargetException
import java.lang.reflect.Proxy
import org.junit.Rule
import org.junit.Test

/**
 * Capturas de los componentes de R6 (Banner, Menu y ContextMenu, Tabs, DatePickerField y PageIntro): cada variante y cada
 * estado, en claro y oscuro. Graba con `./gradlew :brand:recordPaparazziDebug`; `./gradlew build` las verifica.
 */
class BannerSnapshotTest {
    @get:Rule
    val paparazzi = brandPaparazzi(420, 740)

    @Test
    fun variants() = paparazzi.brandSnapshots { BannerPreviewContent() }

    /** El aviso y el error con la barra ancha (en fila, a partir de 480 dp): mensaje a la izquierda y acciones a la derecha. */
    @Test
    fun wide() = paparazzi.brandComparison("wide", 700, 320) {
        Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s4)) {
            BrandBanner(PreviewBannerMessage, actions = { PreviewBannerAction("Dejar de suplantar") }, onDismiss = {})
            BrandBanner(PreviewBannerMessage, tone = BannerTone.Warning, actions = { PreviewBannerAction("Ver detalles") }, onDismiss = {})
            BrandBanner(PreviewBannerMessage, tone = BannerTone.Error, actions = { PreviewBannerAction("Dejar de suplantar") })
        }
    }
}

class MenuSnapshotTest {
    @get:Rule
    val paparazzi = brandPaparazzi(460, 780)

    /** Los paneles con todos los casos de ítem y los disparadores de `ContextMenu` en sus tres tallas y dos orientaciones. */
    @Test
    fun variants() = paparazzi.brandSnapshots { MenuPreviewContent() }

    /** Un ítem resaltado por teclado o puntero (la inversión de marca) y el destructivo resaltado. */
    @Test
    fun highlighted() = paparazzi.brandSnapshots("highlighted") {
        Row(horizontalArrangement = Arrangement.spacedBy(BrandSpacing.s5)) {
            BrandMenuPanel(previewMenuRichItems, selection = "nombre", forcedHighlight = 2, limitHeight = false) {}
            BrandMenuPanel(previewMenuItems, selection = null, forcedHighlight = 5, limitHeight = false) {}
        }
    }

    /**
     * El menú abierto de verdad, con su `Popup` bajo el disparador y alineado a su final (Paparazzi sí pinta la ventana
     * emergente). Abierto con el dedo, sin ítem resaltado: además del foco automático del panel ([LocalBrandMenuAutoFocus])
     * hace falta que la ventana del popup nazca en modo táctil ([inTouchMode]).
     */
    @Test
    fun openPopup() = inTouchMode {
        paparazzi.brandSnapshots("popup") {
            CompositionLocalProvider(LocalBrandMenuAutoFocus provides false) {
                Box(Modifier.width(200.dp).height(260.dp), contentAlignment = Alignment.TopEnd) {
                    BrandMenuImpl(previewMenuItems, Modifier, null, null, null, alignEnd = true, initiallyExpanded = true) { _, toggle ->
                        BrandContextMenuTrigger(toggle, BrandControlSize.Md, ContextMenuTriggerOrientation.Horizontal, "Más opciones")
                    }
                }
            }
        }
    }

    /**
     * Ejecuta [block] con las ventanas nuevas en modo táctil, como en un móvil que abre el menú con el dedo (D54).
     *
     * La sesión de ventanas de layoutlib (`BridgeWindowSession.addToDisplayAsUser`) devuelve 0, sin
     * `ADD_FLAG_IN_TOUCH_MODE`, así que la ventana del `Popup(focusable = true)` nace fuera del modo táctil. En su primer
     * recorrido `ViewRootImpl` le da entonces el foco por defecto (`restoreDefaultFocus`), Compose lo lleva al primer
     * enfocable (el ítem «Duplicar») y, con `InputMode.Keyboard`, ese foco es `focusVisible`: el ítem se pinta
     * resaltado. Ese foco llega en todas las ejecuciones; lo intermitente es solo si la recomposición que pinta el
     * resaltado entra antes o después del fotograma que se captura, cosa que depende del reloj y de lo caliente que esté
     * la JVM. Por eso fallaba con la suite entera y pasaba sola, y por eso apagar el foco automático del panel no
     * bastaba: el foco no lo pide el panel, lo da la ventana. En un dispositivo es lo correcto (abierto con teclado, el
     * primer ítem lleva el foco visible), así que no se toca el componente.
     *
     * Se envuelve la sesión global (`WindowManagerGlobal.sWindowSession`) para añadir el bit de modo táctil al alta de
     * cada ventana, y se restaura al terminar. Es API oculta de la plataforma: por eso va por reflexión y solo aquí.
     */
    private inline fun inTouchMode(block: () -> Unit) {
        val global = Class.forName("android.view.WindowManagerGlobal")
        val field = global.getDeclaredField("sWindowSession").apply { isAccessible = true }
        val sessionType = Class.forName("android.view.IWindowSession")
        val original = global.getMethod("getWindowSession").invoke(null)
        val touchSession = Proxy.newProxyInstance(sessionType.classLoader, arrayOf(sessionType)) { _, method, args ->
            val result = try {
                method.invoke(original, *(args ?: emptyArray()))
            } catch (e: InvocationTargetException) {
                throw e.targetException
            }
            if (method.name.startsWith("addToDisplay") && result is Int) result or ADD_FLAG_IN_TOUCH_MODE else result
        }
        field.set(null, touchSession)
        try {
            block()
        } finally {
            field.set(null, original)
        }
    }

    private companion object {
        /** `WindowManagerGlobal.ADD_FLAG_IN_TOUCH_MODE` (API oculta de la plataforma). */
        const val ADD_FLAG_IN_TOUCH_MODE = 0x1
    }
}

class TabsSnapshotTest {
    @get:Rule
    val paparazzi = brandPaparazzi(360, 640)

    @Test
    fun variants() = paparazzi.brandSnapshots { TabsPreviewContent() }

    /** Una pestaña con foco de teclado y otra bajo el puntero, en las dos variantes. */
    @Test
    fun states() = paparazzi.brandSnapshots("states") {
        CompositionLocalProvider(LocalBrandForcedFocus provides true) {
            Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s5)) {
                listOf(TabsVariant.Underline, TabsVariant.Pill).forEach { variant ->
                    Row(horizontalArrangement = Arrangement.spacedBy(BrandSpacing.s1)) {
                        BrandTabSurface(BrandTab("Foco", 1), selected = true, variant = variant, orientation = TabsOrientation.Horizontal, focusRequester = null, onSelect = {})
                        BrandTabSurface(
                            BrandTab("Hover", 2), selected = false, variant = variant, orientation = TabsOrientation.Horizontal, focusRequester = null,
                            onSelect = {}, stateOverride = BrandInteractionState(hovered = true),
                        )
                        BrandTabSurface(BrandTab("Inactiva", 3), selected = false, variant = variant, orientation = TabsOrientation.Horizontal, focusRequester = null, onSelect = {})
                        BrandTabSurface(BrandTab("Deshabilitada", 4, enabled = false), selected = false, variant = variant, orientation = TabsOrientation.Horizontal, focusRequester = null, onSelect = {})
                    }
                }
            }
        }
    }
}

class DatePickerFieldSnapshotTest {
    @get:Rule
    val paparazzi = brandPaparazzi(360, 1000)

    @Test
    fun variants() = paparazzi.brandSnapshots { DatePickerFieldPreviewContent() }

    /** El campo con foco de teclado, con y sin error. */
    @Test
    fun focus() = paparazzi.brandSnapshots("focus") {
        CompositionLocalProvider(LocalBrandForcedFocus provides true) {
            Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s5)) {
                com.studiolxd.brand.components.datepickerfield.BrandDatePickerField("Con foco", java.time.LocalDate.of(2026, 5, 18), {})
                com.studiolxd.brand.components.datepickerfield.BrandDatePickerField("Con foco y error", null, {}, errorMessage = "Elige una fecha.")
            }
        }
    }
}

class PageIntroSnapshotTest {
    @get:Rule
    val paparazzi = brandPaparazzi(420, 1300)

    @Test
    fun variants() = paparazzi.brandSnapshots { PageIntroPreviewContent() }

    /** La cabecera ancha (en fila, a partir de 480 dp): el título a la izquierda y las acciones a la derecha. */
    @Test
    fun wide() = paparazzi.brandComparison("wide", 700, 360) {
        Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s6)) {
            com.studiolxd.brand.components.pageintro.BrandPageIntro(
                "Organizaciones",
                description = "Cada organización tiene sus propios miembros, su facturación y sus aplicaciones.",
                actions = { com.studiolxd.brand.components.button.BrandButton("Nueva organización", onClick = {}) },
            )
            com.studiolxd.brand.components.pageintro.BrandPageIntro(
                "Webhooks",
                actions = {
                    com.studiolxd.brand.components.button.BrandButton("Crear webhook", onClick = {})
                    com.studiolxd.brand.components.button.BrandButton("Ver registro", onClick = {}, variant = com.studiolxd.brand.components.button.ButtonVariant.Outline)
                },
            )
        }
    }
}
