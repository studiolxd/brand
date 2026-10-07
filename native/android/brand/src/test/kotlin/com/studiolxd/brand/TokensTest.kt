package com.studiolxd.brand

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.studiolxd.brand.tokens.BrandBorderWidth
import com.studiolxd.brand.tokens.BrandColorRoles
import com.studiolxd.brand.tokens.BrandColors
import com.studiolxd.brand.tokens.BrandDuration
import com.studiolxd.brand.tokens.BrandFontSize
import com.studiolxd.brand.tokens.BrandFontWeight
import com.studiolxd.brand.tokens.BrandRadius
import com.studiolxd.brand.tokens.BrandSize
import com.studiolxd.brand.tokens.BrandSpacing
import com.studiolxd.brand.support.brandBaseTextStyle
import com.studiolxd.brand.support.brandTextStyle
import com.studiolxd.brand.typography.BrandTypography
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotEquals

class TokensTest {
    @Test
    fun scalesUseRemTimesSixteen() {
        assertEquals(4.dp, BrandSpacing.s1)
        assertEquals(16.dp, BrandSpacing.s4)
        assertEquals(16.sp, BrandFontSize.s2)
        assertEquals(40.dp, BrandSize.componentMd)
        assertEquals(9999.dp, BrandRadius.round)
        assertEquals(2.dp, BrandBorderWidth.focus)
        assertEquals(300, BrandFontWeight.default.weight)
        assertEquals(500, BrandFontWeight.emphasis.weight)
        assertEquals(150, BrandDuration.fast)
    }

    @Test
    fun roleHasADistinctLightAndDarkValue() {
        // text.on-light = prusia; text.on-dark = blanco.
        assertEquals(Color(0xFF111E30), BrandColorRoles.light.text)
        assertEquals(Color(0xFFFFFFFF), BrandColorRoles.dark.text)
        assertNotEquals(BrandColorRoles.light.errorText, BrandColorRoles.dark.errorText)
        assertEquals(BrandColors.errorFill, Color(0xFFB30000))
    }

    @Test
    fun textStylesAreBuiltFromTokens() {
        assertEquals(16.sp, BrandTypography.body.fontSize)
        assertEquals(24.sp, BrandTypography.body.lineHeight)
        assertEquals(BrandFontWeight.emphasis, BrandTypography.heading1.fontWeight)
    }

    /** `brandTextStyle` queda obsoleto (D60) pero sin cambiar lo que devuelve: las pantallas que lo usan no se mueven. */
    @Test
    @Suppress("DEPRECATION")
    fun deprecatedTextStyleKeepsItsOutput() {
        val old = brandTextStyle(BrandFontSize.s6, BrandFontWeight.emphasis, 1.1f, -0.02f, color = Color.Red)
        assertEquals(brandBaseTextStyle(BrandFontSize.s6, BrandFontWeight.emphasis, 1.1f, -0.02f, color = Color.Red), old)
    }
}
