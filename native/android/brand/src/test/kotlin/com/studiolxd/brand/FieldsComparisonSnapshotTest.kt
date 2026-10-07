package com.studiolxd.brand

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.width
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.studiolxd.brand.components.inputfield.BrandInputField
import com.studiolxd.brand.components.inputfield.InputFieldType
import com.studiolxd.brand.components.list.BrandList
import com.studiolxd.brand.components.list.BrandListItem
import com.studiolxd.brand.components.list.ListType
import com.studiolxd.brand.components.numberinputfield.BrandNumberInputField
import com.studiolxd.brand.components.numberinputfield.NumberInputCommitMode
import com.studiolxd.brand.components.passwordfield.BrandPasswordField
import com.studiolxd.brand.components.passwordfield.LocalBrandPasswordRevealed
import com.studiolxd.brand.components.selectfield.BrandSelectEntry
import com.studiolxd.brand.components.selectfield.BrandSelectField
import com.studiolxd.brand.components.switcherfield.BrandSwitcherField
import com.studiolxd.brand.components.themeswitcher.BrandThemeChoice
import com.studiolxd.brand.components.themeswitcher.BrandThemeSwitcher
import com.studiolxd.brand.components.themeswitcher.LocalThemeSwitcherForcedHover
import com.studiolxd.brand.components.themeswitcher.ThemeSwitcherLayout
import com.studiolxd.brand.components.themeswitcher.ThemeSwitcherVariant
import com.studiolxd.brand.components.togglegroup.BrandToggleGroup
import com.studiolxd.brand.support.BrandControlSize
import com.studiolxd.brand.tokens.BrandSpacing
import org.junit.Rule
import org.junit.Test

/**
 * Las capturas de las parejas con Storybook de los campos (`native/android/Comparisons/`): los mismos casos y los mismos
 * lienzos que los de SwiftUI (`FormsSnapshotTests` y `TogglesComparisonSnapshotTests`), con 16 dp de margen.
 */
class FieldsComparisonSnapshotTest {
    @get:Rule
    val paparazzi = brandPaparazzi(160, 160)

    @Test
    fun inputError() = paparazzi.brandComparison("input-error", 352, 159) {
        BrandInputField(
            "Nombre completo", "", {},
            errorMessage = "Este campo es obligatorio.", helperText = "Escríbelo tal como aparece en tu DNI.",
        )
    }

    /** La story `Opcional` (`molecules-inputfield--opcional`): el campo de 320 en el lienzo de 480. */
    @Test
    fun inputOptional() = paparazzi.brandComparison("input-optional", 480, 101) {
        BrandInputField("Teléfono", "", {}, optional = true, type = InputFieldType.Tel, modifier = Modifier.width(320.dp))
    }

    @Test
    fun numberMinMax() = paparazzi.brandComparison("number-min-max", 256, 130) {
        BrandNumberInputField("Cantidad", 1.0, {}, min = 0.0, max = 10.0, helperText = "Entre 0 y 10.", modifier = Modifier.width(224.dp))
    }

    @Test
    fun numberEmpty() = paparazzi.brandComparison("number-vacio", 256, 130) {
        BrandNumberInputField(
            "Cantidad", null, {}, placeholder = "Sin indicar", helperText = "Déjalo vacío si no lo sabes.",
            modifier = Modifier.width(224.dp),
        )
    }

    /** Pareja de `Atoms/NumberInput` «En una fila de lista»: el compacto como `trailing` de `BrandListItem`. */
    @Test
    fun numberCompact() = paparazzi.brandComparison("number-compact", 352, 200) {
        BrandList(type = ListType.Plain, showSeparators = true) {
            item {
                BrandListItem(text = "Leche entera", subtitle = "1 l", trailing = {
                    BrandNumberInputField("Cantidad de leche", 2.0, {}, labelHidden = true, min = 0.0, max = 99.0, compact = true, commitMode = NumberInputCommitMode.Blur)
                })
            }
            item {
                BrandListItem(text = "Huevos", trailing = {
                    BrandNumberInputField("Cantidad de huevos", 12.0, {}, labelHidden = true, min = 0.0, max = 99.0, compact = true, commitMode = NumberInputCommitMode.Blur)
                })
            }
            item {
                BrandListItem(text = "Pan de molde integral con semillas", trailing = {
                    BrandNumberInputField("Cantidad de pan", 1.0, {}, labelHidden = true, min = 0.0, max = 99.0, compact = true, commitMode = NumberInputCommitMode.Blur)
                })
            }
        }
    }

    @Test
    fun passwordDefault() = paparazzi.brandComparison("password-default", 480, 101) {
        BrandPasswordField("Contraseña", "secreto123", {})
    }

    @Test
    fun passwordVisible() = paparazzi.brandComparison("password-visible", 480, 101) {
        CompositionLocalProvider(LocalBrandPasswordRevealed provides true) { BrandPasswordField("Contraseña", "secreto123", {}) }
    }

    @Test
    fun passwordError() = paparazzi.brandComparison("password-error", 480, 130) {
        BrandPasswordField("Contraseña", "secreto123", {}, labelHidden = false, errorMessage = "La contraseña es incorrecta.")
    }

    @Test
    fun selectValue() = paparazzi.brandComparison("select-value", 352, 101) {
        BrandSelectField(
            "Tipo de contrato", "full-time", {},
            listOf(
                BrandSelectEntry.option("", "Selecciona un tipo"), BrandSelectEntry.option("full-time", "Jornada completa"),
                BrandSelectEntry.option("part-time", "Media jornada"), BrandSelectEntry.option("freelance", "Autónomo"),
            ),
        )
    }

    @Test
    fun switcherSizes() = paparazzi.brandComparison("switcher-tallas", 480, 203) {
        Column {
            BrandSwitcherField("Pequeño", true, {}, size = BrandControlSize.Sm)
            BrandSwitcherField("Mediano", true, {}, size = BrandControlSize.Md)
            BrandSwitcherField("Grande", true, {}, size = BrandControlSize.Lg)
        }
    }

    @Test
    fun switcherError() = paparazzi.brandComparison("switcher-error", 480, 146) {
        BrandSwitcherField(
            "Activar notificaciones", false, {},
            errorMessage = "Tienes que aceptar los avisos de seguridad.",
            helperText = "Te avisamos solo de lo que afecte a tu cuenta.",
        )
    }

    @Test
    fun toggleGroupSizes() = paparazzi.brandComparison("group-tallas", 480, 200) {
        Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s5)) {
            BrandControlSize.entries.forEach { size ->
                BrandToggleGroup(value = "dia", onValueChange = {}, size = size) {
                    Item("Día", "dia")
                    Item("Semana", "semana")
                    Item("Mes", "mes")
                }
            }
        }
    }

    @Test
    fun toggleGroupMultiple() = paparazzi.brandComparison("group-multiple", 441, 72) {
        BrandToggleGroup(setOf("borradores"), {}, multiple = true) {
            Item("Borradores", "borradores")
            Item("Publicados", "publicados")
            Item("Archivados", "archivados")
        }
    }

    @Test
    fun themeCompact() = paparazzi.brandComparison("theme-compact", 480, 72) {
        BrandThemeSwitcher(BrandThemeChoice.System, {})
    }

    @Test
    fun themeList() = paparazzi.brandComparison("theme-list", 480, 59) {
        BrandThemeSwitcher(BrandThemeChoice.System, {}, variant = ThemeSwitcherVariant.List)
    }

    /** `Lista` con el puntero sobre «Claro»: el subrayado de `Link`, bajo el texto y no bajo el icono (D64). */
    @Test
    fun themeListHover() = paparazzi.brandComparison("theme-list-hover", 480, 60) {
        CompositionLocalProvider(LocalThemeSwitcherForcedHover provides BrandThemeChoice.Light) {
            BrandThemeSwitcher(BrandThemeChoice.System, {}, variant = ThemeSwitcherVariant.List)
        }
    }

    @Test
    fun themeStacked() = paparazzi.brandComparison("theme-stacked", 480, 101) {
        BrandThemeSwitcher(BrandThemeChoice.System, {}, layout = ThemeSwitcherLayout.Stacked)
    }
}
