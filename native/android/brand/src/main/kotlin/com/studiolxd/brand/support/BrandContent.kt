package com.studiolxd.brand.support

import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.ReadOnlyComposable
import androidx.compose.runtime.compositionLocalOf
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.unit.TextUnit
import com.studiolxd.brand.BrandTheme
import com.studiolxd.brand.tokens.BrandFontSize
import com.studiolxd.brand.typography.BrandTypography

/**
 * El color de «primer plano» que heredan los iconos y el texto de dentro de un control (`currentColor` en la web,
 * `foregroundStyle` en SwiftUI). `Unspecified`: la tinta del esquema (`BrandTheme.colors.text`).
 */
val LocalBrandContentColor = compositionLocalOf { Color.Unspecified }

/**
 * La tipografía que heredan los textos de la marca que van dentro de un control (`BrandText`, `BrandParagraph`…)
 * cuando no declaran la suya. Por defecto, el cuerpo de texto ([BrandTypography.body]).
 */
val LocalBrandTextStyle = compositionLocalOf { BrandTypography.body }

/** El tamaño de letra que mide un icono `size: Text` (`1em`). Los controles lo fijan a su tipografía. */
val LocalBrandIconTextSize = compositionLocalOf<TextUnit> { BrandFontSize.s2 }

/** El color de primer plano vigente: el heredado o, sin herencia, la tinta del esquema. */
@Composable
@ReadOnlyComposable
fun brandContentColor(): Color = LocalBrandContentColor.current.takeIf { it != Color.Unspecified } ?: BrandTheme.colors.text

/**
 * Fija color, tipografía y tamaño de icono por defecto del contenido: lo que hace un botón con su etiqueta. La tipografía
 * se entrega ya con la caja de línea de CSS ([brandCssLineBox]), así que un `BasicText(style = LocalBrandTextStyle.current)`
 * del contenido mide lo que en la web aunque no pase por los textos de la marca.
 */
@Composable
fun ProvideBrandContent(
    color: Color,
    textStyle: TextStyle,
    content: @Composable () -> Unit,
) {
    CompositionLocalProvider(
        LocalBrandContentColor provides color,
        LocalBrandTextStyle provides textStyle.brandCssLineBox(),
        LocalBrandIconTextSize provides textStyle.fontSize,
        content = content,
    )
}
