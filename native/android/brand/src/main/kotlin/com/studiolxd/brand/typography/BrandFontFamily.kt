package com.studiolxd.brand.typography

import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontVariation
import androidx.compose.ui.text.font.FontWeight
import com.studiolxd.brand.R

/**
 * Las familias tipográficas de la marca, como `FontFamily` de Compose (`font-family.sans|mono|serif`).
 *
 * Son fuentes VARIABLES: un único TTF por estilo y el eje `wght` fijado para cada peso, igual que en la web.
 * Los pesos disponibles son los del propio eje: sans 1–1000 (se exponen 100–900), mono 300–800 y serif 400–700.
 */
object BrandFontFamily {
    private fun variable(resId: Int, weights: IntRange, style: FontStyle = FontStyle.Normal): List<Font> =
        weights.step(100).map { weight ->
            Font(
                resId = resId,
                weight = FontWeight(weight),
                style = style,
                // `Settings` ya fija el eje `wght` a partir del peso.
                variationSettings = FontVariation.Settings(FontWeight(weight), style),
            )
        }

    /** Google Sans Flex: interfaz y texto (`font-family.sans`). */
    val sans: FontFamily = FontFamily(variable(R.font.google_sans_flex, 100..900))

    /** Google Sans Code: código y valores técnicos (`font-family.mono`). */
    val mono: FontFamily = FontFamily(
        variable(R.font.google_sans_code, 300..800) +
            variable(R.font.google_sans_code_italic, 300..800, FontStyle.Italic),
    )

    /** Libre Bodoni: excepción de producto para piezas editoriales (`font-family.serif`). */
    val serif: FontFamily = FontFamily(
        variable(R.font.libre_bodoni, 400..700) +
            variable(R.font.libre_bodoni_italic, 400..700, FontStyle.Italic),
    )
}
