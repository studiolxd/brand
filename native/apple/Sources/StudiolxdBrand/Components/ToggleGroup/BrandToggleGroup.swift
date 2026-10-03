import SwiftUI

/// `ToggleGroup` `orientation`: en fila (por defecto) o en columna.
public enum ToggleGroupOrientation: String, CaseIterable, Sendable {
    case horizontal, vertical
}

/// Lo que el grupo reparte a sus elementos por el entorno.
struct BrandToggleGroupContext: @unchecked Sendable {
    var isSelected: (AnyHashable) -> Bool
    var toggle: (AnyHashable) -> Void
    var size: BrandControlSize?
    /// En columna los elementos se estiran al ancho del grupo (`align-items: stretch`).
    var stretch: Bool
}

private struct BrandToggleGroupContextKey: EnvironmentKey {
    static let defaultValue: BrandToggleGroupContext? = nil
}

extension EnvironmentValues {
    var brandToggleGroup: BrandToggleGroupContext? {
        get { self[BrandToggleGroupContextKey.self] }
        set { self[BrandToggleGroupContextKey.self] = newValue }
    }
}

/// Una serie de toggles que comparten estado (el `ToggleGroup` de React; en Homenize, los `ChoiceChip`): la selección
/// es **exclusiva** por defecto —elegir uno suelta el anterior— y `multiple` la abre a varios.
///
/// ```swift
/// // exclusivo: la selección es un valor opcional
/// BrandToggleGroup(selection: $plan) {
///     BrandToggleGroupItem("Mensual", value: Plan.monthly)
///     BrandToggleGroupItem("Anual", value: Plan.yearly)
/// }
/// .accessibilityLabel("Plan")
///
/// // múltiple: la selección es un conjunto
/// BrandToggleGroup(selection: $filters, multiple: true, size: .sm) { … }
/// ```
///
/// Como en React, volver a pulsar el elegido lo suelta (la selección exclusiva puede quedar vacía). El **nombre
/// accesible** del grupo lo pone `.accessibilityLabel(_:)`, como el `aria-label` de la web.
public struct BrandToggleGroup<Value: Hashable, Content: View>: View {
    private let selection: Binding<Set<Value>>
    private let multiple: Bool
    private let size: BrandControlSize?
    private let orientation: ToggleGroupOrientation
    private let content: Content

    /// Selección en conjunto (`multiple: true` permite varios; sin él, como mucho uno).
    public init(
        selection: Binding<Set<Value>>,
        multiple: Bool = false,
        size: BrandControlSize? = nil,
        orientation: ToggleGroupOrientation = .horizontal,
        @ViewBuilder content: () -> Content
    ) {
        self.selection = selection
        self.multiple = multiple
        self.size = size
        self.orientation = orientation
        self.content = content()
    }

    /// Selección exclusiva con un valor opcional (`nil` = ninguno).
    public init(
        selection: Binding<Value?>,
        size: BrandControlSize? = nil,
        orientation: ToggleGroupOrientation = .horizontal,
        @ViewBuilder content: () -> Content
    ) {
        self.init(
            selection: Binding(
                get: { selection.wrappedValue.map { [$0] } ?? [] },
                set: { selection.wrappedValue = $0.first }
            ),
            multiple: false,
            size: size,
            orientation: orientation,
            content: content
        )
    }

    public var body: some View {
        let context = BrandToggleGroupContext(
            isSelected: { value in (value.base as? Value).map { selection.wrappedValue.contains($0) } ?? false },
            toggle: { value in
                guard let value = value.base as? Value else { return }
                selection.wrappedValue = Self.nextSelection(selection.wrappedValue, toggling: value, multiple: multiple)
            },
            size: size,
            stretch: orientation == .vertical
        )
        layout
            .environment(\.brandToggleGroup, context)
            .accessibilityElement(children: .contain)
    }

    /// La selección tras pulsar `value`: lo pulsado se suelta; si no, entra (y en exclusivo desplaza a los demás).
    static func nextSelection(_ current: Set<Value>, toggling value: Value, multiple: Bool) -> Set<Value> {
        var next = current
        if next.contains(value) {
            next.remove(value)
        } else {
            if !multiple { next.removeAll() }
            next.insert(value)
        }
        return next
    }

    @ViewBuilder
    private var layout: some View {
        switch orientation {
        case .horizontal:
            HStack(spacing: BrandToggleGroupTokens.gap) { content }
        case .vertical:
            VStack(alignment: .leading, spacing: BrandToggleGroupTokens.gap) { content }
        }
    }
}

/// Un elemento de `BrandToggleGroup`: el `Toggle` de React con su `value`. Toma la talla del grupo.
public struct BrandToggleGroupItem<Value: Hashable, Label: View>: View {
    private let value: Value
    private let iconOnly: Bool
    private let label: Label

    @Environment(\.brandToggleGroup) private var group

    public init(value: Value, iconOnly: Bool = false, @ViewBuilder label: () -> Label) {
        self.value = value
        self.iconOnly = iconOnly
        self.label = label()
    }

    public var body: some View {
        BrandToggleSurface(
            isOn: group?.isSelected(AnyHashable(value)) ?? false,
            size: group?.size,
            stretch: group?.stretch ?? false,
            iconOnly: iconOnly,
            action: { group?.toggle(AnyHashable(value)) }
        ) { label }
    }
}

extension BrandToggleGroupItem where Label == Text {
    public init(_ title: LocalizedStringKey, value: Value) {
        self.init(value: value) { Text(title) }
    }

    /// Para nombres que salen de los datos (una tienda, un miembro).
    public init(verbatim title: String, value: Value) {
        self.init(value: value) { Text(verbatim: title) }
    }
}

extension BrandToggleGroupItem where Label == AccessibleIcon {
    /// Un elemento cuadrado de solo icono: el nombre accesible es obligatorio (`aria-label` en React).
    public init(icon: BrandIconName, accessibilityLabel: LocalizedStringKey, value: Value) {
        self.init(value: value, iconOnly: true) { AccessibleIcon(name: icon, label: accessibilityLabel) }
    }
}

#Preview("ToggleGroup") {
    struct Demo: View {
        @State private var plan: String? = "Anual"
        @State private var filters: Set<String> = ["Pagadas"]
        var body: some View {
            VStack(alignment: .leading, spacing: BrandSpacing.s4) {
                BrandToggleGroup(selection: $plan) {
                    BrandToggleGroupItem(verbatim: "Mensual", value: "Mensual")
                    BrandToggleGroupItem(verbatim: "Anual", value: "Anual")
                }
                BrandToggleGroup(selection: $filters, multiple: true, size: .sm) {
                    BrandToggleGroupItem(verbatim: "Pagadas", value: "Pagadas")
                    BrandToggleGroupItem(verbatim: "Pendientes", value: "Pendientes")
                    BrandToggleGroupItem(verbatim: "Vencidas", value: "Vencidas")
                }
                BrandToggleGroup(selection: $plan, size: .lg, orientation: .vertical) {
                    BrandToggleGroupItem(verbatim: "Mensual", value: "Mensual")
                    BrandToggleGroupItem(verbatim: "Anual", value: "Anual")
                }
            }
            .padding()
        }
    }
    return Demo()
}
