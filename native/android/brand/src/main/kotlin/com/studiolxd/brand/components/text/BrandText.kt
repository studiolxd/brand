package com.studiolxd.brand.components.text

import androidx.compose.foundation.text.BasicText
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.semantics.heading
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.sp
import com.studiolxd.brand.support.LocalBrandTextStyle
import com.studiolxd.brand.support.brandContentColor
import com.studiolxd.brand.support.brandTextStyle
import com.studiolxd.brand.tokens.BrandTextInlineTokens
import com.studiolxd.brand.tokens.BrandTextTokens as T

// MARK: Heading

/** `Heading` `level`: el nivel semántico (h1–h6). Fija también el tamaño, salvo que `size` lo desacople. */
enum class HeadingLevel(val value: String) {
    H1("1"),
    H2("2"),
    H3("3"),
    H4("4"),
    H5("5"),
    H6("6"),
}

/** `Heading` `size`: un paso de la escala de títulos (`text.size.1`…`text.size.10`), independiente del nivel. */
enum class HeadingSize(val value: String) {
    S1("1"),
    S2("2"),
    S3("3"),
    S4("4"),
    S5("5"),
    S6("6"),
    S7("7"),
    S8("8"),
    S9("9"),
    S10("10"),
    ;

    /** El tamaño del paso (token `text.size.N`, en px de la web = sp aquí, para que crezca con la fuente del sistema). */
    internal val size: TextUnit
        get() = when (this) {
            S1 -> T.size1
            S2 -> T.size2
            S3 -> T.size3
            S4 -> T.size4
            S5 -> T.size5
            S6 -> T.size6
            S7 -> T.size7
            S8 -> T.size8
            S9 -> T.size9
            S10 -> T.size10
        }.value.sp
}

private val HeadingLevel.fontSize: TextUnit
    get() = when (this) {
        HeadingLevel.H1 -> T.h1FontSize
        HeadingLevel.H2 -> T.h2FontSize
        HeadingLevel.H3 -> T.h3FontSize
        HeadingLevel.H4 -> T.h4FontSize
        HeadingLevel.H5 -> T.h5FontSize
        HeadingLevel.H6 -> T.h6FontSize
    }

private val HeadingLevel.fontWeight
    get() = when (this) {
        HeadingLevel.H1 -> T.h1FontWeight
        HeadingLevel.H2 -> T.h2FontWeight
        HeadingLevel.H3 -> T.h3FontWeight
        HeadingLevel.H4 -> T.h4FontWeight
        HeadingLevel.H5 -> T.h5FontWeight
        HeadingLevel.H6 -> T.h6FontWeight
    }

private val HeadingLevel.lineHeight: Float
    get() = when (this) {
        HeadingLevel.H1 -> T.h1LineHeight
        HeadingLevel.H2 -> T.h2LineHeight
        HeadingLevel.H3 -> T.h3LineHeight
        HeadingLevel.H4 -> T.h4LineHeight
        HeadingLevel.H5 -> T.h5LineHeight
        HeadingLevel.H6 -> T.h6LineHeight
    }

private val HeadingLevel.letterSpacing: Float
    get() = when (this) {
        HeadingLevel.H1 -> T.h1LetterSpacing
        HeadingLevel.H2 -> T.h2LetterSpacing
        HeadingLevel.H3 -> T.h3LetterSpacing
        HeadingLevel.H4 -> T.h4LetterSpacing
        HeadingLevel.H5 -> T.h5LetterSpacing
        HeadingLevel.H6 -> T.h6LetterSpacing
    }

private val HeadingLevel.color
    @Composable get() = when (this) {
        HeadingLevel.H1 -> T.h1Color
        HeadingLevel.H2 -> T.h2Color
        HeadingLevel.H3 -> T.h3Color
        HeadingLevel.H4 -> T.h4Color
        HeadingLevel.H5 -> T.h5Color
        HeadingLevel.H6 -> T.h6Color
    }.current

/**
 * Un encabezado de la marca. El nivel dice qué es en el esquema del documento (TalkBack lo anuncia como
 * encabezado, con `heading()`; Android no distingue niveles); el tamaño, por defecto, sale del nivel. El peso
 * es siempre el de énfasis del sistema.
 *
 * ```kotlin
 * BrandHeading("Tus viviendas")                                             // h2
 * BrandHeading("Resumen", level = HeadingLevel.H2, size = HeadingSize.S5)   // un h2 con el tamaño de un h4
 * ```
 */
@Composable
fun BrandHeading(
    text: String,
    modifier: Modifier = Modifier,
    level: HeadingLevel = HeadingLevel.H2,
    size: HeadingSize? = null,
) {
    val points = size?.size ?: level.fontSize
    BasicText(
        text = text,
        modifier = modifier.semantics { heading() },
        style = brandTextStyle(points, level.fontWeight, level.lineHeight, level.letterSpacing, color = level.color),
    )
}

// MARK: Paragraph

/** `Paragraph` `size`: `small` para notas y metadatos, `large` para entradillas. */
enum class ParagraphSize(val value: String) {
    Small("small"),
    Default("default"),
    Large("large"),
}

@Composable
private fun paragraphStyle(size: ParagraphSize) = when (size) {
    ParagraphSize.Small -> brandTextStyle(T.paragraphSmallFontSize, T.fontWeight, T.paragraphSmallLineHeight, T.letterSpacing, color = T.color.current)
    ParagraphSize.Default -> brandTextStyle(T.fontSize, T.fontWeight, T.lineHeight, T.letterSpacing, color = T.color.current)
    ParagraphSize.Large -> brandTextStyle(T.paragraphLargeFontSize, T.fontWeight, T.paragraphLargeLineHeight, T.letterSpacing, color = T.color.current)
}

/**
 * Un párrafo de la marca: el cuerpo del sistema (16 sp) y, en `Small` y `Large`, un peldaño por debajo y por encima.
 *
 * ```kotlin
 * BrandParagraph("Revisa los datos antes de continuar.")
 * BrandParagraph("Última actualización: hoy", size = ParagraphSize.Small)
 * ```
 */
@Composable
fun BrandParagraph(
    text: String,
    modifier: Modifier = Modifier,
    size: ParagraphSize = ParagraphSize.Default,
) {
    BasicText(text, modifier, style = paragraphStyle(size))
}

/**
 * Un párrafo con fragmentos marcados: el contenido es un `AnnotatedString` hecho con [brandSpanStyle].
 *
 * ```kotlin
 * val s = brandSpanStyle(TextElement.Strong, TextTone.Destructive)
 * BrandParagraph(buildAnnotatedString {
 *     append("Al confirmar se "); withStyle(s) { append("borran") }; append(" las respuestas.")
 * })
 * ```
 */
@Composable
fun BrandParagraph(
    text: AnnotatedString,
    modifier: Modifier = Modifier,
    size: ParagraphSize = ParagraphSize.Default,
) {
    BasicText(text, modifier, style = paragraphStyle(size))
}

// MARK: Text (en línea)

/**
 * `Text` `as`: qué se pinta, que es lo mismo que decir qué significa. `span` no añade significado, `em` marca
 * énfasis de lectura (cursiva) y `strong` marca importancia (el peso de énfasis del sistema).
 */
enum class TextElement(val value: String) {
    Span("span"),
    Em("em"),
    Strong("strong"),
}

/**
 * `Text` `tone`: la intención del fragmento. `destructive` dice que algo se pierde, `success` que salió bien y
 * `muted` marca una aclaración secundaria. Es color de texto, nunca un relleno.
 */
enum class TextTone(val value: String) {
    Default("default"),
    Muted("muted"),
    Destructive("destructive"),
    Success("success"),
}

/**
 * El estilo de un fragmento en línea: se usa con `withStyle(...)` dentro de un `AnnotatedString`, así que el
 * fragmento hereda la fuente y el tamaño del texto que lo rodea (no los fija).
 */
@Composable
fun brandSpanStyle(element: TextElement = TextElement.Span, tone: TextTone = TextTone.Default): SpanStyle {
    val color = when (tone) {
        TextTone.Default -> Color.Unspecified
        TextTone.Muted -> BrandTextInlineTokens.mutedColor.current
        TextTone.Destructive -> BrandTextInlineTokens.destructiveColor.current
        TextTone.Success -> BrandTextInlineTokens.successColor.current
    }
    return when (element) {
        TextElement.Span -> SpanStyle(color = color)
        TextElement.Em -> SpanStyle(color = color, fontStyle = FontStyle.Italic)
        TextElement.Strong -> SpanStyle(color = color, fontWeight = BrandTextInlineTokens.emphasisFontWeight)
    }
}

/**
 * Un fragmento de texto en línea (`Text` de React). Sin estilo propio, hereda la tipografía y el color del control
 * o del párrafo en que va ([LocalBrandTextStyle], [com.studiolxd.brand.support.LocalBrandContentColor]); suelto, es
 * el cuerpo de texto. Para mezclarlo dentro de una frase usa [brandSpanStyle].
 *
 * `element` es el `as` de React (`as` es una palabra reservada de Kotlin).
 *
 * ```kotlin
 * BrandText("borra", element = TextElement.Strong, tone = TextTone.Destructive)
 * ```
 */
@Composable
fun BrandText(
    text: String,
    modifier: Modifier = Modifier,
    element: TextElement = TextElement.Span,
    tone: TextTone = TextTone.Default,
) {
    val span = brandSpanStyle(element, tone)
    val base = LocalBrandTextStyle.current
    val color = if (span.color != Color.Unspecified) span.color else if (base.color != Color.Unspecified) base.color else brandContentColor()
    BasicText(text, modifier, style = base.merge(span).copy(color = color))
}
