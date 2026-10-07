package com.studiolxd.brand.components.togglegroup

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.RowScope
import androidx.compose.foundation.selection.selectableGroup
import androidx.compose.runtime.Composable
import androidx.compose.runtime.Stable
import androidx.compose.ui.Modifier
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.style.TextOverflow
import com.studiolxd.brand.icon.BrandIcon
import com.studiolxd.brand.icon.BrandIconName
import com.studiolxd.brand.icon.BrandIconSize
import com.studiolxd.brand.support.BrandBasicText
import com.studiolxd.brand.support.BrandControlSize
import com.studiolxd.brand.support.LocalBrandTextStyle
import com.studiolxd.brand.tokens.BrandToggleGroupTokens as T

/** `ToggleGroup` `orientation`: en fila (por defecto) o en columna. */
enum class ToggleGroupOrientation(val value: String) {
    Horizontal("horizontal"),
    Vertical("vertical"),
}

/** `ToggleGroup` `size`: la talla de control compartida. */
typealias ToggleGroupSize = BrandControlSize

/**
 * La selección tras pulsar [value]: lo pulsado se suelta; si no, entra (y en exclusivo desplaza a los demás). Como en
 * React, volver a pulsar el elegido lo suelta: la selección exclusiva puede quedar vacía.
 */
internal fun <T> nextToggleSelection(current: Set<T>, value: T, multiple: Boolean): Set<T> =
    if (value in current) current - value else if (multiple) current + value else setOf(value)

/**
 * Lo que el [BrandToggleGroup] ofrece a su contenido: los elementos, que toman la talla del grupo y comparten su
 * selección. Úsalo solo dentro del `content` del grupo.
 */
@Stable
interface BrandToggleGroupScope<T> {
    /** Un elemento con contenido libre (texto, icono…). [iconOnly] lo hace cuadrado y exige [contentDescription]. */
    @Composable
    fun Item(
        value: T,
        modifier: Modifier = Modifier,
        iconOnly: Boolean = false,
        enabled: Boolean = true,
        contentDescription: String? = null,
        content: @Composable RowScope.() -> Unit,
    )

    /** Un elemento con texto: `Item("Mensual", Plan.Monthly)`. */
    @Composable
    fun Item(text: String, value: T, modifier: Modifier = Modifier, enabled: Boolean = true)

    /** Un elemento cuadrado de solo icono: el nombre accesible es obligatorio (`aria-label` en React). */
    @Composable
    fun Item(icon: BrandIconName, contentDescription: String, value: T, modifier: Modifier = Modifier, enabled: Boolean = true)
}

private class ToggleGroupScopeImpl<T>(
    private val selection: Set<T>,
    private val onToggle: (T) -> Unit,
    private val role: ToggleRole,
    private val size: BrandControlSize?,
    private val stretch: Boolean,
) : BrandToggleGroupScope<T> {
    @Composable
    override fun Item(
        value: T,
        modifier: Modifier,
        iconOnly: Boolean,
        enabled: Boolean,
        contentDescription: String?,
        content: @Composable RowScope.() -> Unit,
    ) {
        BrandToggleSurface(
            isOn = value in selection,
            onToggle = { onToggle(value) },
            role = role,
            modifier = modifier,
            size = size,
            stretch = stretch,
            iconOnly = iconOnly,
            enabled = enabled,
            contentDescription = contentDescription,
            interactionSource = null,
            stateOverride = null,
            content = content,
        )
    }

    @Composable
    override fun Item(text: String, value: T, modifier: Modifier, enabled: Boolean) {
        Item(value, modifier, enabled = enabled) {
            BrandBasicText(text, style = LocalBrandTextStyle.current, maxLines = 1, overflow = TextOverflow.Ellipsis)
        }
    }

    @Composable
    override fun Item(icon: BrandIconName, contentDescription: String, value: T, modifier: Modifier, enabled: Boolean) {
        Item(value, modifier, iconOnly = true, enabled = enabled, contentDescription = contentDescription) {
            BrandIcon(icon, size = BrandIconSize.Sm)
        }
    }
}

@Composable
private fun <T> ToggleGroupLayout(
    modifier: Modifier,
    orientation: ToggleGroupOrientation,
    contentDescription: String?,
    exclusive: Boolean,
    scope: BrandToggleGroupScope<T>,
    content: @Composable BrandToggleGroupScope<T>.() -> Unit,
) {
    val semanticsModifier = modifier
        .then(if (exclusive) Modifier.selectableGroup() else Modifier)
        .then(if (contentDescription != null) Modifier.semantics { this.contentDescription = contentDescription } else Modifier)
    when (orientation) {
        ToggleGroupOrientation.Horizontal -> Row(semanticsModifier, horizontalArrangement = Arrangement.spacedBy(T.gap)) { scope.content() }
        ToggleGroupOrientation.Vertical -> Column(semanticsModifier, verticalArrangement = Arrangement.spacedBy(T.gap)) { scope.content() }
    }
}

/**
 * Una serie de toggles que comparten estado (el `ToggleGroup` de React; en Homenize, los `ChoiceChip`): la selección es
 * **exclusiva** por defecto —elegir uno suelta el anterior— y [multiple] la abre a varios. Esta es la forma con un
 * **conjunto** de valores (varios o ninguno); para un único valor opcional, la sobrecarga con `value`.
 *
 * ```kotlin
 * BrandToggleGroup(filters, { filters = it }, multiple = true, size = ToggleGroupSize.Sm) {
 *     Item("Pagadas", Filter.Paid)
 *     Item("Pendientes", Filter.Pending)
 * }
 * ```
 *
 * **TalkBack**: en exclusivo cada elemento es un radio (`Role.RadioButton`, el grupo es `selectableGroup`); en múltiple,
 * una casilla (`Role.Checkbox`). El nombre accesible del grupo es [contentDescription] (el `aria-label` de la web).
 *
 * @param size sin valor toma la del entorno ([com.studiolxd.brand.support.ProvideBrandControlSize]) y, si tampoco hay, `md`.
 */
@Composable
fun <T> BrandToggleGroup(
    selection: Set<T>,
    onSelectionChange: (Set<T>) -> Unit,
    modifier: Modifier = Modifier,
    multiple: Boolean = false,
    size: ToggleGroupSize? = null,
    orientation: ToggleGroupOrientation = ToggleGroupOrientation.Horizontal,
    contentDescription: String? = null,
    content: @Composable BrandToggleGroupScope<T>.() -> Unit,
) {
    val scope = ToggleGroupScopeImpl(
        selection = selection,
        onToggle = { onSelectionChange(nextToggleSelection(selection, it, multiple)) },
        role = if (multiple) ToggleRole.Checkbox else ToggleRole.Radio,
        size = size,
        stretch = orientation == ToggleGroupOrientation.Vertical,
    )
    ToggleGroupLayout(modifier, orientation, contentDescription, !multiple, scope, content)
}

/**
 * Selección **exclusiva** con un valor opcional (`null` = ninguno): la forma habitual de un grupo de opciones.
 *
 * ```kotlin
 * BrandToggleGroup(value = plan, onValueChange = { plan = it }, contentDescription = "Plan") {
 *     Item("Mensual", Plan.Monthly)
 *     Item("Anual", Plan.Yearly)
 * }
 * ```
 */
@Composable
fun <T> BrandToggleGroup(
    value: T?,
    onValueChange: (T?) -> Unit,
    modifier: Modifier = Modifier,
    size: ToggleGroupSize? = null,
    orientation: ToggleGroupOrientation = ToggleGroupOrientation.Horizontal,
    contentDescription: String? = null,
    content: @Composable BrandToggleGroupScope<T>.() -> Unit,
) {
    BrandToggleGroup(
        selection = if (value == null) emptySet() else setOf(value),
        onSelectionChange = { onValueChange(it.firstOrNull()) },
        modifier = modifier,
        multiple = false,
        size = size,
        orientation = orientation,
        contentDescription = contentDescription,
        content = content,
    )
}
