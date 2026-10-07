package com.studiolxd.brand.components.field

import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.Easing
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.runtime.Composable
import androidx.compose.runtime.Immutable
import androidx.compose.runtime.compositionLocalOf
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.drawWithContent
import androidx.compose.ui.geometry.CornerRadius
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.semantics.LiveRegionMode
import androidx.compose.ui.semantics.clearAndSetSemantics
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.error
import androidx.compose.ui.semantics.liveRegion
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.semantics.stateDescription
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.dp
import com.studiolxd.brand.support.BrandBasicText
import com.studiolxd.brand.support.BrandControlSize
import com.studiolxd.brand.support.brandBaseTextStyle
import com.studiolxd.brand.support.brandTransition
import com.studiolxd.brand.tokens.BrandFormTokens
import com.studiolxd.brand.tokens.BrandLabelTokens

/**
 * Fuerza el aspecto de foco en los controles de este árbol. Solo para capturas y vistas previas: un campo con foco
 * de verdad lo pide a un teclado o a un toque, que layoutlib no tiene. Interno.
 */
internal val LocalBrandForcedFocus = compositionLocalOf { false }

/** El texto de ayuda de un campo: lo que difiere de un campo a otro es solo el grupo de tokens del que sale. */
@Immutable
internal class FieldHelperStyle(
    val fontSize: TextUnit,
    val fontWeight: FontWeight,
    val lineHeight: Float,
    val color: Color,
)

/** El tamaño de letra de la etiqueta de un campo a la talla dada (`label.*`). */
internal fun fieldLabelSize(size: BrandControlSize): TextUnit = when (size) {
    BrandControlSize.Sm -> BrandLabelTokens.smFontSize
    BrandControlSize.Md -> BrandLabelTokens.fontSize
    BrandControlSize.Lg -> BrandLabelTokens.lgFontSize
}

/**
 * Lo que comparten los campos de formulario (`InputField`, `NumberInputField`, `SelectField`): la etiqueta, el
 * control, el mensaje de error y la ayuda, apilados con el `gap` del campo. Interno: cada campo lo usa con los
 * tokens de su propio grupo (equivale a `BrandFieldLayout` de SwiftUI).
 *
 * La etiqueta y los dos mensajes **no son nodos de accesibilidad propios**: cuelgan del control
 * ([brandFieldSemantics]: nombre, `error()` y pista), así TalkBack no los lee dos veces. Con [labelHidden] la
 * etiqueta no se pinta pero sigue nombrando el control (`VisuallyHidden`).
 */
@Composable
internal fun BrandFieldLayout(
    label: String,
    labelHidden: Boolean,
    size: BrandControlSize,
    gap: Dp,
    errorMessage: String?,
    helperText: String?,
    helper: FieldHelperStyle,
    modifier: Modifier = Modifier,
    control: @Composable () -> Unit,
) {
    Column(modifier, verticalArrangement = Arrangement.spacedBy(gap)) {
        if (!labelHidden) {
            BrandBasicText(
                label,
                modifier = Modifier.clearAndSetSemantics { },
                style = brandBaseTextStyle(
                    fieldLabelSize(size), BrandLabelTokens.fontWeight, BrandLabelTokens.lineHeight, BrandLabelTokens.letterSpacing,
                    color = BrandLabelTokens.color.current,
                ),
            )
        }
        control()
        if (errorMessage != null) {
            BrandBasicText(
                errorMessage,
                modifier = Modifier.clearAndSetSemantics { },
                style = brandBaseTextStyle(
                    BrandFormTokens.errorFontSize, BrandFormTokens.errorFontWeight, BrandFormTokens.errorLineHeight,
                    color = BrandFormTokens.errorColor.current,
                ),
            )
        }
        if (helperText != null) {
            BrandBasicText(
                helperText,
                modifier = Modifier.clearAndSetSemantics { },
                style = brandBaseTextStyle(helper.fontSize, helper.fontWeight, helper.lineHeight, color = helper.color),
            )
        }
    }
}

/**
 * La semántica del control de un campo para TalkBack: el nombre (la etiqueta), el estado de error con su mensaje
 * (`error()`, que TalkBack lee como «error: …») y, como descripción de estado, la ayuda (`aria-describedby` en React).
 *
 * @param invalidMessage lo que dice `error()` cuando el campo está en error sin mensaje.
 */
internal fun Modifier.brandFieldSemantics(
    label: String,
    hasError: Boolean,
    errorMessage: String?,
    helperText: String?,
    invalidMessage: String,
): Modifier = semantics {
    contentDescription = label
    if (hasError) error(errorMessage ?: invalidMessage)
    if (helperText != null) stateDescription = helperText
}

/** Un mensaje de error que se **anuncia** al aparecer (`role="alert"`): región viva asertiva. */
internal fun Modifier.brandAlert(): Modifier = semantics { liveRegion = LiveRegionMode.Assertive }

/** Un color que se anima hasta [target] con la transición del campo (instantáneo con «quitar animaciones»). */
@Composable
internal fun animatedFieldColor(target: Color, durationMillis: Int, easing: Easing, reduceMotion: Boolean, label: String): Color {
    val color by animateColorAsState(target, brandTransition(durationMillis, easing, reduceMotion), label = label)
    return color
}

/**
 * El cuadro de un campo de texto: fondo, borde y, con foco, el anillo **interior** de `focus-ring-*`
 * (`box-shadow: inset 0 0 0 (ancho + desfase) anillo`: ocupa ese grosor por dentro del borde).
 */
internal fun Modifier.brandFieldBox(
    radius: Dp,
    borderWidth: Dp,
    background: Color,
    border: Color,
    ringWidth: Dp,
    ringInsetOffset: Dp,
    ringColor: Color,
    focused: Boolean,
): Modifier {
    val shape = if (radius > 0.dp) RoundedCornerShape(radius) else RectangleShape
    return this
        .background(background, shape)
        .border(borderWidth, border, shape)
        .then(if (!focused) Modifier else Modifier.drawWithContent {
            drawContent()
            val inset = borderWidth.toPx()
            val stroke = (ringWidth + ringInsetOffset).toPx()
            val half = inset + stroke / 2
            val corner = (radius.toPx() - half).coerceAtLeast(0f)
            drawRoundRect(
                color = ringColor,
                topLeft = Offset(half, half),
                size = Size(size.width - 2 * half, size.height - 2 * half),
                cornerRadius = CornerRadius(corner),
                style = Stroke(stroke),
            )
        })
}
