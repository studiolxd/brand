package com.studiolxd.brand.components.sheet

import androidx.compose.animation.core.animate
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.WindowInsetsSides
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.only
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.safeDrawing
import androidx.compose.foundation.layout.statusBars
import androidx.compose.foundation.layout.windowInsetsPadding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberUpdatedState
import androidx.compose.runtime.setValue
import androidx.compose.runtime.withFrameNanos
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.input.nestedscroll.NestedScrollConnection
import androidx.compose.ui.input.nestedscroll.NestedScrollSource
import androidx.compose.ui.input.nestedscroll.nestedScroll
import androidx.compose.ui.layout.layout
import androidx.compose.ui.semantics.dismiss
import androidx.compose.ui.semantics.heading
import androidx.compose.ui.semantics.paneTitle
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.unit.Constraints
import androidx.compose.ui.unit.Velocity
import androidx.compose.ui.unit.dp
import com.studiolxd.brand.components.closebutton.BrandCloseButton
import com.studiolxd.brand.components.dialog.BrandDialogFooter
import com.studiolxd.brand.components.dialog.BrandDialogWindow
import com.studiolxd.brand.support.BrandBasicText
import com.studiolxd.brand.support.BrandControlSize
import com.studiolxd.brand.support.brandBaseTextStyle
import com.studiolxd.brand.support.brandTransition
import com.studiolxd.brand.support.rememberReduceMotion
import com.studiolxd.brand.tokens.BrandSheetTokens as T
import com.studiolxd.brand.tokens.BrandTextTokens
import kotlin.math.abs
import kotlin.math.max
import kotlin.math.min
import kotlin.math.roundToInt

/**
 * La altura a la que se detiene un cajón (`PresentationDetent` en SwiftUI): [Medium] es la mitad de la pantalla útil y
 * [Large] toda ella (bajo la barra de estado). En la web no existe: el panel mide lo que mide su contenido.
 */
enum class BrandSheetDetent(val value: String) {
    Medium("medium"),
    Large("large"),
}

/**
 * El contenido de un cajón de la marca (`Sheet`): cabecera con título y descripción, aspa de cierre en la esquina,
 * cuerpo con desplazamiento y pie de acciones. Es lo que [BrandSheet] presenta en su ventana; también se puede usar
 * suelto dentro de cualquier presentación propia.
 *
 * **Ocupa la altura que le dé quien lo coloque** (`Modifier.height(…)`, `fillMaxSize()`…): el cuerpo se desplaza y el
 * pie queda abajo. El título es obligatorio y es el nombre accesible del cajón (TalkBack lo anuncia como encabezado y
 * como título del panel). `titleHidden` lo deja solo para el lector de pantalla.
 *
 * @param closeLabel nombre accesible del aspa. Castellano por defecto («Cerrar»); se traduce pasando el texto.
 * @param footer las acciones del pie, en el orden del DOM (`Cancelar` primero); usa [BrandDialogButton].
 */
@Composable
fun BrandSheetContent(
    title: String,
    onClose: () -> Unit,
    modifier: Modifier = Modifier,
    titleHidden: Boolean = false,
    description: String? = null,
    closeLabel: String = "Cerrar",
    hideClose: Boolean = false,
    footer: (@Composable () -> Unit)? = null,
    content: @Composable ColumnScope.() -> Unit,
) {
    Box(
        modifier
            .background(T.bg.current)
            .windowInsetsPadding(WindowInsets.safeDrawing.only(WindowInsetsSides.Horizontal + WindowInsetsSides.Bottom))
            .semantics { paneTitle = title },
    ) {
        Column(
            Modifier
                .fillMaxSize()
                .padding(vertical = T.paddingBlock, horizontal = T.paddingInline),
            verticalArrangement = Arrangement.spacedBy(T.gap),
        ) {
            Column(
                Modifier.weight(1f).verticalScroll(rememberScrollState()),
                verticalArrangement = Arrangement.spacedBy(T.gap),
            ) {
                // Sitio para el aspa, como `--dialog-header-close-room` en la web.
                Column(
                    Modifier.fillMaxWidth().padding(end = if (hideClose) 0.dp else T.paddingInline),
                    verticalArrangement = Arrangement.spacedBy(T.headerGap),
                ) {
                    if (!titleHidden) {
                        // El título es un `<h2>` en React (`Dialog.Title`) y `.sheet__title` no declara `line-height`: hereda el
                        // de los títulos `h2` (`text.h2-line-height`), no el del cuerpo.
                        BrandBasicText(
                            title,
                            Modifier.semantics { heading() },
                            style = brandBaseTextStyle(T.titleFontSize, T.titleFontWeight, BrandTextTokens.h2LineHeight, color = T.titleColor.current),
                        )
                    }
                    if (description != null) {
                        BrandBasicText(
                            description,
                            style = brandBaseTextStyle(T.descriptionFontSize, BrandTextTokens.fontWeight, BrandTextTokens.lineHeight, color = T.descriptionColor.current),
                        )
                    }
                }
                content()
            }
            if (footer != null) BrandDialogFooter(gap = T.footerGap, content = footer)
        }
        if (!hideClose) {
            BrandCloseButton(
                onClick = onClose,
                modifier = Modifier.align(Alignment.TopEnd).padding(T.closeInset),
                contentDescription = closeLabel,
                size = BrandControlSize.Md,
            )
        }
    }
}

/**
 * Presenta un cajón de la marca desde abajo, en su propia ventana (`Sheet` de React con `side: bottom`): velo con el
 * token del sistema, entrada y salida con `sheet.transition-*`, arrastre para cambiar de altura o descartarlo, atrás
 * y `Esc` para cerrarlo, y el gesto de descartar de TalkBack.
 *
 * Está construido sobre el `Dialog` de Compose (no sobre `ModalBottomSheet` de material3, que Brand no lleva como
 * dependencia): el arrastre es propio —el cajón crece al arrastrar hacia arriba y, desde el cuerpo desplazado al
 * principio, se encoge hasta cerrarse— y se detiene en [detents].
 *
 * ```kotlin
 * var filters by remember { mutableStateOf(false) }
 * BrandButton("Filtros", onClick = { filters = true })
 * BrandSheet(
 *     open = filters,
 *     onDismissRequest = { filters = false },
 *     title = "Filtros",
 *     description = "Afina los resultados",
 *     footer = {
 *         BrandDialogButton("Cancelar", onClick = { filters = false }, variant = ButtonVariant.Outline)
 *         BrandDialogButton("Aplicar", onClick = { apply(); filters = false })
 *     },
 * ) { FilterForm() }
 * ```
 *
 * @param open `open` de React.
 * @param onDismissRequest `onOpenChange(false)` de React: velo, atrás, `Esc`, aspa y arrastre hacia abajo.
 * @param detents alturas a las que se detiene (por defecto, media pantalla y completa); empieza en la menor.
 */
@Composable
fun BrandSheet(
    open: Boolean,
    onDismissRequest: () -> Unit,
    title: String,
    modifier: Modifier = Modifier,
    titleHidden: Boolean = false,
    description: String? = null,
    closeLabel: String = "Cerrar",
    hideClose: Boolean = false,
    detents: Set<BrandSheetDetent> = setOf(BrandSheetDetent.Medium, BrandSheetDetent.Large),
    footer: (@Composable () -> Unit)? = null,
    content: @Composable ColumnScope.() -> Unit,
) {
    BrandDialogWindow(
        open = open,
        onDismissRequest = onDismissRequest,
        backdropColor = T.backdropBg.current,
        backdropOpacity = T.backdropOpacity,
        durationMillis = T.transitionDuration,
        easing = T.transitionEasing,
    ) { _ ->
        BoxWithConstraints(
            Modifier.fillMaxSize().windowInsetsPadding(WindowInsets.statusBars.only(WindowInsetsSides.Top)),
            contentAlignment = Alignment.BottomCenter,
        ) {
            val full = constraints.maxHeight.toFloat()
            val detentPx = sheetDetentHeights(full, detents)
            SheetPanel(open, onDismissRequest, detentPx, title, titleHidden, description, closeLabel, hideClose, footer, modifier, content)
        }
    }
}

@Composable
private fun SheetPanel(
    open: Boolean,
    onDismissRequest: () -> Unit,
    detents: List<Float>,
    title: String,
    titleHidden: Boolean,
    description: String?,
    closeLabel: String,
    hideClose: Boolean,
    footer: (@Composable () -> Unit)?,
    modifier: Modifier,
    content: @Composable ColumnScope.() -> Unit,
) {
    val smallest = detents.first()
    val largest = detents.last()
    val reduceMotion = rememberReduceMotion()
    val currentOpen by rememberUpdatedState(open)
    val currentDismiss by rememberUpdatedState(onDismissRequest)
    val currentDetents by rememberUpdatedState(detents)
    // Píxeles del cajón a la vista: 0 = fuera, `smallest` = reposo, `largest` = abierto del todo.
    var visible by remember { mutableFloatStateOf(0f) }

    LaunchedEffect(open, smallest) {
        val target = if (open) min(max(visible, smallest), largest) else 0f
        animate(visible, target, animationSpec = brandTransition(T.transitionDuration, T.transitionEasing, reduceMotion)) { value, _ -> visible = value }
    }

    val connection = remember {
        object : NestedScrollConnection {
            private var moved = false

            // Arrastrando hacia arriba con el cajón por debajo de su máximo: primero crece, luego se desplaza el cuerpo.
            override fun onPreScroll(available: Offset, source: NestedScrollSource): Offset {
                val max = currentDetents.last()
                if (source == NestedScrollSource.UserInput && available.y < 0f && visible < max) {
                    val grow = min(-available.y, max - visible)
                    visible += grow
                    moved = true
                    return Offset(0f, -grow)
                }
                return Offset.Zero
            }

            // El cuerpo ya está al principio y el dedo sigue bajando: el cajón se encoge.
            override fun onPostScroll(consumed: Offset, available: Offset, source: NestedScrollSource): Offset {
                if (source == NestedScrollSource.UserInput && available.y > 0f) {
                    visible = max(0f, visible - available.y)
                    moved = true
                    return Offset(0f, available.y)
                }
                return Offset.Zero
            }

            override suspend fun onPreFling(available: Velocity): Velocity {
                if (!moved) return Velocity.Zero
                moved = false
                val target = settleSheetTarget(visible, available.y, currentDetents)
                if (target == 0f) {
                    currentDismiss()
                    // Si quien llama ignora el cierre, el cajón vuelve a su reposo en vez de quedarse a medias.
                    withFrameNanos { }
                    if (currentOpen) animate(visible, currentDetents.first()) { value, _ -> visible = value }
                } else {
                    animate(visible, target) { value, _ -> visible = value }
                }
                return Velocity(0f, available.y)
            }
        }
    }

    Box(
        modifier
            .fillMaxWidth()
            .nestedScroll(connection)
            .layout { measurable, constraints ->
                val height = max(visible, smallest).roundToInt()
                val placeable = measurable.measure(Constraints.fixed(constraints.maxWidth, height))
                layout(constraints.maxWidth, height) { placeable.placeRelative(0, 0) }
            }
            .graphicsLayer { translationY = max(0f, smallest - visible) }
            .semantics { dismiss { currentDismiss(); true } },
    ) {
        BrandSheetContent(
            title = title,
            onClose = { currentDismiss() },
            modifier = Modifier.fillMaxSize(),
            titleHidden = titleHidden,
            description = description,
            closeLabel = closeLabel,
            hideClose = hideClose,
            footer = footer,
            content = content,
        )
    }
}

/** Las alturas en píxeles de los [detents] sobre una pantalla útil de [full] píxeles, de menor a mayor. */
internal fun sheetDetentHeights(full: Float, detents: Set<BrandSheetDetent>): List<Float> {
    val heights = detents.map { if (it == BrandSheetDetent.Medium) full / 2f else full }.distinct().sorted()
    return heights.ifEmpty { listOf(full) }
}

/**
 * A dónde se asienta un cajón al soltar el dedo: el hueco (0 = cerrar) o el detent más cercano a donde iría por
 * inercia. [velocity] en px/s, positiva hacia abajo; 0,15 s es lo que se proyecta el movimiento (un valor de
 * comportamiento, no de diseño: no es un token).
 */
internal fun settleSheetTarget(visible: Float, velocity: Float, detents: List<Float>): Float {
    val projected = visible - velocity * 0.15f
    return (listOf(0f) + detents).minBy { abs(it - projected) }
}
