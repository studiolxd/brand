package com.studiolxd.brand.components.pageintro

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.studiolxd.brand.components.text.BrandHeading
import com.studiolxd.brand.components.text.BrandParagraph
import com.studiolxd.brand.components.text.HeadingLevel
import com.studiolxd.brand.components.text.HeadingSize
import com.studiolxd.brand.components.text.ParagraphSize
import com.studiolxd.brand.components.text.headingFontSize
import com.studiolxd.brand.support.BrandStackBreakpoint
import com.studiolxd.brand.support.BrandStretchColumn
import com.studiolxd.brand.support.toScaledDp
import com.studiolxd.brand.tokens.BrandPageIntroTokens as T
import com.studiolxd.brand.tokens.BrandSpacing
import com.studiolxd.brand.tokens.BrandTextTokens

/**
 * El encabezado **dentro del contenido** de una pantalla (`PageIntro` de React): el título (un [BrandHeading] que TalkBack
 * anuncia como encabezado del nivel [level]), un [eyebrow] encima, la entradilla [description] (un [BrandParagraph]
 * `large`), más [content] bajo la frase y las [actions]. No sustituye a la barra superior del sistema (`TopAppBar`).
 *
 * ```kotlin
 * BrandPageIntro(
 *     "Webhooks",
 *     eyebrow = { BrandTag("Beta", tone = TagTone.Info) },
 *     description = "Reglas que se disparan solas cuando algo cambia.",
 *     actions = { BrandButton("Crear webhook", onClick = { create() }) },
 * )
 * ```
 *
 * Con [actions], el título queda a la izquierda y las acciones a la derecha en una fila a partir de 480 dp de ancho (el
 * salto a `md` de la web); por debajo, las acciones caen **bajo el título, a todo el ancho y una por línea**.
 *
 * @param level el nivel del encabezado (1 por defecto); fija también el tamaño salvo que [size] lo desacople.
 * @param size un paso de la escala de títulos, independiente del nivel.
 * @param eyebrow ranura sobre el título: una `BrandTag`, una categoría.
 * @param content más contenido bajo la frase (un párrafo, una nota).
 */
@Composable
fun BrandPageIntro(
    title: String,
    modifier: Modifier = Modifier,
    level: HeadingLevel = HeadingLevel.H1,
    size: HeadingSize? = null,
    description: String? = null,
    eyebrow: (@Composable () -> Unit)? = null,
    actions: (@Composable () -> Unit)? = null,
    content: (@Composable () -> Unit)? = null,
) = BrandPageIntroImpl(title, modifier, level, size, description, eyebrow, actions, content, BrandStackBreakpoint)

/** La cabecera en sí. [stackBelow] es el ancho por debajo del cual las acciones caen: lo fijan las capturas de las parejas. Interno. */
@Composable
internal fun BrandPageIntroImpl(
    title: String,
    modifier: Modifier,
    level: HeadingLevel,
    size: HeadingSize?,
    description: String?,
    eyebrow: (@Composable () -> Unit)?,
    actions: (@Composable () -> Unit)?,
    content: (@Composable () -> Unit)?,
    stackBelow: Dp,
) {
    val hasMore = description != null || content != null
    // El aire bajo el título (`text.heading.space-after`, en em): se anula si el título cierra la cabecera.
    @Composable
    fun spaceAfter(em: Float): Dp = (headingFontSize(level, size) * em).toScaledDp()

    @Composable
    fun TitleGroup(spaceBelow: Dp) {
        Column(Modifier.fillMaxWidth()) {
            if (eyebrow != null) {
                eyebrow()
                Spacer(Modifier.height(T.rowGap))
            }
            BrandHeading(title, level = level, size = size)
            if (spaceBelow > 0.dp) Spacer(Modifier.height(spaceBelow))
        }
    }

    BoxWithConstraints(modifier.fillMaxWidth()) {
        val stacked = maxWidth < stackBelow
        Column(Modifier.fillMaxWidth()) {
            when {
                actions == null -> TitleGroup(if (hasMore) spaceAfter(BrandTextTokens.headingSpaceAfter) else 0.dp)
                stacked -> {
                    TitleGroup(0.dp)
                    Spacer(Modifier.height(T.rowGap))
                    BrandStretchColumn(T.actionsGap) { actions() }
                    if (hasMore) Spacer(Modifier.height(BrandSpacing.s3))
                }
                else -> Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(T.rowColumnGap)) {
                    // Alineadas a la línea base del título (la de su primera línea): con una línea el botón queda centrado con él.
                    Column(Modifier.weight(1f).then(if (eyebrow == null) Modifier.alignByBaseline() else Modifier)) {
                        TitleGroup(if (hasMore) spaceAfter(T.titleSpaceAfter) else 0.dp)
                    }
                    Row(
                        Modifier.then(if (eyebrow == null) Modifier.alignByBaseline() else Modifier),
                        horizontalArrangement = Arrangement.spacedBy(T.actionsGap),
                        verticalAlignment = Alignment.CenterVertically,
                    ) { actions() }
                }
            }
            if (description != null) BrandParagraph(description, size = ParagraphSize.Lg)
            if (content != null) {
                if (description != null) Spacer(Modifier.height(BrandSpacing.s3))
                content()
            }
        }
    }
}
