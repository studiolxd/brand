package com.studiolxd.brand.components.dialog

import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.compositionLocalOf
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.Layout
import androidx.compose.ui.layout.Placeable
import androidx.compose.ui.unit.Constraints
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.studiolxd.brand.components.button.BrandButton
import com.studiolxd.brand.components.button.ButtonVariant
import com.studiolxd.brand.tokens.BrandModalTokens

/**
 * Ancho mínimo del contenedor para que dos botones con su etiqueta quepan en una fila: el umbral `sm` (480) con el
 * que `dialogSurface.css` escribe su consulta de contenedor. En la web es una condición de `@container`, no un
 * token, así que aquí es la misma cifra.
 */
internal val BrandDialogRowThreshold: Dp = 480.dp

/**
 * `true` cuando el pie del diálogo o del cajón que contiene a la vista va **apilado** (el contenedor mide menos de
 * 480 dp): los botones del pie se estiran a todo el ancho. Lo fija [BrandDialogFooter].
 */
val LocalBrandDialogStacked = compositionLocalOf { false }

/**
 * Un botón de la marca para el pie de un diálogo o de un cajón: igual que `BrandButton`, pero a todo el ancho cuando
 * el pie va apilado (`.dialog-footer > *` en la web).
 */
@Composable
fun BrandDialogButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    variant: ButtonVariant = ButtonVariant.Primary,
    destructive: Boolean = false,
    enabled: Boolean = true,
) {
    BrandButton(
        text = text,
        onClick = onClick,
        modifier = modifier,
        variant = variant,
        destructive = destructive,
        block = LocalBrandDialogStacked.current,
        enabled = enabled,
    )
}

/**
 * El pie de un diálogo o de un cajón. Las acciones se escriben en el orden del DOM —la que descarta primero, la
 * principal al final— y de él sale la colocación (regla 10 de CLAUDE.md):
 *
 * - **con sitio** (el contenedor mide 480 dp o más): una fila alineada al final, con `Cancelar` a la izquierda y la
 *   principal a la derecha;
 * - **sin sitio**: una columna a todo el ancho con la principal arriba (`column-reverse` en la web).
 *
 * @param gap aire entre acciones (`modal.footer-gap`, o `sheet.footer-gap` en el cajón).
 */
@Composable
fun BrandDialogFooter(
    modifier: Modifier = Modifier,
    gap: Dp = BrandModalTokens.footerGap,
    content: @Composable () -> Unit,
) {
    BoxWithConstraints(modifier) {
        val stacked = maxWidth < BrandDialogRowThreshold
        CompositionLocalProvider(LocalBrandDialogStacked provides stacked) {
            DialogFooterLayout(stacked, gap, content)
        }
    }
}

@Composable
private fun DialogFooterLayout(stacked: Boolean, gap: Dp, content: @Composable () -> Unit) {
    Layout(content) { measurables, constraints ->
        val gapPx = gap.roundToPx()
        val loose = constraints.copy(minWidth = 0, minHeight = 0)
        if (!stacked) {
            val placeables = measurables.map { it.measure(loose) }
            val total = placeables.sumOf { it.width } + gapPx * (placeables.size - 1).coerceAtLeast(0)
            val width = if (constraints.hasBoundedWidth) constraints.maxWidth else total
            val height = placeables.maxOfOrNull { it.height } ?: 0
            layout(width, height) {
                var x = width - total
                placeables.forEach { p ->
                    p.placeRelative(x, 0)
                    x += p.width + gapPx
                }
            }
        } else {
            val fixed = Constraints.fixedWidth(constraints.maxWidth)
            val placeables: List<Placeable> = measurables.map { it.measure(fixed) }
            val height = placeables.sumOf { it.height } + gapPx * (placeables.size - 1).coerceAtLeast(0)
            layout(constraints.maxWidth, height) {
                var y = 0
                // `column-reverse`: la última acción (la principal) arriba.
                placeables.asReversed().forEach { p ->
                    p.placeRelative(0, y)
                    y += p.height + gapPx
                }
            }
        }
    }
}
