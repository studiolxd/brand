package com.studiolxd.brand.support

import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.compositionLocalOf

/**
 * La talla de un control (`size`: `sm` | `md` | `lg`), la misma en `Button`, `InputField`, `SelectField`… Las
 * alturas salen de `size-component.*` (32 / 40 / 48 dp).
 */
enum class BrandControlSize(val value: String) {
    Sm("sm"),
    Md("md"),
    Lg("lg"),
}

/**
 * La talla que un contenedor reparte a los controles que no declaran la suya (`FormSizeContext` en React).
 * Sin valor (`null`), un control es [BrandControlSize.Md]. Se fija con [ProvideBrandControlSize].
 */
val LocalBrandControlSize = compositionLocalOf<BrandControlSize?> { null }

/** Fija la talla por defecto de los controles de este árbol (`Form size="…"` en React, `brandControlSize(_:)` en SwiftUI). */
@Composable
fun ProvideBrandControlSize(size: BrandControlSize?, content: @Composable () -> Unit) {
    CompositionLocalProvider(LocalBrandControlSize provides size, content = content)
}

/** La talla efectiva de un control: la suya, o la del entorno, o `md`. */
@Composable
fun BrandControlSize?.resolve(): BrandControlSize = this ?: LocalBrandControlSize.current ?: BrandControlSize.Md
