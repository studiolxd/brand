package com.studiolxd.brand.components.banner

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.runtime.Composable
import androidx.compose.ui.tooling.preview.Preview
import com.studiolxd.brand.components.button.BrandButton
import com.studiolxd.brand.components.button.ButtonVariant
import com.studiolxd.brand.support.BrandControlSize
import com.studiolxd.brand.support.BrandPreviewSurface
import com.studiolxd.brand.tokens.BrandSpacing

internal const val PreviewBannerMessage = "Estás viendo la aplicación como ana.perez@studiolxd.com."
internal const val PreviewBannerNotice = "El mantenimiento previsto empieza hoy a las 22:00 y durará una hora."

/** El botón de las acciones de los avisos de muestra: el `Button outline sm` de la story. */
@Composable
internal fun PreviewBannerAction(text: String) = BrandButton(text, onClick = {}, variant = ButtonVariant.Outline, size = BrandControlSize.Sm)

/** Todas las variantes de `Banner`: las tres intenciones, con acción, con cierre y el aviso con las dos cosas. */
@Composable
internal fun BannerPreviewContent() {
    Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s4)) {
        BrandBanner(PreviewBannerMessage)
        BrandBanner(PreviewBannerMessage, actions = { PreviewBannerAction("Dejar de suplantar") })
        BrandBanner(PreviewBannerMessage, actions = { PreviewBannerAction("Dejar de suplantar") }, onDismiss = {})
        BrandBanner(PreviewBannerNotice, tone = BannerTone.Warning)
        BrandBanner(PreviewBannerNotice, tone = BannerTone.Warning, actions = { PreviewBannerAction("Ver detalles") }, onDismiss = {})
        BrandBanner(PreviewBannerMessage, tone = BannerTone.Error, actions = { PreviewBannerAction("Dejar de suplantar") })
    }
}

@Preview(name = "Banner — claro", showBackground = true, widthDp = 420, heightDp = 740)
@Composable
internal fun BannerPreviewLight() = BrandPreviewSurface(dark = false) { BannerPreviewContent() }

@Preview(name = "Banner — oscuro", showBackground = true, widthDp = 420, heightDp = 740)
@Composable
internal fun BannerPreviewDark() = BrandPreviewSurface(dark = true) { BannerPreviewContent() }
