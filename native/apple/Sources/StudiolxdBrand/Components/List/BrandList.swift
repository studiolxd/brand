import SwiftUI

/// `List` `type`: con viñetas, numerada o sin decoración.
public enum ListType: String, CaseIterable, Sendable {
    case unordered, ordered, plain
}

/// Una lista de la marca: con viñetas, numerada o `plain` (sin marcas ni sangría). Viste el contenido con la tipografía
/// de lista del sistema (`text.list.*`) y deja entre ítems el aire `text.list.gap`. Los ítems son `BrandListItem`
/// (o cualquier vista: cada hijo es una fila).
///
/// ```swift
/// BrandList(type: .ordered) {
///     BrandListItem { Text("Abre la app") }
///     BrandListItem { Text("Elige tu vivienda") }
/// }
/// ```
///
/// Para la fila de una lista de ajustes o de datos (contenido principal, secundario y accesorio final, con
/// separadores) usa `BrandList(type: .plain, showSeparators: true)` con `BrandListItem(content:secondary:trailing:)`.
public struct BrandList<Content: View>: View {
    private let type: ListType
    private let showSeparators: Bool
    private let content: Content

    /// - Parameter showSeparators: dibuja la línea de `separator.*` entre filas, con el aire
    ///   `separator.spacing-md` a cada lado, en lugar del `text.list.gap`. Es la misma prop que en React.
    public init(type: ListType = .unordered, showSeparators: Bool = false, @ViewBuilder content: () -> Content) {
        self.type = type
        self.showSeparators = showSeparators
        self.content = content()
    }

    public var body: some View {
        _VariadicView.Tree(BrandListLayout(type: type, showSeparators: showSeparators)) { content }
            .foregroundStyle(BrandTextTokens.listColor)
            .tracking(BrandTextTokens.listLetterSpacing * BrandTextTokens.listFontSize)
            .accessibilityElement(children: .contain)
    }
}

private struct BrandListLayout: _VariadicView_UnaryViewRoot {
    let type: ListType
    let showSeparators: Bool

    @ViewBuilder
    func body(children: _VariadicView.Children) -> some View {
        VStack(alignment: .leading, spacing: showSeparators ? 0 : BrandTextTokens.listGap) {
            ForEach(Array(children.enumerated()), id: \.element.id) { index, child in
                row(index: index, child: child)
                if showSeparators, index < children.count - 1 {
                    Rectangle()
                        .fill(BrandTextTokens.listSeparatorColor)
                        .frame(height: BrandTextTokens.listSeparatorThickness)
                        .padding(.vertical, BrandTextTokens.listSeparatorSpacing)
                        .accessibilityHidden(true)
                }
            }
        }
    }

    @ViewBuilder
    private func row(index: Int, child: _VariadicView.Children.Element) -> some View {
        if type == .plain {
            child.lined.frame(maxWidth: .infinity, alignment: .leading)
        } else {
            HStack(alignment: .firstTextBaseline, spacing: 0) {
                Text(verbatim: type == .ordered ? "\(index + 1). " : "• ")
                    .lined
                    .frame(width: BrandTextTokens.listPaddingInlineStart, alignment: .trailing)
                    .accessibilityHidden(true)
                child.lined.frame(maxWidth: .infinity, alignment: .leading)
            }
        }
    }
}

private extension View {
    /// La tipografía de lista (`text.list.*`), con su interlineado de CSS.
    var lined: some View {
        brandLinedFont(size: BrandTextTokens.listFontSize, weight: BrandTextTokens.listFontWeight,
                       family: BrandTextTokens.listFontFamily, lineHeight: BrandTextTokens.listLineHeight)
    }
}

/// Un ítem de `BrandList`. Con solo contenido es el `<li>` de React; con `leading` (un accesorio al inicio: icono,
/// avatar), `secondary` (una línea menor y atenuada) y `trailing` (un accesorio al final: etiqueta, interruptor,
/// chevron) es la fila de una lista de datos o de ajustes.
///
/// ```swift
/// BrandList(type: .plain, showSeparators: true) {
///     BrandListItem(action: { open(.notifications) }, leading: { BrandIcon(.bell) },
///                   content: { Text("Notificaciones") }, secondary: { Text("Avisos de la comunidad") },
///                   trailing: { BrandIcon(.chevron, size: .sm) })
///     BrandListItem("Cerrar sesión", action: signOut)
/// }
/// ```
///
/// **Fila pulsable.** Con `action` la fila **entera** es un botón (zona táctil completa, también bajo los
/// accesorios): se atenúa mientras se pulsa (o con el puntero encima, en macOS y iPad), la lee VoiceOver como botón
/// y recibe el foco del teclado. Sin `action` es una fila de lectura, sin rasgo ni estados. Es la misma semántica que
/// `onClick` en Compose; en React la fila pulsable es `as="button"`.
public struct BrandListItem<Leading: View, Content: View, Secondary: View, Trailing: View>: View {
    private let action: (() -> Void)?
    private let leading: Leading
    private let content: Content
    private let secondary: Secondary
    private let trailing: Trailing

    public init(
        action: (() -> Void)? = nil,
        @ViewBuilder leading: () -> Leading,
        @ViewBuilder content: () -> Content,
        @ViewBuilder secondary: () -> Secondary,
        @ViewBuilder trailing: () -> Trailing
    ) {
        self.action = action
        self.leading = leading()
        self.content = content()
        self.secondary = secondary()
        self.trailing = trailing()
    }

    private var row: some View {
        HStack(alignment: .center, spacing: BrandTextTokens.listItemGap) {
            if Leading.self != EmptyView.self {
                leading
            }
            VStack(alignment: .leading, spacing: 0) {
                content
                secondary
                    .brandLinedFont(size: BrandTextTokens.listSecondaryFontSize, weight: BrandTextTokens.listFontWeight,
                                    family: BrandTextTokens.listFontFamily, lineHeight: BrandTextTokens.listSecondaryLineHeight)
                    .foregroundStyle(BrandTextTokens.listSecondaryColor)
            }
            if Trailing.self != EmptyView.self {
                Spacer(minLength: BrandSpacing.s2)
                trailing
            }
        }
    }

    public var body: some View {
        if let action {
            Button(action: action) {
                row
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .contentShape(Rectangle())
            }
            .buttonStyle(BrandListRowStyle())
            .brandHitTarget(height: BrandTextTokens.listFontSize * BrandTextTokens.listLineHeight)
            .accessibilityElement(children: .combine)
            .accessibilityAddTraits(.isButton)
        } else {
            row
        }
    }
}

/// El estado de una fila pulsable: sin relleno bajo el puntero (regla de Colores), el contenido pasa a
/// `opacity.muted` mientras se pulsa o con el puntero encima; con foco de teclado, el anillo de `focus-ring-*` por
/// dentro de la fila; deshabilitada, `opacity.disabled`.
private struct BrandListRowStyle: ButtonStyle {
    @Environment(\.isEnabled) private var isEnabled
    @Environment(\.isFocused) private var isFocused
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var isHovering = false

    func makeBody(configuration: Configuration) -> some View {
        let active = isEnabled && (configuration.isPressed || isHovering)
        configuration.label
            .opacity(!isEnabled ? BrandOpacity.disabled : active ? BrandOpacity.muted : BrandOpacity.full)
            .overlay {
                if isFocused {
                    Rectangle()
                        .inset(by: BrandBorderWidth.focus / 2)
                        .stroke(BrandColorRoles.text, lineWidth: BrandBorderWidth.focus)
                }
            }
            .contentShape(Rectangle())
            .onHover { isHovering = $0 }
            .animation(reduceMotion ? nil : .easeOut(duration: BrandDuration.fast), value: active)
    }
}

extension BrandListItem where Leading == EmptyView {
    /// El ítem sin accesorio inicial: `BrandListItem(content:secondary:trailing:)`.
    public init(
        action: (() -> Void)? = nil,
        @ViewBuilder content: () -> Content,
        @ViewBuilder secondary: () -> Secondary,
        @ViewBuilder trailing: () -> Trailing
    ) {
        self.init(action: action, leading: { EmptyView() }, content: content, secondary: secondary, trailing: trailing)
    }
}

extension BrandListItem where Leading == EmptyView, Secondary == EmptyView, Trailing == EmptyView {
    /// El ítem simple: `BrandListItem { Text("…") }`.
    public init(action: (() -> Void)? = nil, @ViewBuilder content: () -> Content) {
        self.init(action: action, leading: { EmptyView() }, content: content, secondary: { EmptyView() }, trailing: { EmptyView() })
    }
}

extension BrandListItem where Content == Text, Secondary == Text?, Trailing == EmptyView {
    /// Un ítem de texto con línea secundaria opcional y un accesorio inicial.
    public init(
        _ title: LocalizedStringKey,
        subtitle: LocalizedStringKey? = nil,
        action: (() -> Void)? = nil,
        @ViewBuilder leading: () -> Leading
    ) {
        self.init(action: action, leading: leading, content: { Text(title) }, secondary: { subtitle.map { Text($0) } },
                  trailing: { EmptyView() })
    }
}

extension BrandListItem where Leading == EmptyView, Content == Text, Secondary == Text?, Trailing == EmptyView {
    /// Un ítem de texto con línea secundaria opcional.
    public init(_ title: LocalizedStringKey, subtitle: LocalizedStringKey? = nil, action: (() -> Void)? = nil) {
        self.init(action: action, leading: { EmptyView() }, content: { Text(title) }, secondary: { subtitle.map { Text($0) } },
                  trailing: { EmptyView() })
    }
}

#Preview("List") {
    ScrollView {
        VStack(alignment: .leading, spacing: BrandSpacing.s6) {
            ForEach(ListType.allCases, id: \.self) { type in
                BrandList(type: type) {
                    BrandListItem("Primer elemento de la lista")
                    BrandListItem("Segundo elemento de la lista")
                    BrandListItem("Tercer elemento de la lista")
                }
            }
            BrandList(type: .plain, showSeparators: true) {
                BrandListItem(content: { Text("Notificaciones") }, secondary: { Text("Avisos de la comunidad") }, trailing: { BrandIcon(.chevron, size: .sm) })
                BrandListItem(content: { Text("Idioma") }, secondary: { EmptyView() }, trailing: { Text("Español").brand(tone: .muted) })
                BrandListItem("Cerrar sesión")
            }
            // Con accesorio inicial y fila pulsable (la fila entera es un botón).
            BrandList(type: .plain, showSeparators: true) {
                BrandListItem(action: {}, leading: { BrandIcon(.bell) }, content: { Text("Notificaciones") },
                              secondary: { Text("Avisos de la comunidad") }, trailing: { BrandIcon(.chevron, size: .sm) })
                BrandListItem(action: {}, leading: { BrandIcon(.languages) }, content: { Text("Idioma") },
                              secondary: { EmptyView() }, trailing: { Text("Español").brand(tone: .muted) })
                BrandListItem("Seguridad", action: {}, leading: { BrandIcon(.key) })
            }
        }
        .padding()
    }
}
