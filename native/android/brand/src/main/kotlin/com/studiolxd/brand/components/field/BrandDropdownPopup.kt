package com.studiolxd.brand.components.field

import androidx.compose.foundation.border
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.widthIn
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.platform.LocalWindowInfo
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.IntOffset
import androidx.compose.ui.unit.IntRect
import androidx.compose.ui.unit.IntSize
import androidx.compose.ui.unit.LayoutDirection
import androidx.compose.ui.window.Popup
import androidx.compose.ui.window.PopupPositionProvider
import androidx.compose.ui.window.PopupProperties
import androidx.compose.ui.semantics.isTraversalGroup
import com.studiolxd.brand.tokens.BrandSelectTokens as S

/** Un desplegable de la marca: el panel que cuelga bajo un control (o sobre él si abajo no cabe). Interno. */
@Composable
internal fun BrandDropdownPopup(
    expanded: Boolean,
    onDismissRequest: () -> Unit,
    anchorWidth: Dp,
    content: @Composable () -> Unit,
) {
    if (!expanded) return
    val provider = remember {
        object : PopupPositionProvider {
            override fun calculatePosition(anchorBounds: IntRect, windowSize: IntSize, layoutDirection: LayoutDirection, popupContentSize: IntSize): IntOffset {
                val x = anchorBounds.left.coerceIn(0, (windowSize.width - popupContentSize.width).coerceAtLeast(0))
                val below = anchorBounds.bottom
                val y = if (below + popupContentSize.height <= windowSize.height) below else (anchorBounds.top - popupContentSize.height).coerceAtLeast(0)
                return IntOffset(x, y)
            }
        }
    }
    Popup(popupPositionProvider = provider, onDismissRequest = onDismissRequest, properties = PopupProperties(focusable = true)) {
        BrandDropdownSurface(anchorWidth, content)
    }
}

/** El panel del desplegable: fondo y borde de `select.content-*`, al menos tan ancho como el control, con desplazamiento. */
@Composable
internal fun BrandDropdownSurface(minWidth: Dp, content: @Composable () -> Unit) {
    val maxHeight = with(LocalDensity.current) { (LocalWindowInfo.current.containerSize.height * 0.6f).toDp() }
    Column(
        Modifier
            .widthIn(min = minWidth)
            .heightIn(max = maxHeight)
            .background(S.contentBg.current, RectangleShape)
            .border(S.borderWidth, S.contentBorderColor.current, RectangleShape)
            .verticalScroll(rememberScrollState())
            .semantics { isTraversalGroup = true },
    ) { content() }
}
