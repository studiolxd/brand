package com.studiolxd.brand

import com.studiolxd.brand.components.banner.BannerVariant
import com.studiolxd.brand.components.datepickerfield.DatePickerFieldSize
import com.studiolxd.brand.components.menu.ContextMenuTriggerOrientation
import com.studiolxd.brand.components.menu.ContextMenuTriggerSize
import com.studiolxd.brand.components.tabs.TabsOrientation
import com.studiolxd.brand.components.tabs.TabsVariant
import com.studiolxd.brand.components.text.HeadingLevel
import com.studiolxd.brand.components.text.HeadingSize

/**
 * Paridad de R6: Banner, Menu, ContextMenu, Tabs (la ficha de `Tabs`, la de `TabsList` y la de `TabsTrigger`),
 * DatePickerField y PageIntro. `Menu` y `TabsTrigger` no tienen props de unión: su entrada va vacía.
 */
internal val parityR6: Map<String, Map<String, List<String>>> = mapOf(
    "Banner" to mapOf(
        "variant" to BannerVariant.entries.map { it.value },
    ),
    "Menu" to emptyMap(),
    "ContextMenu" to mapOf(
        "triggerSize" to ContextMenuTriggerSize.entries.map { it.value },
        "triggerOrientation" to ContextMenuTriggerOrientation.entries.map { it.value },
    ),
    "Tabs" to mapOf(
        "orientation" to TabsOrientation.entries.map { it.value },
    ),
    "TabsList" to mapOf(
        "variant" to TabsVariant.entries.map { it.value },
    ),
    "TabsTrigger" to emptyMap(),
    "DatePickerField" to mapOf(
        "size" to DatePickerFieldSize.entries.map { it.value },
    ),
    "PageIntro" to mapOf(
        "level" to HeadingLevel.entries.map { it.value },
        "size" to HeadingSize.entries.map { it.value },
    ),
)
