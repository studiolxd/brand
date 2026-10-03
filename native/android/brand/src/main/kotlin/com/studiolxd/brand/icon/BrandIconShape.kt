package com.studiolxd.brand.icon

import androidx.compose.ui.graphics.Matrix
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.vector.PathParser

/** Un trazo de un icono, tal y como lo declara `Icon.tsx` (retícula de 24 × 24, trazo de 1 dp que no escala). */
internal sealed interface BrandIconShape {
    val filled: Boolean
    val stroked: Boolean
    val round: Boolean
    val roundJoin: Boolean

    /** `<path d="…">`; `round` = `strokeLinecap="round"`, `roundJoin` = `strokeLinejoin="round"`. */
    class Path(
        val d: String,
        override val round: Boolean = false,
        override val roundJoin: Boolean = false,
        override val filled: Boolean = false,
        override val stroked: Boolean = true,
    ) : BrandIconShape

    class Circle(
        val cx: Float,
        val cy: Float,
        val r: Float,
        override val filled: Boolean = false,
        override val stroked: Boolean = true,
    ) : BrandIconShape {
        override val round = false
        override val roundJoin = false
    }

    class Line(
        val x1: Float,
        val y1: Float,
        val x2: Float,
        val y2: Float,
        override val round: Boolean = false,
    ) : BrandIconShape {
        override val filled = false
        override val stroked = true
        override val roundJoin = false
    }

    companion object {
        /** La retícula del `viewBox` de todos los iconos. */
        const val GRID = 24f
    }
}

/** El trazo en una caja cuadrada de [side] píxeles, escalando la retícula de 24 a ella. */
internal fun BrandIconShape.toPath(side: Float): Path {
    val path = when (this) {
        is BrandIconShape.Path -> PathParser().parsePathString(d).toPath()
        is BrandIconShape.Circle -> Path().apply { addOval(androidx.compose.ui.geometry.Rect(cx - r, cy - r, cx + r, cy + r)) }
        is BrandIconShape.Line -> Path().apply {
            moveTo(x1, y1)
            lineTo(x2, y2)
        }
    }
    val scale = side / BrandIconShape.GRID
    path.transform(Matrix().apply { scale(scale, scale) })
    return path
}
