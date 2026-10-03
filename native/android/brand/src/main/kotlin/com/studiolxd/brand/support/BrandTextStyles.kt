package com.studiolxd.brand.support

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.LineHeightStyle
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.em
import com.studiolxd.brand.typography.BrandFontFamily

/**
 * Un estilo de texto de la marca con el **interlineado de CSS**: `line-height: 1.5` es la caja de línea entera
 * (24 sp a 16 sp), centrando el texto en ella (sin recortar arriba ni abajo), como en la web. El tamaño y el
 * interlineado crecen juntos con la escala de fuente (`sp`).
 *
 * La familia por defecto es la sans con el eje de tamaño óptico a [size] ([BrandFontFamily.sansAt]).
 *
 * @param lineHeight múltiplo del tamaño (`line-height.*`).
 * @param letterSpacing fracción del tamaño (em, `letter-spacing.*`).
 */
fun brandTextStyle(
    size: TextUnit,
    weight: FontWeight,
    lineHeight: Float,
    letterSpacing: Float = 0f,
    family: FontFamily = BrandFontFamily.sansAt(size),
    color: Color = Color.Unspecified,
): TextStyle = TextStyle(
    color = color,
    fontSize = size,
    fontWeight = weight,
    fontFamily = family,
    lineHeight = size * lineHeight,
    letterSpacing = letterSpacing.em,
    lineHeightStyle = LineHeightStyle(LineHeightStyle.Alignment.Center, LineHeightStyle.Trim.None),
)
