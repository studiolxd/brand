package com.studiolxd.brand.components.switcherfield

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.text.BasicText
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.semantics.error
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.TextUnit
import com.studiolxd.brand.components.field.brandAlert
import com.studiolxd.brand.support.BrandControlSize
import com.studiolxd.brand.support.brandTextStyle
import com.studiolxd.brand.support.resolve
import com.studiolxd.brand.tokens.BrandSwitcherFieldTokens as F

/**
 * El `Switcher` como campo: interruptor, texto, ayuda y error (el `SwitcherField` de React).
 *
 * ```kotlin
 * BrandSwitcherField("Avisarme por correo", notify, { notify = it }, helperText = "Un resumen al día.")
 * BrandSwitcherField("Acepto las condiciones", accepted, { accepted = it }, errorMessage = "Debes aceptarlas.")
 * ```
 *
 * Toda la fila conmuta (pista y texto). **TalkBack**: es un interruptor (`Role.Switch`); con error lleva `error()` y
 * el mensaje se **anuncia** al aparecer (región viva asertiva, el `role="alert"` de la web); la ayuda es un texto
 * que se lee a continuación. `required` y `name` no existen en nativo (ver la ficha de paridad).
 *
 * @param labelHidden oculta la etiqueta pero la deja como nombre accesible (filas de una tabla de preferencias).
 * @param size sin valor, la del entorno ([com.studiolxd.brand.support.ProvideBrandControlSize]) y, si tampoco hay, `md`.
 * @param error marca el control en error sin mensaje; un [errorMessage] ya lo implica.
 * @param invalidLabel lo que lee TalkBack cuando está en [error] sin [errorMessage]. Castellano por defecto.
 */
@Composable
fun BrandSwitcherField(
    label: String,
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit,
    modifier: Modifier = Modifier,
    labelHidden: Boolean = false,
    size: BrandControlSize? = null,
    enabled: Boolean = true,
    error: Boolean = false,
    errorMessage: String? = null,
    helperText: String? = null,
    invalidLabel: String = "Valor no válido",
) {
    val resolved = size.resolve()
    val hasError = error || errorMessage != null
    val labelFontSize: TextUnit = when (resolved) {
        BrandControlSize.Sm -> F.smLabelFontSize
        BrandControlSize.Md -> F.labelFontSize
        BrandControlSize.Lg -> F.lgLabelFontSize
    }

    Column(modifier.fillMaxWidth(), verticalArrangement = Arrangement.spacedBy(F.stackGap)) {
        BrandSwitcher(
            checked = checked,
            onCheckedChange = onCheckedChange,
            modifier = Modifier.semantics {
                if (hasError) error(errorMessage ?: invalidLabel)
            },
            size = resolved,
            error = hasError,
            enabled = enabled,
            contentDescription = if (labelHidden) label else null,
            label = if (labelHidden) null else ({
                BasicText(
                    label,
                    style = brandTextStyle(labelFontSize, F.labelFontWeight, F.labelLineHeight, F.labelLetterSpacing, color = F.labelColor.current),
                )
            }),
        )
        if (errorMessage != null) {
            BasicText(
                errorMessage,
                modifier = Modifier.brandAlert(),
                style = brandTextStyle(F.errorFontSize, F.errorFontWeight, F.errorLineHeight, color = F.errorColor.current),
            )
        }
        if (helperText != null) {
            BasicText(
                helperText,
                style = brandTextStyle(F.helperFontSize, F.helperFontWeight, F.helperLineHeight, color = F.helperColor.current),
            )
        }
    }
}
