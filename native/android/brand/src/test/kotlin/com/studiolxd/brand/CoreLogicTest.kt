package com.studiolxd.brand

import com.studiolxd.brand.components.button.ButtonSize
import com.studiolxd.brand.components.button.ButtonTone
import com.studiolxd.brand.components.button.ButtonVariant
import com.studiolxd.brand.components.text.HeadingLevel
import com.studiolxd.brand.components.text.HeadingSize
import com.studiolxd.brand.icon.BrandIconName
import com.studiolxd.brand.support.BrandHitTarget
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

/** Lógica de los componentes base que no necesita pintarse: valores de los enums, catálogo de iconos y zona táctil. */
class CoreLogicTest {
    @Test
    fun enumValuesMatchReact() {
        assertEquals(listOf("primary", "outline", "ghost", "text"), ButtonVariant.entries.map { it.value })
        assertEquals(listOf("accent", "ink"), ButtonTone.entries.map { it.value })
        assertEquals(listOf("sm", "md", "lg"), ButtonSize.entries.map { it.value })
        assertEquals((1..6).map { it.toString() }, HeadingLevel.entries.map { it.value })
        assertEquals((1..10).map { it.toString() }, HeadingSize.entries.map { it.value })
    }

    @Test
    fun iconCatalogHasEveryIconOfReactWithUniqueNames() {
        assertEquals(77, BrandIconName.entries.size)
        assertEquals(BrandIconName.entries.size, BrandIconName.entries.map { it.value }.toSet().size)
        assertEquals("arrow-left", BrandIconName.ArrowLeft.value)
    }

    @Test
    fun hitTargetIsTheAndroidMinimum() {
        assertTrue(BrandHitTarget.minimum.value == 48f)
    }
}
