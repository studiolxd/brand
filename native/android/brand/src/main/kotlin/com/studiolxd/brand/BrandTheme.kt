package com.studiolxd.brand

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.ReadOnlyComposable
import com.studiolxd.brand.tokens.BrandColorRoles
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
        content = content,
    )
}

/** Acceso a lo que provee [BrandTheme]. */
object BrandTheme {
    /** Los roles de color del esquema vigente. */
    val colors: BrandColorRoles
        @Composable
        @ReadOnlyComposable
        get() = LocalBrandColorRoles.current
}
