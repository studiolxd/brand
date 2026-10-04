package com.studiolxd.brand

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.studiolxd.brand.components.emptystate.BrandEmptyState
import com.studiolxd.brand.components.emptystate.EmptyStateAction
import com.studiolxd.brand.components.emptystate.EmptyStateSize
import com.studiolxd.brand.components.list.BrandList
import com.studiolxd.brand.components.list.BrandListItem
import com.studiolxd.brand.components.list.ListType
import com.studiolxd.brand.components.skeleton.FrozenSkeleton
import com.studiolxd.brand.components.tag.BrandTag
import com.studiolxd.brand.components.tag.TagVariant
import com.studiolxd.brand.components.text.BrandText
import com.studiolxd.brand.components.text.TextTone
import com.studiolxd.brand.icon.BrandIcon
import com.studiolxd.brand.icon.BrandIconName
import com.studiolxd.brand.icon.BrandIconSize
import com.studiolxd.brand.tokens.BrandSpacing
import com.studiolxd.brand.tokens.BrandTextTokens
import org.junit.Rule
import org.junit.Test
import kotlin.test.assertEquals

/** Capturas de List, Tag, EmptyState y Skeleton, en claro y oscuro. Graba con `./gradlew :brand:recordPaparazziDebug`. */
class ListsSnapshotTest {
    @get:Rule
    val paparazzi = brandPaparazzi(380, 640)

    @Test
    fun listTypes() = paparazzi.brandSnapshots {
        Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s5)) {
            ListType.entries.forEach { type ->
                BrandList(type = type) {
                    item("Primer elemento de la lista")
                    item("Segundo elemento de la lista")
                    item("Tercer elemento de la lista")
                }
            }
        }
    }

    @Test
    fun listNested() = paparazzi.brandSnapshots {
        BrandList {
            item("Planta baja")
            item {
                Column(verticalArrangement = Arrangement.spacedBy(BrandTextTokens.listGap)) {
                    BrandText("Primera planta")
                    BrandList(type = ListType.Ordered) {
                        item("Dormitorio")
                        item("Baño")
                    }
                }
            }
            item("Ático")
        }
    }

    @Test
    fun listRowsWithSeparators() = paparazzi.brandSnapshots {
        BrandList(type = ListType.Plain, showSeparators = true) {
            item {
                BrandListItem(
                    secondary = { BrandText("Avisos de la comunidad") },
                    trailing = { BrandIcon(BrandIconName.Chevron, size = BrandIconSize.Sm) },
                    onClick = {},
                ) { BrandText("Notificaciones") }
            }
            item { BrandListItem(trailing = { BrandText("Español", tone = TextTone.Muted) }) { BrandText("Idioma") } }
            item {
                BrandListItem(
                    "Gastos del mes", subtitle = "Actualizado hoy",
                    leading = { BrandIcon(BrandIconName.Folder) },
                    trailing = { BrandTag("Pagado", variant = TagVariant.Success) },
                )
            }
            item("Cerrar sesión")
        }
    }

    @Test
    fun listRowsWithLeading() = paparazzi.brandSnapshots {
        BrandList(type = ListType.Plain, showSeparators = true) {
            item {
                BrandListItem(
                    secondary = { BrandText("Avisos de la comunidad") },
                    leading = { BrandIcon(BrandIconName.Bell) },
                    trailing = { BrandIcon(BrandIconName.ChevronRight, size = BrandIconSize.Sm) },
                    onClick = {},
                ) { BrandText("Notificaciones") }
            }
            item {
                BrandListItem(leading = { BrandIcon(BrandIconName.Languages) }, trailing = { BrandText("Español", tone = TextTone.Muted) }) { BrandText("Idioma") }
            }
            item { BrandListItem(leading = { BrandIcon(BrandIconName.Key) }) { BrandText("Seguridad") } }
        }
    }

    /** Filas fuera de `BrandList`: toman la tinta del esquema (en oscuro, blanca), no el negro de `BasicText`. */
    @Test
    fun listItemOutsideList() = paparazzi.brandSnapshots {
        Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s2)) {
            BrandListItem(secondary = { BrandText("Avisos de la comunidad") }, trailing = { BrandText("Sí") }) { BrandText("Notificaciones") }
            BrandListItem("Idioma", subtitle = "Español")
        }
    }

    @Test
    fun tagVariants() = paparazzi.brandSnapshots {
        Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s2)) {
            TagVariant.entries.forEach { variant -> BrandTag(variant.value, variant = variant) }
        }
    }

    @Test
    fun emptyStates() = paparazzi.brandSnapshots {
        Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s2)) {
            BrandEmptyState(title = "Sin resultados")
            BrandEmptyState(title = "Sin proyectos", description = "Esta carpeta está vacía. Crea un proyecto para empezar.", icon = BrandIconName.Folder)
            BrandEmptyState(
                title = "Sin datos", description = "No hay datos disponibles.", icon = BrandIconName.Folder, size = EmptyStateSize.Sm,
                action = EmptyStateAction("Añadir") {},
            )
            BrandEmptyState(
                title = "Sin viviendas", description = "Añade tu primera vivienda para empezar.", icon = BrandIconName.Search,
                action = EmptyStateAction("Añadir vivienda") {},
            )
        }
    }

    @Test
    fun skeletons() = paparazzi.brandSnapshots {
        Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s3)) {
            FrozenSkeleton(0.4f)
            FrozenSkeleton(0.5f, width = 160.dp)
            FrozenSkeleton(0.6f, height = 44.dp)
            Row(horizontalArrangement = Arrangement.spacedBy(BrandSpacing.s3)) {
                FrozenSkeleton(0.5f, width = 48.dp, height = 48.dp, circle = true)
                Column(Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(BrandSpacing.s2)) {
                    FrozenSkeleton(0.5f)
                    FrozenSkeleton(0.5f, width = 120.dp)
                }
            }
            // «Quitar animaciones»: sin fase, el bloque es el fondo plano.
            FrozenSkeleton(null, width = 200.dp, height = 24.dp)
        }
    }
}

/** Las parejas con Storybook (`native/android/Comparisons/`): los mismos casos y lienzos que `native/apple/Comparisons/`. */
class ListsComparisonSnapshotTest {
    @get:Rule
    val paparazzi = brandPaparazzi(160, 160)

    @Test
    fun list() {
        listOf(ListType.Unordered, ListType.Ordered).forEach { type ->
            paparazzi.brandComparison(type.value, 340, 130) {
                BrandList(type = type) {
                    item("Primer elemento de la lista")
                    item("Segundo elemento de la lista")
                    item("Tercer elemento de la lista")
                }
            }
        }
    }

    @Test
    fun listLeading() = paparazzi.brandComparison("list-leading", 480, 161) {
        BrandList(type = ListType.Plain, showSeparators = true) {
            item {
                BrandListItem(
                    secondary = { BrandText("Avisos de la comunidad") },
                    leading = { BrandIcon(BrandIconName.Bell) },
                    trailing = { BrandIcon(BrandIconName.ChevronRight, size = BrandIconSize.Sm) },
                ) { BrandText("Notificaciones") }
            }
            item {
                BrandListItem(leading = { BrandIcon(BrandIconName.Languages) }, trailing = { BrandText("Español") }) { BrandText("Idioma") }
            }
            item { BrandListItem(leading = { BrandIcon(BrandIconName.Key) }) { BrandText("Seguridad") } }
        }
    }

    @Test
    fun tag() {
        paparazzi.brandComparison("variants", 560, 114) {
            @Composable
            fun tag(text: String, variant: TagVariant) = BrandTag(text, variant = variant)
            Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s2)) {
                Row(horizontalArrangement = Arrangement.spacedBy(BrandSpacing.s2)) {
                    tag("Diseño instruccional", TagVariant.Primary); tag("Formación presencial", TagVariant.Accent1); tag("Plataformas LMS", TagVariant.Accent2)
                }
                Row(horizontalArrangement = Arrangement.spacedBy(BrandSpacing.s2)) {
                    tag("Consultoría", TagVariant.Support1); tag("E-learning", TagVariant.Support2); tag("Por hacer", TagVariant.Neutral)
                    tag("En progreso", TagVariant.Info); tag("En pausa", TagVariant.Warning)
                }
                Row(horizontalArrangement = Arrangement.spacedBy(BrandSpacing.s2)) {
                    tag("Completado", TagVariant.Success); tag("Cancelado", TagVariant.Danger)
                }
            }
        }
    }

    @Test
    fun emptyState() {
        paparazzi.brandComparison("icon-description", 360, 300) {
            BrandEmptyState(title = "Sin proyectos", description = "Esta carpeta está vacía. Crea un proyecto para empezar.", icon = BrandIconName.Folder)
        }
        paparazzi.brandComparison("sm-action", 360, 300) {
            BrandEmptyState(
                title = "Sin datos", description = "No hay datos disponibles.", icon = BrandIconName.Folder, size = EmptyStateSize.Sm,
                action = EmptyStateAction("Añadir") {},
            )
        }
    }

    @Test
    fun skeleton() {
        paparazzi.brandComparison("ficha", 320, 190) {
            Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s3)) {
                FrozenSkeleton(0.4f)
                FrozenSkeleton(0.5f, width = 160.dp)
                FrozenSkeleton(0.6f, height = 44.dp)
                Row(horizontalArrangement = Arrangement.spacedBy(BrandSpacing.s3)) {
                    FrozenSkeleton(0.5f, width = 48.dp, height = 48.dp, circle = true)
                    Column(Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(BrandSpacing.s2)) {
                        FrozenSkeleton(0.5f)
                        FrozenSkeleton(0.5f, width = 120.dp)
                    }
                }
            }
        }
    }
}

class ListsLogicTest {
    @Test
    fun enumValuesMatchReact() {
        assertEquals(listOf("unordered", "ordered", "plain"), ListType.entries.map { it.value })
        assertEquals(listOf("sm", "md"), EmptyStateSize.entries.map { it.value })
        assertEquals(
            listOf("primary", "accent-1", "accent-2", "support-1", "support-2", "neutral", "info", "warning", "success", "danger"),
            TagVariant.entries.map { it.value },
        )
    }
}
