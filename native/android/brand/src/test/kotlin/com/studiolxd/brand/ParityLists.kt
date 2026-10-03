package com.studiolxd.brand

import com.studiolxd.brand.components.emptystate.EmptyStateSize
import com.studiolxd.brand.components.list.ListType
import com.studiolxd.brand.components.tag.TagVariant

/** Paridad de List, ListItem, Tag, EmptyState y Skeleton. Cada entrada: nombre de la ficha → prop `union` → `value` de los casos. */
internal val parityLists: Map<String, Map<String, List<String>>> = mapOf(
    "List" to mapOf("type" to ListType.entries.map { it.value }),
    "ListItem" to emptyMap(),
    "Tag" to mapOf("variant" to TagVariant.entries.map { it.value }),
    "EmptyState" to mapOf("size" to EmptyStateSize.entries.map { it.value }),
    "Skeleton" to emptyMap(),
)
