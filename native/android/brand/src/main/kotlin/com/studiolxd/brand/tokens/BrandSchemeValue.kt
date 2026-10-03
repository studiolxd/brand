package com.studiolxd.brand.tokens

import androidx.compose.runtime.Composable
import androidx.compose.runtime.Immutable
import androidx.compose.runtime.ReadOnlyComposable
import com.studiolxd.brand.BrandTheme

/**
 * Un valor de token con su cara clara y su cara oscura (`surface-dark-*` de la web, o heredada por referencia).
 * Todo color de componente generado lo es; también las medidas con par oscuro (p. ej. el subrayado de `Button text`).
 * Se resuelve con [current] (esquema de [BrandTheme]) o con [value] (esquema explícito).
 */
@Immutable
class BrandSchemeValue<T>(val light: T, val dark: T) {
    /** El valor del esquema indicado. */
    fun value(darkTheme: Boolean): T = if (darkTheme) dark else light

    /** El valor del esquema vigente en la composición. */
    val current: T
        @Composable
        @ReadOnlyComposable
        get() = value(BrandTheme.isDark)
}
