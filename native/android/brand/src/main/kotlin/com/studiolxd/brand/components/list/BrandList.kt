package com.studiolxd.brand.components.list

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.text.BasicText
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.semantics.CollectionInfo
import androidx.compose.ui.semantics.CollectionItemInfo
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.clearAndSetSemantics
import androidx.compose.ui.semantics.collectionInfo
import androidx.compose.ui.semantics.collectionItemInfo
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.studiolxd.brand.support.BrandBasicText
import com.studiolxd.brand.support.LocalBrandTextStyle
import com.studiolxd.brand.support.ProvideBrandContent
import com.studiolxd.brand.support.brandTextStyle
import com.studiolxd.brand.tokens.BrandTextTokens as T

/** `List` `type`: con viñetas, numerada o sin decoración. Mismos casos y mismos valores que React. */
enum class ListType(val value: String) {
    Unordered("unordered"),
    Ordered("ordered"),
    Plain("plain"),
}

/**
 * Los ítems de un [BrandList]. Cada `item { … }` es una fila; la lista las numera y las separa. El contenido de la
 * fila es cualquier composable (lo normal, un [BrandListItem]).
 */
class BrandListScope internal constructor() {
    internal val rows = mutableListOf<@Composable () -> Unit>()

    /** Una fila con el contenido que se quiera (un [BrandListItem], una lista anidada…). */
    fun item(content: @Composable () -> Unit) {
        rows += content
    }

    /** Una fila de texto: el `<li>` de React. */
    fun item(text: String) {
        rows += { BrandListItem(text) }
    }

    /** [count] filas del mismo molde: lo más corto para datos que ya son una colección. */
    fun items(count: Int, content: @Composable (index: Int) -> Unit) {
        repeat(count) { index -> rows += { content(index) } }
    }
}

/**
 * Una lista de la marca: con viñetas, numerada o `Plain` (sin marcas ni sangría). Viste el contenido con la
 * tipografía de lista del sistema (`text.list.*`) y deja entre ítems el aire `text.list.gap`.
 *
 * TalkBack la anuncia como colección («elemento 2 de 3»); las marcas (• y 1.) no se leen sueltas.
 *
 * ```kotlin
 * BrandList(type = ListType.Ordered) {
 *     item("Abre la app")
 *     item("Elige tu vivienda")
 * }
 * ```
 *
 * Para la fila de una lista de ajustes o de datos (contenido principal, secundario y accesorio final, con
 * separadores): `BrandList(type = ListType.Plain, showSeparators = true)` con `item { BrandListItem(…) }`.
 *
 * @param showSeparators dibuja la línea de `separator.*` entre filas, con el aire `separator.spacing-md` a cada lado,
 * en lugar del `text.list.gap`. Es la misma prop que en React.
 */
@Composable
fun BrandList(
    modifier: Modifier = Modifier,
    type: ListType = ListType.Unordered,
    showSeparators: Boolean = false,
    content: BrandListScope.() -> Unit,
) {
    val rows = BrandListScope().apply(content).rows
    val color = T.listColor.current
    val style = brandTextStyle(T.listFontSize, T.listFontWeight, T.listLineHeight, T.listLetterSpacing, color = color)
    ProvideBrandContent(color = color, textStyle = style) {
        Column(
            modifier = modifier
                .fillMaxWidth()
                .semantics { collectionInfo = CollectionInfo(rowCount = rows.size, columnCount = 1) },
            verticalArrangement = Arrangement.spacedBy(if (showSeparators) 0.dp else T.listGap),
        ) {
            rows.forEachIndexed { index, row ->
                Row(
                    Modifier.fillMaxWidth().semantics {
                        collectionItemInfo = CollectionItemInfo(rowIndex = index, rowSpan = 1, columnIndex = 0, columnSpan = 1)
                    },
                ) {
                    if (type != ListType.Plain) {
                        BrandBasicText(
                            text = if (type == ListType.Ordered) "${index + 1}. " else "• ",
                            modifier = Modifier.width(T.listPaddingInlineStart).clearAndSetSemantics { },
                            style = style.copy(textAlign = TextAlign.End),
                        )
                    }
                    Box(Modifier.weight(1f)) { row() }
                }
                if (showSeparators && index < rows.size - 1) {
                    Box(
                        Modifier
                            .fillMaxWidth()
                            .padding(vertical = T.listSeparatorSpacing)
                            .height(T.listSeparatorThickness)
                            .background(T.listSeparatorColor.current)
                            .clearAndSetSemantics { },
                    )
                }
            }
        }
    }
}

/**
 * Un ítem de [BrandList]. Con solo contenido es el `<li>` de React; con [secondary] (una línea menor y atenuada),
 * [leading] (un accesorio al principio: icono, avatar) y [trailing] (un accesorio al final: etiqueta, interruptor,
 * chevron) es la fila de una lista de datos. Con [onClick] la fila entera es un botón para TalkBack.
 *
 * `leading` y `onClick` no están en React ni en SwiftUI: los pide la fila de una lista de ajustes de Android.
 *
 * ```kotlin
 * BrandListItem(
 *     secondary = { BrandText("Avisos de la comunidad") },
 *     trailing = { BrandIcon(BrandIconName.Chevron, size = BrandIconSize.Sm) },
 *     onClick = { open() },
 * ) { BrandText("Notificaciones") }
 * ```
 */
@Composable
fun BrandListItem(
    modifier: Modifier = Modifier,
    secondary: (@Composable () -> Unit)? = null,
    leading: (@Composable () -> Unit)? = null,
    trailing: (@Composable () -> Unit)? = null,
    onClick: (() -> Unit)? = null,
    content: @Composable () -> Unit,
) {
    val clickable = if (onClick != null) Modifier.clickable(role = Role.Button, onClick = onClick) else Modifier
    // La fila fija su propia tinta y tipografía: fuera de un `BrandList` (una fila suelta en una pantalla) el
    // contenido no hereda nada y el texto de `BrandListItem(text)` (un `BasicText` sin color) saldría negro en oscuro.
    val color = T.listColor.current
    ProvideBrandContent(
        color = color,
        textStyle = brandTextStyle(T.listFontSize, T.listFontWeight, T.listLineHeight, T.listLetterSpacing, color = color),
    ) {
        Row(
            modifier = modifier.fillMaxWidth().then(clickable),
            horizontalArrangement = Arrangement.spacedBy(T.listItemGap),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            if (leading != null) leading()
            Column(Modifier.weight(1f)) {
                content()
                if (secondary != null) {
                    val secondaryColor = T.listSecondaryColor.current
                    ProvideBrandContent(
                        color = secondaryColor,
                        textStyle = brandTextStyle(T.listSecondaryFontSize, T.listFontWeight, T.listSecondaryLineHeight, T.listLetterSpacing, color = secondaryColor),
                    ) { secondary() }
                }
            }
            if (trailing != null) trailing()
        }
    }
}

/** Un ítem de texto con línea secundaria opcional ([subtitle]). */
@Composable
fun BrandListItem(
    text: String,
    modifier: Modifier = Modifier,
    subtitle: String? = null,
    leading: (@Composable () -> Unit)? = null,
    trailing: (@Composable () -> Unit)? = null,
    onClick: (() -> Unit)? = null,
) {
    BrandListItem(
        modifier = modifier,
        secondary = subtitle?.let { { BrandBasicText(it, style = LocalBrandTextStyle.current) } },
        leading = leading,
        trailing = trailing,
        onClick = onClick,
    ) { BrandBasicText(text, style = LocalBrandTextStyle.current) }
}
