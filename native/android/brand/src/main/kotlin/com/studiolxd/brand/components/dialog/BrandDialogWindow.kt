package com.studiolxd.brand.components.dialog

import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.Easing
import androidx.compose.foundation.background
import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxScope
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.SideEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberUpdatedState
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.input.key.Key
import androidx.compose.ui.input.key.KeyEventType
import androidx.compose.ui.input.key.key
import androidx.compose.ui.input.key.onPreviewKeyEvent
import androidx.compose.ui.input.key.type
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.platform.LocalView
import androidx.compose.ui.window.Dialog
import androidx.compose.ui.window.DialogProperties
import androidx.compose.ui.window.DialogWindowProvider
import com.studiolxd.brand.support.brandTransition
import com.studiolxd.brand.support.rememberReduceMotion

/**
 * La ventana de un diálogo o de un cajón: un `Dialog` de Compose a pantalla completa con el velo de la marca
 * (`*.backdrop-bg` × `*.backdrop-opacity`) y la animación de entrada y salida del componente.
 *
 * Mientras [open] es `true` la ventana está en pantalla; al pasar a `false` sigue ahí lo que dura la animación de
 * salida (un salto instantáneo si el usuario quitó las animaciones del sistema) y desaparece. Tocar el velo, la
 * tecla atrás y `Esc` llaman a [onDismissRequest] salvo que [dismissable] sea `false` (un diálogo ocupado).
 *
 * El contenido recibe `progress`, la fracción de la animación (0 = fuera, 1 = dentro), **como lambda** para que lo lea
 * la fase de dibujo y no recomponga en cada fotograma.
 */
@Composable
internal fun BrandDialogWindow(
    open: Boolean,
    onDismissRequest: () -> Unit,
    backdropColor: Color,
    backdropOpacity: Float,
    durationMillis: Int,
    easing: Easing,
    dismissable: Boolean = true,
    content: @Composable BoxScope.(progress: () -> Float) -> Unit,
) {
    val reduceMotion = rememberReduceMotion()
    val progress = remember { Animatable(0f) }
    var composed by remember { mutableStateOf(open) }
    LaunchedEffect(open, reduceMotion) {
        if (open) {
            composed = true
            progress.animateTo(1f, brandTransition(durationMillis, easing, reduceMotion))
        } else {
            progress.animateTo(0f, brandTransition(durationMillis, easing, reduceMotion))
            composed = false
        }
    }
    if (!composed) return

    val currentDismiss by rememberUpdatedState(onDismissRequest)
    val currentDismissable by rememberUpdatedState(dismissable)
    Dialog(
        onDismissRequest = { if (currentDismissable) currentDismiss() },
        properties = DialogProperties(
            dismissOnBackPress = dismissable,
            dismissOnClickOutside = false,
            usePlatformDefaultWidth = false,
            decorFitsSystemWindows = false,
        ),
    ) {
        // El velo lo pinta la marca (con su token), no el oscurecido por defecto de la ventana.
        val view = LocalView.current
        SideEffect { (view.parent as? DialogWindowProvider)?.window?.setDimAmount(0f) }
        Box(
            Modifier
                .fillMaxSize()
                .onPreviewKeyEvent { event ->
                    if (event.type == KeyEventType.KeyUp && event.key == Key.Escape && currentDismissable) {
                        currentDismiss()
                        true
                    } else {
                        false
                    }
                },
        ) {
            Box(
                Modifier
                    .fillMaxSize()
                    .graphicsLayer { alpha = backdropOpacity * progress.value }
                    .background(backdropColor)
                    // Sin semántica: el velo no es un botón para TalkBack (se cierra con atrás, el aspa o `Esc`).
                    .pointerInput(Unit) { detectTapGestures { if (currentDismissable) currentDismiss() } },
            )
            content { progress.value }
        }
    }
}
