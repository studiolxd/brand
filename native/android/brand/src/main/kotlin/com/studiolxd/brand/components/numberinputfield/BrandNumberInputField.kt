package com.studiolxd.brand.components.numberinputfield

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsFocusedAsState
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.IntrinsicSize
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.text.BasicText
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clipToBounds
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.focus.onFocusChanged
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.input.key.Key
import androidx.compose.ui.input.key.KeyEventType
import androidx.compose.ui.input.key.key
import androidx.compose.ui.input.key.onPreviewKeyEvent
import androidx.compose.ui.input.key.type
import androidx.compose.ui.platform.LocalFocusManager
import androidx.compose.ui.semantics.CustomAccessibilityAction
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.clearAndSetSemantics
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.customActions
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.dp
import com.studiolxd.brand.components.field.BrandFieldLayout
import com.studiolxd.brand.components.field.FieldHelperStyle
import com.studiolxd.brand.components.field.LocalBrandForcedFocus
import com.studiolxd.brand.components.field.animatedFieldColor
import com.studiolxd.brand.components.field.brandFieldBox
import com.studiolxd.brand.components.field.brandFieldSemantics
import com.studiolxd.brand.icon.BrandIcon
import com.studiolxd.brand.icon.BrandIconName
import com.studiolxd.brand.icon.BrandIconSize
import com.studiolxd.brand.support.BrandControlSize
import com.studiolxd.brand.support.brandFocusRing
import com.studiolxd.brand.support.brandBaseTextStyle
import com.studiolxd.brand.support.collectBrandInteractionState
import com.studiolxd.brand.support.rememberReduceMotion
import com.studiolxd.brand.support.resolve
import com.studiolxd.brand.support.scaledByFontScale
import com.studiolxd.brand.tokens.BrandInputTokens
import com.studiolxd.brand.tokens.BrandNumberInputFieldTokens as F
import com.studiolxd.brand.tokens.BrandNumberInputTokens as T
import kotlin.math.abs
import kotlin.math.floor

/** `NumberInputField` `size`: la talla de control compartida. */
typealias NumberInputFieldSize = BrandControlSize

/** `NumberInputField` `commitMode`: cuándo se avisa (`onValueChange`) de lo tecleado a mano. */
enum class NumberInputCommitMode(val value: String) {
    /** Con cada tecla (lo de siempre). */
    Change("change"),

    /** Una sola vez, al perder el foco o con la acción «Hecho» del teclado. */
    Blur("blur"),
}

/** Lo que hay que avisar al confirmar un borrador: nada ([Keep]) o un valor nuevo ([Set], `null` es «sin valor»). */
internal sealed interface NumberCommit {
    data object Keep : NumberCommit
    data class Set(val value: Double?) : NumberCommit
}

/**
 * Qué avisar al confirmar el borrador [raw] (modo [NumberInputCommitMode.Blur]): un número que cambia el valor
 * (ya ajustado a [min] y [max]), «sin valor» si está vacío y había valor; nada si no cambia o todavía no es un número.
 */
internal fun resolveNumberCommit(raw: String, decimal: Boolean, min: Double?, max: Double?, current: Double?): NumberCommit {
    if (raw.isBlank()) return if (current == null) NumberCommit.Keep else NumberCommit.Set(null)
    val parsed = parseNumber(raw, decimal) ?: return NumberCommit.Keep
    val clamped = clampNumber(parsed, min, max)
    return if (clamped == current) NumberCommit.Keep else NumberCommit.Set(clamped)
}

/** El valor fijado entre [min] y [max] (sin tope si es `null`). */
internal fun clampNumber(value: Double, min: Double?, max: Double?): Double =
    value.coerceAtLeast(min ?: Double.NEGATIVE_INFINITY).coerceAtMost(max ?: Double.POSITIVE_INFINITY)

/** El valor tras un paso de [delta]: sin valor (`null`) cuenta como 0, y el resultado se ajusta a [min] y [max]. */
internal fun steppedNumber(value: Double?, delta: Double, min: Double?, max: Double?): Double =
    clampNumber((value ?: 0.0) + delta, min, max)

/** Si un botón de paso puede pulsarse: sin valor, siempre (los límites no lo deshabilitan; el paso se ajusta). */
internal fun canStepNumber(value: Double?, limit: Double?, towardsMax: Boolean): Boolean = when {
    value == null || limit == null -> true
    towardsMax -> value < limit
    else -> value > limit
}

/** Como `String(n)` de la web: «3» y no «3.0». */
internal fun formatNumber(value: Double): String =
    if (value == floor(value) && abs(value) < 1e15) value.toLong().toString() else value.toString()

/** El número que dice un borrador tecleado, con coma o punto si [decimal]; `null` si todavía no es un número («12,», «-»). */
internal fun parseNumber(raw: String, decimal: Boolean): Double? {
    val normalized = (if (decimal) raw.replace(',', '.') else raw).trim()
    return normalized.toDoubleOrNull()?.takeIf { it.isFinite() }
}

/**
 * Un campo numérico con botones de restar y sumar, etiqueta, ayuda y error (`NumberInputField` de React).
 *
 * ```kotlin
 * BrandNumberInputField("Cantidad", quantity, { quantity = it }, min = 0.0, max = 99.0)
 * BrandNumberInputField("Importe", amount, { amount = it }, decimal = true, step = 0.5, helperText = "En euros")
 * ```
 *
 * El valor se fija entre [min] y [max] al teclear y al pulsar los botones; con [decimal] admite coma o punto. El
 * borrador que se está tecleando («12,») no se pisa hasta que el campo pierde el foco.
 *
 * **Sin valor**: `value = null` deja el campo vacío (se ve [placeholder]) y vaciar el texto llama a
 * `onValueChange(null)`. Desde vacío, − y + parten de 0 y se ajustan a [min] y [max]; los botones no se deshabilitan
 * por los límites estando vacío. TalkBack anuncia el campo vacío como [emptyValueLabel] («Sin valor»). Quien siempre
 * tiene un número ignora el `null` (`onValueChange = { it?.let { n -> quantity = n } }`): al salir del campo vuelve el
 * último número.
 *
 * **Foco desde fuera** (el `ref` de React): pasa un [FocusRequester] y llámale `requestFocus()`; va sobre el propio
 * campo de texto, así lleva el cursor y sube el teclado.
 * ```kotlin
 * val focus = remember { FocusRequester() }
 * BrandNumberInputField("Cantidad", quantity, { quantity = it }, focusRequester = focus)
 * LaunchedEffect(Unit) { focus.requestFocus() }
 * ```
 *
 * **Cuándo se avisa.** Por defecto ([NumberInputCommitMode.Change]) `onValueChange` avisa con cada tecla. Con
 * [NumberInputCommitMode.Blur] lo tecleado se avisa **una sola vez**, al perder el foco o con «Hecho» del teclado (y
 * solo si cambia el valor); Escape (teclado físico) descarta lo escrito. Los botones − y + avisan al momento en los dos
 * modos y descartan un borrador pendiente.
 *
 * **Compacto.** [compact] es la variante para filas de lista (`trailing` de `BrandListItem`): 32 dp de alto, botones de
 * 24 y cifra de 40 dp de ancho, sin estirarse. La zona táctil de cada botón sigue llegando a 48 dp (`BrandTheme`).
 * ```kotlin
 * BrandListItem(text = "Leche", trailing = {
 *     BrandNumberInputField("Cantidad", qty, { qty = it }, labelHidden = true, compact = true, commitMode = NumberInputCommitMode.Blur)
 * })
 * ```
 *
 * **TalkBack**: además de los dos botones con nombre accesible, el campo expone las acciones personalizadas
 * «Decrementar» e «Incrementar» (menú de acciones de TalkBack) que suman o restan un paso.
 *
 * @param min valor mínimo (sin tope si es `null`).
 * @param max valor máximo (sin tope si es `null`).
 * @param step lo que suman y restan los botones.
 * @param decimal admite decimales (coma o punto) y abre el teclado decimal.
 * @param decrementLabel nombre accesible del botón de restar. Castellano por defecto («Decrementar»).
 * @param incrementLabel nombre accesible del botón de sumar. Castellano por defecto («Incrementar»).
 * @param compact variante para filas de lista: botones y cifra justos, sin estirarse. Manda sobre [size].
 * @param commitMode cuándo se avisa de lo tecleado a mano: con cada tecla o al perder el foco / «Hecho».
 * @param placeholder lo que se ve con el campo vacío (`value = null`).
 * @param emptyValueLabel lo que lee TalkBack como estado del campo vacío. Castellano por defecto («Sin valor»).
 * @param invalidLabel lo que lee TalkBack cuando el campo está en [error] sin [errorMessage]. Castellano por defecto.
 * @param focusRequester para dar el foco desde fuera; sin él, el campo usa uno propio (los toques lo siguen enfocando).
 *   Para *observar* el foco ya está [interactionSource].
 */
@Composable
fun BrandNumberInputField(
    label: String,
    value: Double?,
    onValueChange: (Double?) -> Unit,
    modifier: Modifier = Modifier,
    labelHidden: Boolean = false,
    min: Double? = null,
    max: Double? = null,
    step: Double = 1.0,
    decimal: Boolean = false,
    readOnly: Boolean = false,
    enabled: Boolean = true,
    error: Boolean = false,
    errorMessage: String? = null,
    helperText: String? = null,
    size: NumberInputFieldSize? = null,
    compact: Boolean = false,
    commitMode: NumberInputCommitMode = NumberInputCommitMode.Change,
    placeholder: String? = null,
    decrementLabel: String = "Decrementar",
    incrementLabel: String = "Incrementar",
    emptyValueLabel: String = "Sin valor",
    invalidLabel: String = "Valor no válido",
    interactionSource: MutableInteractionSource? = null,
    focusRequester: FocusRequester? = null,
) {
    val resolved = size.resolve()
    val source = interactionSource ?: remember { MutableInteractionSource() }
    val focused by source.collectIsFocusedAsState()
    val reduceMotion = rememberReduceMotion()
    val requester = focusRequester ?: remember { FocusRequester() }
    var draft by remember { mutableStateOf<String?>(null) }

    val hasError = error || errorMessage != null
    val isFocused = (focused || LocalBrandForcedFocus.current) && enabled
    // Vacío cuenta como 0 para los pasos y no se deshabilita por los límites: siempre hay un paso posible.
    val canDecrement = enabled && !readOnly && canStepNumber(value, min, towardsMax = false)
    val canIncrement = enabled && !readOnly && canStepNumber(value, max, towardsMax = true)

    val height = when {
        compact -> T.compactHeight
        else -> when (resolved) {
            BrandControlSize.Sm -> T.smHeight
            BrandControlSize.Md -> T.height
            BrandControlSize.Lg -> T.lgHeight
        }
    }.scaledByFontScale()
    val fontSize: TextUnit = when {
        compact -> T.compactFontSize
        else -> when (resolved) {
            BrandControlSize.Sm -> T.smFontSize
            BrandControlSize.Md -> T.fontSize
            BrandControlSize.Lg -> T.lgFontSize
        }
    }
    val paddingInline = when {
        compact -> T.compactPaddingInline
        else -> when (resolved) {
            BrandControlSize.Sm -> T.smPaddingInline
            BrandControlSize.Md -> T.paddingInline
            BrandControlSize.Lg -> T.lgPaddingInline
        }
    }
    val buttonWidth = if (compact) T.compactBtnWidth else T.btnWidth
    val focusManager = LocalFocusManager.current

    val textColor = when {
        !enabled -> T.disabledColor.current
        hasError -> T.errorColor.current
        else -> T.color.current
    }
    val background = animatedFieldColor(
        when {
            !enabled -> T.disabledBg.current
            hasError -> T.errorBg.current
            else -> T.bg.current
        },
        T.transitionDuration, T.transitionEasing, reduceMotion, "number-bg",
    )
    val border = animatedFieldColor(
        when {
            !enabled -> T.disabledBorderColor.current
            hasError -> (if (isFocused) T.errorFocusBorderColor else T.errorBorderColor).current
            else -> (if (isFocused) T.focusBorderColor else T.borderColor).current
        },
        T.transitionDuration, T.transitionEasing, reduceMotion, "number-border",
    )
    val separator = if (hasError || !enabled) border else T.btnSeparatorColor.current

    /** Modo `Blur`: avisa de lo tecleado (una vez, y solo si cambia) y suelta el borrador. */
    fun commitDraft() {
        val raw = draft ?: return
        draft = null
        if (commitMode != NumberInputCommitMode.Blur) return
        val outcome = resolveNumberCommit(raw, decimal, min, max, value)
        if (outcome is NumberCommit.Set) onValueChange(outcome.value)
    }

    fun commit(delta: Double) {
        draft = null
        onValueChange(steppedNumber(value, delta, min, max))
    }

    val textStyle = brandBaseTextStyle(fontSize, T.fontWeight, T.lineHeight, color = textColor)
        .copy(textAlign = TextAlign.Center, fontFeatureSettings = "tnum")
    val shown = draft ?: value?.let(::formatNumber).orEmpty()

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
        Row(
            Modifier
                .then(if (compact) Modifier else Modifier.fillMaxWidth())
                .height(IntrinsicSize.Min)
                .heightIn(min = height)
                .brandFieldBox(
                    radius = T.borderRadius,
                    borderWidth = T.borderWidth,
                    background = background,
                    border = border,
                    ringWidth = T.focusRingWidth,
                    ringInsetOffset = T.focusRingInsetOffset,
                    ringColor = (if (hasError) T.errorFocusRingColor else T.focusRingColor).current,
                    focused = isFocused,
                )
                .clipToBounds(),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            StepButton(BrandIconName.Minus, decrementLabel, canDecrement, buttonWidth) { commit(-step) }
            Box(Modifier.width(T.borderWidth).fillMaxHeight().background(separator))
            Box(
                (if (compact) Modifier.width(T.compactFieldWidth) else Modifier.weight(1f))
                    .fillMaxHeight().padding(horizontal = paddingInline),
                contentAlignment = Alignment.Center,
            ) {
                BasicTextField(
                    value = shown,
                    onValueChange = { raw ->
                        draft = raw
                        if (commitMode == NumberInputCommitMode.Change) {
                            if (raw.isBlank()) onValueChange(null)
                            else parseNumber(raw, decimal)?.let { onValueChange(clampNumber(it, min, max)) }
                        }
                    },
                    modifier = Modifier
                        .fillMaxWidth()
                        .focusRequester(requester)
                        .onFocusChanged { if (!it.isFocused) { commitDraft(); draft = null } }
                        .onPreviewKeyEvent { event ->
                            if (commitMode == NumberInputCommitMode.Blur && draft != null && event.key == Key.Escape) {
                                if (event.type == KeyEventType.KeyDown) draft = null
                                true
                            } else false
                        }
                        .brandFieldSemantics(
                            label, hasError, errorMessage,
                            // Vacío no anuncia valor: «Sin valor» como estado, antes de la ayuda.
                            if (value == null) listOfNotNull(emptyValueLabel, helperText).joinToString(". ") else helperText,
                            invalidLabel,
                        )
                        .semantics {
                            customActions = buildList {
                                if (canDecrement) add(CustomAccessibilityAction(decrementLabel) { commit(-step); true })
                                if (canIncrement) add(CustomAccessibilityAction(incrementLabel) { commit(step); true })
                            }
                        },
                    enabled = enabled,
                    readOnly = readOnly,
                    textStyle = textStyle,
                    keyboardOptions = KeyboardOptions(
                        keyboardType = if (decimal) KeyboardType.Decimal else KeyboardType.Number,
                        imeAction = ImeAction.Done,
                    ),
                    keyboardActions = if (commitMode == NumberInputCommitMode.Blur) {
                        KeyboardActions(onDone = { commitDraft(); focusManager.clearFocus() })
                    } else KeyboardActions(),
                    singleLine = true,
                    interactionSource = source,
                    cursorBrush = SolidColor(textColor),
                    decorationBox = { inner ->
                        Box(Modifier.fillMaxWidth(), contentAlignment = Alignment.Center) {
                            if (shown.isEmpty() && !placeholder.isNullOrEmpty()) {
                                BasicText(
                                    placeholder, modifier = Modifier.clearAndSetSemantics { },
                                    style = textStyle.copy(color = BrandInputTokens.placeholderColor.current), maxLines = 1,
                                )
                            }
                            inner()
                        }
                    },
                )
            }
            Box(Modifier.width(T.borderWidth).fillMaxHeight().background(separator))
            StepButton(BrandIconName.Plus, incrementLabel, canIncrement, buttonWidth) { commit(step) }
        }
    }
}

/**
 * El botón − o +: sin relleno bajo el puntero (regla de Colores), una línea de tinta bajo el botón en *hover* y pulsado.
 * Su zona táctil llega a 48 dp (la que garantiza `BrandTheme`).
 */
@Composable
private fun StepButton(icon: BrandIconName, label: String, enabled: Boolean, width: Dp, onClick: () -> Unit) {
    val source = remember { MutableInteractionSource() }
    val state = source.collectBrandInteractionState()
    val tint: Color = (if (enabled) T.btnColor else T.disabledBtnColor).current
    Box(
        Modifier
            .width(width)
            .fillMaxHeight()
            .background(T.btnBg.current)
            .brandFocusRing(state.focusVisible, T.focusRingColor.current, T.focusRingWidth, -(T.focusRingInsetOffset + T.focusRingWidth))
            .clickable(interactionSource = source, indication = null, enabled = enabled, role = Role.Button, onClick = onClick)
            .semantics { contentDescription = label },
        contentAlignment = Alignment.Center,
    ) {
        BrandIcon(icon, size = BrandIconSize.Sm, color = tint)
        if (enabled && (state.hovered || state.pressed)) {
            Box(
                Modifier
                    .align(Alignment.BottomCenter)
                    .fillMaxWidth()
                    .height(T.btnHoverLineWidth)
                    .background(T.btnHoverLineColor.current),
            )
        }
    }
}
