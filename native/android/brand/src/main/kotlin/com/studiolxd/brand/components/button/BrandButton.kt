package com.studiolxd.brand.components.button

import androidx.compose.animation.animateColorAsState
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.RowScope
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicText
import androidx.compose.runtime.Composable
import androidx.compose.runtime.Immutable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.dp
import com.studiolxd.brand.icon.BrandIcon
import com.studiolxd.brand.icon.BrandIconName
import com.studiolxd.brand.icon.BrandIconSize
import com.studiolxd.brand.support.BrandControlSize
import com.studiolxd.brand.support.LocalBrandTextStyle
import com.studiolxd.brand.support.BrandInteractionState
import com.studiolxd.brand.support.ProvideBrandContent
import com.studiolxd.brand.support.brandFocusRing
import com.studiolxd.brand.support.brandTextStyle
import com.studiolxd.brand.support.brandTransition
import com.studiolxd.brand.support.collectBrandInteractionState
import com.studiolxd.brand.support.rememberReduceMotion
import com.studiolxd.brand.support.resolve
import com.studiolxd.brand.support.scaledByFontScale
import com.studiolxd.brand.tokens.BrandButtonTokens as T
import com.studiolxd.brand.tokens.BrandSpacing

/** `Button` `variant`. Mismos casos y mismos valores que React. */
enum class ButtonVariant(val value: String) {
    Primary("primary"),
    Outline("outline"),
    Ghost("ghost"),
    Text("text"),
}

/** `Button` `tone`: solo con `variant = Text`, `Ink` lo pinta con la tinta de la superficie en vez del acento. */
enum class ButtonTone(val value: String) {
    Accent("accent"),
    Ink("ink"),
}

/** `Button` `size`: la talla de control compartida (`sm` 32 dp, `md` 40 dp, `lg` 48 dp). */
typealias ButtonSize = BrandControlSize

/** Los colores de un botón en un estado. */
@Immutable
private class ButtonColors(
    val background: Color,
    val foreground: Color,
    val border: Color,
    /** Grosor de la línea de `variant = Text` (0 = sin línea). */
    val underline: Dp = 0.dp,
)

@Composable
private fun buttonColors(variant: ButtonVariant, tone: ButtonTone, destructive: Boolean, enabled: Boolean, pressed: Boolean, hover: Boolean): ButtonColors {
    if (!enabled) {
        return when (variant) {
            ButtonVariant.Primary -> ButtonColors(T.primaryDisabledBg.current, T.primaryDisabledColor.current, T.primaryDisabledBorder.current)
            ButtonVariant.Outline -> ButtonColors(T.outlineBg.current, T.outlineDisabledColor.current, T.outlineDisabledBorder.current)
            ButtonVariant.Ghost -> ButtonColors(T.ghostBg.current, T.ghostDisabledColor.current, T.ghostBorder.current)
            ButtonVariant.Text -> ButtonColors(T.textBg.current, T.textDisabledColor.current, T.textBorder.current, T.textUnderlineWidth.current)
        }
    }
    return when (variant) {
        ButtonVariant.Primary -> when {
            pressed -> ButtonColors(T.primaryActiveBg.current, T.primaryActiveColor.current, T.primaryActiveBorder.current)
            hover -> ButtonColors(T.primaryHoverBg.current, T.primaryHoverColor.current, T.primaryHoverBorder.current)
            else -> ButtonColors(T.primaryBg.current, T.primaryColor.current, T.primaryBorder.current)
        }
        ButtonVariant.Outline -> if (destructive) {
            when {
                pressed -> ButtonColors(T.destructiveActiveBg.current, T.destructiveActiveColor.current, T.destructiveActiveBorder.current)
                hover -> ButtonColors(T.destructiveHoverBg.current, T.destructiveHoverColor.current, T.destructiveHoverBorder.current)
                else -> ButtonColors(T.outlineBg.current, T.destructiveColor.current, T.destructiveBorder.current)
            }
        } else {
            when {
                pressed -> ButtonColors(T.outlineActiveBg.current, T.outlineActiveColor.current, T.outlineActiveBorder.current)
                hover -> ButtonColors(T.outlineHoverBg.current, T.outlineHoverColor.current, T.outlineHoverBorder.current)
                else -> ButtonColors(T.outlineBg.current, T.outlineColor.current, T.outlineBorder.current)
            }
        }
        ButtonVariant.Ghost -> when {
            pressed -> ButtonColors(T.ghostActiveBg.current, T.ghostActiveColor.current, T.ghostActiveBorder.current)
            hover -> ButtonColors(T.ghostHoverBg.current, T.ghostHoverColor.current, T.ghostHoverBorder.current)
            else -> ButtonColors(T.ghostBg.current, T.ghostColor.current, T.ghostBorder.current)
        }
        ButtonVariant.Text -> {
            val ink = tone == ButtonTone.Ink && !destructive
            val active = pressed || hover
            val foreground = when {
                destructive -> T.destructiveColor.current
                ink -> T.textInkColor.current
                pressed -> T.textActiveColor.current
                hover -> T.textHoverColor.current
                else -> T.textColor.current
            }
            val background = when {
                pressed -> T.textActiveBg.current
                hover -> T.textHoverBg.current
                else -> T.textBg.current
            }
            val border = when {
                pressed -> T.textActiveBorder.current
                hover -> T.textHoverBorder.current
                else -> T.textBorder.current
            }
            val underline = if (ink) {
                if (active) T.textInkHoverUnderlineWidth else T.textInkUnderlineWidth
            } else {
                if (active) T.textHoverUnderlineWidth.current else T.textUnderlineWidth.current
            }
            ButtonColors(background, foreground, border, underline)
        }
    }
}

/**
 * Un botón de la marca, con las mismas props que el de React: `variant`, `tone`, `size`, `destructive`, `block` e
 * `iconOnly`. [content] es la etiqueta; dentro, [com.studiolxd.brand.components.text.BrandText] y
 * [com.studiolxd.brand.icon.BrandIcon] (`size = Text`) heredan su tipografía y su color.
 *
 * Cubre los estados que tiene React: reposo, *hover* (puntero), pulsado (`active-*`), deshabilitado ([enabled]) y
 * foco de teclado o DPAD (el anillo de `focus-ring-*`). La altura y el tamaño de letra crecen con la escala de
 * fuente del sistema; la zona táctil llega a 48 dp aunque el botón mida 32 (`BrandTheme` la garantiza, sin cambiar
 * la maqueta). Las transiciones respetan «quitar animaciones».
 *
 * ```kotlin
 * BrandButton(onClick = { save() }) { BrandText("Guardar") }
 * BrandButton("Eliminar", onClick = { delete() }, variant = ButtonVariant.Outline, destructive = true)
 * BrandButton(BrandIconName.Close, contentDescription = "Cerrar", onClick = { dismiss() }, variant = ButtonVariant.Ghost)
 * ```
 *
 * @param size sin valor toma la del entorno ([com.studiolxd.brand.support.ProvideBrandControlSize]) y, si tampoco hay, `md`.
 * @param destructive la intención destructiva (rojo); solo la llevan `Outline` y `Text`, como en React.
 * @param block ocupa el ancho del contenedor.
 * @param iconOnly botón cuadrado de solo icono: el lado es la altura de la talla. Exige un nombre accesible:
 *   [contentDescription].
 * @param contentDescription nombre accesible (`aria-label`); obligatorio en la práctica con `iconOnly`.
 */
@Composable
fun BrandButton(
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    variant: ButtonVariant = ButtonVariant.Primary,
    tone: ButtonTone = ButtonTone.Accent,
    size: ButtonSize? = null,
    destructive: Boolean = false,
    block: Boolean = false,
    iconOnly: Boolean = false,
    enabled: Boolean = true,
    contentDescription: String? = null,
    interactionSource: MutableInteractionSource? = null,
    content: @Composable RowScope.() -> Unit,
) {
    BrandButtonImpl(onClick, modifier, variant, tone, size, destructive, block, iconOnly, enabled, contentDescription, interactionSource, null, content)
}

/** El botón en sí. [stateOverride] fija el estado de interacción: lo usan las capturas y las vistas previas (pulsado, foco). */
@Composable
internal fun BrandButtonImpl(
    onClick: () -> Unit,
    modifier: Modifier,
    variant: ButtonVariant,
    tone: ButtonTone,
    size: ButtonSize?,
    destructive: Boolean,
    block: Boolean,
    iconOnly: Boolean,
    enabled: Boolean,
    contentDescription: String?,
    interactionSource: MutableInteractionSource?,
    stateOverride: BrandInteractionState?,
    content: @Composable RowScope.() -> Unit,
) {
    val resolved = size.resolve()
    val isText = variant == ButtonVariant.Text
    val source = interactionSource ?: remember { MutableInteractionSource() }
    val state = stateOverride ?: source.collectBrandInteractionState()
    val reduceMotion = rememberReduceMotion()

    val height = when (resolved) {
        BrandControlSize.Sm -> T.smHeight
        BrandControlSize.Md -> T.height
        BrandControlSize.Lg -> T.lgHeight
    }.scaledByFontScale()
    val fontSize: TextUnit = when (resolved) {
        BrandControlSize.Sm -> T.smFontSize
        BrandControlSize.Md -> T.fontSize
        BrandControlSize.Lg -> T.lgFontSize
    }
    val paddingInline = when {
        isText -> T.textPaddingInline
        iconOnly -> 0.dp
        else -> when (resolved) {
            BrandControlSize.Sm -> T.smPaddingInline
            BrandControlSize.Md -> T.paddingInline
            BrandControlSize.Lg -> T.lgPaddingInline
        }
    }
    val fontWeight: FontWeight = when (variant) {
        ButtonVariant.Primary -> T.primaryFontWeight
        ButtonVariant.Outline -> T.outlineFontWeight
        ButtonVariant.Ghost -> T.ghostFontWeight
        ButtonVariant.Text -> T.textFontWeight
    }
    val borderWidth = when (variant) {
        ButtonVariant.Primary -> T.primaryBorderWidth
        ButtonVariant.Outline -> T.outlineBorderWidth
        ButtonVariant.Ghost -> T.ghostBorderWidth
        ButtonVariant.Text -> T.textBorderWidth
    }
    val cornerRadius = when (variant) {
        ButtonVariant.Primary -> T.primaryBorderRadius
        ButtonVariant.Outline -> T.outlineBorderRadius
        ButtonVariant.Ghost -> T.ghostBorderRadius
        ButtonVariant.Text -> T.textBorderRadius
    }
    val duration = when (variant) {
        ButtonVariant.Primary -> T.primaryTransitionDuration
        ButtonVariant.Outline -> T.outlineTransitionDuration
        ButtonVariant.Ghost -> T.ghostTransitionDuration
        ButtonVariant.Text -> T.textTransitionDuration
    }
    val easing = when (variant) {
        ButtonVariant.Primary -> T.primaryTransitionEasing
        ButtonVariant.Outline -> T.outlineTransitionEasing
        ButtonVariant.Ghost -> T.ghostTransitionEasing
        ButtonVariant.Text -> T.textTransitionEasing
    }
    val intent = destructive && (variant == ButtonVariant.Outline || isText)
    val ringColor = when (variant) {
        ButtonVariant.Primary -> T.primaryFocusRingColor
        ButtonVariant.Outline -> if (intent) T.destructiveFocusRingColor else T.outlineFocusRingColor
        ButtonVariant.Ghost -> T.ghostFocusRingColor
        ButtonVariant.Text -> if (intent) T.destructiveFocusRingColor else T.textFocusRingColor
    }.current
    val ringWidth = when (variant) {
        ButtonVariant.Primary -> T.primaryFocusRingWidth
        ButtonVariant.Outline -> T.outlineFocusRingWidth
        ButtonVariant.Ghost -> T.ghostFocusRingWidth
        ButtonVariant.Text -> T.textFocusRingWidth
    }
    val ringOffset = when (variant) {
        ButtonVariant.Primary -> T.primaryFocusRingOffset
        ButtonVariant.Outline -> T.outlineFocusRingOffset
        ButtonVariant.Ghost -> T.ghostFocusRingOffset
        ButtonVariant.Text -> T.textFocusRingOffset
    }

    val target = buttonColors(variant, tone, destructive, enabled, state.pressed, state.hovered)
    val background by animateColorAsState(target.background, brandTransition(duration, easing, reduceMotion), label = "button-bg")
    val foreground by animateColorAsState(target.foreground, brandTransition(duration, easing, reduceMotion), label = "button-fg")
    val border by animateColorAsState(target.border, brandTransition(duration, easing, reduceMotion), label = "button-border")

    val shape: Shape = if (cornerRadius > 0.dp) RoundedCornerShape(cornerRadius) else RectangleShape
    val underlineOffset = T.textUnderlineOffset
    val textStyle = brandTextStyle(fontSize, fontWeight, T.lineHeight, color = foreground)

    Box(
        modifier = modifier
            .then(if (block) Modifier.fillMaxWidth() else Modifier)
            .brandFocusRing(state.focusVisible, ringColor, ringWidth, ringOffset, cornerRadius)
            .then(if (iconOnly) Modifier.size(height) else if (isText) Modifier else Modifier.heightIn(min = height))
            .background(background, shape)
            .then(if (borderWidth > 0.dp) Modifier.border(BorderStroke(borderWidth, border), shape) else Modifier)
            .clickable(
                interactionSource = source,
                indication = null,
                enabled = enabled,
                role = Role.Button,
                onClick = onClick,
            )
            .then(if (contentDescription != null) Modifier.semantics { this.contentDescription = contentDescription } else Modifier)
            .then(
                if (isText && target.underline > 0.dp) {
                    // El subrayado es una línea, no `text-decoration`: pinta `underline` en el borde inferior, bajo
                    // el hueco de `text-underline-offset` que reserva el padding de abajo.
                    Modifier.drawBehind {
                        val line = target.underline.toPx()
                        drawRect(foreground, topLeft = Offset(0f, this.size.height - line), size = Size(this.size.width, line))
                    }
                } else {
                    Modifier
                },
            )
            .padding(start = paddingInline, end = paddingInline, bottom = if (isText) underlineOffset else 0.dp),
        contentAlignment = Alignment.Center,
    ) {
        ProvideBrandContent(foreground, textStyle) {
            Row(
                horizontalArrangement = Arrangement.Center,
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier.wrapContentSize(),
            ) { content() }
        }
    }
}

/**
 * Un botón con texto: `BrandButton("Guardar", onClick = { … })`. [icon], si lo hay, va delante del texto (`size = Text`,
 * `1em`).
 */
@Composable
fun BrandButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    variant: ButtonVariant = ButtonVariant.Primary,
    tone: ButtonTone = ButtonTone.Accent,
    size: ButtonSize? = null,
    destructive: Boolean = false,
    block: Boolean = false,
    enabled: Boolean = true,
    icon: BrandIconName? = null,
    interactionSource: MutableInteractionSource? = null,
) {
    BrandButton(
        onClick = onClick,
        modifier = modifier,
        variant = variant,
        tone = tone,
        size = size,
        destructive = destructive,
        block = block,
        enabled = enabled,
        interactionSource = interactionSource,
    ) {
        if (icon != null) {
            BrandIcon(icon, size = BrandIconSize.Text)
            Spacer(Modifier.width(BrandSpacing.s2))
        }
        BasicText(text, style = LocalBrandTextStyle.current, maxLines = 1, overflow = TextOverflow.Ellipsis)
    }
}

/**
 * Un botón cuadrado de solo icono (`iconOnly`). Sin texto visible, el nombre accesible es **obligatorio**
 * (`aria-label` en React): [contentDescription] no admite `null`.
 */
@Composable
fun BrandButton(
    icon: BrandIconName,
    contentDescription: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    variant: ButtonVariant = ButtonVariant.Primary,
    size: ButtonSize? = null,
    enabled: Boolean = true,
    interactionSource: MutableInteractionSource? = null,
) {
    BrandButton(
        onClick = onClick,
        modifier = modifier,
        variant = variant,
        size = size,
        iconOnly = true,
        enabled = enabled,
        contentDescription = contentDescription,
        interactionSource = interactionSource,
    ) {
        BrandIcon(icon, size = BrandIconSize.Sm)
    }
}
