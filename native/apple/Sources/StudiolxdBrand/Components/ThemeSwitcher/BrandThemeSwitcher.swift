import SwiftUI

/// `ThemeSwitcher` `value`: el tema elegido. `system` sigue la preferencia del sistema operativo.
public enum BrandThemeChoice: String, CaseIterable, Sendable {
    case light, dark, system

    var icon: BrandIconName {
        switch self {
        case .light: .sun
        case .dark: .moon
        case .system: .deviceDesktop
        }
    }

    /// El símbolo del sistema equivalente, para las filas del menú nativo (que solo admite SF Symbols).
    var menuSymbol: String {
        switch self {
        case .light: "sun.max"
        case .dark: "moon"
        case .system: "desktopcomputer"
        }
    }
}

/// `ThemeSwitcher` `variant`.
///
/// - `compact`: un campo desplegable con etiqueta, el icono y el nombre del tema actual (el del panel).
/// - `list`: las tres opciones desplegadas en línea (el del pie).
/// - `icon`: solo el icono del tema actual, como botón de icono que abre el menú (para una barra sin sitio).
public enum ThemeSwitcherVariant: String, CaseIterable, Sendable {
    case compact, list, icon
}

/// `ThemeSwitcher` `layout`: disposición de la etiqueta del control compacto. `inline` la pone delante; `stacked`,
/// encima con el control a todo el ancho (la forma del resto de campos de un formulario).
public enum ThemeSwitcherLayout: String, CaseIterable, Sendable {
    case inline, stacked
}

/// Los textos del selector de tema (`labels` en React). Cada uno tiene su default castellano.
public struct ThemeSwitcherLabels: Sendable {
    /// Nombre accesible del control y etiqueta del campo compacto. Default: «Tema».
    public var group: String
    public var light: String
    public var dark: String
    public var system: String
    /// Nombre accesible del botón de la variante `icon`, que solo enseña el icono del tema vigente: recibe el nombre del
    /// control y el del tema, ya resueltos (`themeSwitcher.trigger` del catálogo de React). Es función porque el orden y
    /// la puntuación de la frase son de cada idioma. Default castellano: «Tema: Claro» (`"\(group): \(theme)"`).
    public var trigger: @Sendable (_ group: String, _ theme: String) -> String

    public init(
        group: String = "Tema",
        light: String = "Claro",
        dark: String = "Oscuro",
        system: String = "Sistema",
        trigger: @escaping @Sendable (_ group: String, _ theme: String) -> String = { group, theme in "\(group): \(theme)" }
    ) {
        self.group = group
        self.light = light
        self.dark = dark
        self.system = system
        self.trigger = trigger
    }

    func text(_ choice: BrandThemeChoice) -> String {
        switch choice {
        case .light: light
        case .dark: dark
        case .system: system
        }
    }

    /// El nombre accesible del disparador de `icon` con el tema vigente.
    func triggerLabel(_ choice: BrandThemeChoice) -> String { trigger(group, text(choice)) }
}

/// Selector de tema: claro, oscuro o el del sistema. Solo la vista: **el valor lo guarda la app** (un `Binding`);
/// aplicarlo (`preferredColorScheme`) y recordarlo es del producto.
///
/// ```swift
/// BrandThemeSwitcher(value: $theme)                              // compact, con etiqueta delante
/// BrandThemeSwitcher(value: $theme, variant: .list)              // las tres opciones en línea
/// BrandThemeSwitcher(value: $theme, variant: .icon, size: .sm)   // solo icono, abre un menú
/// ```
public struct BrandThemeSwitcher: View {
    private let value: Binding<BrandThemeChoice>
    private let labels: ThemeSwitcherLabels
    private let variant: ThemeSwitcherVariant
    private let layout: ThemeSwitcherLayout
    private let size: BrandControlSize?

    @Environment(\.brandControlSize) private var inheritedSize

    public init(
        value: Binding<BrandThemeChoice>,
        labels: ThemeSwitcherLabels = ThemeSwitcherLabels(),
        variant: ThemeSwitcherVariant = .compact,
        layout: ThemeSwitcherLayout = .inline,
        size: BrandControlSize? = nil
    ) {
        self.value = value
        self.labels = labels
        self.variant = variant
        self.layout = layout
        self.size = size
    }

    private var resolvedSize: BrandControlSize { size ?? inheritedSize ?? .md }

    public var body: some View {
        switch variant {
        case .list: ThemeList(value: value, labels: labels)
        case .icon: iconVariant
        case .compact: compactVariant
        }
    }

    // MARK: icon

    private var iconVariant: some View {
        Menu {
            options
        } label: {
            BrandIcon(value.wrappedValue.icon, size: .md)
        }
        .menuStyle(.button)
        .menuIndicator(.hidden)
        .buttonStyle(BrandButtonStyle(.ghost, size: size, iconOnly: true))
        .accessibilityLabel(Text(verbatim: labels.triggerLabel(value.wrappedValue)))
    }

    // MARK: compact

    private var compactVariant: some View {
        let stack = layout == .inline
            ? AnyLayout(HStackLayout(spacing: BrandDropdownFieldTokens.gap))
            : AnyLayout(VStackLayout(alignment: .leading, spacing: BrandDropdownFieldTokens.gap))
        return stack {
            ThemeFieldLabel(text: labels.group, size: resolvedSize)
            Menu {
                options
            } label: {
                ThemeDropdownControl(choice: value.wrappedValue, text: labels.text(value.wrappedValue), size: resolvedSize,
                                     fillsWidth: layout == .stacked)
            }
            .menuStyle(.button)
            .menuIndicator(.hidden)
            .buttonStyle(.plain)
            .accessibilityLabel(Text(verbatim: labels.group))
            .accessibilityValue(Text(verbatim: labels.text(value.wrappedValue)))
        }
        .frame(maxWidth: layout == .stacked ? .infinity : nil, alignment: .leading)
    }

    private var options: some View {
        Picker(labels.group, selection: value) {
            ForEach(BrandThemeChoice.allCases, id: \.self) { choice in
                Label(labels.text(choice), systemImage: choice.menuSymbol).tag(choice)
            }
        }
        .pickerStyle(.inline)
    }
}

/// La etiqueta del campo (`Label` de React, a la talla del control).
private struct ThemeFieldLabel: View {
    let text: String
    let size: BrandControlSize

    var body: some View {
        let points: CGFloat = switch size {
        case .sm: BrandLabelTokens.smFontSize
        case .md: BrandLabelTokens.fontSize
        case .lg: BrandLabelTokens.lgFontSize
        }
        Text(verbatim: text)
            .brandLinedFont(size: points, weight: BrandLabelTokens.fontWeight, lineHeight: BrandLabelTokens.lineHeight)
            .foregroundStyle(BrandLabelTokens.color)
            .accessibilityHidden(true)
    }
}

/// La cara del `DropdownField`: rectangular, a la altura del sistema, con el icono del tema, su nombre y el chevron.
private struct ThemeDropdownControl: View {
    let choice: BrandThemeChoice
    let text: String
    let size: BrandControlSize
    let fillsWidth: Bool

    @Environment(\.isEnabled) private var isEnabled
    @Environment(\.isFocused) private var isFocused
    @ScaledMetric(relativeTo: .body) private var scale: CGFloat = 1

    private typealias T = BrandDropdownFieldTokens

    var body: some View {
        let height: CGFloat = switch size {
        case .sm: T.smHeight
        case .md: T.height
        case .lg: T.lgHeight
        }
        let fontSize: CGFloat = switch size {
        case .sm: T.smFontSize
        case .md: T.fontSize
        case .lg: T.lgFontSize
        }
        let padding: CGFloat = switch size {
        case .sm: T.smPaddingInline
        case .md: T.paddingInline
        case .lg: T.lgPaddingInline
        }
        let iconSide: CGFloat = switch size {
        case .sm: T.smValueIconSize
        case .md: T.valueIconSize
        case .lg: T.lgValueIconSize
        }
        let iconSize: BrandIconSize = iconSide <= BrandIconTokens.sizeSm ? .sm : .md
        let shape = RoundedRectangle(cornerRadius: T.borderRadius)

        HStack(spacing: T.contentGap) {
            HStack(spacing: T.contentGap) {
                BrandIcon(choice.icon, size: iconSize)
                Text(verbatim: text)
            }
            if fillsWidth { Spacer(minLength: T.contentGap) }
            BrandIcon(.chevron, size: .sm).rotationEffect(.degrees(90))
        }
        .brandFont(size: fontSize, weight: T.fontWeight)
        .foregroundStyle(T.color)
        .padding(.horizontal, padding)
        .frame(height: height * scale)
        .frame(maxWidth: fillsWidth ? .infinity : nil)
        .background(T.bg, in: shape)
        .overlay { shape.strokeBorder(T.borderColor, lineWidth: T.borderWidth) }
        .overlay {
            if isFocused {
                // Hacia dentro, pegado al borde: como el Select.
                shape.strokeBorder(T.focusRingColor, lineWidth: T.focusRingWidth)
                    .padding(T.borderWidth)
            }
        }
        .contentShape(shape)
        .brandHitTarget(height: height * scale)
        .opacity(isEnabled ? 1 : T.disabledOpacity)
    }
}

/// `variant: .list`: las tres opciones en línea; la vigente va en énfasis y sin subrayado, el resto se subraya al
/// pasar el puntero (la línea de `Link`).
private struct ThemeList: View {
    let value: Binding<BrandThemeChoice>
    let labels: ThemeSwitcherLabels

    var body: some View {
        ThemeFlowLayout(spacing: BrandThemeSwitcherTokens.listGap) {
            ForEach(BrandThemeChoice.allCases, id: \.self) { choice in
                ThemeListOption(choice: choice, text: labels.text(choice), isCurrent: choice == value.wrappedValue) {
                    value.wrappedValue = choice
                }
            }
        }
        .accessibilityElement(children: .contain)
        .accessibilityLabel(Text(verbatim: labels.group))
    }
}

private struct ThemeListOption: View {
    let choice: BrandThemeChoice
    let text: String
    let isCurrent: Bool
    let action: () -> Void

    @Environment(\.isFocused) private var isFocused
    @Environment(\.colorScheme) private var scheme
    @State private var isHovering = false
    @Environment(\.themeSwitcherForcedHover) private var forcedHover

    private typealias T = BrandThemeSwitcherTokens

    /// La opción se subraya bajo el puntero, salvo la vigente.
    private var showsLine: Bool { (isHovering || forcedHover == choice) && !isCurrent }

    var body: some View {
        Button(action: action) {
            HStack(spacing: T.iconGap) {
                BrandIcon(choice.icon, size: .sm)
                // El subrayado de `Link` (D64): `text-decoration`, bajo el texto y no bajo el icono, a la distancia del
                // token bajo los descendentes (`BrandTextUnderline`).
                Text(verbatim: text).brandUnderlinedText()
            }
            .environment(\.brandTextUnderline, showsLine
                ? BrandTextUnderline(width: BrandLinkTokens.underlineWidth.value(for: scheme), offset: BrandLinkTokens.underlineOffset,
                                     color: BrandColorRoles.text)
                : nil)
            // `.theme-switcher__option` lleva `font: inherit`: el `line-height` es el del cuerpo (`text.line-height`).
            .brandLinedFont(size: T.listFontSize, weight: isCurrent ? T.listCurrentFontWeight : BrandFontWeight.default,
                            lineHeight: BrandTextTokens.lineHeight)
            .foregroundStyle(BrandColorRoles.text)
            // El hueco de la línea, como el `padding-block-end` de la web al pasar el puntero.
            .padding(.bottom, showsLine ? BrandLinkTokens.underlineOffset : 0)
            .overlay {
                if isFocused {
                    Rectangle().stroke(T.focusRingColor, lineWidth: T.focusRingWidth)
                        .padding(-(T.focusRingOffset + T.focusRingWidth / 2))
                }
            }
            .contentShape(Rectangle())
            .brandHitTarget(height: T.listFontSize)
        }
        .buttonStyle(.plain)
        .focusEffectDisabled()
        .onHover { isHovering = $0 }
        // La vigente no se saca del tabulador (se puede leer y descubrir) pero pulsarla no hace nada.
        .accessibilityAddTraits(isCurrent ? .isSelected : [])
    }
}

/// `flex-wrap` de CSS: las opciones en fila y, si no caben (tipo dinámico grande), en la línea siguiente.
private struct ThemeFlowLayout: Layout {
    let spacing: CGFloat

    func sizeThatFits(proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) -> CGSize {
        arrange(width: proposal.width ?? .infinity, subviews: subviews).size
    }

    func placeSubviews(in bounds: CGRect, proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) {
        let result = arrange(width: bounds.width, subviews: subviews)
        for (index, origin) in result.origins.enumerated() {
            subviews[index].place(at: CGPoint(x: bounds.minX + origin.x, y: bounds.minY + origin.y), proposal: .unspecified)
        }
    }

    private func arrange(width: CGFloat, subviews: Subviews) -> (size: CGSize, origins: [CGPoint]) {
        var origins: [CGPoint] = []
        var x: CGFloat = 0, y: CGFloat = 0, rowHeight: CGFloat = 0, maxX: CGFloat = 0
        for subview in subviews {
            let size = subview.sizeThatFits(.unspecified)
            if x > 0, x + size.width > width {
                x = 0
                y += rowHeight + spacing
                rowHeight = 0
            }
            origins.append(CGPoint(x: x, y: y))
            x += size.width + spacing
            rowHeight = max(rowHeight, size.height)
            maxX = max(maxX, x - spacing)
        }
        return (CGSize(width: maxX, height: y + rowHeight), origins)
    }
}

#Preview("ThemeSwitcher") {
    struct Demo: View {
        @State private var theme: BrandThemeChoice = .system
        var body: some View {
            VStack(alignment: .leading, spacing: BrandSpacing.s5) {
                BrandThemeSwitcher(value: $theme)
                BrandThemeSwitcher(value: $theme, layout: .stacked)
                BrandThemeSwitcher(value: $theme, variant: .list)
                BrandThemeSwitcher(value: $theme, variant: .icon)
                ForEach(BrandControlSize.allCases, id: \.self) { size in
                    BrandThemeSwitcher(value: $theme, size: size)
                }
            }
            .padding()
        }
    }
    return Demo()
}

private struct ThemeSwitcherForcedHoverKey: EnvironmentKey {
    static let defaultValue: BrandThemeChoice? = nil
}

extension EnvironmentValues {
    /// Solo para las capturas: pinta esa opción de `list` como bajo el puntero, que una prueba no puede simular.
    var themeSwitcherForcedHover: BrandThemeChoice? {
        get { self[ThemeSwitcherForcedHoverKey.self] }
        set { self[ThemeSwitcherForcedHoverKey.self] = newValue }
    }
}
