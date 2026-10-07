import SwiftUI

/// `TabsList` `variant`: `underline` (línea bajo la pestaña activa, por defecto) o `pill` (relleno en la activa).
public enum TabsVariant: String, CaseIterable, Sendable {
    case underline, pill
}

/// `Tabs` `orientation`: la barra en fila (por defecto) o en columna.
public enum TabsOrientation: String, CaseIterable, Sendable {
    case horizontal, vertical
}

/// Lo que cada pestaña publica a la barra para que el teclado sepa en qué orden están y cuáles se pueden activar.
struct BrandTabEntry: Equatable, @unchecked Sendable {
    let value: AnyHashable
    let disabled: Bool
}

private struct BrandTabEntriesKey: PreferenceKey {
    static let defaultValue: [BrandTabEntry] = []
    static func reduce(value: inout [BrandTabEntry], nextValue: () -> [BrandTabEntry]) {
        value += nextValue()
    }
}

/// Hacia dónde se mueve la selección con el teclado.
enum BrandTabsMove {
    case previous, next, first, last
}

/// La lógica del teclado de la barra (`activateOnFocus` de React: mover el foco selecciona).
enum BrandTabsNavigation {
    /// La pestaña a la que lleva `move` desde `current`, saltando las deshabilitadas y dando la vuelta en los extremos
    /// (`loopFocus` de Base UI). Sin pestaña actual, `next` y `first` van a la primera y `previous` y `last`, a la última.
    static func target(from current: AnyHashable?, move: BrandTabsMove, entries: [BrandTabEntry]) -> AnyHashable? {
        let enabled = entries.filter { !$0.disabled }.map(\.value)
        guard !enabled.isEmpty else { return nil }
        switch move {
        case .first: return enabled.first
        case .last: return enabled.last
        case .next, .previous:
            guard let current, let index = enabled.firstIndex(of: current) else {
                return move == .next ? enabled.first : enabled.last
            }
            let step = move == .next ? 1 : -1
            return enabled[(index + step + enabled.count) % enabled.count]
        }
    }
}

/// Lo que la barra reparte a sus pestañas por el entorno.
struct BrandTabsContext: @unchecked Sendable {
    var isSelected: (AnyHashable) -> Bool
    var select: (AnyHashable) -> Void
    var variant: TabsVariant
    var orientation: TabsOrientation
    var focus: FocusState<AnyHashable?>.Binding
}

private struct BrandTabsContextKey: EnvironmentKey {
    static let defaultValue: BrandTabsContext? = nil
}

extension EnvironmentValues {
    var brandTabs: BrandTabsContext? {
        get { self[BrandTabsContextKey.self] }
        set { self[BrandTabsContextKey.self] = newValue }
    }
}

/// La barra de pestañas de la marca (la `TabsList` con sus `TabsTrigger` de React): **solo la barra**; el contenido de
/// cada pestaña lo pinta la app según la selección.
///
/// ```swift
/// @State private var tab = Tab.general
///
/// BrandTabs(selection: $tab) {
///     BrandTab("General", value: Tab.general)
///     BrandTab("Seguridad", value: Tab.security)
///     BrandTab("Sin acceso", value: Tab.locked, disabled: true)
/// }
/// .accessibilityLabel("Ajustes de la cuenta")
/// switch tab { case .general: GeneralView() … }
/// ```
///
/// - `variant`: `underline` (por defecto) o `pill`. `orientation`: `horizontal` o `vertical`.
/// - La selección siempre es controlada y puede ser cualquier `Hashable`.
/// - Una barra horizontal que no cabe se desplaza en horizontal.
/// - Teclado (macOS, teclado físico): las flechas mueven la selección (activación automática), `Inicio` y `Fin` van a
///   la primera y a la última, y se salta lo deshabilitado.
/// - VoiceOver: cada pestaña lleva el estado «seleccionada» dentro de una barra de pestañas.
///
/// **No** es el `TabView` del sistema (la navegación de la app entera): es el control de sección de una pantalla.
public struct BrandTabs<Value: Hashable, Content: View>: View {
    @Binding private var selection: Value
    private let variant: TabsVariant
    private let orientation: TabsOrientation
    private let content: Content

    @State private var entries: [BrandTabEntry] = []
    @FocusState private var focus: AnyHashable?
    @Environment(\.layoutDirection) private var layoutDirection

    private typealias T = BrandTabsTokens

    public init(
        selection: Binding<Value>,
        variant: TabsVariant = .underline,
        orientation: TabsOrientation = .horizontal,
        @ViewBuilder content: () -> Content
    ) {
        _selection = selection
        self.variant = variant
        self.orientation = orientation
        self.content = content()
    }

    public var body: some View {
        let context = BrandTabsContext(
            isSelected: { ($0.base as? Value) == selection },
            select: { if let value = $0.base as? Value { selection = value } },
            variant: variant,
            orientation: orientation,
            focus: $focus
        )
        list
            .environment(\.brandTabs, context)
            .onPreferenceChange(BrandTabEntriesKey.self) { new in
                var seen = Set<AnyHashable>()
                entries = new.filter { seen.insert($0.value).inserted }
            }
            .onKeyPress(phases: [.down, .repeat]) { press in
                guard let move = move(for: press.key) else { return .ignored }
                guard let target = BrandTabsNavigation.target(from: focus ?? AnyHashable(selection), move: move, entries: entries),
                      let value = target.base as? Value else { return .handled }
                selection = value
                focus = target
                return .handled
            }
            .accessibilityElement(children: .contain)
            .accessibilityAddTraits(.isTabBar)
    }

    private func move(for key: KeyEquivalent) -> BrandTabsMove? {
        let rtl = layoutDirection == .rightToLeft
        switch (orientation, key) {
        case (.horizontal, .leftArrow): return rtl ? .next : .previous
        case (.horizontal, .rightArrow): return rtl ? .previous : .next
        case (.vertical, .upArrow): return .previous
        case (.vertical, .downArrow): return .next
        case (_, .home): return .first
        case (_, .end): return .last
        default: return nil
        }
    }

    @ViewBuilder
    private var list: some View {
        switch orientation {
        case .horizontal: horizontalList
        case .vertical: verticalList
        }
    }

    private var horizontalList: some View {
        let row = HStack(spacing: T.listGap) { content }
            .padding(variant == .pill ? T.listGap : 0)
            .padding(.bottom, variant == .underline ? T.listBorderWidth : 0)
        return ViewThatFits(in: .horizontal) {
            row
            ScrollView(.horizontal, showsIndicators: false) { row }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(alignment: .bottom) {
            if variant == .underline { Rectangle().fill(T.listBorderColor).frame(height: T.listBorderWidth) }
        }
    }

    private var verticalList: some View {
        VStack(alignment: .leading, spacing: T.listGap) { content }
            .fixedSize(horizontal: true, vertical: false)
            .padding(variant == .pill ? T.listGap : 0)
            .padding(.trailing, variant == .underline ? T.listBorderWidth : 0)
            .background(alignment: .trailing) {
                if variant == .underline { Rectangle().fill(T.listBorderColor).frame(width: T.listBorderWidth) }
            }
    }
}

/// Una pestaña de `BrandTabs` (el `TabsTrigger` de React), con el `value` que pone en la selección al activarse.
public struct BrandTab<Value: Hashable>: View {
    private let label: Text
    private let value: Value
    private let disabled: Bool

    @Environment(\.brandTabs) private var tabs

    /// - Parameter disabled: la pestaña se ve atenuada y no se puede activar (ni con el teclado).
    public init(_ title: LocalizedStringKey, value: Value, disabled: Bool = false) {
        label = Text(title)
        self.value = value
        self.disabled = disabled
    }

    /// Para nombres que salen de los datos.
    public init(verbatim title: String, value: Value, disabled: Bool = false) {
        label = Text(verbatim: title)
        self.value = value
        self.disabled = disabled
    }

    public var body: some View {
        if let tabs {
            let key = AnyHashable(value)
            let selected = tabs.isSelected(key)
            Button { tabs.select(key) } label: {
                BrandTabFace(label: label, selected: selected, variant: tabs.variant, orientation: tabs.orientation, disabled: disabled)
            }
            .buttonStyle(.plain)
            .focusEffectDisabled()
            .focused(tabs.focus, equals: key)
            .disabled(disabled)
            .preference(key: BrandTabEntriesKey.self, value: [BrandTabEntry(value: key, disabled: disabled)])
            .accessibilityAddTraits(selected ? [.isButton, .isSelected] : .isButton)
        }
    }
}

/// El aspecto de una pestaña: texto, indicador (línea o relleno), foco, hover y deshabilitada.
private struct BrandTabFace: View {
    let label: Text
    let selected: Bool
    let variant: TabsVariant
    let orientation: TabsOrientation
    let disabled: Bool

    @Environment(\.isFocused) private var isFocused
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var isHovering = false
    @ScaledMetric(relativeTo: .body) private var scale: CGFloat = 1

    private typealias T = BrandTabsTokens

    /// El `line-height` del disparador en la web: es un `<button>` y `.tabs__trigger` no lo fija, así que manda el
    /// `line-height: 1.15` que `normalize.css` pone a los controles de formulario. No hay token (`tabs.trigger-line-height`
    /// no existe): se copia el valor y se anota en la ficha.
    private static let triggerLineHeight: CGFloat = 1.15

    private var weight: Int { selected ? Int(T.triggerActiveWeight) : T.triggerFontWeight }

    private var ink: Color {
        if variant == .pill && selected { return T.triggerPillColorActive }
        if selected { return T.triggerActiveColor }
        return isHovering && !disabled ? T.triggerHoverColor : T.triggerColor
    }

    var body: some View {
        let shape = RoundedRectangle(cornerRadius: T.triggerBorderRadius)
        label
            .brandLinedFont(size: T.triggerFontSize, weight: weight, lineHeight: Self.triggerLineHeight)
            .lineLimit(1)
            .fixedSize(horizontal: true, vertical: false)
            .foregroundStyle(ink)
            .padding(.vertical, T.triggerPaddingBlock)
            .padding(.horizontal, T.triggerPaddingInline)
            .frame(maxWidth: orientation == .vertical ? .infinity : nil)
            .background {
                if variant == .pill && selected { shape.fill(T.triggerPillBgActive) }
            }
            .overlay(alignment: orientation == .vertical ? .trailing : .bottom) {
                if variant == .underline && selected {
                    // El indicador pisa el filete de la lista (`inset-block-end: -list-border-width`).
                    if orientation == .vertical {
                        Rectangle().fill(T.triggerIndicatorColor).frame(width: T.triggerIndicatorWidth)
                            .offset(x: T.listBorderWidth)
                    } else {
                        Rectangle().fill(T.triggerIndicatorColor).frame(height: T.triggerIndicatorWidth)
                            .offset(y: T.listBorderWidth)
                    }
                }
            }
            .overlay {
                if isFocused {
                    shape.stroke(T.focusRingColor, lineWidth: T.focusRingWidth)
                        .padding(-(T.focusRingOffset + T.focusRingWidth / 2))
                }
            }
            .opacity(disabled ? T.triggerDisabledOpacity : 1)
            .contentShape(Rectangle())
            .brandHitTarget(height: T.triggerFontSize * scale * Self.triggerLineHeight + T.triggerPaddingBlock * 2)
            .onHover { isHovering = $0 }
            .animation(reduceMotion ? nil : T.transitionEasing.animation(duration: T.transitionDuration), value: selected)
            .animation(reduceMotion ? nil : T.transitionEasing.animation(duration: T.transitionDuration), value: isHovering)
    }
}

#Preview("Tabs") {
    struct Demo: View {
        @State private var underline = "general"
        @State private var pill = "mes"
        @State private var vertical = "perfil"
        var body: some View {
            VStack(alignment: .leading, spacing: BrandSpacing.s6) {
                BrandTabs(selection: $underline) {
                    BrandTab(verbatim: "General", value: "general")
                    BrandTab(verbatim: "Seguridad", value: "seguridad")
                    BrandTab(verbatim: "Sin acceso", value: "bloqueada", disabled: true)
                    BrandTab(verbatim: "Notificaciones", value: "notificaciones")
                }
                BrandTabs(selection: $pill, variant: .pill) {
                    BrandTab(verbatim: "Semana", value: "semana")
                    BrandTab(verbatim: "Mes", value: "mes")
                    BrandTab(verbatim: "Año", value: "año")
                }
                BrandTabs(selection: $vertical, orientation: .vertical) {
                    BrandTab(verbatim: "Perfil", value: "perfil")
                    BrandTab(verbatim: "Equipo", value: "equipo")
                    BrandTab(verbatim: "Facturación", value: "facturacion")
                }
            }
            .padding()
        }
    }
    return Demo()
}
