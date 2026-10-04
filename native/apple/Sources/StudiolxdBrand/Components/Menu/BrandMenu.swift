import SwiftUI

#if canImport(UIKit)
import UIKit
#elseif canImport(AppKit)
import AppKit
#endif

/// Un ítem de `BrandMenu` y de `BrandContextMenu` (`MenuItem` de React, sin `link`: la navegación la hace la app en la
/// `action` de un `button`).
public enum BrandMenuItem {
    /// Una acción. `description` va como segunda línea del título; `destructive` la marca como destructiva (el sistema
    /// la pinta en rojo). `closeOnSelect: false` no se puede honrar en el menú del sistema: siempre se cierra.
    case button(
        _ label: LocalizedStringKey,
        description: LocalizedStringKey? = nil,
        icon: BrandIconName? = nil,
        destructive: Bool = false,
        disabled: Bool = false,
        closeOnSelect: Bool = true,
        action: () -> Void
    )
    /// Una línea que separa dos grupos de ítems.
    case separator
    /// Un rótulo que titula el grupo que viene detrás.
    case label(_ text: LocalizedStringKey)
    /// Una opción de grupo de radio: la elegida es la que coincide con la `selection` del menú.
    case radio(_ label: LocalizedStringKey, value: String, icon: BrandIconName? = nil, disabled: Bool = false)
}

/// Un grupo de ítems del menú: lo que queda entre dos separadores o bajo un rótulo. Interno: es lo que se pinta como
/// `Section` del `Menu` del sistema (que dibuja él mismo la línea entre grupos) y lo que prueban las pruebas.
struct BrandMenuGroup {
    var title: LocalizedStringKey?
    var entries: [Entry]

    /// Un grupo de radio (opciones consecutivas, que comparten la selección) o un ítem suelto.
    enum Entry {
        case button(BrandMenuItem)
        case radios([BrandMenuItem])
    }

    /// Reparte los ítems en grupos: un `.separator` cierra el grupo y un `.label` abre uno con título; los `.radio`
    /// consecutivos forman un solo grupo de radio. Los grupos vacíos no existen.
    static func groups(of items: [BrandMenuItem]) -> [BrandMenuGroup] {
        var groups: [BrandMenuGroup] = []
        var current = BrandMenuGroup(title: nil, entries: [])
        func flush() {
            if !current.entries.isEmpty || current.title != nil { groups.append(current) }
            current = BrandMenuGroup(title: nil, entries: [])
        }
        for item in items {
            switch item {
            case .separator:
                flush()
            case .label(let text):
                flush()
                current.title = text
            case .button:
                current.entries.append(.button(item))
            case .radio:
                if case .radios(let existing)? = current.entries.last {
                    current.entries[current.entries.count - 1] = .radios(existing + [item])
                } else {
                    current.entries.append(.radios([item]))
                }
            }
        }
        flush()
        return groups.filter { !$0.entries.isEmpty }
    }
}

/// El icono de un ítem como imagen de plantilla: el `Menu` del sistema solo pinta `Image`, no vistas propias.
@MainActor
private func brandMenuImage(_ name: BrandIconName) -> Image? {
    let renderer = ImageRenderer(content: BrandIcon(name, size: .md).foregroundStyle(Color.black).frame(width: 24, height: 24))
    renderer.scale = 3
    #if canImport(UIKit)
    guard let image = renderer.uiImage else { return nil }
    return Image(uiImage: image.withRenderingMode(.alwaysTemplate))
    #else
    guard let image = renderer.nsImage else { return nil }
    image.isTemplate = true
    return Image(nsImage: image)
    #endif
}

/// El contenido de un menú: los ítems tipados, como grupos (`Section`) de un `Menu` del sistema.
struct BrandMenuContent: View {
    let items: [BrandMenuItem]
    let selection: Binding<String?>?

    var body: some View {
        ForEach(Array(BrandMenuGroup.groups(of: items).enumerated()), id: \.offset) { _, group in
            if let title = group.title {
                Section(title) { entries(of: group) }
            } else {
                Section { entries(of: group) }
            }
        }
    }

    @ViewBuilder
    private func entries(of group: BrandMenuGroup) -> some View {
        ForEach(Array(group.entries.enumerated()), id: \.offset) { _, entry in
            switch entry {
            case .button(let item): button(item)
            case .radios(let radios): radioGroup(radios)
            }
        }
    }

    @ViewBuilder
    private func button(_ item: BrandMenuItem) -> some View {
        if case let .button(label, description, icon, destructive, disabled, _, action) = item {
            Button(role: destructive ? .destructive : nil, action: action) {
                title(label, description: description, icon: icon)
            }
            .disabled(disabled)
        }
    }

    @ViewBuilder
    private func radioGroup(_ radios: [BrandMenuItem]) -> some View {
        let binding = selection ?? .constant(nil)
        Picker(selection: binding) {
            ForEach(Array(radios.enumerated()), id: \.offset) { _, radio in
                if case let .radio(label, value, icon, disabled) = radio {
                    title(label, description: nil, icon: icon).tag(Optional(value)).disabled(disabled)
                }
            }
        } label: { EmptyView() }
        .pickerStyle(.inline)
        .labelsHidden()
    }

    @ViewBuilder
    private func title(_ label: LocalizedStringKey, description: LocalizedStringKey?, icon: BrandIconName?) -> some View {
        if let icon, let image = brandMenuImage(icon) {
            Label { text(label, description: description) } icon: { image }
        } else {
            text(label, description: description)
        }
    }

    @ViewBuilder
    private func text(_ label: LocalizedStringKey, description: LocalizedStringKey?) -> some View {
        Text(label)
        if let description { Text(description) }
    }
}

/// Un menú de acciones de la marca (`Menu` de React). En iOS y macOS es el **`Menu` del sistema** por dentro: el panel,
/// el teclado, el ratón y VoiceOver son los de la plataforma y lo que lleva el aspecto de Brand es el DISPARADOR, que
/// pone la app (un `BrandIcon`, un texto…).
///
/// ```swift
/// BrandMenu([
///     .button("Editar", icon: .settings) { edit() },
///     .separator,
///     .button("Eliminar", destructive: true) { delete() },
/// ]) { Text("Acciones") }
///
/// // con una opción activa (radio): `selection` es la opción elegida
/// BrandMenu([.label("Ordenar por"), .radio("Nombre", value: "name"), .radio("Fecha", value: "date")],
///           selection: $sort) { BrandIcon(.search) }
/// ```
///
/// El panel no se pinta con los tokens `menu.*` (SwiftUI no deja estilarlo; sí lo hace la versión de Android):
/// destructivo es `role: .destructive`, la `description` es una segunda línea y `closeOnSelect: false` no se honra.
public struct BrandMenu<Label: View>: View {
    private let items: [BrandMenuItem]
    private let selection: Binding<String?>?
    private let label: Label

    /// - Parameters:
    ///   - items: los ítems tipados.
    ///   - selection: la opción elegida de los ítems `radio` (por su `value`).
    ///   - label: el disparador: cualquier vista que reciba el toque (no un `Button`).
    public init(_ items: [BrandMenuItem], selection: Binding<String?>? = nil, @ViewBuilder label: () -> Label) {
        self.items = items
        self.selection = selection
        self.label = label()
    }

    public var body: some View {
        Menu {
            BrandMenuContent(items: items, selection: selection)
        } label: {
            label
        }
        .menuStyle(.button)
        .menuIndicator(.hidden)
    }
}

extension BrandMenu where Label == Text {
    /// Un menú con un disparador de texto. Para vestirlo de botón de la marca: `.buttonStyle(.brand(.outline))` sobre el menú.
    public init(_ title: LocalizedStringKey, items: [BrandMenuItem], selection: Binding<String?>? = nil) {
        self.init(items, selection: selection) { Text(title) }
    }
}

/// `ContextMenu` `triggerOrientation`: el botón de tres puntos en horizontal (por defecto) o en vertical.
public enum ContextMenuTriggerOrientation: String, CaseIterable, Sendable {
    case horizontal, vertical
}

/// `ContextMenu` `triggerSize`: la talla de control compartida.
public typealias ContextMenuTriggerSize = BrandControlSize

/// El menú de acciones de un botón «⋯» (`ContextMenu` de React): un `BrandMenu` cuyo disparador es el botón fantasma de
/// solo icono de la marca (el icono `dots`; en vertical, el mismo girado 90°), con zona táctil de 44 pt.
///
/// ```swift
/// BrandContextMenu([
///     .button("Editar", icon: .settings) { edit() },
///     .button("Eliminar", destructive: true) { delete() },
/// ])
/// ```
///
/// **No** es el menú contextual por pulsación larga del sistema (`.contextMenu`): es el menú de un botón «⋯».
public struct BrandContextMenu: View {
    private let items: [BrandMenuItem]
    private let selection: Binding<String?>?
    private let label: LocalizedStringKey
    private let triggerSize: ContextMenuTriggerSize
    private let triggerOrientation: ContextMenuTriggerOrientation

    /// - Parameters:
    ///   - label: nombre accesible del disparador. Por defecto «Más opciones» (castellano).
    public init(
        _ items: [BrandMenuItem],
        selection: Binding<String?>? = nil,
        label: LocalizedStringKey = "Más opciones",
        triggerSize: ContextMenuTriggerSize = .md,
        triggerOrientation: ContextMenuTriggerOrientation = .horizontal
    ) {
        self.items = items
        self.selection = selection
        self.label = label
        self.triggerSize = triggerSize
        self.triggerOrientation = triggerOrientation
    }

    public var body: some View {
        Menu {
            BrandMenuContent(items: items, selection: selection)
        } label: {
            AccessibleIcon(name: .dots, label: label)
                .rotationEffect(.degrees(triggerOrientation == .vertical ? 90 : 0))
        }
        .menuStyle(.button)
        .menuIndicator(.hidden)
        .buttonStyle(.brand(.ghost, size: triggerSize, iconOnly: true))
    }
}

#Preview("Menu") {
    @Previewable @State var sort: String? = "date"
    return VStack(alignment: .leading, spacing: BrandSpacing.s5) {
        BrandMenu("Acciones", items: [
            .button("Editar", description: "Cambia los datos", icon: .settings) {},
            .button("Duplicar") {},
            .separator,
            .button("Archivar", disabled: true) {},
            .button("Eliminar", destructive: true) {},
        ])
        .buttonStyle(.brand(.outline))
        BrandMenu([.label("Ordenar por"), .radio("Nombre", value: "name"), .radio("Fecha", value: "date")], selection: $sort) {
            BrandIcon(.search)
        }
        HStack {
            ForEach(ContextMenuTriggerSize.allCases, id: \.self) { size in
                BrandContextMenu([.button("Editar") {}, .button("Eliminar", destructive: true) {}], triggerSize: size)
            }
            BrandContextMenu([.button("Editar") {}], triggerOrientation: .vertical)
        }
    }
    .padding()
}
