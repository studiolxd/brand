package com.studiolxd.brand.components.skeleton

import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.drawscope.DrawScope
import androidx.compose.ui.semantics.clearAndSetSemantics
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.semantics.stateDescription
import androidx.compose.ui.unit.Dp
import com.studiolxd.brand.support.rememberReduceMotion
import com.studiolxd.brand.support.toScaledDp
import com.studiolxd.brand.tokens.BrandSkeletonTokens as T
import com.studiolxd.brand.tokens.BrandTextTokens as Text

/**
 * Marcador de contenido que aún está cargando: un bloque con un brillo que lo barre de izquierda a derecha
 * (`skeleton.duration`, en bucle). Con «Quitar animaciones» en Accesibilidad (escala de animación 0) queda como fondo
 * plano.
 *
 * Es decorativo: se oculta a TalkBack, y el contenedor debe anunciar la carga (`stateDescription`, `contentDescription`,
 * un `liveRegion`…). Si prefieres que cada bloque lo diga, pasa [loadingLabel].
 *
 * ```kotlin
 * Column(Modifier.semantics(mergeDescendants = true) { stateDescription = "Cargando" }, verticalArrangement = Arrangement.spacedBy(BrandSpacing.s3)) {
 *     BrandSkeleton(width = 160.dp)                 // una línea de texto
 *     BrandSkeleton(height = 44.dp)
 *     BrandSkeleton(width = 48.dp, height = 48.dp, circle = true)
 * }
 * ```
 *
 * @param width sin valor, ocupa todo el ancho disponible (con [circle], el alto).
 * @param height sin valor, una línea de texto (`1lh` en React: cuerpo × interlineado, que crece con la fuente).
 * @param loadingLabel texto de estado que lee TalkBack («Cargando…»); sin él, el bloque es invisible a TalkBack.
 */
@Composable
fun BrandSkeleton(
    modifier: Modifier = Modifier,
    width: Dp? = null,
    height: Dp? = null,
    circle: Boolean = false,
    loadingLabel: String? = null,
) {
    BrandSkeletonImpl(modifier, width, height, circle, loadingLabel, frozenPhase = null, forceReducedMotion = false)
}

/** [frozenPhase] congela el barrido (0…1) para las capturas; [forceReducedMotion] fuerza el fondo plano. */
@Composable
internal fun BrandSkeletonImpl(
    modifier: Modifier,
    width: Dp?,
    height: Dp?,
    circle: Boolean,
    loadingLabel: String?,
    frozenPhase: Float?,
    forceReducedMotion: Boolean,
) {
    val h = height ?: (Text.fontSize * Text.lineHeight).toScaledDp()
    val shape = RoundedCornerShape(if (circle) T.circleBorderRadius else T.borderRadius)
    val systemReduceMotion = rememberReduceMotion()
    val phase: Float? = when {
        frozenPhase != null -> frozenPhase
        forceReducedMotion || systemReduceMotion -> null
        else -> {
            val transition = rememberInfiniteTransition(label = "skeleton")
            val value by transition.animateFloat(
                initialValue = 0f,
                targetValue = 1f,
                animationSpec = infiniteRepeatable(tween(T.duration, easing = LinearEasing), RepeatMode.Restart),
                label = "skeleton-phase",
            )
            value
        }
    }
    val background = T.bg.current
    val highlight = T.highlight.current
    val size = when {
        circle -> Modifier.size(width ?: h, h)
        width != null -> Modifier.width(width).height(h)
        else -> Modifier.fillMaxWidth().height(h)
    }
    val semantics = if (loadingLabel != null) {
        Modifier.semantics { stateDescription = loadingLabel }
    } else {
        Modifier.clearAndSetSemantics { }
    }
    Box(
        modifier
            .then(semantics)
            .then(size)
            .clip(shape)
            .drawBehind { drawSweep(background, highlight, phase) },
    )
}

/**
 * El fondo y, encima, el brillo: un degradado transparente → brillo → transparente de 2× el ancho que va de fuera por la
 * izquierda a fuera por la derecha (`background-position` de 200 % a −200 %). Sin [phase], solo el fondo.
 */
private fun DrawScope.drawSweep(background: Color, highlight: Color, phase: Float?) {
    drawRect(background)
    if (phase == null) return
    val w = size.width
    val start = -2 * w + 4 * w * phase
    drawRect(Brush.horizontalGradient(listOf(Color.Transparent, highlight, Color.Transparent), startX = start, endX = start + 2 * w))
}
