package com.studiolxd.brand

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.text.BasicText
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import com.studiolxd.brand.components.button.BrandButton
import com.studiolxd.brand.components.button.BrandButtonImpl
import com.studiolxd.brand.components.button.ButtonSize
import com.studiolxd.brand.components.button.ButtonTone
import com.studiolxd.brand.components.button.ButtonVariant
import com.studiolxd.brand.components.closebutton.BrandCloseButton
import com.studiolxd.brand.icon.BrandIconName
import com.studiolxd.brand.support.BrandInteractionState
import com.studiolxd.brand.support.LocalBrandTextStyle
import com.studiolxd.brand.tokens.BrandSpacing
import org.junit.Rule
import org.junit.Test

/** Un botón con su etiqueta y un estado de interacción fijado (pulsado, hover o foco). */
@Composable
private fun StatefulButton(label: String, variant: ButtonVariant, state: BrandInteractionState, destructive: Boolean = false) {
    BrandButtonImpl(
        onClick = {}, modifier = Modifier, variant = variant, tone = ButtonTone.Accent, size = null, destructive = destructive,
        block = false, iconOnly = false, enabled = true, contentDescription = null, interactionSource = null, stateOverride = state,
    ) { BasicText(label, style = LocalBrandTextStyle.current) }
}

/**
 * Capturas de `Button`: cada variante en reposo, deshabilitada y destructiva (outline/text), los estados pulsado, hover
 * y foco, las tres tallas, el botón de solo icono y el de ancho completo, y el aspa. Claro y oscuro.
 * Graba con `./gradlew :brand:recordPaparazziDebug`; `./gradlew build` las verifica.
 */
class ButtonSnapshotTest {
    @get:Rule
    val variants = brandPaparazzi(460, 460)

    @Test
    fun variants() = variants.brandSnapshots {
        Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s4)) {
            ButtonVariant.entries.forEach { variant ->
                Row(horizontalArrangement = Arrangement.spacedBy(BrandSpacing.s4), verticalAlignment = Alignment.CenterVertically) {
                    BrandButton("Guardar", onClick = {}, variant = variant)
                    BrandButton("Eliminar", onClick = {}, variant = variant, destructive = true)
                    BrandButton("Desactivado", onClick = {}, variant = variant, enabled = false)
                }
            }
            BrandButton("Tinta", onClick = {}, variant = ButtonVariant.Text, tone = ButtonTone.Ink)
        }
    }
}

class ButtonStatesSnapshotTest {
    @get:Rule
    val paparazzi = brandPaparazzi(420, 460)

    @Test
    fun states() = paparazzi.brandSnapshots {
        Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s5)) {
            ButtonVariant.entries.forEach { variant ->
                Row(horizontalArrangement = Arrangement.spacedBy(BrandSpacing.s5), verticalAlignment = Alignment.CenterVertically) {
                    StatefulButton("Pulsado", variant, BrandInteractionState(pressed = true))
                    StatefulButton("Hover", variant, BrandInteractionState(hovered = true))
                    StatefulButton("Foco", variant, BrandInteractionState(focused = true, focusVisible = true))
                }
            }
            Row(horizontalArrangement = Arrangement.spacedBy(BrandSpacing.s5)) {
                StatefulButton("Pulsado", ButtonVariant.Outline, BrandInteractionState(pressed = true), destructive = true)
                StatefulButton("Foco", ButtonVariant.Outline, BrandInteractionState(focusVisible = true), destructive = true)
            }
        }
    }
}

class ButtonSizesSnapshotTest {
    @get:Rule
    val paparazzi = brandPaparazzi(460, 460)

    @Test
    fun sizesIconOnlyAndBlock() = paparazzi.brandSnapshots {
        Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s3)) {
            listOf(ButtonVariant.Primary, ButtonVariant.Outline).forEach { variant ->
                Row(horizontalArrangement = Arrangement.spacedBy(BrandSpacing.s4), verticalAlignment = Alignment.CenterVertically) {
                    ButtonSize.entries.forEach { size ->
                        BrandButton(if (size == ButtonSize.Sm) "Small" else if (size == ButtonSize.Md) "Medium" else "Large", onClick = {}, variant = variant, size = size)
                    }
                }
            }
            Row(horizontalArrangement = Arrangement.spacedBy(BrandSpacing.s3), verticalAlignment = Alignment.CenterVertically) {
                ButtonSize.entries.forEach { size -> BrandButton(BrandIconName.Plus, "Añadir", onClick = {}, variant = ButtonVariant.Outline, size = size) }
                BrandButton(BrandIconName.Close, "Cerrar", onClick = {}, variant = ButtonVariant.Ghost)
                BrandButton(BrandIconName.Search, "Buscar", onClick = {})
            }
            Row(horizontalArrangement = Arrangement.spacedBy(BrandSpacing.s3), verticalAlignment = Alignment.CenterVertically) {
                BrandButton("Con icono", onClick = {}, icon = BrandIconName.Plus, variant = ButtonVariant.Outline)
                BrandCloseButton(onClick = {})
                BrandCloseButton(onClick = {}, size = ButtonSize.Sm)
            }
            BrandButton("A ancho completo", onClick = {}, block = true)
        }
    }
}

/** Las capturas de la pareja con Storybook (`atoms-button--primary`, un botón suelto por variante). */
class ButtonComparisonSnapshotTest {
    @get:Rule
    val paparazzi = brandPaparazzi(160, 160)

    @Test
    fun singles() {
        ButtonVariant.entries.forEach { variant ->
            paparazzi.brandSnapshots("compare-${variant.value}") { BrandButton("Guardar", onClick = {}, variant = variant) }
        }
    }
}
