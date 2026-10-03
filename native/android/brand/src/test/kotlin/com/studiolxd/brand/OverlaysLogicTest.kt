package com.studiolxd.brand

import com.studiolxd.brand.components.confirmdialog.ConfirmDialogState
import com.studiolxd.brand.components.dialog.BrandDialogRowThreshold
import com.studiolxd.brand.components.sheet.BrandSheetDetent
import com.studiolxd.brand.components.sheet.settleSheetTarget
import com.studiolxd.brand.components.sheet.sheetDetentHeights
import com.studiolxd.brand.components.toast.ToastCenter
import com.studiolxd.brand.components.toast.ToastIntent
import com.studiolxd.brand.components.toast.ToastItem
import com.studiolxd.brand.components.toast.ToastPosition
import com.studiolxd.brand.components.toast.lifetime
import com.studiolxd.brand.components.toast.swipeDismisses
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import kotlin.test.assertFalse
import kotlin.test.assertNull
import kotlin.test.assertTrue
import kotlin.time.Duration
import kotlin.time.Duration.Companion.seconds
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.runBlocking

/** Lógica de Sheet, ConfirmDialog y Toast que no se puede fotografiar: la cola, los relojes, los gestos y los enums. */
class OverlaysLogicTest {
    // MARK: Enums

    @Test
    fun enumsMatchReact() {
        assertEquals(listOf("default", "success", "error", "warning", "info", "loading"), ToastIntent.entries.map { it.value })
        assertEquals(
            listOf("bottom-right", "bottom-left", "bottom-center", "top-right", "top-left", "top-center"),
            ToastPosition.entries.map { it.value },
        )
        assertEquals(listOf("medium", "large"), BrandSheetDetent.entries.map { it.value })
    }

    @Test
    fun dialogRowThresholdIsTheSmBreakpoint() {
        assertEquals(480f, BrandDialogRowThreshold.value)
    }

    // MARK: ToastCenter

    @Test
    fun showWithExistingIdUpdatesInPlace() {
        val center = ToastCenter()
        val id = center.loading("Subiendo…")
        val before = center.items.single().revision
        center.success("Subido", id = id)
        assertEquals(1, center.items.size)
        assertEquals("Subido", center.items.single().title)
        assertEquals(ToastIntent.Success, center.items.single().intent)
        assertTrue(center.items.single().revision > before, "actualizar reinicia el reloj (nueva revisión)")
    }

    @Test
    fun updateOnlyTouchesLiveToasts() {
        val center = ToastCenter()
        val id = center.loading("Subiendo…")
        assertTrue(center.update(id, "Hecho", ToastIntent.Success))
        center.dismiss(id)
        assertFalse(center.update(id, "Tarde", ToastIntent.Success))
        assertTrue(center.items.isEmpty(), "no resucita un aviso ya cerrado")
    }

    @Test
    fun newestFirstAndDismiss() {
        val center = ToastCenter()
        val a = center.info("A", duration = Duration.INFINITE)
        val b = center.info("B", duration = Duration.INFINITE)
        assertEquals(listOf(b, a), center.items.map { it.id })
        center.dismiss(a)
        assertEquals(listOf(b), center.items.map { it.id })
        center.dismiss()
        assertTrue(center.items.isEmpty())
    }

    @Test
    fun onCloseFiresOnDismiss() {
        val center = ToastCenter()
        var closed = 0
        val id = center.show("Con cierre", onClose = { closed++ })
        center.dismiss(id)
        center.dismiss(id)
        assertEquals(1, closed)
    }

    @Test
    fun shortcutsSetTheirIntent() {
        val center = ToastCenter()
        center.message("m"); center.success("s"); center.error("e"); center.warning("w"); center.info("i"); center.loading("l")
        assertEquals(
            listOf(ToastIntent.Loading, ToastIntent.Info, ToastIntent.Warning, ToastIntent.Error, ToastIntent.Success, ToastIntent.Default),
            center.items.map { it.intent },
        )
    }

    @Test
    fun promiseTurnsLoadingIntoSuccess() = runBlocking {
        val center = ToastCenter()
        val value = center.promise(loading = "Guardando", success = { n: Int -> "Guardado $n" }, error = { "Falló" }) { 7 }
        assertEquals(7, value)
        assertEquals("Guardado 7", center.items.single().title)
        assertEquals(ToastIntent.Success, center.items.single().intent)
    }

    @Test
    fun promiseTurnsLoadingIntoErrorAndRethrows() = runBlocking {
        val center = ToastCenter()
        assertFailsWith<IllegalStateException> {
            center.promise(loading = "Guardando", success = { _: Int -> "ok" }, error = { "Falló: ${it.message}" }) { error("boom") }
        }
        assertEquals("Falló: boom", center.items.single().title)
        assertEquals(ToastIntent.Error, center.items.single().intent)
    }

    @Test
    fun promiseClosesTheToastWhenCancelled() = runBlocking {
        val center = ToastCenter()
        assertFailsWith<CancellationException> {
            center.promise(loading = "Guardando", success = { _: Int -> "ok" }, error = { "Falló" }) { throw CancellationException("cancelado") }
        }
        assertTrue(center.items.isEmpty())
    }

    // MARK: Relojes y gestos

    @Test
    fun lifetimeFollowsItemThenHost() {
        val host = 5.seconds
        assertEquals(host, ToastItem("a", "t").lifetime(host))
        assertEquals(2.seconds, ToastItem("a", "t", duration = 2.seconds).lifetime(host))
        assertNull(ToastItem("a", "t", duration = Duration.INFINITE).lifetime(host))
        assertNull(ToastItem("a", "t", duration = Duration.ZERO).lifetime(host))
        assertNull(ToastItem("a", "t", intent = ToastIntent.Loading, duration = 2.seconds).lifetime(host), "un loading no se cierra solo")
        assertNull(ToastItem("a", "t").lifetime(Duration.INFINITE))
    }

    @Test
    fun swipeDismissesTowardsTheAnchoredEdge() {
        val t = 40f
        assertTrue(swipeDismisses(41f, 0f, ToastPosition.BottomRight, false, t))
        assertFalse(swipeDismisses(-41f, 0f, ToastPosition.BottomRight, false, t))
        assertTrue(swipeDismisses(-41f, 0f, ToastPosition.TopLeft, false, t))
        assertTrue(swipeDismisses(41f, 0f, ToastPosition.BottomCenter, false, t))
        assertTrue(swipeDismisses(-41f, 0f, ToastPosition.TopCenter, false, t))
        assertTrue(swipeDismisses(0f, 41f, ToastPosition.BottomLeft, false, t), "hacia abajo en una pila inferior")
        assertTrue(swipeDismisses(0f, -41f, ToastPosition.TopRight, false, t), "hacia arriba en una pila superior")
        assertFalse(swipeDismisses(0f, -41f, ToastPosition.BottomRight, false, t))
        assertFalse(swipeDismisses(40f, 40f, ToastPosition.BottomRight, false, t), "el umbral no se cuenta")
        assertTrue(swipeDismisses(-41f, 0f, ToastPosition.BottomRight, true, t), "en RTL el eje horizontal se voltea")
    }

    // MARK: Sheet

    @Test
    fun sheetDetentsAreHalfAndFullOfTheUsableHeight() {
        assertEquals(listOf(500f, 1000f), sheetDetentHeights(1000f, setOf(BrandSheetDetent.Large, BrandSheetDetent.Medium)))
        assertEquals(listOf(1000f), sheetDetentHeights(1000f, setOf(BrandSheetDetent.Large)))
        assertEquals(listOf(500f), sheetDetentHeights(1000f, setOf(BrandSheetDetent.Medium)))
        assertEquals(listOf(1000f), sheetDetentHeights(1000f, emptySet()))
    }

    @Test
    fun sheetSettlesOnTheNearestDetentOrDismisses() {
        val detents = listOf(500f, 1000f)
        assertEquals(500f, settleSheetTarget(550f, 0f, detents))
        assertEquals(1000f, settleSheetTarget(800f, 0f, detents))
        assertEquals(1000f, settleSheetTarget(600f, -2000f, detents), "un golpe hacia arriba lo abre del todo")
        assertEquals(0f, settleSheetTarget(200f, 0f, detents), "por debajo de la mitad del reposo se cierra")
        assertEquals(0f, settleSheetTarget(480f, 3000f, detents), "un golpe hacia abajo desde el reposo lo cierra")
        assertEquals(500f, settleSheetTarget(480f, 100f, detents))
    }

    // MARK: ConfirmDialog

    @Test
    fun confirmClosesWhenItSucceedsAndIsBusyWhileRunning() = runBlocking {
        val state = ConfirmDialogState(null)
        var busyDuring = false
        var dismissed = 0
        state.confirm({ busyDuring = state.pending }, { dismissed++ }, null)
        assertTrue(busyDuring, "ocupado mientras corre onConfirm")
        assertFalse(state.pending)
        assertEquals(1, dismissed)
    }

    @Test
    fun confirmStaysOpenAndReportsWhenItThrows() = runBlocking {
        val state = ConfirmDialogState(null)
        var dismissed = 0
        var reported: Throwable? = null
        state.confirm({ error("no se pudo") }, { dismissed++ }, { reported = it })
        assertEquals(0, dismissed)
        assertFalse(state.pending)
        assertEquals("no se pudo", reported?.message)
    }

    @Test
    fun confirmDoesNothingWhileBusy() = runBlocking {
        val state = ConfirmDialogState(null, pending = true)
        var ran = false
        state.confirm({ ran = true }, {}, null)
        assertFalse(ran)
    }

    @Test
    fun confirmRethrowsCancellationAndClearsBusy() = runBlocking {
        val state = ConfirmDialogState(null)
        assertFailsWith<CancellationException> { state.confirm({ throw CancellationException("cerrado") }, {}, null) }
        assertFalse(state.pending)
    }

    @Test
    fun phraseGatesTheConfirmation() = runBlocking {
        val state = ConfirmDialogState("Casa del lago")
        var ran = 0
        state.confirm({ ran++ }, {}, null)
        assertEquals(0, ran, "sin la frase no se confirma")

        state.edit("casa del lago")
        assertFalse(state.matches, "la caja cuenta")
        state.edit("  Casa del lago  ")
        assertTrue(state.matches, "se ignoran los espacios de los extremos")
        state.confirm({ ran++ }, {}, null)
        assertEquals(1, ran)
    }

    @Test
    fun phraseMismatchShowsOnlyAfterLeavingOrSubmitting() {
        val state = ConfirmDialogState("Casa del lago")
        state.edit("Casa del")
        assertFalse(state.mismatchShown, "mientras escribe no se avisa")
        state.leaveField()
        assertTrue(state.mismatchShown)
        state.edit("Casa del l")
        assertFalse(state.mismatchShown, "al volver a escribir se limpia")
        assertFalse(state.submitField())
        assertTrue(state.mismatchShown)

        val empty = ConfirmDialogState("Casa del lago")
        empty.leaveField()
        assertFalse(empty.mismatchShown, "un campo vacío no se reprocha")
        assertFalse(empty.submitField())
        assertFalse(empty.mismatchShown)
    }
}
