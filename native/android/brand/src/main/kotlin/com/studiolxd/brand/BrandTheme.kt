package com.studiolxd.brand

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.ReadOnlyComposable
import androidx.compose.runtime.staticCompositionLocalOf
import com.studiolxd.brand.tokens.BrandColorRoles
import com.studiolxd.brand.support.ProvideBrandHitTarget
import com.studiolxd.brand.tokens.LocalBrandColorRoles

/**
 * Provee a la composición los roles de color del esquema claro u oscuro. Por defecto sigue al sistema.
 *
 * Lo que dependa del esquema lee de [BrandTheme.colors]; el resto de tokens (espaciado, radios, tipografía…)
 * no cambian con el esquema y se leen directamente de sus objetos (`BrandSpacing`, `BrandRadius`…).
 */
@Composable
fun BrandTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit,
) {
    CompositionLocalProvider(
        LocalBrandColorRoles provides if (darkTheme) BrandColorRoles.dark else BrandColorRoles.light,
        LocalBrandDarkTheme provides darkTheme,
    ) {
        // Zona táctil de 48 dp para todo lo clicable, sin cambiar la maqueta.
        ProvideBrandHitTarget(content)
    }
}

/** `true` si el esquema vigente es el oscuro. Lo provee [BrandTheme]; por defecto, claro. */
internal val LocalBrandDarkTheme = staticCompositionLocalOf { false }

/** Acceso a lo que provee [BrandTheme]. */
object BrandTheme {
    /** Los roles de color del esquema vigente. */
    val colors: BrandColorRoles
        @Composable
        @ReadOnlyComposable
        get() = LocalBrandColorRoles.current

    /** Si el esquema vigente es el oscuro (para resolver los tokens de componente con par oscuro). */
    val isDark: Boolean
        @Composable
        @ReadOnlyComposable
        get() = LocalBrandDarkTheme.current
}
