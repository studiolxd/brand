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
    private fun variable(
        resId: Int,
        weights: IntRange,
        style: FontStyle = FontStyle.Normal,
        vararg extra: FontVariation.Setting,
    ): List<Font> =
        weights.step(100).map { weight ->
            Font(
                resId = resId,
                weight = FontWeight(weight),
                style = style,
                // `Settings` ya fija el eje `wght` a partir del peso; `extra` añade otros ejes (el `opsz` de la sans).
                variationSettings = FontVariation.Settings(FontWeight(weight), style, *extra),
            )
        }

    private val opticalCache = java.util.concurrent.ConcurrentHashMap<Int, FontFamily>()

    /**
     * La familia sans con el eje de tamaño óptico (`opsz`) a [size] (en px de la web: el valor del token, sin escala de
     * fuente), como hace el navegador con `font-optical-sizing: auto`. Google Sans Flex trae el eje (6–144, por defecto
     * 18): sin fijarlo, un título de 40 px sale con las formas de un texto de 18 y más estrecho que en la web.
     */
    fun sansAt(size: androidx.compose.ui.unit.TextUnit): FontFamily {
        val opsz = size.value.coerceIn(6f, 144f)
        // Una familia por décima de tamaño: los tamaños de la marca son enteros, así que son pocas.
        return opticalCache.getOrPut((opsz * 10).toInt()) {
            FontFamily(variable(R.font.google_sans_flex, 100..900, FontStyle.Normal, FontVariation.Setting("opsz", opsz)))
        }
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
