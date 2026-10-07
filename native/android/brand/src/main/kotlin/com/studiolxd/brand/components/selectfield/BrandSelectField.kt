package com.studiolxd.brand.components.selectfield

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsFocusedAsState
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.onSizeChanged
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.clearAndSetSemantics
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.error
import androidx.compose.ui.semantics.selected
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.semantics.stateDescription
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.studiolxd.brand.components.field.BrandDropdownPopup
import com.studiolxd.brand.components.field.BrandFieldLayout
import com.studiolxd.brand.components.field.FieldHelperStyle
import com.studiolxd.brand.components.field.LocalBrandForcedFocus
import com.studiolxd.brand.components.field.animatedFieldColor
import com.studiolxd.brand.components.field.brandFieldBox
import com.studiolxd.brand.icon.BrandIcon
import com.studiolxd.brand.icon.BrandIconName
import com.studiolxd.brand.icon.BrandIconSize
import com.studiolxd.brand.support.BrandBasicText
import com.studiolxd.brand.support.BrandControlSize
import com.studiolxd.brand.support.LocalBrandIconTextSize
import com.studiolxd.brand.support.brandBaseTextStyle
import com.studiolxd.brand.support.brandTransition
import com.studiolxd.brand.support.collectBrandInteractionState
import com.studiolxd.brand.support.rememberReduceMotion
import com.studiolxd.brand.support.resolve
import com.studiolxd.brand.support.scaledByFontScale
import com.studiolxd.brand.tokens.BrandDropdownFieldTokens
import com.studiolxd.brand.tokens.BrandInputTokens
import com.studiolxd.brand.tokens.BrandLabelTokens
import com.studiolxd.brand.tokens.BrandSelectFieldTokens as F
import com.studiolxd.brand.tokens.BrandSelectTokens as T
import com.studiolxd.brand.tokens.BrandTextTokens

/** `SelectField` `size`: la talla de control compartida. */
typealias SelectFieldSize = BrandControlSize

/** Una opción de un [BrandSelectField] (`SelectOption` de React: `{ value, label }`). */
data class BrandSelectOption(val value: String, val label: String)

/**
 * Una entrada de `options`: una opción suelta o un grupo con cabecera (`SelectOptionOrGroup`). La cabecera es una
 * etiqueta, no una opción elegible. Las dos formas se pueden mezclar.
 */
sealed interface BrandSelectEntry {
    data class Single(val option: BrandSelectOption) : BrandSelectEntry
    data class Group(val label: String, val options: List<BrandSelectOption>) : BrandSelectEntry

    companion object {
        /** Atajo: `BrandSelectEntry.option("es", "Español")`. */
        fun option(value: String, label: String): BrandSelectEntry = Single(BrandSelectOption(value, label))

        /** Atajo: `BrandSelectEntry.group("España", listOf(BrandSelectOption("madrid", "Madrid")))`. */
        fun group(label: String, options: List<BrandSelectOption>): BrandSelectEntry = Group(label, options)
    }
}

/** Todas las opciones elegibles de la lista, aplanando los grupos. */
internal fun List<BrandSelectEntry>.flatOptions(): List<BrandSelectOption> = flatMap { entry ->
    when (entry) {
        is BrandSelectEntry.Single -> listOf(entry.option)
        is BrandSelectEntry.Group -> entry.options
    }
}

/**
 * Un desplegable de la marca con su etiqueta, ayuda y mensaje de error (`SelectField` de React). El disparador es el
 * del selector de Brand y la lista se abre **bajo él** (o sobre él si abajo no cabe), al menos tan ancha como el
 * control, con la opción elegida en énfasis (peso 500) y la opción bajo el teclado o el puntero invertida.
 *
 * ```kotlin
 * BrandSelectField("Idioma", language, { language = it }, options = listOf(
 *     BrandSelectEntry.option("es", "Español"), BrandSelectEntry.option("en", "Inglés"),
 * ))
 * ```
 *
 * `selection == ""` significa «nada elegido» y el disparador enseña el [placeholder], salvo que una opción tenga
 * precisamente el valor `""` (el patrón «Selecciona un tipo» en cabeza de lista): entonces enseña su etiqueta.
 *
 * **TalkBack**: el disparador es una lista desplegable (`Role.DropdownList`) cuyo nombre es la etiqueta y cuyo estado
 * es el valor elegido; el error se publica con `error()`.
 *
 * @param placeholder marcador de sitio del disparador sin valor elegido. Castellano por defecto («Seleccionar…»).
 * @param invalidLabel lo que lee TalkBack cuando el campo está en [error] sin [errorMessage]. Castellano por defecto.
 */
@Composable
fun BrandSelectField(
    label: String,
    selection: String,
    onSelectionChange: (String) -> Unit,
    options: List<BrandSelectEntry>,
    modifier: Modifier = Modifier,
    labelHidden: Boolean = false,
    placeholder: String = "Seleccionar…",
    enabled: Boolean = true,
    error: Boolean = false,
    errorMessage: String? = null,
    helperText: String? = null,
    size: SelectFieldSize? = null,
    invalidLabel: String = "Valor no válido",
    interactionSource: MutableInteractionSource? = null,
) {
    val resolved = size.resolve()
    val source = interactionSource ?: remember { MutableInteractionSource() }
    val focused by source.collectIsFocusedAsState()
    val reduceMotion = rememberReduceMotion()
    var expanded by remember { mutableStateOf(false) }
    var anchorWidthPx by remember { mutableStateOf(0) }

    val hasError = error || errorMessage != null
    val selectedLabel = options.flatOptions().firstOrNull { it.value == selection }?.label
    val height = when (resolved) {
        BrandControlSize.Sm -> T.smHeight
        BrandControlSize.Md -> T.height
        BrandControlSize.Lg -> T.lgHeight
    }.scaledByFontScale()
    val fontSize: TextUnit = when (resolved) {
        BrandControlSize.Sm -> T.smFontSize
        BrandControlSize.Md -> T.fontSize
        BrandControlSize.Lg -> T.lgFontSize
    }
    val paddingInline = when (resolved) {
        BrandControlSize.Sm -> T.smPaddingInline
        BrandControlSize.Md -> T.paddingInline
        BrandControlSize.Lg -> T.lgPaddingInline
    }
    val iconSize = when (resolved) {
        BrandControlSize.Sm -> T.smIconSize
        BrandControlSize.Md -> T.iconSize
        BrandControlSize.Lg -> T.lgIconSize
    }

    val textColor = (if (enabled) T.color else BrandInputTokens.disabledColor).current
    val background = animatedFieldColor(
        (if (enabled) T.bg else BrandInputTokens.disabledBg).current,
        BrandInputTokens.transitionDuration, BrandInputTokens.transitionEasing, reduceMotion, "select-bg",
    )
    val border = (if (!enabled) BrandInputTokens.disabledBorderColor else if (hasError) T.errorBorderColor else T.borderColor).current
    val chevron by animateFloatAsState(
        if (expanded) 270f else 90f,
        brandTransition(T.iconTransition, BrandDropdownFieldTokens.iconTransitionEasing, reduceMotion),
        label = "select-chevron",
    )
    val shownText = selectedLabel ?: placeholder
    val textStyle = brandBaseTextStyle(fontSize, T.fontWeight, T.lineHeight, color = textColor)
    val density = LocalDensity.current

    BrandFieldLayout(
        label = label,
        labelHidden = labelHidden,
        size = resolved,
        gap = F.gap,
        errorMessage = errorMessage,
        helperText = helperText,
        helper = FieldHelperStyle(F.helperFontSize, F.helperFontWeight, F.helperLineHeight, F.helperColor.current),
        modifier = modifier,
    ) {
        Box(Modifier.onSizeChanged { anchorWidthPx = it.width }) {
            Row(
                Modifier
                    .fillMaxWidth()
                    .heightIn(min = height)
                    .brandFieldBox(
                        radius = T.borderRadius,
                        borderWidth = T.borderWidth,
                        background = background,
                        border = border,
                        ringWidth = T.focusRingWidth,
                        ringInsetOffset = 0.dp,
                        ringColor = T.focusRingColor.current,
                        focused = (focused || LocalBrandForcedFocus.current) && enabled,
                    )
                    .clickable(interactionSource = source, indication = null, enabled = enabled, role = Role.DropdownList) { expanded = true }
                    .semantics {
                        contentDescription = label
                        stateDescription = listOfNotNull(shownText, helperText).joinToString(". ")
                        if (hasError) error(errorMessage ?: invalidLabel)
                    }
                    .padding(horizontal = paddingInline),
                horizontalArrangement = Arrangement.spacedBy(T.iconGap),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                BrandBasicText(
                    shownText,
                    modifier = Modifier.weight(1f).clearAndSetSemantics { },
                    style = textStyle,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis,
                )
                CompositionLocalProvider(LocalBrandIconTextSize provides iconSize.value.sp) {
                    BrandIcon(BrandIconName.Chevron, modifier = Modifier.rotate(chevron), size = BrandIconSize.Text, color = textColor)
                }
            }
            BrandDropdownPopup(
                expanded = expanded,
                onDismissRequest = { expanded = false },
                anchorWidth = with(density) { anchorWidthPx.toDp() },
            ) {
                BrandSelectMenu(options, selection, resolved) {
                    onSelectionChange(it)
                    expanded = false
                }
            }
        }
    }
}

/** El contenido del desplegable: opciones sueltas y grupos con cabecera. Interno: también lo pintan las capturas. */
@Composable
internal fun BrandSelectMenu(
    options: List<BrandSelectEntry>,
    selection: String,
    size: BrandControlSize,
    onSelect: (String) -> Unit,
) {
    options.forEachIndexed { index, entry ->
        when (entry) {
            is BrandSelectEntry.Single -> SelectMenuItem(entry.option, selection, size, onSelect)
            is BrandSelectEntry.Group -> {
                if (index > 0) Box(Modifier.fillMaxWidth().height(T.borderWidth).background(T.contentBorderColor.current))
                SelectMenuGroupLabel(entry.label, size)
                entry.options.forEach { SelectMenuItem(it, selection, size, onSelect) }
            }
        }
    }
}

@Composable
private fun SelectMenuGroupLabel(text: String, size: BrandControlSize) {
    val itemPadding = when (size) {
        BrandControlSize.Sm -> T.smItemPaddingBlock
        BrandControlSize.Md -> T.itemPaddingBlock
        BrandControlSize.Lg -> T.lgItemPaddingBlock
    }
    val paddingInline = when (size) {
        BrandControlSize.Sm -> T.smPaddingInline
        BrandControlSize.Md -> T.paddingInline
        BrandControlSize.Lg -> T.lgPaddingInline
    }
    val labelSize = when (size) {
        BrandControlSize.Sm -> BrandLabelTokens.smFontSize
        BrandControlSize.Md -> BrandLabelTokens.fontSize
        BrandControlSize.Lg -> BrandLabelTokens.lgFontSize
    }
    BrandBasicText(
        text,
        modifier = Modifier.fillMaxWidth().padding(horizontal = paddingInline, vertical = itemPadding),
        style = brandBaseTextStyle(labelSize, BrandLabelTokens.fontWeight, BrandLabelTokens.lineHeight, BrandLabelTokens.letterSpacing, color = BrandLabelTokens.color.current),
    )
}

@Composable
private fun SelectMenuItem(option: BrandSelectOption, selection: String, size: BrandControlSize, onSelect: (String) -> Unit) {
    val source = remember { MutableInteractionSource() }
    val state = source.collectBrandInteractionState()
    val isSelected = option.value == selection
    val highlighted = state.hovered || state.pressed || state.focused
    val fontSize: TextUnit = when (size) {
        BrandControlSize.Sm -> T.smFontSize
        BrandControlSize.Md -> T.fontSize
        BrandControlSize.Lg -> T.lgFontSize
    }
    val paddingInline = when (size) {
        BrandControlSize.Sm -> T.smPaddingInline
        BrandControlSize.Md -> T.paddingInline
        BrandControlSize.Lg -> T.lgPaddingInline
    }
    val paddingBlock = when (size) {
        BrandControlSize.Sm -> T.smItemPaddingBlock
        BrandControlSize.Md -> T.itemPaddingBlock
        BrandControlSize.Lg -> T.lgItemPaddingBlock
    }
    val weight: FontWeight = if (isSelected) T.itemSelectedFontWeight else T.fontWeight
    val color = (if (highlighted) T.itemHighlightedColor else T.color).current
    BrandBasicText(
        option.label,
        modifier = Modifier
            .fillMaxWidth()
            .background(if (highlighted) T.itemHighlightedBg.current else Color.Transparent)
            .clickable(interactionSource = source, indication = null) { onSelect(option.value) }
            .semantics { selected = isSelected }
            .padding(horizontal = paddingInline, vertical = paddingBlock),
        // `.select__item` no declara `line-height`: hereda el del cuerpo (`text.line-height`), no el del disparador.
        style = brandBaseTextStyle(fontSize, weight, BrandTextTokens.lineHeight, color = color),
        maxLines = 1,
        overflow = TextOverflow.Ellipsis,
    )
}
