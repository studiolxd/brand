package com.studiolxd.brand

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.withStyle
import com.studiolxd.brand.components.text.BrandHeading
import com.studiolxd.brand.components.text.BrandParagraph
import com.studiolxd.brand.components.text.BrandText
import com.studiolxd.brand.components.text.HeadingLevel
import com.studiolxd.brand.components.text.HeadingSize
import com.studiolxd.brand.components.text.ParagraphSize
import com.studiolxd.brand.components.text.TextElement
import com.studiolxd.brand.components.text.TextTone
import com.studiolxd.brand.components.text.brandSpanStyle
import com.studiolxd.brand.tokens.BrandSpacing
import org.junit.Rule
import org.junit.Test

/** Capturas de `Heading`: los seis niveles y un nivel con el tamaño de otro paso. Claro y oscuro. */
class HeadingSnapshotTest {
    @get:Rule
    val paparazzi = brandPaparazzi(400, 440)

    @Test
    fun levels() = paparazzi.brandSnapshots {
        Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s3)) {
            HeadingLevel.entries.forEach { BrandHeading("Encabezado ${it.value}", level = it) }
            BrandHeading("Un h2 con tamaño de h4", level = HeadingLevel.H2, size = HeadingSize.S5)
        }
    }

    /** Un `h2` suelto, la pareja de `atoms-heading--default`. */
    @Test
    fun comparison() = paparazzi.brandSnapshots("compare") { BrandHeading("Encabezado de ejemplo", level = HeadingLevel.H1) }
}

/** Capturas de `Paragraph`: los tres tamaños y un párrafo con fragmentos marcados. */
class ParagraphSnapshotTest {
    @get:Rule
    val paparazzi = brandPaparazzi(400, 400)

    @Test
    fun sizes() = paparazzi.brandSnapshots {
        Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s3)) {
            BrandParagraph("Párrafo de tamaño normal con texto de ejemplo que ocupa más de una línea del lienzo.")
            BrandParagraph("Párrafo pequeño para notas y metadatos.", size = ParagraphSize.Small)
            BrandParagraph("Párrafo grande para entradillas.", size = ParagraphSize.Large)
        }
    }

    @Test
    fun comparison() = paparazzi.brandSnapshots("compare") {
        BrandParagraph("Revisa los datos antes de continuar. Podrás cambiarlos después desde tu perfil.")
    }
}

/** Capturas de `Text` en línea: elementos × tonos, y mezclados dentro de un párrafo. */
class TextSnapshotTest {
    @get:Rule
    val paparazzi = brandPaparazzi(400, 400)

    @Test
    fun elementsAndTones() = paparazzi.brandSnapshots {
        Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s2)) {
            TextElement.entries.forEach { element ->
                TextTone.entries.forEach { tone -> BrandText("${element.value} · ${tone.value}", element = element, tone = tone) }
            }
            val strong = brandSpanStyle(TextElement.Strong, TextTone.Destructive)
            val muted = brandSpanStyle(TextElement.Em, TextTone.Muted)
            BrandParagraph(
                buildAnnotatedString {
                    append("Esta acción ")
                    withStyle(strong) { append("borra") }
                    append(" el curso. ")
                    withStyle(muted) { append("Aclaración secundaria.") }
                },
            )
        }
    }

    @Test
    fun comparison() = paparazzi.brandSnapshots("compare") {
        val strong = brandSpanStyle(TextElement.Strong, TextTone.Destructive)
        BrandParagraph(buildAnnotatedString { append("Esta acción "); withStyle(strong) { append("borra") }; append(" el curso.") })
    }
}
