package com.studiolxd.brand.components.themeswitcher

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsFocusedAsState
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.selection.selectable
import androidx.compose.foundation.selection.selectableGroup
import androidx.compose.runtime.Composable
import androidx.compose.runtime.compositionLocalOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.layout.onSizeChanged
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.clearAndSetSemantics
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.semantics.stateDescription
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.dp
import com.studiolxd.brand.BrandTheme
import com.studiolxd.brand.components.button.BrandButtonImpl
import com.studiolxd.brand.components.button.ButtonTone
import com.studiolxd.brand.components.button.ButtonVariant
import com.studiolxd.brand.components.field.BrandDropdownPopup
import com.studiolxd.brand.components.field.LocalBrandForcedFocus
import com.studiolxd.brand.icon.BrandIcon
import com.studiolxd.brand.icon.BrandIconName
import com.studiolxd.brand.icon.BrandIconSize
import com.studiolxd.brand.support.BrandBasicText
import com.studiolxd.brand.support.BrandTextUnderline
import com.studiolxd.brand.support.ProvideBrandTextUnderline
import com.studiolxd.brand.support.BrandControlSize
import com.studiolxd.brand.support.brandFocusRing
import com.studiolxd.brand.support.brandBaseTextStyle
import com.studiolxd.brand.support.brandTransition
import com.studiolxd.brand.support.collectBrandInteractionState
import com.studiolxd.brand.support.rememberReduceMotion
import com.studiolxd.brand.support.resolve
import com.studiolxd.brand.support.scaledByFontScale
import com.studiolxd.brand.tokens.BrandDropdownFieldTokens
import com.studiolxd.brand.tokens.BrandFontWeight
import com.studiolxd.brand.tokens.BrandIconTokens
import com.studiolxd.brand.tokens.BrandLabelTokens
import com.studiolxd.brand.tokens.BrandLinkTokens
import com.studiolxd.brand.tokens.BrandSelectTokens
import com.studiolxd.brand.tokens.BrandTextTokens
import com.studiolxd.brand.tokens.BrandThemeSwitcherTokens as T

/** `ThemeSwitcher` `value`: el tema elegido. `System` sigue la preferencia del sistema operativo. */
enum class BrandThemeChoice(val value: String) {
    Light("light"),
    Dark("dark"),
    System("system"),
    ;

    internal val icon: BrandIconName
        get() = when (this) {
            Light -> BrandIconName.Sun
            Dark -> BrandIconName.Moon
            System -> BrandIconName.DeviceDesktop
        }
}

/**
 * `ThemeSwitcher` `variant`.
 *
 * - `Compact`: un campo desplegable con etiqueta, el icono y el nombre del tema actual (el del panel).
 * - `List`: las tres opciones desplegadas en línea (el del pie).
 * - `Icon`: solo el icono del tema actual, como botón de icono que abre el menú (para una barra sin sitio).
 */
enum class ThemeSwitcherVariant(val value: String) {
    Compact("compact"),
    List("list"),
    Icon("icon"),
}

/**
 * `ThemeSwitcher` `layout`: disposición de la etiqueta del control compacto. `Inline` la pone delante; `Stacked`,
 * encima con el control a todo el ancho (la forma del resto de campos de un formulario).
 */
enum class ThemeSwitcherLayout(val value: String) {
    Inline("inline"),
    Stacked("stacked"),
}

/** El nombre accesible por defecto del disparador de `Icon`: «Tema: Claro» (el `themeSwitcher.trigger` castellano de React). */
private val DefaultThemeTrigger: (group: String, theme: String) -> String = { group, theme -> "$group: $theme" }

/** Los textos del selector de tema (`labels` en React). Cada uno tiene su default castellano. */
data class ThemeSwitcherLabels(
    /** Nombre accesible del control y etiqueta del campo compacto. Default: «Tema». */
    val group: String = "Tema",
    val light: String = "Claro",
    val dark: String = "Oscuro",
    val system: String = "Sistema",
    /**
     * Nombre accesible del botón de la variante `Icon`, que solo enseña el icono del tema vigente: recibe el nombre del
     * control y el del tema, ya resueltos (`themeSwitcher.trigger` del catálogo de React). Es función porque el orden y la
     * puntuación de la frase son de cada idioma. Default castellano: «Tema: Claro» (`"$group: $theme"`).
     */
    val trigger: (group: String, theme: String) -> String = DefaultThemeTrigger,
) {
    internal fun text(choice: BrandThemeChoice): String = when (choice) {
        BrandThemeChoice.Light -> light
        BrandThemeChoice.Dark -> dark
        BrandThemeChoice.System -> system
    }

    /** El nombre accesible del disparador de `Icon` con el tema vigente. */
    internal fun triggerLabel(choice: BrandThemeChoice): String = trigger(group, text(choice))
}

/**
 * Selector de tema: claro, oscuro o el del sistema. Solo la vista: **el valor lo guarda la app**; aplicarlo
 * (`BrandTheme(darkTheme = …)`) y recordarlo es del producto.
 *
 * ```kotlin
 * BrandThemeSwitcher(theme, { theme = it })                                      // compact, con etiqueta delante
 * BrandThemeSwitcher(theme, { theme = it }, variant = ThemeSwitcherVariant.List) // las tres opciones en línea
 * BrandThemeSwitcher(theme, { theme = it }, variant = ThemeSwitcherVariant.Icon, size = BrandControlSize.Sm)
 * ```
 *
 * **TalkBack**: `Compact` es una lista desplegable con el tema actual como estado; `Icon` es un botón cuyo nombre
 * incluye el tema («Tema: Claro»); `List` es un grupo de radios (`selectableGroup`).
 */
@Composable
fun BrandThemeSwitcher(
    value: BrandThemeChoice,
    onValueChange: (BrandThemeChoice) -> Unit,
    modifier: Modifier = Modifier,
    labels: ThemeSwitcherLabels = ThemeSwitcherLabels(),
    variant: ThemeSwitcherVariant = ThemeSwitcherVariant.Compact,
    layout: ThemeSwitcherLayout = ThemeSwitcherLayout.Inline,
    size: BrandControlSize? = null,
) {
    val resolved = size.resolve()
    when (variant) {
        ThemeSwitcherVariant.List -> ThemeList(value, onValueChange, labels, modifier)
        ThemeSwitcherVariant.Icon -> ThemeIconVariant(value, onValueChange, labels, size, modifier)
        ThemeSwitcherVariant.Compact -> ThemeCompactVariant(value, onValueChange, labels, layout, resolved, modifier)
    }
}

// ───────────────────────────── icon

@Composable
private fun ThemeIconVariant(
    value: BrandThemeChoice,
    onValueChange: (BrandThemeChoice) -> Unit,
    labels: ThemeSwitcherLabels,
    size: BrandControlSize?,
    modifier: Modifier,
) {
    var expanded by remember { mutableStateOf(false) }
    var anchorWidthPx by remember { mutableStateOf(0) }
    val density = LocalDensity.current
    Box(modifier.onSizeChanged { anchorWidthPx = it.width }) {
        BrandButtonImpl(
            onClick = { expanded = true }, modifier = Modifier, variant = ButtonVariant.Ghost, tone = ButtonTone.Accent, size = size,
            destructive = false, block = false, iconOnly = true, enabled = true,
            contentDescription = labels.triggerLabel(value), interactionSource = null, stateOverride = null,
        ) { BrandIcon(value.icon, size = BrandIconSize.Md) }
        ThemeMenu(expanded, { expanded = false }, with(density) { anchorWidthPx.toDp() }, value, labels) {
            onValueChange(it)
            expanded = false
        }
    }
}

// ───────────────────────────── compact

@Composable
private fun ThemeCompactVariant(
    value: BrandThemeChoice,
    onValueChange: (BrandThemeChoice) -> Unit,
    labels: ThemeSwitcherLabels,
    layout: ThemeSwitcherLayout,
    size: BrandControlSize,
    modifier: Modifier,
) {
    var expanded by remember { mutableStateOf(false) }
    var anchorWidthPx by remember { mutableStateOf(0) }
    val density = LocalDensity.current
    val stacked = layout == ThemeSwitcherLayout.Stacked
    val labelSize = when (size) {
        BrandControlSize.Sm -> BrandLabelTokens.smFontSize
        BrandControlSize.Md -> BrandLabelTokens.fontSize
        BrandControlSize.Lg -> BrandLabelTokens.lgFontSize
    }
    val label: @Composable () -> Unit = {
        BrandBasicText(
            labels.group,
            modifier = Modifier.clearAndSetSemantics { },
            style = brandBaseTextStyle(labelSize, BrandLabelTokens.fontWeight, BrandLabelTokens.lineHeight, BrandLabelTokens.letterSpacing, color = BrandLabelTokens.color.current),
        )
    }
    val control: @Composable (Modifier) -> Unit = { controlModifier ->
        Box(controlModifier.onSizeChanged { anchorWidthPx = it.width }) {
            ThemeDropdownControl(value, labels, size, stacked, expanded) { expanded = true }
            ThemeMenu(expanded, { expanded = false }, with(density) { anchorWidthPx.toDp() }, value, labels) {
                onValueChange(it)
                expanded = false
            }
        }
    }
    if (stacked) {
        Column(modifier.fillMaxWidth(), verticalArrangement = Arrangement.spacedBy(BrandDropdownFieldTokens.gap)) {
            label()
            control(Modifier.fillMaxWidth())
        }
    } else {
        Row(modifier, horizontalArrangement = Arrangement.spacedBy(BrandDropdownFieldTokens.gap), verticalAlignment = Alignment.CenterVertically) {
            label()
            control(Modifier)
        }
    }
}

/** La cara del `DropdownField`: rectangular, a la altura del sistema, con el icono del tema, su nombre y el chevron. */
@Composable
private fun ThemeDropdownControl(
    choice: BrandThemeChoice,
    labels: ThemeSwitcherLabels,
    controlSize: BrandControlSize,
    fillsWidth: Boolean,
    expanded: Boolean,
    onClick: () -> Unit,
) {
    val D = BrandDropdownFieldTokens
    val source = remember { MutableInteractionSource() }
    val focused by source.collectIsFocusedAsState()
    val forcedFocus = LocalBrandForcedFocus.current
    val reduceMotion = rememberReduceMotion()
    val height = when (controlSize) {
        BrandControlSize.Sm -> D.smHeight
        BrandControlSize.Md -> D.height
        BrandControlSize.Lg -> D.lgHeight
    }.scaledByFontScale()
    val fontSize: TextUnit = when (controlSize) {
        BrandControlSize.Sm -> D.smFontSize
        BrandControlSize.Md -> D.fontSize
        BrandControlSize.Lg -> D.lgFontSize
    }
    val padding = when (controlSize) {
        BrandControlSize.Sm -> D.smPaddingInline
        BrandControlSize.Md -> D.paddingInline
        BrandControlSize.Lg -> D.lgPaddingInline
    }
    val iconSide = when (controlSize) {
        BrandControlSize.Sm -> D.smValueIconSize
        BrandControlSize.Md -> D.valueIconSize
        BrandControlSize.Lg -> D.lgValueIconSize
    }
    val iconSize = if (iconSide <= BrandIconTokens.sizeSm) BrandIconSize.Sm else BrandIconSize.Md
    val chevron by animateFloatAsState(
        if (expanded) 270f else 90f,
        brandTransition(D.iconTransition, D.iconTransitionEasing, reduceMotion),
        label = "theme-chevron",
    )
    val text = labels.text(choice)
    val borderColor = D.borderColor.current
    val ring = D.focusRingColor.current

    Row(
        Modifier
            .then(if (fillsWidth) Modifier.fillMaxWidth() else Modifier)
            .height(height)
            .background(D.bg.current)
            .drawBehind {
                val line = D.borderWidth.toPx()
                drawRect(borderColor, style = Stroke(line), topLeft = Offset(line / 2, line / 2), size = Size(size.width - line, size.height - line))
                if (focused || forcedFocus) {
                    // Hacia dentro, pegado al borde: como el Select.
                    val w = D.focusRingWidth.toPx()
                    val half = line + w / 2
                    drawRect(ring, style = Stroke(w), topLeft = Offset(half, half), size = Size(size.width - 2 * half, size.height - 2 * half))
                }
            }
            .clickable(interactionSource = source, indication = null, role = Role.DropdownList, onClick = onClick)
            .semantics {
                contentDescription = labels.group
                stateDescription = text
            }
            .padding(horizontal = padding),
        horizontalArrangement = Arrangement.spacedBy(D.contentGap),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Row(
            Modifier.then(if (fillsWidth) Modifier.weight(1f) else Modifier).clearAndSetSemantics { },
            horizontalArrangement = Arrangement.spacedBy(D.contentGap),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            BrandIcon(choice.icon, size = iconSize, color = D.color.current)
            BrandBasicText(text, style = brandBaseTextStyle(fontSize, D.fontWeight, 1f, color = D.color.current), maxLines = 1)
        }
        BrandIcon(BrandIconName.Chevron, modifier = Modifier.rotate(chevron), size = BrandIconSize.Sm, color = D.color.current)
    }
}

/** El desplegable de `compact` e `icon`: una fila por tema, con su icono; el vigente en énfasis. */
@Composable
private fun ThemeMenu(
    expanded: Boolean,
    onDismiss: () -> Unit,
    anchorWidth: Dp,
    current: BrandThemeChoice,
    labels: ThemeSwitcherLabels,
    onSelect: (BrandThemeChoice) -> Unit,
) {
    BrandDropdownPopup(expanded, onDismiss, anchorWidth) {
        ThemeMenuContent(current, labels, onSelect)
    }
}

/** Las filas del menú de temas. Interno: también lo pintan las capturas. */
@Composable
internal fun ThemeMenuContent(current: BrandThemeChoice, labels: ThemeSwitcherLabels, onSelect: (BrandThemeChoice) -> Unit) {
    BrandThemeChoice.entries.forEach { choice ->
        ThemeMenuItem(choice, labels.text(choice), choice == current, onSelect)
    }
}

@Composable
private fun ThemeMenuItem(choice: BrandThemeChoice, text: String, isCurrent: Boolean, onSelect: (BrandThemeChoice) -> Unit) {
    val S = BrandSelectTokens
    val source = remember { MutableInteractionSource() }
    val state = source.collectBrandInteractionState()
    val highlighted = state.hovered || state.pressed || state.focused
    val color = (if (highlighted) S.itemHighlightedColor else S.color).current
    Row(
        Modifier
            .fillMaxWidth()
            .background(if (highlighted) S.itemHighlightedBg.current else Color.Transparent)
            .selectable(selected = isCurrent, interactionSource = source, indication = null, role = Role.RadioButton) { onSelect(choice) }
            .padding(horizontal = S.paddingInline, vertical = S.itemPaddingBlock),
        horizontalArrangement = Arrangement.spacedBy(T.iconGap),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        BrandIcon(choice.icon, size = BrandIconSize.Sm, color = color)
        // `.select__item` no declara `line-height`: hereda el del cuerpo (`text.line-height`), no el del disparador.
        BrandBasicText(
            text,
            style = brandBaseTextStyle(S.fontSize, if (isCurrent) S.itemSelectedFontWeight else S.fontWeight, BrandTextTokens.lineHeight, color = color),
            maxLines = 1,
        )
    }
}

// ───────────────────────────── list

/** Solo para las capturas: pinta esa opción de `List` como bajo el puntero, que Paparazzi no puede simular. */
internal val LocalThemeSwitcherForcedHover = compositionLocalOf<BrandThemeChoice?> { null }

/**
 * `variant = List`: las tres opciones en línea (y, si no caben con la escala de fuente grande, en la línea siguiente,
 * como `flex-wrap`). La vigente va en énfasis y sin subrayado; el resto se subraya al pasar el puntero o pulsar
 * (la línea de `Link`).
 */
@OptIn(ExperimentalLayoutApi::class)
@Composable
private fun ThemeList(
    value: BrandThemeChoice,
    onValueChange: (BrandThemeChoice) -> Unit,
    labels: ThemeSwitcherLabels,
    modifier: Modifier,
) {
    FlowRow(
        modifier
            .selectableGroup()
            .semantics { contentDescription = labels.group },
        horizontalArrangement = Arrangement.spacedBy(T.listGap),
        verticalArrangement = Arrangement.spacedBy(T.listGap),
    ) {
        BrandThemeChoice.entries.forEach { choice ->
            ThemeListOption(choice, labels.text(choice), choice == value) { onValueChange(choice) }
        }
    }
}

@Composable
private fun ThemeListOption(choice: BrandThemeChoice, text: String, isCurrent: Boolean, onClick: () -> Unit) {
    val source = remember { MutableInteractionSource() }
    val state = source.collectBrandInteractionState()
    val ink = BrandTheme.colors.text
    val underline = BrandLinkTokens.underlineWidth.current
    val offset = BrandLinkTokens.underlineOffset
    val showsLine = (state.hovered || state.pressed || LocalThemeSwitcherForcedHover.current == choice) && !isCurrent
    val weight: FontWeight = if (isCurrent) T.listCurrentFontWeight else BrandFontWeight.default
    Row(
        Modifier
            .brandFocusRing(state.focusVisible, T.focusRingColor.current, T.focusRingWidth, T.focusRingOffset)
            .selectable(selected = isCurrent, interactionSource = source, indication = null, role = Role.RadioButton, onClick = onClick)
            // El hueco de la línea, como el `padding-block-end` de la web al pasar el puntero.
            .then(if (showsLine) Modifier.padding(bottom = offset) else Modifier),
        horizontalArrangement = Arrangement.spacedBy(T.iconGap),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        BrandIcon(choice.icon, size = BrandIconSize.Sm, color = ink)
        // El subrayado de `Link` (D64): `text-decoration`, bajo el texto y no bajo el icono, a la distancia del token
        // bajo los descendentes (`BrandTextUnderline`).
        ProvideBrandTextUnderline(if (showsLine) BrandTextUnderline(underline, offset, ink) else null) {
            BrandBasicText(text, style = brandBaseTextStyle(T.listFontSize, weight, BrandTextTokens.lineHeight, color = ink), maxLines = 1)
        }
    }
}
