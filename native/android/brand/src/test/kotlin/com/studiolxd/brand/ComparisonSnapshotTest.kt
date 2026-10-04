package com.studiolxd.brand

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.width
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.withStyle
import androidx.compose.ui.unit.dp
import com.studiolxd.brand.components.button.BrandButton
import com.studiolxd.brand.components.button.ButtonVariant
import com.studiolxd.brand.components.text.BrandHeading
import com.studiolxd.brand.components.text.BrandParagraph
import com.studiolxd.brand.components.text.HeadingLevel
import com.studiolxd.brand.components.text.HeadingSize
import com.studiolxd.brand.components.text.ParagraphSize
import com.studiolxd.brand.components.text.TextElement
import com.studiolxd.brand.components.text.TextTone
import com.studiolxd.brand.components.text.brandSpanStyle
import com.studiolxd.brand.tokens.BrandSpacing
import org.junit.Rule
import org.junit.Test

private const val LOREM =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna " +
        "aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."

/**
 * Las capturas de las parejas con Storybook (`native/android/Comparisons/`): los mismos casos y los mismos lienzos que
 * los de SwiftUI (`native/apple/Comparisons/`), para que React, iOS y Android se midan a la misma escala.
 */
class ComparisonSnapshotTest {
    @get:Rule
    val paparazzi = brandPaparazzi(160, 160)

    @Test
    fun button() {
        ButtonVariant.entries.forEach { variant ->
            paparazzi.brandComparison("button-${variant.value}", 160, if (variant == ButtonVariant.Text) 56 else 72) {
                BrandButton("Guardar", onClick = {}, variant = variant)
            }
        }
    }

    @Test
    fun heading() {
        paparazzi.brandComparison("heading-h1", 300, 76) { BrandHeading("Mi vivienda", level = HeadingLevel.H1) }
        paparazzi.brandComparison("heading-h4", 300, 63) { BrandHeading("Mi vivienda", level = HeadingLevel.H4) }
        paparazzi.brandComparison("heading-h2-size4", 300, 54) { BrandHeading("Mi vivienda", level = HeadingLevel.H2, size = HeadingSize.S4) }
    }

    @Test
    fun paragraph() {
        ParagraphSize.entries.forEach { size ->
            val height = when (size) {
                ParagraphSize.Small -> 147
                ParagraphSize.Large -> 214
                ParagraphSize.Default -> 176
            }
            paparazzi.brandComparison("paragraph-${size.value}", 320, height) { BrandParagraph(LOREM, Modifier.width(288.dp), size = size) }
        }
    }

    @Test
    fun inlineTones() {
        paparazzi.brandComparison("text-inline-tones", 480, 152) {
            val destructive = brandSpanStyle(TextElement.Strong, TextTone.Destructive)
            val success = brandSpanStyle(TextElement.Strong, TextTone.Success)
            val muted = brandSpanStyle(TextElement.Span, TextTone.Muted)
            Column(Modifier.width(448.dp), verticalArrangement = Arrangement.spacedBy(BrandSpacing.s5)) {
                BrandParagraph(buildAnnotatedString {
                    append("Al confirmar se "); withStyle(destructive) { append("borran") }; append(" las 42 respuestas ya enviadas.")
                })
                BrandParagraph(buildAnnotatedString {
                    append("La revisión terminó "); withStyle(success) { append("sin incidencias") }; append(".")
                })
                BrandParagraph(buildAnnotatedString {
                    append("Publicado el 12 de agosto "); withStyle(muted) { append("(hace tres semanas)") }; append(".")
                })
            }
        }
    }

    @Test
    fun strikethrough() {
        paparazzi.brandComparison("text-strikethrough", 480, 200) {
            Column(Modifier.width(448.dp), verticalArrangement = Arrangement.spacedBy(BrandSpacing.s5)) {
                fun frase(antes: String, estilo: androidx.compose.ui.text.SpanStyle, tachado: String, despues: String) =
                    buildAnnotatedString { append(antes); withStyle(estilo) { append(tachado) }; append(despues) }
                BrandParagraph(frase("En el carrito: ", brandSpanStyle(strikethrough = true), "Leche entera", "."))
                BrandParagraph(frase("Con intención: ", brandSpanStyle(tone = TextTone.Destructive, strikethrough = true), "cancelado", "."))
                BrandParagraph(frase("Precio: ", brandSpanStyle(TextElement.Del), "49 €", " 39 €."))
                BrandParagraph(frase("Ya no aplica: ", brandSpanStyle(TextElement.S), "envío gratis", "."))
            }
        }
    }
}
