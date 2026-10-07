package com.studiolxd.brand.components.menu

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.focusGroup
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.IntrinsicSize
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.widthIn
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.text.BasicText
import androidx.compose.foundation.verticalScroll
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.unit.sp
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.platform.LocalWindowInfo
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.clearAndSetSemantics
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.isTraversalGroup
import androidx.compose.ui.semantics.selected
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.IntOffset
import androidx.compose.ui.unit.IntRect
import androidx.compose.ui.unit.IntSize
import androidx.compose.ui.unit.LayoutDirection
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.Popup
import androidx.compose.ui.window.PopupPositionProvider
import androidx.compose.ui.window.PopupProperties
import com.studiolxd.brand.components.button.BrandButton
import com.studiolxd.brand.components.button.ButtonVariant
import com.studiolxd.brand.icon.BrandIcon
import com.studiolxd.brand.icon.BrandIconName
import com.studiolxd.brand.icon.BrandIconSize
import com.studiolxd.brand.support.BrandLineBox
import com.studiolxd.brand.support.LocalBrandIconTextSize
import com.studiolxd.brand.support.LocalBrandTextStyle
import com.studiolxd.brand.support.brandTextStyle
import com.studiolxd.brand.support.collectBrandInteractionState
import com.studiolxd.brand.tokens.BrandMenuTokens as T
import com.studiolxd.brand.tokens.BrandSpacing

/**
 * Un ítem de [BrandMenu] y [BrandContextMenu]: los casos de `MenuItem` de React menos `link`. La navegación la hace la
 * app en la [Button.action] de un ítem de acción.
 */
sealed interface BrandMenuItem {
    /**
     * Una acción. [description] es una segunda línea menor; [destructive] la pinta como acción que borra; [closeOnSelect]
     * `false` deja el menú abierto al elegirla (en Android se honra; en iOS y macOS el menú del sistema siempre se cierra).
     */
    data class Button(
        val label: String,
        val action: () -> Unit,
        val description: String? = null,
        val icon: BrandIconName? = null,
        val destructive: Boolean = false,
        val disabled: Boolean = false,
        val closeOnSelect: Boolean = true,
    ) : BrandMenuItem

    /** La línea que separa dos grupos de ítems. */
    data object Separator : BrandMenuItem

    /** Un rótulo de sección: texto que no se puede elegir. */
    data class Label(val text: String) : BrandMenuItem

    /** Una opción de un grupo de radio: la elegida es la de `selection` igual a [value]. Elegirla cierra el menú. */
    data class Radio(
        val label: String,
        val value: String,
        val icon: BrandIconName? = null,
        val disabled: Boolean = false,
    ) : BrandMenuItem
}

/** `ContextMenu` `triggerSize`: la talla de control del botón de tres puntos. */
typealias ContextMenuTriggerSize = com.studiolxd.brand.support.BrandControlSize

/** `ContextMenu` `triggerOrientation`: los tres puntos en horizontal (por defecto) o en vertical. */
enum class ContextMenuTriggerOrientation(val value: String) {
    Horizontal("horizontal"),
    Vertical("vertical"),
}

/**
 * Si el panel pasa el foco a su primer ítem al abrirse (sí, siempre). Las capturas lo apagan: el momento en que layoutlib
 * resuelve el foco no es determinista y el ítem resaltado saldría o no según la ejecución. Interno.
 */
internal val LocalBrandMenuAutoFocus = androidx.compose.runtime.compositionLocalOf { true }

/** El ancho mínimo del panel: el `min-width: 10rem` de React (no es un token: es el default de la prop `minWidth` web). */
private val MenuMinWidth = 160.dp

/** El ítem que debe recibir el foco al abrirse el panel: el primero que se puede elegir. Interno y comprobable. */
internal fun firstActionableIndex(items: List<BrandMenuItem>): Int? = items.indexOfFirst {
    (it is BrandMenuItem.Button && !it.disabled) || (it is BrandMenuItem.Radio && !it.disabled)
}.takeIf { it >= 0 }

/** Lo que se hace al elegir un ítem: qué se llama y si el panel se cierra. Interno y comprobable. */
internal class MenuSelection(val closes: Boolean)

/** Elige [item]: llama a su acción (o a [onSelectionChange] con el valor del radio) y dice si el panel debe cerrarse. */
internal fun activateMenuItem(item: BrandMenuItem, onSelectionChange: ((String) -> Unit)?): MenuSelection? = when (item) {
    is BrandMenuItem.Button -> if (item.disabled) null else { item.action(); MenuSelection(item.closeOnSelect) }
    is BrandMenuItem.Radio -> if (item.disabled) null else { onSelectionChange?.invoke(item.value); MenuSelection(true) }
    else -> null
}

/**
 * Un menú de acciones de la marca (`Menu` de React): el [trigger] lo pone quien lo usa y el panel se abre **bajo él** (o
 * sobre él si abajo no cabe), alineado a su inicio. Sin Material no hay `DropdownMenu`, así que es un `Popup` propio con
 * los tokens `menu.*` (panel, ítem, ítem resaltado por teclado o puntero, destructivo, separador, rótulo y ítem
 * deshabilitado), igual que `BrandSelectField` con `select.*`.
 *
 * ```kotlin
 * BrandMenu(
 *     items = listOf(
 *         BrandMenuItem.Button("Editar", action = { edit() }),
 *         BrandMenuItem.Separator,
 *         BrandMenuItem.Button("Eliminar", action = { delete() }, destructive = true),
 *     ),
 * ) { _, toggle -> BrandButton("Acciones", onClick = toggle, variant = ButtonVariant.Outline) }
 * ```
 *
 * Los ítems [BrandMenuItem.Radio] eligen entre ellos con [selection] (el valor elegido) y [onSelectionChange].
 *
 * **Teclado y TalkBack**: al abrirse el foco pasa al primer ítem elegible y vuelve al disparador al cerrarse; las flechas
 * (DPAD) recorren los ítems, el ítem con foco queda resaltado y `Escape`/Atrás cierra. Cada ítem es un botón (`Role.Button`;
 * los radio, `Role.RadioButton` con su estado) y los deshabilitados se anuncian como tales.
 *
 * @param trigger el disparador: recibe si el panel está abierto y la función que lo abre o lo cierra.
 * @param onOpenChange aviso de apertura y cierre (solo en Compose: el `Menu` del sistema de SwiftUI no avisa).
 */
@Composable
fun BrandMenu(
    items: List<BrandMenuItem>,
    modifier: Modifier = Modifier,
    selection: String? = null,
    onSelectionChange: ((String) -> Unit)? = null,
    onOpenChange: ((Boolean) -> Unit)? = null,
    trigger: @Composable (expanded: Boolean, toggle: () -> Unit) -> Unit,
) = BrandMenuImpl(items, modifier, selection, onSelectionChange, onOpenChange, alignEnd = false, trigger = trigger)

/** Un [BrandMenu] cuyo disparador es un botón `outline` con [label] y un chevron. */
@Composable
fun BrandMenu(
    label: String,
    items: List<BrandMenuItem>,
    modifier: Modifier = Modifier,
    selection: String? = null,
    onSelectionChange: ((String) -> Unit)? = null,
    onOpenChange: ((Boolean) -> Unit)? = null,
) {
    BrandMenu(items, modifier, selection, onSelectionChange, onOpenChange) { _, toggle ->
        BrandButton(onClick = toggle, variant = ButtonVariant.Outline) {
            BasicText(label, style = LocalBrandTextStyle.current, maxLines = 1, overflow = TextOverflow.Ellipsis)
            BrandIcon(BrandIconName.Chevron, modifier = Modifier.padding(start = BrandSpacing.s2), size = BrandIconSize.Text)
        }
    }
}

/**
 * El menú de acciones de un botón «⋯» (`ContextMenu` de React): el mismo panel que [BrandMenu] con el disparador de
 * Brand —un botón fantasma de solo icono con el icono `dots`, girado 90° si [triggerOrientation] es vertical—, con la
 * zona táctil de 48 dp. El panel se alinea al final del disparador.
 *
 * No es el menú contextual por pulsación larga del sistema: es el menú de acciones de un botón, como en la web.
 *
 * @param label nombre accesible del botón. Castellano por defecto («Más opciones»); se traduce pasando el texto.
 */
@Composable
fun BrandContextMenu(
    items: List<BrandMenuItem>,
    modifier: Modifier = Modifier,
    selection: String? = null,
    onSelectionChange: ((String) -> Unit)? = null,
    triggerSize: ContextMenuTriggerSize = ContextMenuTriggerSize.Md,
    triggerOrientation: ContextMenuTriggerOrientation = ContextMenuTriggerOrientation.Horizontal,
    label: String = "Más opciones",
    onOpenChange: ((Boolean) -> Unit)? = null,
) = BrandMenuImpl(items, modifier, selection, onSelectionChange, onOpenChange, alignEnd = true) { _, toggle ->
    BrandContextMenuTrigger(toggle, triggerSize, triggerOrientation, label)
}

/** El botón de tres puntos del [BrandContextMenu]: `Button ghost` de solo icono. Interno: también lo pintan las capturas. */
@Composable
internal fun BrandContextMenuTrigger(
    onClick: () -> Unit,
    size: ContextMenuTriggerSize,
    orientation: ContextMenuTriggerOrientation,
    label: String,
) {
    BrandButton(onClick = onClick, variant = ButtonVariant.Ghost, size = size, iconOnly = true, contentDescription = label) {
        BrandIcon(
            BrandIconName.Dots,
            modifier = if (orientation == ContextMenuTriggerOrientation.Vertical) Modifier.rotate(90f) else Modifier,
            size = if (size == ContextMenuTriggerSize.Lg) BrandIconSize.Md else BrandIconSize.Sm,
        )
    }
}

@Composable
internal fun BrandMenuImpl(
    items: List<BrandMenuItem>,
    modifier: Modifier,
    selection: String?,
    onSelectionChange: ((String) -> Unit)?,
    onOpenChange: ((Boolean) -> Unit)?,
    alignEnd: Boolean,
    initiallyExpanded: Boolean = false,
    trigger: @Composable (expanded: Boolean, toggle: () -> Unit) -> Unit,
) {
    var expanded by remember { mutableStateOf(initiallyExpanded) }
    val triggerFocus = remember { FocusRequester() }
    fun setExpanded(value: Boolean) {
        if (value == expanded) return
        expanded = value
        onOpenChange?.invoke(value)
    }
    // Al cerrarse, el foco vuelve al disparador.
    var wasExpanded by remember { mutableStateOf(false) }
    LaunchedEffect(expanded) {
        if (wasExpanded && !expanded) runCatching { triggerFocus.requestFocus() }
        wasExpanded = expanded
    }
    Box(modifier.focusRequester(triggerFocus).focusGroup()) {
        trigger(expanded) { setExpanded(!expanded) }
        BrandMenuPopup(expanded, onDismissRequest = { setExpanded(false) }, alignEnd = alignEnd) {
            BrandMenuPanel(items, selection) { item ->
                val result = activateMenuItem(item, onSelectionChange)
                if (result?.closes == true) setExpanded(false)
            }
        }
    }
}

/** El popup del menú: cuelga bajo el disparador, alineado a su inicio o a su final, o sube si abajo no cabe. */
@Composable
private fun BrandMenuPopup(expanded: Boolean, onDismissRequest: () -> Unit, alignEnd: Boolean, content: @Composable () -> Unit) {
    if (!expanded) return
    val offset = with(LocalDensity.current) { BrandSpacing.s1.roundToPx() }
    val provider = remember(alignEnd, offset) {
        object : PopupPositionProvider {
            override fun calculatePosition(anchorBounds: IntRect, windowSize: IntSize, layoutDirection: LayoutDirection, popupContentSize: IntSize): IntOffset {
                val preferred = if (alignEnd) anchorBounds.right - popupContentSize.width else anchorBounds.left
                val x = preferred.coerceIn(0, (windowSize.width - popupContentSize.width).coerceAtLeast(0))
                val below = anchorBounds.bottom + offset
                val y = if (below + popupContentSize.height <= windowSize.height) below else (anchorBounds.top - offset - popupContentSize.height).coerceAtLeast(0)
                return IntOffset(x, y)
            }
        }
    }
    Popup(popupPositionProvider = provider, onDismissRequest = onDismissRequest, properties = PopupProperties(focusable = true)) { content() }
}

/**
 * El panel del menú: fondo y borde de `menu.*`, con el aire `menu.padding-block` arriba y abajo y los ítems inseteados
 * `menu.padding-inline`; los separadores van de borde a borde y el rótulo de sección replica la caja del ítem en horizontal
 * (`menu.label-margin-inline` + `menu.label-padding-inline`, que apuntan a los del ítem), así que su texto arranca donde
 * arranca el contenido del ítem, como `.menu__label` en React. Interno: también lo pintan las capturas.
 */
@Composable
internal fun BrandMenuPanel(
    items: List<BrandMenuItem>,
    selection: String?,
    modifier: Modifier = Modifier,
    forcedHighlight: Int? = null,
    limitHeight: Boolean = true,
    onActivate: (BrandMenuItem) -> Unit,
) {
    val maxHeight = with(LocalDensity.current) { (LocalWindowInfo.current.containerSize.height * 0.6f).toDp() }
    val firstFocus = remember { FocusRequester() }
    val first = remember(items) { firstActionableIndex(items) }
    val autoFocus = LocalBrandMenuAutoFocus.current
    LaunchedEffect(Unit) { if (autoFocus && first != null) runCatching { firstFocus.requestFocus() } }
    Column(
        modifier
            .widthIn(min = MenuMinWidth)
            .width(IntrinsicSize.Max)
            .then(if (limitHeight) Modifier.heightIn(max = maxHeight) else Modifier)
            .background(T.bg.current, RectangleShape)
            .border(T.borderWidth, T.borderColor.current, RectangleShape)
            .verticalScroll(rememberScrollState())
            .padding(vertical = T.paddingBlock)
            .semantics { isTraversalGroup = true },
    ) {
        items.forEachIndexed { index, item ->
            when (item) {
                is BrandMenuItem.Separator -> Box(
                    Modifier
                        .padding(vertical = T.separatorMarginBlock)
                        .fillMaxWidth()
                        .height(T.separatorHeight)
                        .background(T.separatorColor.current)
                        .clearAndSetSemantics { },
                )
                is BrandMenuItem.Label -> BasicText(
                    item.text,
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = T.labelMarginInline)
                        .padding(horizontal = T.labelPaddingInline, vertical = T.labelPaddingBlock),
                    style = brandTextStyle(T.labelFontSize, T.labelFontWeight, T.itemLineHeight, color = T.labelColor.current),
                )
                is BrandMenuItem.Button -> MenuRow(
                    label = item.label, description = item.description, icon = item.icon, destructive = item.destructive,
                    disabled = item.disabled, selected = null, focus = if (index == first) firstFocus else null, forceHighlight = index == forcedHighlight,
                ) { onActivate(item) }
                is BrandMenuItem.Radio -> MenuRow(
                    label = item.label, description = null, icon = item.icon, destructive = false,
                    disabled = item.disabled, selected = item.value == selection, focus = if (index == first) firstFocus else null, forceHighlight = index == forcedHighlight,
                ) { onActivate(item) }
            }
        }
    }
}

/** Una fila elegible del panel. [selected] `null` es una acción; un valor, una opción de radio con ese estado. */
@Composable
private fun MenuRow(
    label: String,
    description: String?,
    icon: BrandIconName?,
    destructive: Boolean,
    disabled: Boolean,
    selected: Boolean?,
    focus: FocusRequester?,
    forceHighlight: Boolean,
    onClick: () -> Unit,
) {
    val source = remember { MutableInteractionSource() }
    val state = source.collectBrandInteractionState()
    val highlighted = !disabled && (forceHighlight || state.hovered || state.pressed || state.focusVisible)
    val background = when {
        !highlighted -> androidx.compose.ui.graphics.Color.Transparent
        destructive -> T.itemDestructiveHighlightedBg.current
        else -> T.itemHighlightedBg.current
    }
    val ink = when {
        highlighted && destructive -> T.itemDestructiveHighlightedColor.current
        highlighted -> T.itemHighlightedColor.current
        destructive -> T.itemDestructiveColor.current
        else -> T.itemColor.current
    }
    val weight = if (selected == true) T.itemSelectedFontWeight else T.itemFontWeight
    Box(Modifier.padding(horizontal = T.paddingInline)) {
        Row(
            Modifier
                .fillMaxWidth()
                .alpha(if (disabled) T.disabledOpacity else 1f)
                .background(background, RectangleShape)
                .then(if (focus != null) Modifier.focusRequester(focus) else Modifier)
                .clickable(interactionSource = source, indication = null, enabled = !disabled, role = if (selected == null) Role.Button else Role.RadioButton, onClick = onClick)
                .then(if (selected != null) Modifier.semantics { this.selected = selected } else Modifier)
                .padding(horizontal = T.itemPaddingInline, vertical = T.itemPaddingBlock),
            horizontalArrangement = Arrangement.spacedBy(T.itemIconGap),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            if (icon != null) {
                // El glifo mide `menu.item-icon-size` y crece con la escala de fuente, como el de los campos.
                CompositionLocalProvider(LocalBrandIconTextSize provides T.itemIconSize.value.sp) {
                    BrandIcon(icon, size = BrandIconSize.Text, color = ink)
                }
            }
            Column(Modifier.weight(1f, fill = false)) {
                BrandLineBox(T.itemFontSize, T.itemLineHeight) {
                    BasicText(label, style = brandTextStyle(T.itemFontSize, weight, T.itemLineHeight, color = ink), maxLines = 1, overflow = TextOverflow.Ellipsis)
                }
                if (description != null) {
                    BrandLineBox(T.labelFontSize, T.itemLineHeight) {
                        BasicText(description, style = brandTextStyle(T.labelFontSize, T.itemFontWeight, T.itemLineHeight, color = ink), maxLines = 1, overflow = TextOverflow.Ellipsis)
                    }
                }
            }
        }
    }
}
