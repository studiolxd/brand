package com.studiolxd.brand.support

import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.platform.LocalViewConfiguration
import androidx.compose.ui.platform.ViewConfiguration
import androidx.compose.ui.unit.DpSize
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.max

/**
 * Zona táctil mínima de las guías de Android (Material: 48 × 48 dp). No es un token de diseño: es el mínimo de la
 * plataforma, que en la web cubre el puntero (`size-target.min`, 24) y aquí exige el dedo.
 */
object BrandHitTarget {
    val minimum = 48.dp
}

/**
 * Garantiza [BrandHitTarget.minimum] a todo lo clicable de este árbol **sin cambiar el aspecto ni la maqueta**.
 *
 * Compose amplía el área que responde al toque de cualquier nodo con puntero hasta
 * `ViewConfiguration.minimumTouchTargetSize` sin tocar su tamaño visible (a diferencia de Material, que lo reserva en
 * la maqueta); en Android ese mínimo ya es 48 dp, pero un anfitrión puede cambiarlo. Esta función lo fija como mínimo
 * y la llama [com.studiolxd.brand.BrandTheme], así que los componentes de Brand no necesitan hacer nada más: un botón
 * `sm` de 32 dp mide 32 dp y se toca en 48.
 */
@Composable
fun ProvideBrandHitTarget(content: @Composable () -> Unit) {
    val current = LocalViewConfiguration.current
    val minimum = DpSize(BrandHitTarget.minimum, BrandHitTarget.minimum)
    if (current.minimumTouchTargetSize.width >= minimum.width && current.minimumTouchTargetSize.height >= minimum.height) {
        content()
        return
    }
    val expanded = object : ViewConfiguration by current {
        override val minimumTouchTargetSize: DpSize
            get() = DpSize(max(current.minimumTouchTargetSize.width, minimum.width), max(current.minimumTouchTargetSize.height, minimum.height))
    }
    CompositionLocalProvider(LocalViewConfiguration provides expanded, content = content)
}
