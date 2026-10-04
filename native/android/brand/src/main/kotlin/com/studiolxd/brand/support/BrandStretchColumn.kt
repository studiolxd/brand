package com.studiolxd.brand.support

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.Layout
import androidx.compose.ui.unit.Constraints
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

/**
 * Una columna que **estira** a cada hijo al ancho disponible (`align-items: stretch` de la ranura de acciones de React):
 * así el consumidor no tiene que pasarle `block` a cada botón. Con ancho no acotado, cada hijo mide lo suyo. Interno.
 */
@Composable
internal fun BrandStretchColumn(gap: Dp, modifier: Modifier = Modifier, content: @Composable () -> Unit) {
    Layout(content = content, modifier = modifier) { measurables, constraints ->
        val gapPx = gap.roundToPx()
        val width = if (constraints.hasBoundedWidth) constraints.maxWidth else null
        val childConstraints = if (width != null) {
            Constraints(minWidth = width, maxWidth = width, maxHeight = constraints.maxHeight)
        } else {
            constraints.copy(minWidth = 0, minHeight = 0)
        }
        val placeables = measurables.map { it.measure(childConstraints) }
        val columnWidth = (width ?: (placeables.maxOfOrNull { it.width } ?: 0)).coerceIn(constraints.minWidth, constraints.maxWidth)
        val height = (placeables.sumOf { it.height } + gapPx * (placeables.size - 1).coerceAtLeast(0))
            .coerceIn(constraints.minHeight, constraints.maxHeight)
        layout(columnWidth, height) {
            var y = 0
            placeables.forEach { p ->
                p.placeRelative(0, y)
                y += p.height + gapPx
            }
        }
    }
}

/** El ancho por debajo del cual las filas de aviso y de cabecera apilan sus partes (480 dp: el salto a `md` de la web). */
internal val BrandStackBreakpoint: Dp = 480.dp
