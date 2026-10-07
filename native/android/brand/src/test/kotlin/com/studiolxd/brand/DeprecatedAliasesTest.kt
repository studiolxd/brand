package com.studiolxd.brand

import com.studiolxd.brand.components.banner.BannerTone
import com.studiolxd.brand.components.banner.BannerVariant
import com.studiolxd.brand.components.tag.TagTone
import com.studiolxd.brand.components.tag.TagVariant
import com.studiolxd.brand.components.text.ParagraphSize
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Test

/**
 * Los alias obsoletos de la v51 (como en React, se retiran en la v52): el nombre viejo devuelve el caso nuevo y no es
 * un caso más del enum.
 */
@Suppress("DEPRECATION")
class DeprecatedAliasesTest {
    @Test
    fun paragraphSizeAliases() {
        assertEquals(ParagraphSize.Sm, ParagraphSize.Small)
        assertEquals(ParagraphSize.Md, ParagraphSize.Default)
        assertEquals(ParagraphSize.Lg, ParagraphSize.Large)
        assertEquals(listOf("sm", "md", "lg"), ParagraphSize.entries.map { it.value })
    }

    @Test
    fun tagDangerIsError() {
        assertEquals(TagTone.Error, TagTone.Danger)
        val variant: TagVariant = TagVariant.Success
        assertEquals(TagTone.Success, variant)
        assertFalse(TagTone.entries.map { it.value }.contains("danger"))
    }

    @Test
    fun bannerVariantIsTone() {
        val variant: BannerVariant = BannerVariant.Warning
        assertEquals(BannerTone.Warning, variant)
    }
}
