package com.studiolxd.brand.components.toast

import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.animate
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.AnimationSpec
import androidx.compose.animation.core.VectorConverter
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.gestures.detectDragGestures
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.safeDrawing
import androidx.compose.foundation.layout.widthIn
import androidx.compose.foundation.layout.windowInsetsPadding
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.derivedStateOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateMapOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.TransformOrigin
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.input.pointer.PointerEventPass
import androidx.compose.ui.input.pointer.PointerEventType
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.layout.layout
import androidx.compose.ui.layout.onSizeChanged
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.platform.LocalLayoutDirection
import androidx.compose.ui.semantics.LiveRegionMode
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.dismiss
import androidx.compose.ui.semantics.isTraversalGroup
import androidx.compose.ui.semantics.liveRegion
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.Constraints
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.LayoutDirection
import androidx.compose.ui.unit.dp
import androidx.compose.ui.zIndex
import com.studiolxd.brand.BrandTheme
import com.studiolxd.brand.components.button.BrandButton
import com.studiolxd.brand.components.button.ButtonVariant
import com.studiolxd.brand.components.closebutton.BrandCloseButton
import com.studiolxd.brand.support.BrandBasicText
import com.studiolxd.brand.support.BrandControlSize
import com.studiolxd.brand.support.brandBaseTextStyle
import com.studiolxd.brand.support.brandTransition
import com.studiolxd.brand.support.rememberReduceMotion
import com.studiolxd.brand.tokens.BrandAlertTokens as A
import com.studiolxd.brand.tokens.BrandButtonTokens
import com.studiolxd.brand.tokens.BrandTextTokens
import com.studiolxd.brand.tokens.BrandToastTokens as T
import kotlin.math.abs
import kotlin.math.max
import kotlin.time.Duration
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

/**
 * La cara de un aviso: la del `Alert` —mismo relleno, borde y tipografía y las mismas intenciones, sobre los tokens
 * `alert.*`—. Es lo que apila [ToastHost]; también se puede usar suelta.
 *
 * El relleno del neutro invierte el lienzo (prusia sobre página clara, blanco sobre oscura), el de `success` y
 * `error` es universal y el de `warning` es el amarillo con tinta prusia: lo que se compone dentro (el aspa, el botón
 * de acción) toma la cara de color que le toca a ese relleno, no la de la página.
 *
 * El título y la descripción forman una región viva de TalkBack (`liveRegion`): `error` y `warning` interrumpen
 * (asertiva) y el resto se anuncia sin interrumpir (cortés), también cuando el aviso se actualiza por su `id`.
 *
 * @param closeLabel nombre accesible del aspa. Castellano por defecto («Cerrar»).
 */
@Composable
fun BrandToastCard(
    item: ToastItem,
    onClose: () -> Unit,
    modifier: Modifier = Modifier,
    closeButton: Boolean = true,
    closeLabel: String = "Cerrar",
) {
    val bg: androidx.compose.ui.graphics.Color
    val border: androidx.compose.ui.graphics.Color
    val titleColor: androidx.compose.ui.graphics.Color
    val descriptionColor: androidx.compose.ui.graphics.Color
    when (item.intent) {
        ToastIntent.Success -> { bg = A.successBg.current; border = A.successBorderColor.current; titleColor = A.successTitleColor.current; descriptionColor = A.successDescriptionColor.current }
        ToastIntent.Error -> { bg = A.errorBg.current; border = A.errorBorderColor.current; titleColor = A.errorTitleColor.current; descriptionColor = A.errorDescriptionColor.current }
        ToastIntent.Warning -> { bg = A.warningBg.current; border = A.warningBorderColor.current; titleColor = A.warningTitleColor.current; descriptionColor = A.warningDescriptionColor.current }
        ToastIntent.Default, ToastIntent.Info, ToastIntent.Loading -> { bg = A.bg.current; border = A.borderColor.current; titleColor = A.titleColor.current; descriptionColor = A.descriptionColor.current }
    }
    // La superficie de lo que se compone DENTRO del relleno (`.surface-dark`, `.surface-invert`, `.surface-light`).
    val innerDark = when (item.intent) {
        ToastIntent.Success, ToastIntent.Error -> true
        ToastIntent.Warning -> false
        ToastIntent.Default, ToastIntent.Info, ToastIntent.Loading -> !BrandTheme.isDark
    }
    val assertive = item.intent == ToastIntent.Error || item.intent == ToastIntent.Warning

    Box(
        modifier
            .fillMaxWidth()
            .background(bg)
            .border(A.borderWidth, border)
            // La caja de borde de CSS (`box-sizing: border-box`): `border` de Compose pinta por dentro sin ocupar sitio;
            // en la web el borde va por fuera del relleno, y el aspa se coloca desde el borde interior, no desde el canto.
            .padding(A.borderWidth),
    ) {
        Column(
            Modifier.fillMaxWidth().padding(
                top = A.paddingBlock,
                bottom = A.paddingBlock,
                start = A.paddingInline,
                end = if (closeButton) A.closeInset * 2 + A.closeSize else A.paddingInline,
            ),
        ) {
            Column(
                Modifier.semantics(mergeDescendants = true) { liveRegion = if (assertive) LiveRegionMode.Assertive else LiveRegionMode.Polite },
                verticalArrangement = Arrangement.spacedBy(A.contentGap),
            ) {
                // El tracking del título es el del aviso (`toast.title-letter-spacing`, −0,02 em: el de un `<h2>`, que es lo
                // que es el título en React). Título y descripción llevan la caja de línea de CSS (`BrandBasicText`): el
                // título mide 16 × 1,3 = 20,8 y cada línea de la descripción 16 × 1,5 = 24, como en la web.
                BrandBasicText(item.title, style = brandBaseTextStyle(A.titleFontSize, A.titleFontWeight, A.titleLineHeight, T.titleLetterSpacing, color = titleColor))
                if (item.description != null) {
                    BrandBasicText(item.description, style = brandBaseTextStyle(A.descriptionFontSize, BrandTextTokens.fontWeight, A.descriptionLineHeight, color = descriptionColor))
                }
            }
            if (item.action != null) {
                BrandTheme(darkTheme = innerDark) {
                    // El ghost lleva su propio padding en línea: se compensa para que su texto alinee con el del aviso.
                    BrandButton(
                        text = item.action.label,
                        onClick = item.action.onClick,
                        modifier = Modifier.padding(top = A.contentGap).offset(x = -BrandButtonTokens.smPaddingInline),
                        variant = ButtonVariant.Ghost,
                        size = BrandControlSize.Sm,
                    )
                }
            }
        }
        if (closeButton) {
            BrandTheme(darkTheme = innerDark) {
                BrandCloseButton(
                    onClick = onClose,
                    modifier = Modifier.align(Alignment.TopEnd).padding(A.closeInset),
                    contentDescription = closeLabel,
                    size = BrandControlSize.Sm,
                )
            }
        }
    }
}

// MARK: - Host

/** Lo que pinta una fila de la pila: un aviso vivo, o uno que acaba de cerrarse y se está yendo. */
private class ToastRowModel(val item: ToastItem, val index: Int, val leaving: Boolean)

/** Recuerda los avisos que se han cerrado para dejarlos terminar su animación de salida antes de quitarlos. */
private class ToastGhosts {
    private var last: List<ToastItem> = emptyList()
    private val ghosts = mutableListOf<ToastRowModel>()

    fun rows(live: List<ToastItem>, animate: Boolean): List<ToastRowModel> {
        if (animate) {
            last.forEachIndexed { index, old ->
                if (live.none { it.id == old.id } && ghosts.none { it.item.id == old.id }) ghosts += ToastRowModel(old, index, true)
            }
        }
        ghosts.removeAll { ghost -> !animate || live.any { it.id == ghost.item.id } }
        last = live
        return live.mapIndexed { index, item -> ToastRowModel(item, index, false) } + ghosts
    }

    fun gone(id: String) {
        ghosts.removeAll { it.item.id == id }
    }
}

/**
 * La pila de avisos sobre la raíz (`Toaster` de React): se monta **una vez**, encima de la app, y pinta lo que haya en
 * [center]. El más nuevo va delante; los anteriores quedan recogidos detrás —desplazados y más pequeños— y se
 * despliegan con el puntero encima o con [expand].
 *
 * ```kotlin
 * Box(Modifier.fillMaxSize()) {
 *     AppContent()
 *     ToastHost()          // …y desde cualquier sitio: ToastCenter.shared.error("No se pudo guardar")
 * }
 * ```
 *
 * - **Descarte**: deslizar el aviso hacia el borde (40 dp) o su aspa; TalkBack ofrece la acción de descartar.
 * - **Reloj**: cada aviso se cierra solo a los [duration]; el reloj se detiene mientras un dedo o el puntero tocan la
 *   pila y vuelve a empezar al soltar. Un `loading` no se cierra solo.
 * - **Anuncios**: el título y la descripción son una región viva de TalkBack ([BrandToastCard]).
 * - **Animaciones**: entrada, salida y recolocación se saltan si el usuario quitó las animaciones del sistema.
 *
 * @param position esquina de la pila (por defecto abajo a la derecha, como en la web).
 * @param closeButton pinta el aspa en cada aviso.
 * @param closeLabel nombre accesible del aspa (castellano por defecto).
 * @param containerLabel nombre accesible de la región de avisos (castellano por defecto).
 * @param duration lo que vive un aviso (5 s); [Duration.INFINITE] los deja fijos.
 * @param gap aire entre avisos desplegados (`toast.gap`).
 * @param visibleToasts avisos visibles a la vez (3); el resto espera turno.
 * @param expand despliega la pila en vez de dejarla recogida bajo el aviso más nuevo.
 */
@Composable
fun ToastHost(
    modifier: Modifier = Modifier,
    center: ToastCenter = ToastCenter.shared,
    position: ToastPosition = ToastPosition.BottomRight,
    closeButton: Boolean = true,
    closeLabel: String = "Cerrar",
    containerLabel: String = "Notificaciones",
    duration: Duration = ToastCenter.defaultDuration,
    gap: Dp = T.gap,
    visibleToasts: Int = 3,
    expand: Boolean = false,
) {
    val live = center.items
    val reduceMotion = rememberReduceMotion()
    val ghosts = remember { ToastGhosts() }
    var tick by remember { mutableIntStateOf(0) }
    val rows = remember(live, tick, reduceMotion) { ghosts.rows(live, !reduceMotion) }

    val heights = remember { mutableStateMapOf<String, Int>() }
    val hovered = remember { mutableStateMapOf<String, Unit>() }
    val touched = remember { mutableStateMapOf<String, Unit>() }
    val paused by remember { derivedStateOf { hovered.isNotEmpty() || touched.isNotEmpty() } }
    val expanded = expand || hovered.isNotEmpty()
    val density = LocalDensity.current
    val gapPx = with(density) { gap.toPx() }
    val stackOffsetPx = with(density) { T.stackOffset.toPx() }

    val alignment = when (position) {
        ToastPosition.BottomRight -> Alignment.BottomEnd
        ToastPosition.BottomLeft -> Alignment.BottomStart
        ToastPosition.BottomCenter -> Alignment.BottomCenter
        ToastPosition.TopRight -> Alignment.TopEnd
        ToastPosition.TopLeft -> Alignment.TopStart
        ToastPosition.TopCenter -> Alignment.TopCenter
    }

    Box(
        modifier
            .fillMaxSize()
            .windowInsetsPadding(WindowInsets.safeDrawing)
            .padding(horizontal = T.insetInline, vertical = T.insetBlock),
        contentAlignment = alignment,
    ) {
        if (rows.isNotEmpty()) {
            // La región de avisos: del tamaño de la pila, para que los avisos desplegados caigan dentro de ella y reciban el toque.
            Box(
                Modifier
                    .widthIn(max = T.maxWidth)
                                        .layout { measurable, constraints ->
                        val placeable = measurable.measure(constraints)
                        val liveHeights = live.map { heights[it.id] ?: 0 }
                        val stackHeight = if (liveHeights.isEmpty()) placeable.height else if (expanded) {
                            liveHeights.sum() + (liveHeights.size - 1) * gapPx.toInt()
                        } else {
                            liveHeights.first() + (minOf(liveHeights.size, max(visibleToasts, 1)) - 1) * stackOffsetPx.toInt()
                        }
                        val height = max(placeable.height, stackHeight)
                        layout(placeable.width, height) {
                            placeable.placeRelative(0, if (position.isTop) 0 else height - placeable.height)
                        }
                    }
                    .semantics {
                        contentDescription = containerLabel
                        isTraversalGroup = true
                    },
                contentAlignment = if (position.isTop) Alignment.TopCenter else Alignment.BottomCenter,
            ) {
                rows.forEach { row ->
                    androidx.compose.runtime.key(row.item.id) {
                        ToastRow(
                            row = row,
                            position = position,
                            closeButton = closeButton,
                            closeLabel = closeLabel,
                            expanded = expanded,
                            expandedOffset = { live.take(row.index).sumOf { heights[it.id] ?: 0 }.toFloat() },
                            gapPx = gapPx,
                            visible = row.index < visibleToasts,
                            count = rows.size,
                            paused = paused,
                            hostDuration = duration,
                            reduceMotion = reduceMotion,
                            onHeight = { heights[row.item.id] = it },
                            onHover = { if (it) hovered[row.item.id] = Unit else hovered.remove(row.item.id) },
                            onTouch = { if (it) touched[row.item.id] = Unit else touched.remove(row.item.id) },
                            onDismiss = { center.dismiss(row.item.id) },
                            onGone = { ghosts.gone(row.item.id); heights.remove(row.item.id); tick++ },
                        )
                    }
                }
            }
        }
    }
}

@Composable
private fun ToastRow(
    row: ToastRowModel,
    position: ToastPosition,
    closeButton: Boolean,
    closeLabel: String,
    expanded: Boolean,
    expandedOffset: () -> Float,
    gapPx: Float,
    visible: Boolean,
    count: Int,
    paused: Boolean,
    hostDuration: Duration,
    reduceMotion: Boolean,
    onHeight: (Int) -> Unit,
    onHover: (Boolean) -> Unit,
    onTouch: (Boolean) -> Unit,
    onDismiss: () -> Unit,
    onGone: () -> Unit,
) {
    val item = row.item
    val density = LocalDensity.current
    val rtl = LocalLayoutDirection.current == LayoutDirection.Rtl
    val scope = rememberCoroutineScope()
    val inspecting = androidx.compose.ui.platform.LocalInspectionMode.current || !LocalToastEntrance.current
    val direction = if (position.isTop) 1f else -1f
    val enterOffsetPx = with(density) { T.insetBlock.toPx() }
    val stackOffsetPx = with(density) { T.stackOffset.toPx() }
    val thresholdPx = with(density) { SwipeThreshold.toPx() }
    fun spec(millis: Int): AnimationSpec<Float> = brandTransition(millis, T.easing, reduceMotion)

    // Entrada y salida: 0 = fuera (más pequeño y transparente), 1 = en su sitio.
    // En el editor (`LocalInspectionMode`) y en las capturas ([LocalToastEntrance] apagado) no corre ningún reloj: el aviso nace ya en su sitio.
    val presence = remember { Animatable(if (reduceMotion || inspecting) 1f else 0f) }
    LaunchedEffect(row.leaving) {
        if (row.leaving) {
            presence.animateTo(0f, spec(T.durationOut))
            onGone()
        } else {
            presence.animateTo(1f, spec(T.durationIn))
        }
    }
    DisposableEffect(item.id) {
        onDispose {
            onHover(false)
            onTouch(false)
        }
    }

    // El reloj: reinicia con cada actualización del aviso y con cada vez que se suelta la pila.
    val lifetime = item.lifetime(hostDuration)
    if (!row.leaving && lifetime != null) {
        LaunchedEffect(item.id, item.revision, paused, lifetime) {
            if (!paused) {
                delay(lifetime)
                onDismiss()
            }
        }
    }

    // Recogido: cada aviso baja `stack-offset` y se encoge `stack-scale` por peldaño. Desplegado: se apilan con aire.
    // Las alturas llegan tras la maqueta, así que el desplegado se calcula al dibujar (no al componer).
    val indexAnim by animateFloatAsState(row.index.toFloat(), spec(T.durationIn), label = "toast-index")
    val expandedFraction by animateFloatAsState(if (expanded) 1f else 0f, spec(T.durationIn), label = "toast-expand")
    val shown by animateFloatAsState(if (visible) 1f else 0f, spec(T.durationIn), label = "toast-visible")
    var drag by remember { mutableStateOf(Offset.Zero) }

    BrandToastCard(
        item = item,
        onClose = onDismiss,
        closeButton = closeButton,
        closeLabel = closeLabel,
        modifier = Modifier
            .zIndex((count - row.index).toFloat())
            .onSizeChanged { onHeight(it.height) }
            .graphicsLayer {
                val e = presence.value
                alpha = e * shown
                val collapsedScale = max(0f, 1f - indexAnim * T.stackScale)
                val stackScale = collapsedScale + (1f - collapsedScale) * expandedFraction
                val s = stackScale * (T.enterScale + (1f - T.enterScale) * e)
                scaleX = s
                scaleY = s
                translationX = drag.x
                val collapsedY = direction * indexAnim * stackOffsetPx
                val expandedY = direction * (expandedOffset() + row.index * gapPx)
                val stackY = collapsedY + (expandedY - collapsedY) * expandedFraction
                translationY = stackY + drag.y - direction * enterOffsetPx * (1f - e)
                transformOrigin = TransformOrigin(0.5f, if (position.isTop) 0f else 1f)
            }
            // Tocar o pasar el puntero detiene los relojes; no consume nada.
            .pointerInput(item.id) {
                awaitPointerEventScope {
                    while (true) {
                        val event = awaitPointerEvent(PointerEventPass.Initial)
                        onTouch(event.changes.any { it.pressed })
                        when (event.type) {
                            PointerEventType.Enter -> onHover(true)
                            PointerEventType.Exit -> onHover(false)
                        }
                    }
                }
            }
            .then(
                if (row.leaving || !visible) Modifier else Modifier.pointerInput(item.id, position) {
                    detectDragGestures(
                        onDragStart = { onTouch(true) },
                        onDragEnd = {
                            if (swipeDismisses(drag.x, drag.y, position, rtl, thresholdPx)) {
                                onDismiss()
                            } else {
                                scope.launch { animate(Offset.VectorConverter, drag, Offset.Zero, animationSpec = brandTransition(T.durationIn, T.easing, reduceMotion)) { value, _ -> drag = value } }
                            }
                        },
                        onDragCancel = { scope.launch { animate(Offset.VectorConverter, drag, Offset.Zero) { value, _ -> drag = value } } },
                        onDrag = { change, amount ->
                            change.consume()
                            drag += amount
                        },
                    )
                },
            )
            .semantics { dismiss { onDismiss(); true } },
    )
}

/** `false` hace que los avisos nazcan ya en su sitio, sin animación de entrada: lo apagan las capturas, que no avanzan el reloj. */
internal val LocalToastEntrance = androidx.compose.runtime.staticCompositionLocalOf { true }

/**
 * La distancia que hay que arrastrar un aviso para descartarlo: la de Base UI (`swipeThreshold`, 40). No es un token
 * (lo mide el motor de gestos, no el CSS).
 */
internal val SwipeThreshold: Dp = 40.dp

/**
 * ¿Descarta este arrastre ([dx], [dy] en píxeles)? Hacia el borde horizontal de la pila (o a cualquier lado si va
 * centrada) y hacia el borde vertical donde está anclada, más allá de [threshold]. [rtl] voltea el eje horizontal.
 */
internal fun swipeDismisses(dx: Float, dy: Float, position: ToastPosition, rtl: Boolean, threshold: Float): Boolean {
    val x = if (rtl) -dx else dx
    val horizontal = when (position) {
        ToastPosition.BottomLeft, ToastPosition.TopLeft -> -x
        ToastPosition.BottomRight, ToastPosition.TopRight -> x
        ToastPosition.BottomCenter, ToastPosition.TopCenter -> abs(x)
    }
    val vertical = if (position.isTop) -dy else dy
    return horizontal > threshold || vertical > threshold
}
