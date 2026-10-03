package com.studiolxd.brand.components.text

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.runtime.Composable
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.withStyle
import androidx.compose.ui.tooling.preview.Preview
import com.studiolxd.brand.support.BrandPreviewSurface
import com.studiolxd.brand.tokens.BrandSpacing

@Composable
internal fun TextPreviewContent() {
    Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s3)) {
        HeadingLevel.entries.forEach { BrandHeading("Encabezado ${it.value}", level = it) }
        BrandHeading("Un h2 con tamaño de h5", level = HeadingLevel.H2, size = HeadingSize.S4)
        BrandParagraph("Párrafo de tamaño normal con texto de ejemplo.")
        BrandParagraph("Párrafo pequeño para notas.", size = ParagraphSize.Small)
        BrandParagraph("Párrafo grande para entradillas.", size = ParagraphSize.Large)
        val destructive = brandSpanStyle(TextElement.Strong, TextTone.Destructive)
        val muted = brandSpanStyle(TextElement.Em, TextTone.Muted)
        val success = brandSpanStyle(TextElement.Span, TextTone.Success)
        BrandParagraph(
            buildAnnotatedString {
                append("Esta acción ")
                withStyle(destructive) { append("borra") }
                append(" el curso. ")
                withStyle(muted) { append("Aclaración. ") }
                withStyle(success) { append("Guardado.") }
            },
        )
        TextElement.entries.forEach { element ->
            TextTone.entries.forEach { tone -> BrandText("${element.value} ${tone.value}", element = element, tone = tone) }
        }
    }
}

@Preview(name = "Texto — claro", showBackground = true, widthDp = 400)
@Composable
internal fun TextPreviewLight() = BrandPreviewSurface(dark = false) { TextPreviewContent() }

@Preview(name = "Texto — oscuro", showBackground = true, widthDp = 400)
@Composable
internal fun TextPreviewDark() = BrandPreviewSurface(dark = true) { TextPreviewContent() }
