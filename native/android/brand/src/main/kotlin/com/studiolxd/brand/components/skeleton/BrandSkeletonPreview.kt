package com.studiolxd.brand.components.skeleton

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.studiolxd.brand.support.BrandPreviewSurface
import com.studiolxd.brand.tokens.BrandSpacing

/** Un bloque con el barrido congelado en [phase] (`null` = fondo plano, «Quitar animaciones»). Para vistas previas y capturas. */
@Composable
internal fun FrozenSkeleton(phase: Float?, modifier: Modifier = Modifier, width: Dp? = null, height: Dp? = null, circle: Boolean = false) {
    BrandSkeletonImpl(modifier, width, height, circle, loadingLabel = null, frozenPhase = phase, forceReducedMotion = phase == null)
}

/** Los bloques de la ficha de React con el barrido congelado. */
@Composable
internal fun SkeletonPreviewContent() {
    Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s3)) {
        FrozenSkeleton(0.4f)
        FrozenSkeleton(0.5f, width = 160.dp)
        FrozenSkeleton(0.6f, height = 44.dp)
        Row(horizontalArrangement = Arrangement.spacedBy(BrandSpacing.s3)) {
            FrozenSkeleton(0.5f, width = 48.dp, height = 48.dp, circle = true)
            Column(Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(BrandSpacing.s2)) {
                FrozenSkeleton(0.5f)
                FrozenSkeleton(0.5f, width = 120.dp)
            }
        }
        FrozenSkeleton(null, width = 200.dp, height = 24.dp)
    }
}

@Preview(name = "Skeleton — claro", showBackground = true, widthDp = 320, heightDp = 320)
@Composable
internal fun SkeletonPreviewLight() = BrandPreviewSurface(dark = false) { SkeletonPreviewContent() }

@Preview(name = "Skeleton — oscuro", showBackground = true, widthDp = 320, heightDp = 320)
@Composable
internal fun SkeletonPreviewDark() = BrandPreviewSurface(dark = true) { SkeletonPreviewContent() }
