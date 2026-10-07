import SwiftUI

/// La cara de un aviso: la del `Alert` —mismo relleno, borde y tipografía y las mismas intenciones, sobre los
/// tokens `alert.*`—. Es lo que apila `toastHost`; también se puede usar suelto.
///
/// El relleno del neutro invierte el lienzo (prusia sobre página clara, blanco sobre oscura), el de `success` y
/// `error` es universal y el de `warning` es el amarillo con tinta prusia: lo que se compone dentro (el aspa, el botón
/// de acción) toma la cara de color que le toca a ese relleno, no la de la página.
public struct BrandToastCard: View {
    private let item: ToastItem
    private let closeButton: Bool
    private let closeLabel: LocalizedStringKey
    private let onClose: () -> Void

    @Environment(\.colorScheme) private var ambient
    @ScaledMetric(relativeTo: .body) private var scale: CGFloat = 1

    private typealias A = BrandAlertTokens

    public init(item: ToastItem, closeButton: Bool = true, closeLabel: LocalizedStringKey = "Cerrar", onClose: @escaping () -> Void) {
        self.item = item
        self.closeButton = closeButton
        self.closeLabel = closeLabel
        self.onClose = onClose
    }

    private var fill: (bg: Color, border: Color, title: Color, description: Color) {
        switch item.intent {
        case .success: (A.successBg, A.successBorderColor, A.successTitleColor, A.successDescriptionColor)
        case .error: (A.errorBg, A.errorBorderColor, A.errorTitleColor, A.errorDescriptionColor)
        case .warning: (A.warningBg, A.warningBorderColor, A.warningTitleColor, A.warningDescriptionColor)
        case .default, .info, .loading: (A.bg, A.borderColor, A.titleColor, A.descriptionColor)
        }
    }

    /// La superficie de lo que se compone DENTRO del relleno (`.surface-dark`, `.surface-invert`, `.surface-light`).
    private var innerScheme: ColorScheme {
        switch item.intent {
        case .success, .error: .dark
        case .warning: .light
        case .default, .info, .loading: ambient == .dark ? .light : .dark
        }
    }

    public var body: some View {
        let fill = fill
        VStack(alignment: .leading, spacing: A.contentGap) {
            // El interlineado de CSS (`line-height` del título y de la descripción) como caja de línea entera: el título
            // mide 16 × 1,3 = 20,8 y cada línea de la descripción 16 × 1,5 = 24, como en la web. El tracking del título es
            // el del aviso (`toast.title-letter-spacing`, −0,02 em: el de un `<h2>`, que es lo que es el título en React).
            Text(item.title)
                .brandLinedFont(size: A.titleFontSize, weight: A.titleFontWeight, lineHeight: A.titleLineHeight, halfLeading: true)
                .tracking(BrandToastTokens.titleLetterSpacing * A.titleFontSize * scale)
                .foregroundStyle(fill.title)
                .accessibilityAddTraits(.isHeader)
            if let description = item.description {
                Text(description)
                    .brandLinedFont(size: A.descriptionFontSize, weight: BrandTextTokens.fontWeight,
                                    lineHeight: A.descriptionLineHeight, halfLeading: true)
                    .foregroundStyle(fill.description)
            }
            if let action = item.action {
                // `.toast__action`: su `margin-block-start` (`alert.content-gap`) es ya el `spacing` del `VStack`; nada más.
                BrandButton(variant: .ghost, size: .sm, action: { action.onClick() }) { Text(action.label) }
                    .environment(\.colorScheme, innerScheme)
                    .padding(.leading, -BrandButtonTokens.smPaddingInline)
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(.vertical, A.paddingBlock)
        .padding(.leading, A.paddingInline)
        .padding(.trailing, closeButton ? A.closeInset * 2 + A.closeSize : A.paddingInline)
        .overlay(alignment: .topTrailing) {
            if closeButton {
                BrandCloseButton(closeLabel, size: .sm, action: onClose)
                    .environment(\.colorScheme, innerScheme)
                    .padding(A.closeInset)
            }
        }
        // La caja de borde de CSS (`box-sizing: border-box`): el borde ocupa sitio por fuera del relleno y el aspa se
        // coloca desde el borde interior, no desde el canto.
        .padding(A.borderWidth)
        .background(fill.bg)
        .overlay(Rectangle().strokeBorder(fill.border, lineWidth: A.borderWidth))
        .accessibilityElement(children: .contain)
    }
}

// MARK: - Host

private struct ToastHeightKey: PreferenceKey {
    static let defaultValue: [String: CGFloat] = [:]
    static func reduce(value: inout [String: CGFloat], nextValue: () -> [String: CGFloat]) {
        value.merge(nextValue()) { $1 }
    }
}

/// La pila de avisos sobre la raíz (`Toaster` de React). El más nuevo va delante; los anteriores quedan recogidos
/// detrás —desplazados y más pequeños— y se despliegan con el puntero encima o con `expand`.
struct ToastStack: View {
    let center: ToastCenter
    let position: ToastPosition
    let closeButton: Bool
    let closeLabel: LocalizedStringKey
    let containerLabel: LocalizedStringKey
    let gap: CGFloat
    let visibleToasts: Int
    let expand: Bool

    @State private var heights: [String: CGFloat] = [:]
    @State private var hovering = false
    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    private typealias T = BrandToastTokens

    private var expanded: Bool { expand || hovering }
    private var direction: CGFloat { position.isTop ? 1 : -1 }

    var body: some View {
        let items = center.items
        ZStack(alignment: Alignment(horizontal: position.horizontal, vertical: position.isTop ? .top : .bottom)) {
            ForEach(Array(items.enumerated()), id: \.element.id) { index, item in
                ToastRow(
                    item: item, index: index, position: position, closeButton: closeButton, closeLabel: closeLabel,
                    expanded: expanded, offsetY: expandedOffset(index: index, items: items), gap: gap, visible: index < visibleToasts,
                    center: center
                )
                .frame(maxWidth: T.maxWidth)
                .zIndex(Double(items.count - index))
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: Alignment(horizontal: position.horizontal, vertical: position.isTop ? .top : .bottom))
        .padding(.horizontal, T.insetInline)
        .padding(.vertical, T.insetBlock)
        .allowsHitTesting(!items.isEmpty)
        .onPreferenceChange(ToastHeightKey.self) { heights = $0 }
        .onHover { hovering = $0; center.isPaused = $0 }
        .accessibilityElement(children: .contain)
        .accessibilityLabel(Text(containerLabel))
        .animation(reduceMotion ? nil : T.easing.animation(duration: T.durationIn), value: items.map(\.id))
        .animation(reduceMotion ? nil : T.easing.animation(duration: T.durationIn), value: expanded)
    }

    /// Distancia de un aviso desplegado a su borde: las alturas de los de delante más el aire (`toast.gap`).
    private func expandedOffset(index: Int, items: [ToastItem]) -> CGFloat {
        items.prefix(index).reduce(0) { $0 + (heights[$1.id] ?? 0) } + CGFloat(index) * gap
    }
}

private struct ToastRow: View {
    let item: ToastItem
    let index: Int
    let position: ToastPosition
    let closeButton: Bool
    let closeLabel: LocalizedStringKey
    let expanded: Bool
    let offsetY: CGFloat
    let gap: CGFloat
    let visible: Bool
    let center: ToastCenter

    @State private var drag: CGSize = .zero
    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    private typealias T = BrandToastTokens

    private var direction: CGFloat { position.isTop ? 1 : -1 }

    var body: some View {
        // Recogido: cada aviso baja `stackOffset` y se encoge `stackScale` por posición. Desplegado: se apilan con aire.
        let collapsedY = direction * CGFloat(index) * T.stackOffset
        let scale = max(0, 1 - CGFloat(index) * T.stackScale)
        let y = expanded ? direction * offsetY : collapsedY

        BrandToastCard(item: item, closeButton: closeButton, closeLabel: closeLabel, onClose: { center.dismiss(item.id) })
            .background(GeometryReader { proxy in
                Color.clear.preference(key: ToastHeightKey.self, value: [item.id: proxy.size.height])
            })
            .scaleEffect(expanded ? 1 : scale, anchor: position.isTop ? .top : .bottom)
            .offset(x: drag.width, y: y + drag.height)
            .opacity(visible ? 1 : 0)
            .allowsHitTesting(visible)
            .accessibilityHidden(!visible)
            .gesture(swipe)
            .transition(reduceMotion ? .opacity : .opacity
                .combined(with: .scale(scale: T.enterScale, anchor: position.isTop ? .top : .bottom))
                .combined(with: .offset(y: -direction * 24)))
            .accessibilityAction(.escape) { center.dismiss(item.id) }
    }

    /// Deslizar para descartar: hacia el borde horizontal de la pila (o a cualquier lado si va centrada) y hacia el
    /// borde vertical donde está anclada. La distancia es la de Base UI (`swipeThreshold`, 40).
    private var swipe: some Gesture {
        DragGesture(minimumDistance: 8)
            .onChanged { value in
                center.isPaused = true
                drag = value.translation
            }
            .onEnded { value in
                let threshold: CGFloat = 40
                let horizontal = position.horizontal == .leading ? -value.translation.width
                    : position.horizontal == .trailing ? value.translation.width : abs(value.translation.width)
                let vertical = position.isTop ? -value.translation.height : value.translation.height
                if horizontal > threshold || vertical > threshold {
                    center.dismiss(item.id)
                } else {
                    withAnimation(reduceMotion ? nil : T.easing.animation(duration: T.durationIn)) { drag = .zero }
                }
                center.isPaused = false
            }
    }
}

extension View {
    /// Monta la pila de avisos de `center` sobre esta vista (el `<Toaster />` de React, **una vez en la raíz**).
    ///
    /// ```swift
    /// WindowGroup { RootView().toastHost() }
    /// // …y desde cualquier sitio:
    /// ToastCenter.shared.error("No se pudo guardar", description: "Revisa la conexión.")
    /// ```
    ///
    /// - Parameters:
    ///   - position: esquina de la pila (por defecto `bottomRight`, como en la web).
    ///   - closeButton: pinta el aspa en cada aviso.
    ///   - closeLabel: nombre accesible del aspa (castellano por defecto).
    ///   - containerLabel: nombre accesible de la región de avisos (castellano por defecto).
    ///   - duration: segundos que vive un aviso (5); `.infinity` los deja fijos.
    ///   - gap: aire entre avisos desplegados (`toast.gap`).
    ///   - visibleToasts: avisos visibles a la vez (3); el resto espera turno.
    ///   - expand: despliega la pila en vez de dejarla recogida bajo el aviso más nuevo.
    public func toastHost(
        _ center: ToastCenter = .shared,
        position: ToastPosition = .bottomRight,
        closeButton: Bool = true,
        closeLabel: LocalizedStringKey = "Cerrar",
        containerLabel: LocalizedStringKey = "Notificaciones",
        duration: TimeInterval = ToastCenter.defaultDuration,
        gap: CGFloat = BrandToastTokens.gap,
        visibleToasts: Int = 3,
        expand: Bool = false
    ) -> some View {
        center.hostDuration = duration
        return overlay {
            ToastStack(
                center: center, position: position, closeButton: closeButton, closeLabel: closeLabel,
                containerLabel: containerLabel, gap: gap, visibleToasts: visibleToasts, expand: expand
            )
        }
    }
}

#Preview("Toast") {
    VStack(spacing: BrandSpacing.s3) {
        ForEach(ToastIntent.allCases, id: \.self) { intent in
            BrandToastCard(
                item: ToastItem(id: intent.rawValue, title: "Aviso \(intent.rawValue)", intent: intent,
                                description: "Segunda línea del aviso.", duration: nil, action: nil, onClose: nil),
                onClose: {}
            )
        }
    }
    .padding()
}
