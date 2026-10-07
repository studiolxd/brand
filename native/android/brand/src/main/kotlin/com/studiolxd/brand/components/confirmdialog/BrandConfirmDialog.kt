package com.studiolxd.brand.components.confirmdialog

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.text.BasicText
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.rememberUpdatedState
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.layout
import androidx.compose.ui.draw.drawWithContent
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.focus.onFocusChanged
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.platform.LocalInspectionMode
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.dismiss
import androidx.compose.ui.semantics.error
import androidx.compose.ui.semantics.heading
import androidx.compose.ui.semantics.paneTitle
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.semantics.stateDescription
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.KeyboardCapitalization
import androidx.compose.ui.unit.dp
import com.studiolxd.brand.components.button.ButtonVariant
import com.studiolxd.brand.components.closebutton.BrandCloseButton
import com.studiolxd.brand.components.dialog.BrandDialogButton
import com.studiolxd.brand.components.dialog.BrandDialogFooter
import com.studiolxd.brand.components.dialog.BrandDialogWindow
import com.studiolxd.brand.support.BrandBasicText
import com.studiolxd.brand.support.BrandControlSize
import com.studiolxd.brand.support.brandFocusRing
import com.studiolxd.brand.support.brandShadow
import com.studiolxd.brand.support.brandBaseTextStyle
import com.studiolxd.brand.support.scaledByFontScale
import com.studiolxd.brand.support.toScaledDp
import com.studiolxd.brand.tokens.BrandConfirmDialogTokens
import com.studiolxd.brand.tokens.BrandFormFieldTokens
import com.studiolxd.brand.tokens.BrandInputFieldTokens
import com.studiolxd.brand.tokens.BrandInputTokens
import com.studiolxd.brand.tokens.BrandLabelTokens
import com.studiolxd.brand.tokens.BrandModalTokens as M
import kotlin.coroutines.cancellation.CancellationException
import kotlinx.coroutines.launch

/**
 * La barrera de teclear el identificador (`confirmPhrase` de React): la frase exacta y los dos textos del producto,
 * que no llevan texto por defecto (los pone quien conoce el idioma y la frase).
 *
 * @param value lo que hay que teclear tal cual (se ignoran los espacios de los extremos, no la caja ni los acentos).
 * @param label etiqueta del campo («Escribe «Casa del lago» para confirmar»).
 * @param mismatch mensaje cuando lo tecleado no coincide.
 */
class BrandConfirmPhrase(val value: String, val label: String, val mismatch: String)

/**
 * El estado de un diálogo de confirmación: ocupado, lo tecleado y si ya se intentó. Aparte del `@Composable` para
 * poder probar la lógica sin pintar nada.
 */
internal class ConfirmDialogState(
    private val phrase: String?,
    pending: Boolean = false,
    typed: String = "",
    attempted: Boolean = false,
) {
    var pending by mutableStateOf(pending)
    var typed by mutableStateOf(typed)
    var attempted by mutableStateOf(attempted)

    /** Se compara sin los espacios de los extremos pero sin normalizar caja ni acentos: la barrera vive de teclearlo igual. */
    val matches: Boolean get() = phrase == null || typed.trim() == phrase

    val mismatchShown: Boolean get() = attempted && !matches

    /** El usuario escribe: el aviso de «no coincide» espera a que salga del campo. */
    fun edit(value: String) {
        typed = value
        attempted = false
    }

    /** El campo pierde el foco: si hay algo escrito, ya se puede decir que no coincide. */
    fun leaveField() {
        if (typed.isNotEmpty()) attempted = true
    }

    /** Intro en el campo: confirma si coincide; si no, enseña el mensaje (salvo con el campo vacío). Devuelve `true` si hay que confirmar. */
    fun submitField(): Boolean {
        if (matches) return true
        if (typed.isNotEmpty()) attempted = true
        return false
    }

    fun reset() {
        pending = false
        typed = ""
        attempted = false
    }

    /**
     * Confirma: ocupado mientras corre [onConfirm]; al terminar con éxito se llama a [onSuccess] (que cierra); si lanza,
     * el diálogo sigue abierto y se avisa por [onError]. Una cancelación de la corrutina se relanza.
     */
    suspend fun confirm(onConfirm: suspend () -> Unit, onSuccess: () -> Unit, onError: ((Throwable) -> Unit)?) {
        if (pending || !matches) return
        pending = true
        try {
            onConfirm()
            pending = false
            onSuccess()
        } catch (cancelled: CancellationException) {
            pending = false
            throw cancelled
        } catch (failure: Throwable) {
            // Sigue abierto: el error lo cuenta quien llama (un toast, un aviso en `extra`).
            pending = false
            onError?.invoke(failure)
        }
    }
}

/**
 * La pregunta antes de una acción que no se puede deshacer (`ConfirmDialog`): borrar una vivienda, revocar una clave,
 * expulsar a alguien. Es la tarjeta del diálogo de la marca —título, aspa, pregunta, contenido extra, frase de
 * confirmación opcional y pie— sobre el velo del sistema, en su propia ventana.
 *
 * Las reglas del sistema, igual que en la web:
 * - **`confirmLabel` es obligatorio** y nombra lo que va a pasar («Eliminar la vivienda»), no «Confirmar».
 * - **`Cancelar` va primero en el pie** y la acción principal al final; con sitio, `Cancelar` queda a la izquierda y la
 *   principal a la derecha; sin él, la principal arriba (regla 10 de CLAUDE.md).
 * - **`onConfirm` es suspendible**: mientras corre, el diálogo queda ocupado (botones apagados, rótulo de espera,
 *   atrás y velo sin efecto) y **se cierra al terminar**; si lanza, sigue abierto y se avisa por [onConfirmError].
 *
 * ```kotlin
 * BrandConfirmDialog(
 *     open = askDelete,
 *     onDismissRequest = { askDelete = false },
 *     title = "¿Eliminar la vivienda?",
 *     description = "Se borrarán sus documentos. No se puede deshacer.",
 *     confirmLabel = "Eliminar la vivienda",
 *     destructive = true,
 *     onConfirm = { repository.delete(home) },   // se cierra al terminar; si lanza, sigue abierto
 * )
 * ```
 *
 * @param open `open` de React.
 * @param onDismissRequest cierra el diálogo: tras cancelar (botón, aspa, atrás, velo, `Esc`) y tras confirmar con éxito.
 * @param onCancel se llama además al cancelar, justo antes de [onDismissRequest].
 * @param confirmPhrase si se pasa, el principal no se activa hasta teclear la frase.
 * @param secondaryActionLabel una tercera acción (no cierra el diálogo, como en React); va con [onSecondaryAction].
 * @param extra contenido bajo la descripción.
 */
@Composable
fun BrandConfirmDialog(
    open: Boolean,
    onDismissRequest: () -> Unit,
    title: String,
    confirmLabel: String,
    onConfirm: suspend () -> Unit,
    modifier: Modifier = Modifier,
    description: String? = null,
    cancelLabel: String = "Cancelar",
    pendingLabel: String = "Confirmando…",
    closeLabel: String = "Cerrar",
    destructive: Boolean = false,
    secondaryActionLabel: String? = null,
    onSecondaryAction: (() -> Unit)? = null,
    confirmPhrase: BrandConfirmPhrase? = null,
    onConfirmError: ((Throwable) -> Unit)? = null,
    onCancel: () -> Unit = {},
    extra: (@Composable ColumnScope.() -> Unit)? = null,
) {
    val state = remember { ConfirmDialogState(confirmPhrase?.value) }
    val scope = rememberCoroutineScope()
    val currentDismiss by rememberUpdatedState(onDismissRequest)
    val currentCancel by rememberUpdatedState(onCancel)
    val currentConfirm by rememberUpdatedState(onConfirm)
    val currentError by rememberUpdatedState(onConfirmError)
    LaunchedEffect(open) { if (open) state.reset() }

    val cancel: () -> Unit = {
        if (!state.pending) {
            currentCancel()
            currentDismiss()
        }
    }
    BrandDialogWindow(
        open = open,
        onDismissRequest = cancel,
        backdropColor = M.backdropBg.current,
        backdropOpacity = M.backdropOpacity,
        durationMillis = M.transitionDuration,
        easing = M.transitionEasing,
        dismissable = !state.pending,
    ) { progress ->
        BoxWithConstraints(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
            val enterOffset = with(androidx.compose.ui.platform.LocalDensity.current) { M.contentEnterOffset.toPx() }
            BrandConfirmDialogCard(
                state = state,
                title = title,
                description = description,
                confirmLabel = confirmLabel,
                cancelLabel = cancelLabel,
                pendingLabel = pendingLabel,
                closeLabel = closeLabel,
                destructive = destructive,
                secondaryActionLabel = secondaryActionLabel,
                onSecondaryAction = onSecondaryAction,
                phrase = confirmPhrase,
                onCancel = cancel,
                onConfirm = {
                    scope.launch { state.confirm({ currentConfirm() }, { currentDismiss() }, currentError) }
                },
                modifier = modifier
                    .width(minOf(maxWidth * 0.9f, M.widthMax))
                    .graphicsLayer {
                        alpha = progress()
                        translationY = -(1f - progress()) * enterOffset
                    },
                extra = extra,
            )
        }
    }
}

/** La tarjeta del diálogo, sin ventana ni velo: la pintan las capturas con un estado fijado. */
@Composable
internal fun BrandConfirmDialogCard(
    state: ConfirmDialogState,
    title: String,
    description: String?,
    confirmLabel: String,
    cancelLabel: String,
    pendingLabel: String,
    closeLabel: String,
    destructive: Boolean,
    secondaryActionLabel: String?,
    onSecondaryAction: (() -> Unit)?,
    phrase: BrandConfirmPhrase?,
    onCancel: () -> Unit,
    onConfirm: () -> Unit,
    modifier: Modifier = Modifier,
    extra: (@Composable ColumnScope.() -> Unit)? = null,
) {
    Column(
        modifier
            .brandShadow(M.shadow, M.borderRadius)
            .background(M.bg.current)
            .border(M.borderWidth, M.borderColor.current)
            .padding(vertical = M.paddingBlock, horizontal = M.paddingInline)
            .semantics {
                paneTitle = title
                dismiss { onCancel(); true }
            },
    ) {
        Row(
            Modifier.fillMaxWidth().padding(bottom = M.headerGap),
            horizontalArrangement = Arrangement.spacedBy(M.headerGap),
            verticalAlignment = Alignment.Top,
        ) {
            BrandBasicText(
                title,
                Modifier.weight(1f).semantics { heading() },
                style = brandBaseTextStyle(M.titleFontSize, M.titleFontWeight, M.titleLineHeight, color = M.titleColor.current),
            )
            // El aspa se centra sobre la PRIMERA línea del título, como `.modal__close` en la web: se desplaza la mitad de lo
            // que va de la caja de esa línea (cuerpo × interlineado del título) a la del aspa, y ocupa lo que ocupa con ese
            // margen (negativo si el aspa es más alta que la línea).
            val closeShift = ((M.titleFontSize * M.titleLineHeight).toScaledDp() - M.closeSize.scaledByFontScale()) / 2
            BrandCloseButton(
                onClick = { if (!state.pending) onCancel() },
                modifier = Modifier.layout { measurable, constraints ->
                    val placeable = measurable.measure(constraints)
                    val dy = closeShift.roundToPx()
                    layout(placeable.width, (placeable.height + dy).coerceAtLeast(0)) { placeable.place(0, dy) }
                },
                contentDescription = closeLabel,
                size = BrandControlSize.Md,
            )
        }
        if (description != null) {
            BrandBasicText(
                description,
                Modifier.padding(bottom = M.descriptionMarginBlockEnd),
                style = brandBaseTextStyle(M.descriptionFontSize, com.studiolxd.brand.tokens.BrandTextTokens.fontWeight, com.studiolxd.brand.tokens.BrandTextTokens.lineHeight, color = M.descriptionColor.current),
            )
        }
        extra?.invoke(this)
        if (phrase != null) {
            ConfirmPhraseField(phrase, state, onConfirm, Modifier.padding(top = BrandConfirmDialogTokens.phraseSpaceBefore))
        }
        BrandDialogFooter(Modifier.padding(top = BrandConfirmDialogTokens.actionsSpaceBefore), gap = M.footerGap) {
            // El orden del DOM: salida segura → intermedia → principal. De él sale la colocación.
            BrandDialogButton(cancelLabel, onClick = onCancel, variant = ButtonVariant.Outline, enabled = !state.pending)
            if (secondaryActionLabel != null && onSecondaryAction != null) {
                BrandDialogButton(secondaryActionLabel, onClick = onSecondaryAction, variant = ButtonVariant.Outline, enabled = !state.pending)
            }
            BrandDialogButton(
                text = if (state.pending) pendingLabel else confirmLabel,
                onClick = onConfirm,
                modifier = Modifier.semantics { if (state.pending) stateDescription = pendingLabel },
                variant = if (destructive) ButtonVariant.Outline else ButtonVariant.Primary,
                destructive = destructive,
                enabled = !state.pending && state.matches,
            )
        }
    }
}

/**
 * El campo de la frase: etiqueta, caja con el borde de los campos de la marca y, si no coincide, el mensaje de error.
 * Pinta con los tokens `input.*`, `label.*` e `input-field.*` (es el `InputField` de React, reducido a lo que este
 * diálogo necesita).
 */
@Composable
private fun ConfirmPhraseField(phrase: BrandConfirmPhrase, state: ConfirmDialogState, onSubmit: () -> Unit, modifier: Modifier) {
    val disabled = state.pending
    val showError = state.mismatchShown
    var focused by remember { mutableStateOf(false) }
    var wasFocused by remember { mutableStateOf(false) }
    val focusRequester = remember { FocusRequester() }
    val inspection = LocalInspectionMode.current
    LaunchedEffect(Unit) { if (!inspection) runCatching { focusRequester.requestFocus() } }

    val borderColor = when {
        disabled -> BrandInputTokens.disabledBorderColor.current
        showError -> if (focused) BrandInputTokens.errorFocusBorderColor.current else BrandInputTokens.errorBorderColor.current
        else -> if (focused) BrandInputTokens.focusBorderColor.current else BrandInputTokens.borderColor.current
    }
    val background = when {
        disabled -> BrandInputTokens.disabledBg.current
        showError -> BrandInputTokens.errorBg.current
        else -> BrandInputTokens.bg.current
    }
    val ink = if (disabled) BrandInputTokens.disabledColor.current else BrandInputTokens.color.current
    val ringColor = if (showError) BrandInputTokens.errorFocusRingColor.current else BrandInputTokens.focusRingColor.current
    val ringWidth = BrandInputTokens.focusRingWidth
    val ringInset = BrandInputTokens.focusRingInsetOffset

    Column(modifier, verticalArrangement = Arrangement.spacedBy(BrandFormFieldTokens.gap)) {
        BrandBasicText(
            phrase.label,
            style = brandBaseTextStyle(BrandLabelTokens.fontSize, BrandLabelTokens.fontWeight, BrandLabelTokens.lineHeight, BrandLabelTokens.letterSpacing, color = BrandLabelTokens.color.current),
        )
        BasicTextField(
            value = state.typed,
            onValueChange = { state.edit(it) },
            modifier = Modifier
                .fillMaxWidth()
                .focusRequester(focusRequester)
                .onFocusChanged {
                    focused = it.isFocused
                    if (wasFocused && !it.isFocused) state.leaveField()
                    wasFocused = it.isFocused
                }
                .semantics {
                    contentDescription = phrase.label
                    if (showError) error(phrase.mismatch)
                },
            enabled = !disabled,
            singleLine = true,
            textStyle = brandBaseTextStyle(BrandInputTokens.fontSize, BrandInputTokens.fontWeight, BrandInputTokens.lineHeight, color = ink),
            cursorBrush = SolidColor(ink),
            keyboardOptions = KeyboardOptions(capitalization = KeyboardCapitalization.None, autoCorrectEnabled = false, imeAction = ImeAction.Done),
            keyboardActions = KeyboardActions(onDone = { if (state.submitField()) onSubmit() }),
            decorationBox = { inner ->
                Box(
                    Modifier
                        .fillMaxWidth()
                        .heightIn(min = BrandInputTokens.height.scaledByFontScale())
                        .background(background)
                        .border(BrandInputTokens.borderWidth, borderColor)
                        .drawWithContent {
                            drawContent()
                            if (focused) {
                                val inset = (ringInset + ringWidth / 2).toPx()
                                drawRect(
                                    color = ringColor,
                                    topLeft = Offset(inset, inset),
                                    size = Size(size.width - 2 * inset, size.height - 2 * inset),
                                    style = Stroke(ringWidth.toPx()),
                                )
                            }
                        }
                        .padding(horizontal = BrandInputTokens.paddingInline),
                    contentAlignment = Alignment.CenterStart,
                ) { inner() }
            },
        )
        if (showError) {
            // El mensaje ya viaja en la semántica del campo (`error`): TalkBack no lo lee dos veces.
            BrandBasicText(
                phrase.mismatch,
                Modifier.semantics { contentDescription = "" },
                style = brandBaseTextStyle(BrandInputFieldTokens.errorFontSize, BrandInputFieldTokens.errorFontWeight, BrandInputFieldTokens.errorLineHeight, color = BrandInputFieldTokens.errorColor.current),
            )
        }
    }
}
