package com.studiolxd.brand

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.ui.Alignment
import com.studiolxd.brand.icon.BrandIcon
import com.studiolxd.brand.icon.BrandIconName
import com.studiolxd.brand.icon.BrandIconSize
import com.studiolxd.brand.tokens.BrandSpacing
import org.junit.Rule
import org.junit.Test

/** Capturas de `Icon`: las seis tallas y el catálogo entero (77 iconos), claro y oscuro. */
class IconSnapshotTest {
    @get:Rule
    val paparazzi = brandPaparazzi(400, 460)

    @Test
    fun sizesAndCatalog() = paparazzi.brandSnapshots {
        Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s4)) {
            Row(horizontalArrangement = Arrangement.spacedBy(BrandSpacing.s4), verticalAlignment = Alignment.CenterVertically) {
                BrandIconSize.entries.forEach { BrandIcon(BrandIconName.Search, size = it) }
            }
            FlowRow(horizontalArrangement = Arrangement.spacedBy(BrandSpacing.s3), verticalArrangement = Arrangement.spacedBy(BrandSpacing.s3)) {
                BrandIconName.entries.forEach { BrandIcon(it) }
            }
        }
    }
}
