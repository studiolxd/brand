package com.studiolxd.brand

import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.KeyboardCapitalization
import androidx.compose.ui.text.input.KeyboardType
import com.studiolxd.brand.components.inputfield.InputFieldKind
import com.studiolxd.brand.components.inputfield.InputFieldType
import com.studiolxd.brand.components.inputfield.inputKeyboardOptions
import com.studiolxd.brand.components.numberinputfield.canStepNumber
import com.studiolxd.brand.components.numberinputfield.clampNumber
import com.studiolxd.brand.components.numberinputfield.steppedNumber
import com.studiolxd.brand.components.numberinputfield.formatNumber
import com.studiolxd.brand.components.numberinputfield.parseNumber
import com.studiolxd.brand.components.numberinputfield.NumberCommit
import com.studiolxd.brand.components.numberinputfield.NumberInputCommitMode
import com.studiolxd.brand.components.numberinputfield.resolveNumberCommit
import com.studiolxd.brand.components.selectfield.BrandSelectEntry
import com.studiolxd.brand.components.selectfield.BrandSelectOption
import com.studiolxd.brand.components.selectfield.flatOptions
import com.studiolxd.brand.components.themeswitcher.BrandThemeChoice
import com.studiolxd.brand.components.themeswitcher.ThemeSwitcherLabels
import com.studiolxd.brand.components.togglegroup.nextToggleSelection
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNull

/** La lógica pura de los campos: números, selección, teclados y textos por defecto. */
class FieldsLogicTest {
    @Test
    fun numberIsClampedBetweenMinAndMax() {
        assertEquals(0.0, clampNumber(-3.0, 0.0, 10.0))
        assertEquals(10.0, clampNumber(11.0, 0.0, 10.0))
        assertEquals(4.0, clampNumber(4.0, 0.0, 10.0))
        assertEquals(-7.0, clampNumber(-7.0, null, null))
    }

    @Test
    fun numberIsFormattedLikeJavaScriptString() {
        assertEquals("3", formatNumber(3.0))
        assertEquals("12.5", formatNumber(12.5))
        assertEquals("-2", formatNumber(-2.0))
        assertEquals("0", formatNumber(0.0))
    }

    @Test
    fun draftsParseWithCommaOrDotOnlyWhenDecimal() {
        assertEquals(12.5, parseNumber("12,5", decimal = true))
        assertEquals(12.5, parseNumber("12.5", decimal = true))
        assertEquals(12.0, parseNumber("12,", decimal = true))
        assertNull(parseNumber("-", decimal = true))
        assertNull(parseNumber("abc", decimal = true))
        assertNull(parseNumber("", decimal = false))
        assertNull(parseNumber("12,5", decimal = false))
        assertEquals(7.0, parseNumber(" 7 ", decimal = false))
    }

    @Test
    fun blurCommitResolvesTheDraft() {
        assertEquals(NumberCommit.Set(5.0), resolveNumberCommit("5", false, 0.0, 9.0, 1.0))
        assertEquals(NumberCommit.Set(9.0), resolveNumberCommit("50", false, 0.0, 9.0, 1.0))
        assertEquals(NumberCommit.Keep, resolveNumberCommit("9", false, 0.0, 9.0, 9.0))
        assertEquals(NumberCommit.Set(2.5), resolveNumberCommit("2,5", true, 0.0, 9.0, 1.0))
        assertEquals(NumberCommit.Set(null), resolveNumberCommit("", false, 0.0, 9.0, 3.0))
        assertEquals(NumberCommit.Keep, resolveNumberCommit(" ", false, 0.0, 9.0, null))
        assertEquals(NumberCommit.Keep, resolveNumberCommit("-", false, 0.0, 9.0, 3.0))
    }

    @Test
    fun commitModeValuesMatchReact() {
        assertEquals(listOf("change", "blur"), NumberInputCommitMode.entries.map { it.value })
    }

    @Test
    fun emptyNumberStepsFromZeroAndClamps() {
        assertEquals(1.0, steppedNumber(null, 1.0, null, null))
        assertEquals(-1.0, steppedNumber(null, -1.0, null, null))
        // Sin valor, − y + se ajustan a los límites: desde 0, un mínimo de 5 sube a 5 y un máximo de -2 baja a -2.
        assertEquals(5.0, steppedNumber(null, 1.0, 5.0, 10.0))
        assertEquals(5.0, steppedNumber(null, -1.0, 5.0, 10.0))
        assertEquals(-2.0, steppedNumber(null, 1.0, -10.0, -2.0))
        assertEquals(4.0, steppedNumber(3.0, 1.0, 0.0, 10.0))
        assertEquals(0.0, steppedNumber(0.0, -1.0, 0.0, 10.0))
    }

    @Test
    fun stepButtonsAreNotDisabledByLimitsWhenEmpty() {
        assertEquals(true, canStepNumber(null, 0.0, towardsMax = false))
        assertEquals(true, canStepNumber(null, 0.0, towardsMax = true))
        assertEquals(true, canStepNumber(3.0, null, towardsMax = true))
        assertEquals(false, canStepNumber(0.0, 0.0, towardsMax = false))
        assertEquals(false, canStepNumber(10.0, 10.0, towardsMax = true))
        assertEquals(true, canStepNumber(5.0, 10.0, towardsMax = true))
    }

    @Test
    fun exclusiveGroupReplacesAndDeselects() {
        assertEquals(setOf("b"), nextToggleSelection(setOf("a"), "b", multiple = false))
        assertEquals(emptySet(), nextToggleSelection(setOf("a"), "a", multiple = false))
        assertEquals(setOf("a"), nextToggleSelection(emptySet(), "a", multiple = false))
    }

    @Test
    fun multipleGroupAddsAndRemoves() {
        assertEquals(setOf("a", "b"), nextToggleSelection(setOf("a"), "b", multiple = true))
        assertEquals(setOf("b"), nextToggleSelection(setOf("a", "b"), "a", multiple = true))
    }

    @Test
    fun selectFlattensGroupsKeepingOrder() {
        val entries = listOf(
            BrandSelectEntry.option("es", "Español"),
            BrandSelectEntry.group("Ciudades", listOf(BrandSelectOption("mad", "Madrid"), BrandSelectOption("bcn", "Barcelona"))),
        )
        assertEquals(listOf("es", "mad", "bcn"), entries.flatOptions().map { it.value })
    }

    @Test
    fun keyboardFollowsTheFieldType() {
        fun options(type: InputFieldType, kind: InputFieldKind = InputFieldKind.Text) = inputKeyboardOptions(type, kind)
        assertEquals(KeyboardType.Email, options(InputFieldType.Email).keyboardType)
        assertEquals(KeyboardType.Password, options(InputFieldType.Password).keyboardType)
        assertEquals(KeyboardType.Number, options(InputFieldType.Number).keyboardType)
        assertEquals(KeyboardType.Phone, options(InputFieldType.Tel).keyboardType)
        assertEquals(KeyboardType.Uri, options(InputFieldType.Url).keyboardType)
        assertEquals(KeyboardCapitalization.None, options(InputFieldType.Email).capitalization)
        val search = options(InputFieldType.Text, InputFieldKind.Search)
        assertEquals(ImeAction.Search, search.imeAction)
        assertEquals(ImeAction.Done, options(InputFieldType.Text).imeAction)
    }

    @Test
    fun themeLabelsDefaultToSpanish() {
        val labels = ThemeSwitcherLabels()
        assertEquals("Tema", labels.group)
        assertEquals(listOf("Claro", "Oscuro", "Sistema"), BrandThemeChoice.entries.map { labels.text(it) })
    }
}
