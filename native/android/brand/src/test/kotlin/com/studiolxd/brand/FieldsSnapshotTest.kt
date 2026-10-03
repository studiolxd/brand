package com.studiolxd.brand

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsFocusedAsState
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.remember
import androidx.compose.ui.focus.FocusRequester
import com.studiolxd.brand.support.BrandPreviewSurface
import com.studiolxd.brand.components.field.LocalBrandForcedFocus
import com.studiolxd.brand.components.inputfield.BrandInputField
import com.studiolxd.brand.components.inputfield.InputFieldKind
import com.studiolxd.brand.components.inputfield.InputFieldPreviewContent
import com.studiolxd.brand.components.numberinputfield.BrandNumberInputField
import com.studiolxd.brand.components.numberinputfield.NumberInputFieldCompactPreviewContent
import com.studiolxd.brand.components.numberinputfield.NumberInputFieldPreviewContent
import com.studiolxd.brand.components.passwordfield.BrandPasswordField
import com.studiolxd.brand.components.passwordfield.LocalBrandPasswordRevealed
import com.studiolxd.brand.components.passwordfield.PasswordFieldPreviewContent
import com.studiolxd.brand.components.selectfield.BrandSelectField
import com.studiolxd.brand.components.selectfield.SelectFieldPreviewContent
import com.studiolxd.brand.components.selectfield.SelectMenuPreviewContent
import com.studiolxd.brand.components.selectfield.previewLanguages
import com.studiolxd.brand.components.switcherfield.BrandSwitcherField
import com.studiolxd.brand.components.switcherfield.SwitcherFieldPreviewContent
import com.studiolxd.brand.components.themeswitcher.BrandThemeChoice
import com.studiolxd.brand.components.themeswitcher.BrandThemeSwitcher
import com.studiolxd.brand.components.themeswitcher.ThemeSwitcherLayout
import com.studiolxd.brand.components.themeswitcher.ThemeSwitcherPreviewContent
import com.studiolxd.brand.components.togglegroup.BrandToggleGroup
import com.studiolxd.brand.components.togglegroup.ToggleGroupPreviewContent
import com.studiolxd.brand.tokens.BrandSpacing
import org.junit.Rule
import org.junit.Test
import kotlin.test.assertEquals

/**
 * Capturas de los campos de formulario: cada variante de cada componente, en claro y oscuro. Graba con
 * `./gradlew :brand:recordPaparazziDebug`; `./gradlew build` las verifica.
 */
class InputFieldSnapshotTest {
    @get:Rule
    val paparazzi = brandPaparazzi(360, 1100)

    @Test
    fun variants() = paparazzi.brandSnapshots { InputFieldPreviewContent() }
}

class NumberInputFieldSnapshotTest {
    @get:Rule
    val paparazzi = brandPaparazzi(360, 1020)

    @Test
    fun variants() = paparazzi.brandSnapshots { NumberInputFieldPreviewContent() }

    /** El compacto en filas de lista, con y sin valor. */
    @Test
    fun compact() = paparazzi.brandSnapshots("compact") { NumberInputFieldCompactPreviewContent() }
}

class PasswordFieldSnapshotTest {
    @get:Rule
    val paparazzi = brandPaparazzi(360, 900)

    @Test
    fun variants() = paparazzi.brandSnapshots { PasswordFieldPreviewContent() }

    /** La contraseña a la vista (ojo tachado). */
    @Test
    fun revealed() = paparazzi.brandSnapshots("revealed") {
        CompositionLocalProvider(LocalBrandPasswordRevealed provides true) {
            Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s5)) {
                BrandPasswordField("Contraseña", "secreto123", {}, labelHidden = false)
                BrandPasswordField("Con error", "secreto123", {}, labelHidden = false, errorMessage = "La contraseña no es correcta")
            }
        }
    }
}

class SelectFieldSnapshotTest {
    @get:Rule
    val paparazzi = brandPaparazzi(360, 800)

    @Test
    fun variants() = paparazzi.brandSnapshots { SelectFieldPreviewContent() }

    @Test
    fun menu() = paparazzi.brandSnapshots("menu") { SelectMenuPreviewContent() }
}

class SwitcherFieldSnapshotTest {
    @get:Rule
    val paparazzi = brandPaparazzi(360, 680)

    @Test
    fun variants() = paparazzi.brandSnapshots { SwitcherFieldPreviewContent() }
}

class ToggleGroupSnapshotTest {
    @get:Rule
    val paparazzi = brandPaparazzi(420, 640)

    @Test
    fun variants() = paparazzi.brandSnapshots { ToggleGroupPreviewContent() }
}

class ThemeSwitcherSnapshotTest {
    @get:Rule
    val paparazzi = brandPaparazzi(360, 720)

    @Test
    fun variants() = paparazzi.brandSnapshots { ThemeSwitcherPreviewContent() }
}

/**
 * Los controles con foco de teclado (anillo): campo de texto, de búsqueda, numérico, desplegable, interruptor, toggle y
 * el selector de tema compacto. El foco se fuerza con [LocalBrandForcedFocus]: layoutlib no tiene teclado.
 */
class FieldsFocusSnapshotTest {
    @get:Rule
    val paparazzi = brandPaparazzi(360, 860)

    @Test
    fun focus() = paparazzi.brandSnapshots {
        CompositionLocalProvider(LocalBrandForcedFocus provides true) {
            Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s4)) {
                BrandInputField("Con foco", "Ada", {})
                BrandInputField("Foco y error", "Ada", {}, errorMessage = "Este campo es obligatorio")
                BrandInputField("Buscar", "casa", {}, labelHidden = true, kind = InputFieldKind.Search, clearable = true)
                BrandNumberInputField("Cantidad", 3.0, {}, min = 0.0, max = 5.0)
                BrandPasswordField("Contraseña", "secreto123", {}, labelHidden = false)
                BrandSelectField("Idioma", "es", {}, previewLanguages)
                BrandSwitcherField("Interruptor", true, {})
                BrandToggleGroup(value = "a", onValueChange = {}) {
                    Item("Pulsado", "a")
                    Item("Sin pulsar", "b")
                }
                BrandThemeSwitcher(BrandThemeChoice.System, {}, layout = ThemeSwitcherLayout.Stacked)
            }
        }
    }
}

/**
 * El foco desde fuera: `focusRequester.requestFocus()` lleva el foco al propio campo de texto de `InputField`,
 * `NumberInputField` y `PasswordField` (se lee del `interactionSource`, que ve el foco del `BasicTextField`). Solo uno
 * tiene el foco a la vez, así que cada campo se prueba pidiéndoselo a él. La captura enseña el anillo de foco de
 * verdad, sin forzarlo.
 */
class FocusRequesterSnapshotTest {
    @get:Rule
    val paparazzi = brandPaparazzi(360, 360)

    private val names = listOf("input", "number", "password")

    @Test
    fun requestFocusFocusesTheTextField() {
        names.forEachIndexed { target, targetName ->
            val focused = mutableMapOf<String, Boolean>()
            paparazzi.snapshot("foco-$targetName") {
                BrandPreviewSurface(dark = false) {
                    val sources = List(3) { remember { MutableInteractionSource() } }
                    val requesters = List(3) { remember { FocusRequester() } }
                    names.forEachIndexed { i, name -> focused[name] = sources[i].collectIsFocusedAsState().value }
                    LaunchedEffect(Unit) { requesters[target].requestFocus() }
                    Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s4)) {
                        BrandInputField("Correo", "", {}, interactionSource = sources[0], focusRequester = requesters[0])
                        BrandNumberInputField("Cantidad", null, {}, interactionSource = sources[1], focusRequester = requesters[1])
                        BrandPasswordField("Contraseña", "", {}, interactionSource = sources[2], focusRequester = requesters[2])
                    }
                }
            }
            assertEquals(names.associateWith { it == targetName }, focused, "requestFocus() en $targetName")
        }
    }
}
