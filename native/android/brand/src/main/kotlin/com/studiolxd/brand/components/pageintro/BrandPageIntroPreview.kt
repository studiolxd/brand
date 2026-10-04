package com.studiolxd.brand.components.pageintro

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.runtime.Composable
import androidx.compose.ui.tooling.preview.Preview
import com.studiolxd.brand.components.button.BrandButton
import com.studiolxd.brand.components.button.ButtonVariant
import com.studiolxd.brand.components.tag.BrandTag
import com.studiolxd.brand.components.tag.TagVariant
import com.studiolxd.brand.components.text.BrandParagraph
import com.studiolxd.brand.components.text.HeadingLevel
import com.studiolxd.brand.components.text.HeadingSize
import com.studiolxd.brand.components.text.ParagraphSize
import com.studiolxd.brand.support.BrandPreviewSurface
import com.studiolxd.brand.tokens.BrandSpacing

/** Todas las variantes de `PageIntro`: con frase, con eyebrow y más texto, con una y con dos acciones, y como cabecera de sección. */
@Composable
internal fun PageIntroPreviewContent() {
    Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s7)) {
        BrandPageIntro("¿Olvidaste tu contraseña?", description = "Ingresa tu correo y te enviaremos un enlace para restablecerla.")
        BrandPageIntro(
            "Automatizaciones",
            eyebrow = { BrandTag("Beta", variant = TagVariant.Info) },
            description = "Reglas que se disparan solas cuando algo cambia en la organización.",
            content = { BrandParagraph("Disponible solo para el plan Studio.", size = ParagraphSize.Default) },
        )
        BrandPageIntro("Miembros", actions = { BrandButton("Invitar miembro", onClick = {}) })
        BrandPageIntro(
            "Webhooks",
            actions = {
                BrandButton("Crear webhook", onClick = {})
                BrandButton("Ver registro", onClick = {}, variant = ButtonVariant.Outline)
            },
        )
        BrandPageIntro(
            "Sesiones activas", level = HeadingLevel.H2, size = HeadingSize.S5,
            description = "Los dispositivos desde los que has entrado en los últimos 30 días.",
            actions = { BrandButton("Cerrar todas", onClick = {}, variant = ButtonVariant.Outline) },
        )
    }
}

@Preview(name = "PageIntro — claro", showBackground = true, widthDp = 420, heightDp = 1300)
@Composable
internal fun PageIntroPreviewLight() = BrandPreviewSurface(dark = false) { PageIntroPreviewContent() }

@Preview(name = "PageIntro — oscuro", showBackground = true, widthDp = 420, heightDp = 1300)
@Composable
internal fun PageIntroPreviewDark() = BrandPreviewSurface(dark = true) { PageIntroPreviewContent() }
