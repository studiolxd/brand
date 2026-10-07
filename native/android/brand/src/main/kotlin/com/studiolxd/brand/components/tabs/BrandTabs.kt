package com.studiolxd.brand.components.tabs

import androidx.compose.foundation.background
import androidx.compose.foundation.focusGroup
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.IntrinsicSize
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.selection.selectable
import androidx.compose.foundation.selection.selectableGroup
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.runtime.Immutable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.input.key.Key
import androidx.compose.ui.input.key.KeyEventType
import androidx.compose.ui.input.key.key
import androidx.compose.ui.input.key.onPreviewKeyEvent
import androidx.compose.ui.input.key.type
import androidx.compose.ui.platform.LocalLayoutDirection
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.LayoutDirection

import androidx.compose.ui.unit.dp
import com.studiolxd.brand.components.field.LocalBrandForcedFocus
import com.studiolxd.brand.components.field.animatedFieldColor
import com.studiolxd.brand.support.BrandBasicText
import com.studiolxd.brand.support.brandFocusRing
import com.studiolxd.brand.support.brandTextStyle
import com.studiolxd.brand.support.collectBrandInteractionState
import com.studiolxd.brand.support.rememberReduceMotion
import com.studiolxd.brand.tokens.BrandTabsTokens as T

/** `TabsList` `variant`: `underline` (una línea bajo la pestaña activa) o `pill` (relleno en la activa). */
enum class TabsVariant(val value: String) {
    Underline("underline"),
    Pill("pill"),
}

/** `Tabs` `orientation`: las pestañas en fila (por defecto) o en columna. */
enum class TabsOrientation(val value: String) {
    Horizontal("horizontal"),
    Vertical("vertical"),
}

/**
 * Una pestaña de [BrandTabs] (`TabsTrigger` de React): su [label], el [value] con el que se elige y si está
 * habilitada. `disabled` de React es el `enabled` de Compose.
 */
@Immutable
data class BrandTab<T>(val label: String, val value: T, val enabled: Boolean = true)

/** Las pestañas de un [BrandTabs] declaradas con un bloque: `tab("General", Tab.General)`. */
class BrandTabsScope<T> internal constructor() {
    internal val tabs = mutableListOf<BrandTab<T>>()

    /** Una pestaña. */
    fun tab(label: String, value: T, enabled: Boolean = true) {
        tabs += BrandTab(label, value, enabled)
    }
}

/** Qué pestaña elige una flecha del teclado. */
internal enum class TabsStep { Previous, Next }

/**
 * La pestaña a la que lleva una flecha desde [current]: la habilitada anterior o siguiente, **dando la vuelta** al
 * llegar al extremo (como `loopFocus` de React). `null` si no hay otra a la que ir. Interno y comprobable.
 */
internal fun <T> adjacentTab(tabs: List<BrandTab<T>>, current: T, step: TabsStep): BrandTab<T>? {
    val enabled = tabs.filter { it.enabled || it.value == current }
    val index = enabled.indexOfFirst { it.value == current }
    if (index < 0 || enabled.size < 2) return enabled.firstOrNull { it.enabled && it.value != current }
    val next = when (step) {
        TabsStep.Next -> enabled[(index + 1) % enabled.size]
        TabsStep.Previous -> enabled[(index - 1 + enabled.size) % enabled.size]
    }
    return next.takeIf { it.value != current }
}

/** La flecha que mueve la selección según la orientación y el sentido de escritura; `null` si la tecla no es una flecha útil. */
internal fun tabsStepFor(key: Key, orientation: TabsOrientation, rtl: Boolean): TabsStep? = when (orientation) {
    TabsOrientation.Horizontal -> when (key) {
        Key.DirectionRight -> if (rtl) TabsStep.Previous else TabsStep.Next
        Key.DirectionLeft -> if (rtl) TabsStep.Next else TabsStep.Previous
        else -> null
    }
    TabsOrientation.Vertical -> when (key) {
        Key.DirectionDown -> TabsStep.Next
        Key.DirectionUp -> TabsStep.Previous
        else -> null
    }
}

/**
 * La barra de pestañas de la marca (`Tabs` + `TabsList` + `TabsTrigger` de React): solo la barra. El contenido de cada
 * pestaña lo pinta la app con un `when` sobre [selection]. No es la `NavigationBar` de Android: esa es navegación de la
 * app entera; esto es el control de sección dentro de una pantalla.
 *
 * ```kotlin
 * BrandTabs(selection = section, onSelectionChange = { section = it }) {
 *     tab("General", Section.General)
 *     tab("Seguridad", Section.Security)
 *     tab("Notificaciones", Section.Notifications, enabled = false)
 * }
 * when (section) { Section.General -> General() … }
 * ```
 *
 * El valor de la selección puede ser de **cualquier tipo**. La barra horizontal que no cabe se **desplaza**
 * horizontalmente. Estados: reposo, activa (peso 500, indicador o relleno), *hover*, foco de teclado/DPAD (anillo
 * `tabs.focus-ring-*`) y deshabilitada (`tabs.trigger-disabled-opacity`).
 *
 * **Teclado y TalkBack**: cada pestaña es una pestaña (`Role.Tab`) con su estado seleccionado y la barra es un grupo
 * seleccionable; las flechas mueven la selección con **activación automática** (`activateOnFocus` de React) y dan la
 * vuelta en los extremos.
 *
 * @param contentDescription nombre accesible de la barra (el `aria-label` de `TabsList`).
 */
@Composable
fun <T> BrandTabs(
    selection: T,
    onSelectionChange: (T) -> Unit,
    modifier: Modifier = Modifier,
    variant: TabsVariant = TabsVariant.Underline,
    orientation: TabsOrientation = TabsOrientation.Horizontal,
    contentDescription: String? = null,
    content: BrandTabsScope<T>.() -> Unit,
) {
    BrandTabs(BrandTabsScope<T>().apply(content).tabs, selection, onSelectionChange, modifier, variant, orientation, contentDescription)
}

/** [BrandTabs] con las pestañas ya construidas (una lista de [BrandTab]). */
@Composable
fun <T> BrandTabs(
    tabs: List<BrandTab<T>>,
    selection: T,
    onSelectionChange: (T) -> Unit,
    modifier: Modifier = Modifier,
    variant: TabsVariant = TabsVariant.Underline,
    orientation: TabsOrientation = TabsOrientation.Horizontal,
    contentDescription: String? = null,
) {
    val requesters = remember(tabs.size) { List(tabs.size) { FocusRequester() } }
    val rtl = LocalLayoutDirection.current == LayoutDirection.Rtl
    val horizontal = orientation == TabsOrientation.Horizontal
    val lineColor = T.listBorderColor.current
    val border = T.listBorderWidth
    // La lista `pill` va sin la línea de abajo y con el aire `list-gap` alrededor; en vertical, la línea del lado la lleva
    // cualquier variante (la regla vertical de la hoja gana a la de `pill`).
    val withLine = variant == TabsVariant.Underline || !horizontal
    val listPadding = if (variant == TabsVariant.Pill) T.listGap else 0.dp

    fun move(step: TabsStep): Boolean {
        val target = adjacentTab(tabs, selection, step) ?: return false
        onSelectionChange(target.value)
        runCatching { requesters[tabs.indexOfFirst { it.value == target.value }].requestFocus() }
        return true
    }

    val items: @Composable () -> Unit = {
        tabs.forEachIndexed { index, tab ->
            BrandTabSurface(
                tab = tab,
                selected = tab.value == selection,
                variant = variant,
                orientation = orientation,
                focusRequester = requesters[index],
                onSelect = { onSelectionChange(tab.value) },
            )
        }
    }
    val keys = Modifier.onPreviewKeyEvent { event ->
        val step = if (event.type == KeyEventType.KeyDown) tabsStepFor(event.key, orientation, rtl) else null
        step != null && move(step)
    }
    val semanticsModifier = modifier
        .selectableGroup()
        .then(if (contentDescription != null) Modifier.semantics { this.contentDescription = contentDescription } else Modifier)

    if (horizontal) {
        // La línea de la lista corre bajo TODAS las pestañas, también cuando la barra se desplaza.
        Box(
            semanticsModifier
                .fillMaxWidth()
                .then(if (withLine) Modifier.drawBehind { drawRect(lineColor, Offset(0f, size.height - border.toPx()), Size(size.width, border.toPx())) } else Modifier),
        ) {
            Row(
                Modifier.horizontalScroll(rememberScrollState()).padding(listPadding).focusGroup().then(keys),
                horizontalArrangement = Arrangement.spacedBy(T.listGap),
            ) { items() }
        }
    } else {
        Box(
            semanticsModifier
                .width(IntrinsicSize.Max)
                .then(if (withLine) Modifier.drawBehind { drawRect(lineColor, Offset(size.width - border.toPx(), 0f), Size(border.toPx(), size.height)) } else Modifier),
        ) {
            Column(Modifier.padding(listPadding).width(IntrinsicSize.Max).focusGroup().then(keys), verticalArrangement = Arrangement.spacedBy(T.listGap)) { items() }
        }
    }
}

/** Una pestaña pintada. Interno: lo usan [BrandTabs] y las capturas de estados. */
@Composable
internal fun <V> BrandTabSurface(
    tab: BrandTab<V>,
    selected: Boolean,
    variant: TabsVariant,
    orientation: TabsOrientation,
    focusRequester: FocusRequester?,
    onSelect: () -> Unit,
    stateOverride: com.studiolxd.brand.support.BrandInteractionState? = null,
) {
    val source = remember { MutableInteractionSource() }
    val state = stateOverride ?: source.collectBrandInteractionState()
    val reduceMotion = rememberReduceMotion()
    val enabled = tab.enabled
    val pill = variant == TabsVariant.Pill
    val vertical = orientation == TabsOrientation.Vertical

    val inkTarget = when {
        selected && pill -> T.triggerPillColorActive
        selected -> T.triggerActiveColor
        state.hovered && enabled -> T.triggerHoverColor
        else -> T.triggerColor
    }.current
    val ink = animatedFieldColor(inkTarget, T.transitionDuration, T.transitionEasing, reduceMotion, "tab-ink")
    val weight: FontWeight = if (selected) FontWeight(T.triggerActiveWeight.toInt()) else T.triggerFontWeight
    val shape: Shape = if (T.triggerBorderRadius > 0.dp) RoundedCornerShape(T.triggerBorderRadius) else RectangleShape
    val indicator = T.triggerIndicatorColor.current
    val thickness = T.triggerIndicatorWidth
    val pillBg = T.triggerPillBgActive.current

    Box(
        Modifier
            .alpha(if (enabled) 1f else T.triggerDisabledOpacity)
            .brandFocusRing(
                state.focusVisible || (LocalBrandForcedFocus.current && selected),
                T.focusRingColor.current, T.focusRingWidth, T.focusRingOffset, T.triggerBorderRadius,
            )
            .then(if (vertical) Modifier.fillMaxWidth() else Modifier)
            .then(if (pill && selected) Modifier.background(pillBg, shape) else Modifier)
            .then(
                if (!pill && selected) {
                    Modifier.drawBehind {
                        val t = thickness.toPx()
                        if (vertical) drawRect(indicator, Offset(size.width - t, 0f), Size(t, size.height))
                        else drawRect(indicator, Offset(0f, size.height - t), Size(size.width, t))
                    }
                } else Modifier,
            )
            .then(if (focusRequester != null) Modifier.focusRequester(focusRequester) else Modifier)
            .selectable(selected = selected, interactionSource = source, indication = null, enabled = enabled, role = Role.Tab, onClick = onSelect)
            .padding(horizontal = T.triggerPaddingInline, vertical = T.triggerPaddingBlock),
        contentAlignment = Alignment.Center,
    ) {
        // La caja de línea de CSS la pone `BrandBasicText`, con el interlineado del disparador de la web ([TriggerLineHeight]).
        BrandBasicText(
            tab.label,
            style = brandTextStyle(T.triggerFontSize, weight, TriggerLineHeight, color = ink)
                .copy(textAlign = if (vertical) TextAlign.Center else TextAlign.Unspecified),
            maxLines = 1,
            overflow = TextOverflow.Ellipsis,
        )
    }
}

/**
 * El `line-height` del disparador en la web: es un `<button>` y `.tabs__trigger` no lo fija, así que manda el
 * `line-height: 1.15` que `normalize.css` pone a los controles de formulario. No hay token (`tabs.trigger-line-height` no
 * existe): se copia el valor, como en SwiftUI, y se anota en la ficha.
 */
private const val TriggerLineHeight = 1.15f
