package com.studiolxd.brand.components.datepickerfield

import android.app.DatePickerDialog
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsFocusedAsState
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.clearAndSetSemantics
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.error
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.semantics.stateDescription
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.dp
import com.studiolxd.brand.BrandTheme
import com.studiolxd.brand.components.field.BrandFieldIconButton
import com.studiolxd.brand.components.field.BrandFieldLayout
import com.studiolxd.brand.components.field.FieldHelperStyle
import com.studiolxd.brand.components.field.LocalBrandForcedFocus
import com.studiolxd.brand.components.field.animatedFieldColor
import com.studiolxd.brand.components.field.brandFieldBox
import com.studiolxd.brand.icon.BrandIconName
import com.studiolxd.brand.support.BrandBasicText
import com.studiolxd.brand.support.BrandControlSize
import com.studiolxd.brand.support.brandBaseTextStyle
import com.studiolxd.brand.support.rememberReduceMotion
import com.studiolxd.brand.support.resolve
import com.studiolxd.brand.support.scaledByFontScale
import com.studiolxd.brand.tokens.BrandDatePickerFieldTokens as F
import com.studiolxd.brand.tokens.BrandDatePickerTokens as D
import com.studiolxd.brand.tokens.BrandInputTokens as T
import java.time.Instant
import java.time.LocalDate
import java.time.ZoneId
import java.time.chrono.IsoChronology
import java.time.format.DateTimeFormatter
import java.time.format.DateTimeFormatterBuilder
import java.time.format.FormatStyle
import java.util.Locale

/** `DatePickerField` `size`: la talla de control compartida. */
typealias DatePickerFieldSize = BrandControlSize

/**
 * El texto de una fecha en el campo: el formato **corto** del [locale] con día y mes de dos cifras y el año de cuatro
 * (`18/05/2026` en `es-ES`, `05/18/2026` en `en-US`, `18.05.2026` en `de-DE`), el mismo dibujo que la máscara de React.
 * Interno y comprobable.
 */
internal fun formatPickedDate(date: LocalDate, locale: Locale): String {
    val pattern = DateTimeFormatterBuilder.getLocalizedDateTimePattern(FormatStyle.SHORT, null, IsoChronology.INSTANCE, locale)
        .replace(Regex("(?<!d)d(?!d)"), "dd")
        .replace(Regex("(?<!M)M(?!M)"), "MM")
        .replace(Regex("(?<!y)yy(?!y)"), "yyyy")
    return DateTimeFormatter.ofPattern(pattern, locale).format(date)
}

/** El milisegundo en el que empieza [date] en la zona del dispositivo (lo que espera `DatePicker.minDate/maxDate`). */
internal fun LocalDate.startOfDayMillis(zone: ZoneId = ZoneId.systemDefault()): Long = atStartOfDay(zone).toInstant().toEpochMilli()

/** El día de calendario de un instante en la zona dada. */
internal fun dateOfMillis(millis: Long, zone: ZoneId = ZoneId.systemDefault()): LocalDate = Instant.ofEpochMilli(millis).atZone(zone).toLocalDate()

/** El día que enseña el selector al abrirse: el valor, o hoy ajustado al rango si no hay valor. Interno y comprobable. */
internal fun initialPickerDate(value: LocalDate?, minDate: LocalDate?, maxDate: LocalDate?, today: LocalDate): LocalDate {
    if (value != null) return value
    var day = today
    if (minDate != null && day.isBefore(minDate)) day = minDate
    if (maxDate != null && day.isAfter(maxDate)) day = maxDate
    return day
}

/**
 * Un campo de fecha de la marca con su etiqueta, ayuda y mensaje de error (`DatePickerField` de React). La caja, las
 * tallas, los estados y el error son los de [com.studiolxd.brand.components.inputfield.BrandInputField]; la fecha **no se
 * escribe**: el campo la muestra (formato corto del [locale]) o enseña el [placeholder], y el botón de calendario —o
 * tocar el campo— abre el selector del sistema (`android.app.DatePickerDialog`, sin dependencias nuevas: la librería no
 * usa Material). Con fecha elegida, un aspa «Borrar» la vacía (en React se vacía borrando el texto).
 *
 * ```kotlin
 * var due by remember { mutableStateOf<LocalDate?>(null) }
 * BrandDatePickerField("Vence", due, { due = it }, minDate = LocalDate.now(), helperText = "Elige el día.")
 * ```
 *
 * Las fechas son de **calendario**, sin hora ni zona: un [LocalDate].
 *
 * **TalkBack**: el campo es un botón cuyo nombre es la etiqueta y cuyo estado es la fecha elegida (o «sin fecha»), el
 * error se publica con `error()` y la ayuda como descripción de estado; el botón de calendario y el aspa tienen su
 * propio nombre. Con [readOnly] el calendario no abre nada.
 *
 * @param value la fecha elegida, o `null`. Controlado: el campo no la guarda.
 * @param onValueChange la fecha nueva, o `null` al borrar.
 * @param minDate primer día elegible (inclusive), o `null`.
 * @param maxDate último día elegible (inclusive), o `null`.
 * @param placeholder lo que enseña sin fecha. Castellano por defecto («Elige una fecha»).
 * @param openCalendarLabel nombre accesible del botón de calendario. Castellano por defecto («Abrir calendario»).
 * @param clearLabel nombre accesible del aspa. Castellano por defecto («Borrar»).
 * @param noDateLabel lo que lee TalkBack como estado sin fecha. Castellano por defecto («Sin fecha»).
 * @param invalidLabel lo que lee TalkBack cuando el campo está en [error] sin [errorMessage]. Castellano por defecto.
 * @param locale idioma del formato y del selector. Por defecto, el del dispositivo.
 * @param size sin valor toma la del entorno ([com.studiolxd.brand.support.ProvideBrandControlSize]) y, si tampoco hay, `md`.
 */
@Composable
fun BrandDatePickerField(
    label: String,
    value: LocalDate?,
    onValueChange: (LocalDate?) -> Unit,
    modifier: Modifier = Modifier,
    labelHidden: Boolean = false,
    minDate: LocalDate? = null,
    maxDate: LocalDate? = null,
    placeholder: String = "Elige una fecha",
    readOnly: Boolean = false,
    enabled: Boolean = true,
    error: Boolean = false,
    errorMessage: String? = null,
    helperText: String? = null,
    size: DatePickerFieldSize? = null,
    openCalendarLabel: String = "Abrir calendario",
    clearLabel: String = "Borrar",
    noDateLabel: String = "Sin fecha",
    invalidLabel: String = "Valor no válido",
    locale: Locale = Locale.getDefault(),
    interactionSource: MutableInteractionSource? = null,
) {
    val context = LocalContext.current
    val dark = BrandTheme.isDark
    val open: () -> Unit = {
        if (enabled && !readOnly) {
            val start = initialPickerDate(value, minDate, maxDate, LocalDate.now())
            DatePickerDialog(
                context,
                if (dark) android.R.style.Theme_DeviceDefault_Dialog_Alert else android.R.style.Theme_DeviceDefault_Light_Dialog_Alert,
                { _, year, month, day -> onValueChange(LocalDate.of(year, month + 1, day)) },
                start.year, start.monthValue - 1, start.dayOfMonth,
            ).apply {
                if (minDate != null) datePicker.minDate = minDate.startOfDayMillis()
                if (maxDate != null) datePicker.maxDate = maxDate.startOfDayMillis()
            }.show()
        }
    }
    BrandDatePickerFieldContent(
        label, value, onValueChange, modifier, labelHidden, placeholder, readOnly, enabled, error, errorMessage, helperText, size,
        openCalendarLabel, clearLabel, noDateLabel, invalidLabel, locale, interactionSource, open,
    )
}

/** El campo sin el selector: [open] es lo que hace tocarlo. Interno: también lo pintan las capturas. */
@Composable
internal fun BrandDatePickerFieldContent(
    label: String,
    value: LocalDate?,
    onValueChange: (LocalDate?) -> Unit,
    modifier: Modifier,
    labelHidden: Boolean,
    placeholder: String,
    readOnly: Boolean,
    enabled: Boolean,
    error: Boolean,
    errorMessage: String?,
    helperText: String?,
    size: DatePickerFieldSize?,
    openCalendarLabel: String,
    clearLabel: String,
    noDateLabel: String,
    invalidLabel: String,
    locale: Locale,
    interactionSource: MutableInteractionSource?,
    open: () -> Unit,
) {
    val resolved = size.resolve()
    val source = interactionSource ?: remember { MutableInteractionSource() }
    val focused by source.collectIsFocusedAsState()
    val reduceMotion = rememberReduceMotion()
    val hasError = error || errorMessage != null
    val isFocused = (focused || LocalBrandForcedFocus.current) && enabled

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
    val paddingInline: Dp = when (resolved) {
        BrandControlSize.Sm -> T.smPaddingInline
        BrandControlSize.Md -> T.paddingInline
        BrandControlSize.Lg -> T.lgPaddingInline
    }
    val slot = when (resolved) {
        BrandControlSize.Sm -> D.buttonSmSlotSize
        BrandControlSize.Md -> D.buttonSlotSize
        BrandControlSize.Lg -> D.buttonLgSlotSize
    }
    val iconSize = when (resolved) {
        BrandControlSize.Sm -> D.buttonSmIconSize
        BrandControlSize.Md -> D.buttonIconSize
        BrandControlSize.Lg -> D.buttonLgIconSize
    }

    val background = animatedFieldColor(
        when {
            !enabled -> T.disabledBg.current
            hasError -> T.errorBg.current
            else -> T.bg.current
        },
        T.transitionDuration, T.transitionEasing, reduceMotion, "date-bg",
    )
    val border = animatedFieldColor(
        when {
            !enabled -> T.disabledBorderColor.current
            hasError -> (if (isFocused) T.errorFocusBorderColor else T.errorBorderColor).current
            else -> (if (isFocused) T.focusBorderColor else T.borderColor).current
        },
        T.transitionDuration, T.transitionEasing, reduceMotion, "date-border",
    )
    val textColor = when {
        !enabled -> T.disabledColor.current
        hasError -> T.errorColor.current
        value == null -> (if (hasError) T.errorPlaceholderColor else T.placeholderColor).current
        else -> T.color.current
    }
    val shown = value?.let { formatPickedDate(it, locale) } ?: placeholder
    val textStyle = brandBaseTextStyle(fontSize, T.fontWeight, T.lineHeight, color = textColor)
    val showsClear = value != null && enabled && !readOnly

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
                .fillMaxWidth()
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
                ),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Box(
                Modifier
                    .weight(1f)
                    .heightIn(min = height)
                    .clickable(interactionSource = source, indication = null, enabled = enabled && !readOnly, role = Role.Button) { open() }
                    .semantics {
                        contentDescription = label
                        stateDescription = listOfNotNull(if (value == null) noDateLabel else shown, helperText).joinToString(". ")
                        if (hasError) error(errorMessage ?: invalidLabel)
                    }
                    .padding(horizontal = paddingInline),
                contentAlignment = Alignment.CenterStart,
            ) {
                BrandBasicText(shown, modifier = Modifier.clearAndSetSemantics { }, style = textStyle, maxLines = 1, overflow = TextOverflow.Ellipsis)
            }
            if (showsClear) {
                BrandFieldIconButton(icon = BrandIconName.Close, label = clearLabel, slot = slot, iconSize = iconSize) { onValueChange(null) }
            }
            BrandFieldIconButton(
                icon = BrandIconName.Calendar,
                label = openCalendarLabel,
                slot = slot,
                iconSize = iconSize,
                enabled = enabled && !readOnly,
                color = if (enabled) D.buttonColor else D.buttonDisabledColor,
                ringColor = D.buttonFocusRingColor,
                ringWidth = D.buttonFocusRingWidth,
                ringOffset = 0.dp,
            ) { open() }
        }
    }
}
