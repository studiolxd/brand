package com.studiolxd.brand.components.banner

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.text.BasicText
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.semantics.LiveRegionMode
import androidx.compose.ui.semantics.liveRegion
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.Dp
import com.studiolxd.brand.BrandTheme
import com.studiolxd.brand.components.closebutton.BrandCloseButtonInk
import com.studiolxd.brand.support.BrandBasicText
import com.studiolxd.brand.support.BrandControlSize
import com.studiolxd.brand.support.BrandStackBreakpoint
import com.studiolxd.brand.support.BrandStretchColumn
import com.studiolxd.brand.support.ProvideBrandContent
import com.studiolxd.brand.support.brandTextStyle
import com.studiolxd.brand.tokens.BrandBannerTokens as T
import com.studiolxd.brand.tokens.BrandTextTokens

/** `Banner` `variant`: la intención de la barra. `info` (relleno prusia), `warning` (el amarillo de aviso) o `error`. */
enum class BannerVariant(val value: String) {
    Info("info"),
    Warning("warning"),
    Error("error"),
}

private class BannerColors(val background: Color, val ink: Color, val border: Color, val close: Color)

@Composable
private fun BannerVariant.colors(): BannerColors = when (this) {
    BannerVariant.Info -> BannerColors(T.infoBg.current, T.infoColor.current, T.infoBorderColor.current, T.infoColor.current)
    BannerVariant.Warning -> BannerColors(T.warningBg.current, T.warningColor.current, T.warningBorderColor.current, T.warningCloseColor.current)
    BannerVariant.Error -> BannerColors(T.errorBg.current, T.errorColor.current, T.errorBorderColor.current, T.errorColor.current)
}

/**
 * La cara con la que lee el contenido de la barra. Los rellenos oscuros y universales (`info`, `error`) leen en la cara
 * oscura —así un [com.studiolxd.brand.components.button.BrandButton] de las acciones sale en blanco sobre el prusia o el
 * rojo sin configurarlo—; el aviso, amarillo, lee SIEMPRE en la clara (la `.surface-light` de React), también con la
 * página oscura. Interno y comprobable.
 */
internal fun BannerVariant.interiorIsDark(): Boolean = this != BannerVariant.Warning

/**
 * Una barra de aviso de franja completa (`Banner` de React): un mensaje persistente que acompaña a toda la sesión —el
 * caso de referencia, «estás viendo la aplicación como alguien» con el botón de dejar de suplantar—. Va **fuera** del
 * contenido, no en el flujo, y **no fija su posición**: la app la coloca (arriba de la pantalla, sobre la barra de
 * navegación…). Tampoco se oculta sola: [onDismiss] avisa y la app decide si sigue en pantalla.
 *
 * ```kotlin
 * BrandBanner(
 *     variant = BannerVariant.Error,
 *     actions = { BrandButton("Dejar de suplantar", onClick = { stop() }, variant = ButtonVariant.Outline, size = BrandControlSize.Sm) },
 *     onDismiss = { hidden = true },
 * ) { BasicText("Estás viendo la aplicación como ana.perez@studiolxd.com.", style = LocalBrandTextStyle.current) }
 * ```
 *
 * Los rellenos son universales (iguales en claro y oscuro). El contenido —el mensaje, los botones, el aspa— lee con la
 * tinta del relleno, no con la del tema: `info` y `error`, en la cara oscura; `warning`, en la clara con el aspa en
 * `warning-close-color`. Filetes arriba y abajo. Por debajo de 480 dp de ancho el mensaje y las acciones **apilan** (las
 * acciones, a todo el ancho) y el aspa queda en la esquina superior derecha.
 *
 * **TalkBack**: `error` y `warning` son una región viva **asertiva** (interrumpen); `info`, **cortés**.
 *
 * @param actions ranura de acciones: normalmente un [com.studiolxd.brand.components.button.BrandButton] `sm`.
 * @param onDismiss si existe, la barra pinta el aspa y la llama al pulsarla.
 * @param dismissLabel nombre accesible del aspa. Castellano por defecto («Descartar»); se traduce pasando el texto.
 * @param content el mensaje: una frase, no un bloque. Hereda la tinta y el cuerpo de la barra.
 */
@Composable
fun BrandBanner(
    modifier: Modifier = Modifier,
    variant: BannerVariant = BannerVariant.Info,
    actions: (@Composable () -> Unit)? = null,
    onDismiss: (() -> Unit)? = null,
    dismissLabel: String = "Descartar",
    content: @Composable () -> Unit,
) = BrandBannerImpl(modifier, variant, actions, onDismiss, dismissLabel, BrandStackBreakpoint, content)

/** La barra en sí. [stackBelow] es el ancho por debajo del cual apila: lo fijan las capturas de las parejas (480 dp). Interno. */
@Composable
internal fun BrandBannerImpl(
    modifier: Modifier,
    variant: BannerVariant,
    actions: (@Composable () -> Unit)?,
    onDismiss: (() -> Unit)?,
    dismissLabel: String,
    stackBelow: Dp,
    content: @Composable () -> Unit,
) {
    val colors = variant.colors()
    val live = if (variant == BannerVariant.Info) LiveRegionMode.Polite else LiveRegionMode.Assertive
    BrandTheme(darkTheme = variant.interiorIsDark()) {
        BoxWithConstraints(
            modifier
                .fillMaxWidth()
                .semantics { liveRegion = live }
                .drawBehind {
                    val border = T.borderWidth.toPx()
                    drawRect(colors.background)
                    drawRect(colors.border, Offset.Zero, Size(size.width, border))
                    drawRect(colors.border, Offset(0f, size.height - border), Size(size.width, border))
                },
        ) {
            val stacked = maxWidth < stackBelow
            val endPadding = if (onDismiss != null) T.closeInset * 2 + T.closeSize else T.paddingInline
            ProvideBrandContent(
                colors.ink,
                brandTextStyle(T.fontSize, BrandTextTokens.fontWeight, T.lineHeight, BrandTextTokens.letterSpacing, color = colors.ink),
            ) {
                // La caja de borde de CSS (`box-sizing: border-box`): `drawBehind` pinta los filetes sin ocupar sitio, así
                // que el relleno lleva además su grosor arriba y abajo (una línea: 1 + 12 + 24 + 12 + 1 = 50, como la web),
                // y el aspa se coloca desde el borde interior (`close-inset` + el filete: 9 del canto).
                Box(
                    Modifier
                        .fillMaxWidth()
                        .padding(top = T.paddingBlock + T.borderWidth, bottom = T.paddingBlock + T.borderWidth, start = T.paddingInline, end = endPadding),
                ) {
                    if (stacked || actions == null) {
                        Column(Modifier.fillMaxWidth(), verticalArrangement = Arrangement.spacedBy(T.gap)) {
                            Box(Modifier.fillMaxWidth()) { content() }
                            if (actions != null) BrandStretchColumn(T.gap) { actions() }
                        }
                    } else {
                        Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(T.gap), verticalAlignment = Alignment.CenterVertically) {
                            Box(Modifier.weight(1f)) { content() }
                            Row(horizontalArrangement = Arrangement.spacedBy(T.gap), verticalAlignment = Alignment.CenterVertically) { actions() }
                        }
                    }
                }
                if (onDismiss != null) {
                    BrandCloseButtonInk(
                        onClick = onDismiss,
                        modifier = Modifier.align(Alignment.TopEnd).padding(top = T.closeInset + T.borderWidth, end = T.closeInset),
                        contentDescription = dismissLabel,
                        size = BrandControlSize.Sm,
                        interactionSource = null,
                        ink = colors.close,
                    )
                }
            }
        }
    }
}

/** Un [BrandBanner] cuyo mensaje es un texto. */
@Composable
fun BrandBanner(
    text: String,
    modifier: Modifier = Modifier,
    variant: BannerVariant = BannerVariant.Info,
    actions: (@Composable () -> Unit)? = null,
    onDismiss: (() -> Unit)? = null,
    dismissLabel: String = "Descartar",
) {
    BrandBanner(modifier, variant, actions, onDismiss, dismissLabel) {
        BrandBasicText(text, style = com.studiolxd.brand.support.LocalBrandTextStyle.current)
    }
}
