package com.studiolxd.brand

import com.studiolxd.brand.components.inputfield.InputFieldKind
import com.studiolxd.brand.components.inputfield.InputFieldSize
import com.studiolxd.brand.components.inputfield.InputFieldType
import com.studiolxd.brand.components.numberinputfield.NumberInputCommitMode
import com.studiolxd.brand.components.numberinputfield.NumberInputFieldSize
import com.studiolxd.brand.components.passwordfield.PasswordFieldSize
import com.studiolxd.brand.components.selectfield.SelectFieldSize
import com.studiolxd.brand.components.themeswitcher.BrandThemeChoice
import com.studiolxd.brand.components.themeswitcher.ThemeSwitcherLayout
import com.studiolxd.brand.components.themeswitcher.ThemeSwitcherVariant
import com.studiolxd.brand.components.togglegroup.ToggleGroupOrientation
import com.studiolxd.brand.components.togglegroup.ToggleGroupSize
import com.studiolxd.brand.support.BrandControlSize

/** Paridad de los campos: InputField, NumberInputField, PasswordField, SelectField, SwitcherField, ToggleGroup y ThemeSwitcher. */
internal val parityFields: Map<String, Map<String, List<String>>> = mapOf(
    "InputField" to mapOf(
        "type" to InputFieldType.entries.map { it.value },
        "kind" to InputFieldKind.entries.map { it.value },
        "size" to InputFieldSize.entries.map { it.value },
    ),
    "NumberInputField" to mapOf(
        "size" to NumberInputFieldSize.entries.map { it.value },
        "commitMode" to NumberInputCommitMode.entries.map { it.value },
    ),
    "PasswordField" to mapOf(
        "size" to PasswordFieldSize.entries.map { it.value },
    ),
    "SelectField" to mapOf(
        "size" to SelectFieldSize.entries.map { it.value },
    ),
    "SwitcherField" to mapOf(
        "size" to BrandControlSize.entries.map { it.value },
    ),
    "ToggleGroup" to mapOf(
        "size" to ToggleGroupSize.entries.map { it.value },
        "orientation" to ToggleGroupOrientation.entries.map { it.value },
    ),
    "ThemeSwitcher" to mapOf(
        "value" to BrandThemeChoice.entries.map { it.value },
        "variant" to ThemeSwitcherVariant.entries.map { it.value },
        "layout" to ThemeSwitcherLayout.entries.map { it.value },
        "size" to BrandControlSize.entries.map { it.value },
    ),
)
