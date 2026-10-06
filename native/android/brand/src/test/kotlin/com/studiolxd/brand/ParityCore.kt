package com.studiolxd.brand

import com.studiolxd.brand.components.button.ButtonSize
import com.studiolxd.brand.components.button.ButtonTone
import com.studiolxd.brand.components.button.ButtonVariant
import com.studiolxd.brand.components.text.HeadingLevel
import com.studiolxd.brand.components.text.HeadingSize
import com.studiolxd.brand.components.text.ParagraphSize
import com.studiolxd.brand.components.text.TextElement
import com.studiolxd.brand.components.text.TextTone
import com.studiolxd.brand.support.BrandControlSize

/** Paridad de los componentes base: Button, CloseButton, Heading, Paragraph, Text. */
internal val parityCore: Map<String, Map<String, List<String>>> = mapOf(
    "Button" to mapOf(
        "variant" to ButtonVariant.entries.map { it.value },
        "tone" to ButtonTone.entries.map { it.value },
        "size" to ButtonSize.entries.map { it.value },
    ),
    "CloseButton" to mapOf(
        "size" to BrandControlSize.entries.map { it.value },
    ),
    "Heading" to mapOf(
        "level" to HeadingLevel.entries.map { it.value },
        "size" to HeadingSize.entries.map { it.value },
    ),
    "Paragraph" to mapOf(
        "size" to ParagraphSize.entries.map { it.value },
    ),
    "Text" to mapOf(
        "as" to TextElement.entries.map { it.value },
        "tone" to TextTone.entries.map { it.value },
    ),
)
