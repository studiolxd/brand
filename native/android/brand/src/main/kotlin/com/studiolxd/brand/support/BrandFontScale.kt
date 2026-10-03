package com.studiolxd.brand.support

import androidx.compose.runtime.Composable
import androidx.compose.runtime.ReadOnlyComposable
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.sp

/**
 * Una medida en dp escalada con el tamaño de fuente del sistema, como `@ScaledMetric(relativeTo: .body)` en SwiftUI:
 * las alturas de los controles crecen con el texto que llevan dentro. Respeta la escala no lineal de Android 14+.
 */
@Composable
@ReadOnlyComposable
fun Dp.scaledByFontScale(): Dp = with(LocalDensity.current) { value.sp.toDp() }

/** Un tamaño de letra en `sp` como dp (lo que mide un icono `size: text`, `1em`). Ya lleva la escala de fuente. */
@Composable
@ReadOnlyComposable
fun TextUnit.toScaledDp(): Dp = with(LocalDensity.current) { toDp() }
