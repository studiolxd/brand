package com.studiolxd.brand

import androidx.compose.ui.input.key.Key
import com.studiolxd.brand.components.banner.BannerTone
import com.studiolxd.brand.components.banner.interiorIsDark
import com.studiolxd.brand.components.datepickerfield.dateOfMillis
import com.studiolxd.brand.components.datepickerfield.formatPickedDate
import com.studiolxd.brand.components.datepickerfield.initialPickerDate
import com.studiolxd.brand.components.datepickerfield.startOfDayMillis
import com.studiolxd.brand.components.menu.BrandMenuItem
import com.studiolxd.brand.components.menu.activateMenuItem
import com.studiolxd.brand.components.menu.firstActionableIndex
import com.studiolxd.brand.components.tabs.BrandTab
import com.studiolxd.brand.components.tabs.TabsOrientation
import com.studiolxd.brand.components.tabs.TabsStep
import com.studiolxd.brand.components.tabs.adjacentTab
import com.studiolxd.brand.components.tabs.tabsStepFor
import java.time.LocalDate
import java.time.ZoneId
import java.util.Locale
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertNotNull
import kotlin.test.assertNull
import kotlin.test.assertTrue

/** La lógica pura de los componentes de R6: pestañas, ítems de menú, fechas y la cara de los avisos. */
class R6LogicTest {
    private val tabs = listOf(BrandTab("A", "a"), BrandTab("B", "b", enabled = false), BrandTab("C", "c"), BrandTab("D", "d"))

    @Test
    fun arrowsSkipDisabledTabsAndWrapAround() {
        assertEquals("c", adjacentTab(tabs, "a", TabsStep.Next)?.value)
        assertEquals("a", adjacentTab(tabs, "c", TabsStep.Previous)?.value)
        assertEquals("a", adjacentTab(tabs, "d", TabsStep.Next)?.value)
        assertEquals("d", adjacentTab(tabs, "a", TabsStep.Previous)?.value)
    }

    @Test
    fun arrowOnALoneTabGoesNowhere() {
        assertNull(adjacentTab(listOf(BrandTab("A", "a")), "a", TabsStep.Next))
        assertNull(adjacentTab(listOf(BrandTab("A", "a"), BrandTab("B", "b", enabled = false)), "a", TabsStep.Next))
    }

    @Test
    fun aDisabledSelectionStillMovesToAnEnabledTab() {
        // La app puede dejar elegida una pestaña que luego se deshabilita: la flecha lleva a la siguiente habilitada.
        assertEquals("c", adjacentTab(tabs, "b", TabsStep.Next)?.value)
        assertEquals("a", adjacentTab(tabs, "b", TabsStep.Previous)?.value)
    }

    @Test
    fun tabsValuesCanBeAnyType() {
        val numbered = listOf(BrandTab("Uno", 1), BrandTab("Dos", 2))
        assertEquals(2, adjacentTab(numbered, 1, TabsStep.Next)?.value)
    }

    @Test
    fun arrowKeysFollowTheOrientationAndTheReadingDirection() {
        assertEquals(TabsStep.Next, tabsStepFor(Key.DirectionRight, TabsOrientation.Horizontal, rtl = false))
        assertEquals(TabsStep.Previous, tabsStepFor(Key.DirectionLeft, TabsOrientation.Horizontal, rtl = false))
        assertEquals(TabsStep.Previous, tabsStepFor(Key.DirectionRight, TabsOrientation.Horizontal, rtl = true))
        assertNull(tabsStepFor(Key.DirectionDown, TabsOrientation.Horizontal, rtl = false))
        assertEquals(TabsStep.Next, tabsStepFor(Key.DirectionDown, TabsOrientation.Vertical, rtl = false))
        assertEquals(TabsStep.Previous, tabsStepFor(Key.DirectionUp, TabsOrientation.Vertical, rtl = true))
        assertNull(tabsStepFor(Key.DirectionRight, TabsOrientation.Vertical, rtl = false))
    }

    @Test
    fun menuFocusLandsOnTheFirstChoosableItem() {
        val items = listOf(
            BrandMenuItem.Label("Archivo"),
            BrandMenuItem.Button("Publicar", action = {}, disabled = true),
            BrandMenuItem.Separator,
            BrandMenuItem.Radio("Por fecha", "fecha"),
        )
        assertEquals(3, firstActionableIndex(items))
        assertNull(firstActionableIndex(listOf(BrandMenuItem.Label("Nada"), BrandMenuItem.Separator)))
    }

    @Test
    fun choosingAnActionCallsItAndClosesUnlessTold() {
        var calls = 0
        val closing = BrandMenuItem.Button("Duplicar", action = { calls++ })
        val staying = BrandMenuItem.Button("Marcar", action = { calls++ }, closeOnSelect = false)
        assertTrue(assertNotNull(activateMenuItem(closing, null)).closes)
        assertFalse(assertNotNull(activateMenuItem(staying, null)).closes)
        assertEquals(2, calls)
    }

    @Test
    fun choosingARadioReportsItsValueAndAlwaysCloses() {
        var chosen: String? = null
        val result = activateMenuItem(BrandMenuItem.Radio("Por nombre", "nombre")) { chosen = it }
        assertEquals("nombre", chosen)
        assertTrue(assertNotNull(result).closes)
    }

    @Test
    fun disabledSeparatorAndLabelItemsDoNothing() {
        var calls = 0
        assertNull(activateMenuItem(BrandMenuItem.Button("Publicar", action = { calls++ }, disabled = true), null))
        assertNull(activateMenuItem(BrandMenuItem.Radio("Por tamaño", "t", disabled = true)) { calls++ })
        assertNull(activateMenuItem(BrandMenuItem.Separator, null))
        assertNull(activateMenuItem(BrandMenuItem.Label("Orden"), null))
        assertEquals(0, calls)
    }

    @Test
    fun datesAreShownInTheShortFormatOfTheLocale() {
        val day = LocalDate.of(2026, 5, 8)
        assertEquals("08/05/2026", formatPickedDate(day, Locale.forLanguageTag("es-ES")))
        assertEquals("05/08/2026", formatPickedDate(day, Locale.forLanguageTag("en-US")))
        assertEquals("08.05.2026", formatPickedDate(day, Locale.forLanguageTag("de-DE")))
    }

    @Test
    fun theDialogOpensOnTheValueOrOnTodayClampedToTheRange() {
        val today = LocalDate.of(2026, 5, 18)
        assertEquals(LocalDate.of(2026, 1, 2), initialPickerDate(LocalDate.of(2026, 1, 2), null, null, today))
        assertEquals(today, initialPickerDate(null, null, null, today))
        assertEquals(LocalDate.of(2026, 6, 1), initialPickerDate(null, LocalDate.of(2026, 6, 1), null, today))
        assertEquals(LocalDate.of(2026, 5, 10), initialPickerDate(null, null, LocalDate.of(2026, 5, 10), today))
    }

    @Test
    fun calendarDatesRoundTripThroughTheDialogMilliseconds() {
        val zone = ZoneId.of("Europe/Madrid")
        val day = LocalDate.of(2026, 3, 29) // el día en que cambia la hora
        assertEquals(day, dateOfMillis(day.startOfDayMillis(zone), zone))
        // Un día sin hora: medianoche y casi medianoche son el mismo día.
        assertEquals(day, dateOfMillis(day.startOfDayMillis(zone) + 3_600_000L * 20, zone))
    }

    @Test
    fun onlyTheWarningBannerReadsOnTheLightFace() {
        assertTrue(BannerTone.Info.interiorIsDark())
        assertTrue(BannerTone.Error.interiorIsDark())
        assertFalse(BannerTone.Warning.interiorIsDark())
    }
}
