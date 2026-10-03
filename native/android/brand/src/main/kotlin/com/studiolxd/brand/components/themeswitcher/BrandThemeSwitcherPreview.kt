package com.studiolxd.brand.components.themeswitcher

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.studiolxd.brand.components.field.BrandDropdownSurface
import com.studiolxd.brand.support.BrandControlSize
import com.studiolxd.brand.support.BrandPreviewSurface
import com.studiolxd.brand.tokens.BrandSpacing

/** Todas las variantes de `ThemeSwitcher`: compact (en línea y apilado), list, icon y las tres tallas. */
@Composable
internal fun ThemeSwitcherPreviewContent() {
    var theme by remember { mutableStateOf(BrandThemeChoice.System) }
    Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s5)) {
        BrandThemeSwitcher(theme, { theme = it })
        BrandThemeSwitcher(theme, { theme = it }, layout = ThemeSwitcherLayout.Stacked)
        BrandThemeSwitcher(theme, { theme = it }, variant = ThemeSwitcherVariant.List)
        BrandThemeSwitcher(theme, { theme = it }, variant = ThemeSwitcherVariant.Icon)
        BrandControlSize.entries.forEach { size ->
            BrandThemeSwitcher(theme, { theme = it }, size = size)
        }
        BrandDropdownSurface(minWidth = 160.dp) { ThemeMenuContent(BrandThemeChoice.Dark, ThemeSwitcherLabels()) {} }
    }
}

@Preview(name = "ThemeSwitcher — claro", showBackground = true, widthDp = 360, heightDp = 640)
@Composable
internal fun ThemeSwitcherPreviewLight() = BrandPreviewSurface(dark = false) { ThemeSwitcherPreviewContent() }

@Preview(name = "ThemeSwitcher — oscuro", showBackground = true, widthDp = 360, heightDp = 640)
@Composable
internal fun ThemeSwitcherPreviewDark() = BrandPreviewSurface(dark = true) { ThemeSwitcherPreviewContent() }
