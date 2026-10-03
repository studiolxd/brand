package com.studiolxd.brand.support

import android.content.Context
import android.database.ContentObserver
import android.os.Handler
import android.os.Looper
import android.provider.Settings
import androidx.compose.animation.core.AnimationSpec
import androidx.compose.animation.core.Easing
import androidx.compose.animation.core.snap
import androidx.compose.animation.core.tween
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalInspectionMode

/** `true` si el usuario quitó las animaciones del sistema (escala de animación 0: «Quitar animaciones» en Accesibilidad). */
private fun Context.animationsRemoved(): Boolean =
    Settings.Global.getFloat(contentResolver, Settings.Global.ANIMATOR_DURATION_SCALE, 1f) == 0f

/**
 * Si hay que **quitar las animaciones** (el equivalente de `accessibilityReduceMotion` de SwiftUI y de
 * `prefers-reduced-motion` en la web). Sigue en vivo a `ANIMATOR_DURATION_SCALE`; en el editor y en las capturas
 * (`LocalInspectionMode`) vale `false`.
 */
@Composable
fun rememberReduceMotion(): Boolean {
    if (LocalInspectionMode.current) return false
    val context = LocalContext.current
    var reduce by remember { mutableStateOf(context.animationsRemoved()) }
    DisposableEffect(context) {
        val observer = object : ContentObserver(Handler(Looper.getMainLooper())) {
            override fun onChange(selfChange: Boolean) {
                reduce = context.animationsRemoved()
            }
        }
        context.contentResolver.registerContentObserver(Settings.Global.getUriFor(Settings.Global.ANIMATOR_DURATION_SCALE), false, observer)
        reduce = context.animationsRemoved()
        onDispose { context.contentResolver.unregisterContentObserver(observer) }
    }
    return reduce
}

/**
 * La animación de una transición de la marca: [durationMillis] con [easing] (`transition-duration`/`transition-easing`
 * de un token), o un salto instantáneo si hay que quitar las animaciones ([reduceMotion]).
 */
fun <T> brandTransition(durationMillis: Int, easing: Easing, reduceMotion: Boolean): AnimationSpec<T> =
    if (reduceMotion) snap() else tween(durationMillis, easing = easing)
