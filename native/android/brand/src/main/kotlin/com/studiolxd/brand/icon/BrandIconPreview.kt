package com.studiolxd.brand.icon

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.tooling.preview.Preview
import com.studiolxd.brand.support.BrandPreviewSurface
import com.studiolxd.brand.tokens.BrandSpacing

@Composable
internal fun IconPreviewContent() {
    Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s4)) {
        Row(horizontalArrangement = Arrangement.spacedBy(BrandSpacing.s4), verticalAlignment = Alignment.CenterVertically) {
            BrandIconSize.entries.forEach { BrandIcon(BrandIconName.Search, size = it) }
        }
        FlowRow(horizontalArrangement = Arrangement.spacedBy(BrandSpacing.s3), verticalArrangement = Arrangement.spacedBy(BrandSpacing.s3)) {
            BrandIconName.entries.forEach { BrandIcon(it) }
        }
    }
}

@Preview(name = "Iconos — claro", showBackground = true)
@Composable
internal fun IconPreviewLight() = BrandPreviewSurface(dark = false) { IconPreviewContent() }

@Preview(name = "Iconos — oscuro", showBackground = true)
@Composable
internal fun IconPreviewDark() = BrandPreviewSurface(dark = true) { IconPreviewContent() }
