import SwiftUI

/// El enlace entre el `@FocusState` de la app y el control de texto de un campo de la marca. Interno: se publica por
/// el entorno con `.brandFocused(_:)` y lo recogen `BrandInputField`, `BrandNumberInputField` y `BrandPasswordField`.
///
/// Guarda **cómo aplicar** el `.focused(...)` de la app al control de texto, no su valor: un `@FocusState` solo se
/// entera de los cambios (y solo puede recibir el foco) a través de un `.focused` puesto en la jerarquía, así que
/// leerlo y copiarlo al campo no funciona.
@MainActor
struct BrandFocusLink {
    let apply: (AnyView) -> AnyView
}

private struct BrandFocusLinkKey: EnvironmentKey {
    static let defaultValue: BrandFocusLink? = nil
}

extension EnvironmentValues {
    var brandFocusLink: BrandFocusLink? {
        get { self[BrandFocusLinkKey.self] }
        set { self[BrandFocusLinkKey.self] = newValue }
    }
}

extension View {
    /// Enlaza el foco del **campo de texto** de un campo de la marca con tu `@FocusState`, para dar el foco desde
    /// fuera (un atajo ⌘N que lleva el cursor al campo de añadir, el primer campo de un formulario…).
    ///
    /// ```swift
    /// @FocusState private var addFocused: Bool
    ///
    /// BrandInputField("Nueva tarea", text: $title).brandFocused($addFocused)
    /// Button("Añadir") { addFocused = true }.keyboardShortcut("n")
    /// ```
    ///
    /// Va en el propio campo (`BrandInputField`, `BrandNumberInputField`, `BrandPasswordField`), no en un
    /// contenedor. Se usa en lugar de `.focused(_:)` a secas porque este enlaza con el **primer elemento
    /// enfocable** del campo, que en los campos con botones (el − de `BrandNumberInputField`, el ojo de
    /// `BrandPasswordField`) con el teclado completo de macOS no es el texto; `brandFocused` apunta siempre al texto
    /// y no choca con el `@FocusState` interno que pinta el anillo de foco (los dos conviven sobre el mismo texto).
    public func brandFocused(_ binding: FocusState<Bool>.Binding) -> some View {
        environment(\.brandFocusLink, BrandFocusLink(apply: { AnyView($0.focused(binding)) }))
    }

    /// Como `brandFocused(_:)` para un `@FocusState` con varios campos: el campo tiene el foco cuando el estado vale
    /// `value`, y tomar el foco escribe `value` en el estado.
    ///
    /// ```swift
    /// enum Field { case name, quantity }
    /// @FocusState private var focus: Field?
    ///
    /// BrandInputField("Nombre", text: $name).brandFocused($focus, equals: .name)
    /// BrandNumberInputField("Cantidad", value: $quantity).brandFocused($focus, equals: .quantity)
    /// ```
    public func brandFocused<F: Hashable>(_ binding: FocusState<F?>.Binding, equals value: F) -> some View {
        environment(\.brandFocusLink, BrandFocusLink(apply: { AnyView($0.focused(binding, equals: value)) }))
    }
}

/// Lo que aplica un campo de la marca a su control de texto: pone el `.focused` de la app **por encima** del suyo
/// interno (el del anillo). Los dos conviven: el foco que entra en el texto lo ven los dos `@FocusState`, y el que la
/// app escribe llega al texto, que es el único elemento enfocable de lo que envuelve.
struct BrandFocusApply: ViewModifier {
    @Environment(\.brandFocusLink) private var link

    @ViewBuilder
    func body(content: Content) -> some View {
        if let link { link.apply(AnyView(ZStack { content })) } else { content }
    }
}

extension View {
    /// Interno: aplica el `brandFocused` del entorno al control de texto.
    func brandFocusApplied() -> some View { modifier(BrandFocusApply()) }
}
