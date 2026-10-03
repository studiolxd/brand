package com.studiolxd.brand

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.runtime.CompositionLocalProvider
import com.studiolxd.brand.components.field.LocalBrandForcedFocus
import com.studiolxd.brand.components.inputfield.BrandInputField
import com.studiolxd.brand.components.inputfield.InputFieldKind
import com.studiolxd.brand.components.inputfield.InputFieldPreviewContent
import com.studiolxd.brand.components.numberinputfield.BrandNumberInputField
import com.studiolxd.brand.components.numberinputfield.NumberInputFieldPreviewContent
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
    val paparazzi = brandPaparazzi(360, 900)

    @Test
    fun variants() = paparazzi.brandSnapshots { NumberInputFieldPreviewContent() }
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
    val paparazzi = brandPaparazzi(360, 760)

    @Test
    fun focus() = paparazzi.brandSnapshots {
        CompositionLocalProvider(LocalBrandForcedFocus provides true) {
            Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s4)) {
                BrandInputField("Con foco", "Ada", {})
                BrandInputField("Foco y error", "Ada", {}, errorMessage = "Este campo es obligatorio")
                BrandInputField("Buscar", "casa", {}, labelHidden = true, kind = InputFieldKind.Search, clearable = true)
                BrandNumberInputField("Cantidad", 3.0, {}, min = 0.0, max = 5.0)
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
