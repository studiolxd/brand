package com.studiolxd.brand.components.tag

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.runtime.Composable
import androidx.compose.ui.tooling.preview.Preview
import com.studiolxd.brand.support.BrandPreviewSurface
import com.studiolxd.brand.tokens.BrandSpacing

@Composable
internal fun TagPreviewContent() {
    Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s2)) {
        TagVariant.entries.forEach { variant -> BrandTag(variant.value, variant = variant) }
    }
}

@Preview(name = "Tag — claro", showBackground = true, widthDp = 240, heightDp = 400)
@Composable
internal fun TagPreviewLight() = BrandPreviewSurface(dark = false) { TagPreviewContent() }

@Preview(name = "Tag — oscuro", showBackground = true, widthDp = 240, heightDp = 400)
@Composable
internal fun TagPreviewDark() = BrandPreviewSurface(dark = true) { TagPreviewContent() }
