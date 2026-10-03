package com.studiolxd.brand.components.emptystate

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.runtime.Composable
import androidx.compose.ui.tooling.preview.Preview
import com.studiolxd.brand.icon.BrandIconName
import com.studiolxd.brand.support.BrandPreviewSurface
import com.studiolxd.brand.tokens.BrandSpacing

@Composable
internal fun EmptyStatePreviewContent() {
    Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s4)) {
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

@Preview(name = "EmptyState — claro", showBackground = true, widthDp = 392, heightDp = 1000)
@Composable
internal fun EmptyStatePreviewLight() = BrandPreviewSurface(dark = false) { EmptyStatePreviewContent() }

@Preview(name = "EmptyState — oscuro", showBackground = true, widthDp = 392, heightDp = 1000)
@Composable
internal fun EmptyStatePreviewDark() = BrandPreviewSurface(dark = true) { EmptyStatePreviewContent() }
