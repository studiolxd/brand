package com.studiolxd.brand.components.closebutton

import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import com.studiolxd.brand.icon.BrandIcon
import com.studiolxd.brand.icon.BrandIconName
import com.studiolxd.brand.icon.BrandIconSize
import com.studiolxd.brand.support.BrandControlSize
import com.studiolxd.brand.support.brandFocusRing
import com.studiolxd.brand.support.collectBrandInteractionState
import com.studiolxd.brand.support.scaledByFontScale
import com.studiolxd.brand.tokens.BrandCloseButtonTokens as T

/**
 * El aspa que cierra un diálogo, un cajón o un aviso (`CloseButton`): un botón cuadrado sin fondo ni borde, con la
 * tinta de la superficie desde el reposo. El único estado que marca es el foco de teclado, como en la web.
 *
 * El nombre accesible es obligatorio (`aria-label` en React): sin texto visible, TalkBack lo necesita.
 *
 * @param contentDescription nombre accesible del aspa. Castellano por defecto («Cerrar»); se traduce pasando el texto.
 */
@Composable
fun BrandCloseButton(
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    contentDescription: String = "Cerrar",
    size: BrandControlSize = BrandControlSize.Md,
    interactionSource: MutableInteractionSource? = null,
) {
    val source = interactionSource ?: remember { MutableInteractionSource() }
    val state = source.collectBrandInteractionState()
    val side = when (size) {
        BrandControlSize.Sm -> T.sizeSm
        BrandControlSize.Md -> T.sizeMd
        BrandControlSize.Lg -> T.sizeLg
    }.scaledByFontScale()
    Box(
        modifier = modifier
            .size(side)
            .brandFocusRing(state.focusVisible, T.focusRingColor.current, T.focusRingWidth, T.focusRingOffset)
            .clickable(interactionSource = source, indication = null, role = Role.Button, onClick = onClick)
            .semantics { this.contentDescription = contentDescription },
        contentAlignment = Alignment.Center,
    ) {
        BrandIcon(BrandIconName.Close, size = BrandIconSize.Md, color = T.color.current)
    }
}
