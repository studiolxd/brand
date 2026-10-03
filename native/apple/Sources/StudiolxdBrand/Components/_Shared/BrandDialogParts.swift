import SwiftUI

/// Ancho mínimo del contenedor para que dos botones con su etiqueta quepan en una fila: el umbral `sm` (480) con el
/// que `dialogSurface.css` escribe su consulta de contenedor. En la web es una condición de `@container`, no un
/// token, así que aquí es la misma cifra.
let brandDialogRowThreshold: CGFloat = 480

private struct BrandDialogStackedKey: EnvironmentKey {
    static let defaultValue = false
}

extension EnvironmentValues {
    /// `true` cuando el pie del diálogo o del cajón que contiene a la vista va **apilado** (el contenedor mide menos
    /// de 480 pt): los botones del pie se estiran a todo el ancho. Lo fijan `BrandSheet` y `BrandConfirmDialog`.
    public var brandDialogStacked: Bool {
        get { self[BrandDialogStackedKey.self] }
        set { self[BrandDialogStackedKey.self] = newValue }
    }
}

/// Un botón de la marca para el pie de un diálogo o de un cajón: igual que `BrandButton`, pero a todo el ancho cuando
/// el pie va apilado (`.dialog-footer > *` en la web).
public struct BrandDialogButton: View {
    private let title: LocalizedStringKey
    private let variant: ButtonVariant
    private let destructive: Bool
    private let role: ButtonRole?
    private let action: () -> Void

    @Environment(\.brandDialogStacked) private var stacked

    public init(
        _ title: LocalizedStringKey,
        variant: ButtonVariant = .primary,
        destructive: Bool = false,
        role: ButtonRole? = nil,
        action: @escaping () -> Void
    ) {
        self.title = title
        self.variant = variant
        self.destructive = destructive
        self.role = role
        self.action = action
    }

    public var body: some View {
        BrandButton(title, variant: variant, destructive: destructive, block: stacked, role: role, action: action)
    }
}

/// El pie de un diálogo o de un cajón. Las acciones se escriben en el orden del DOM —la que descarta primero, la
/// principal al final— y de ese orden sale la colocación: con sitio, una fila alineada a la derecha; sin sitio, una
/// columna a todo el ancho con la principal **arriba** (`column-reverse` en la web), al alcance del pulgar.
public struct BrandDialogFooter<Content: View>: View {
    private let gap: CGFloat
    private let content: Content

    public init(gap: CGFloat, @ViewBuilder content: () -> Content) {
        self.gap = gap
        self.content = content()
    }

    public var body: some View {
        DialogFooterLayout(gap: gap) { content }
    }
}

private struct DialogFooterLayout: Layout {
    let gap: CGFloat

    private func isRow(_ width: CGFloat?) -> Bool {
        (width ?? .infinity) >= brandDialogRowThreshold
    }

    func sizeThatFits(proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) -> CGSize {
        if isRow(proposal.width) {
            let sizes = subviews.map { $0.sizeThatFits(.unspecified) }
            let total = sizes.map(\.width).reduce(0, +) + gap * CGFloat(max(0, sizes.count - 1))
            return CGSize(width: proposal.width ?? total, height: sizes.map(\.height).max() ?? 0)
        }
        let width = proposal.width ?? 0
        let heights = subviews.map { $0.sizeThatFits(ProposedViewSize(width: width, height: nil)).height }
        return CGSize(width: width, height: heights.reduce(0, +) + gap * CGFloat(max(0, heights.count - 1)))
    }

    func placeSubviews(in bounds: CGRect, proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) {
        if isRow(bounds.width) {
            var x = bounds.maxX
            for subview in subviews.reversed() {
                let size = subview.sizeThatFits(.unspecified)
                x -= size.width
                subview.place(at: CGPoint(x: x, y: bounds.minY), anchor: .topLeading, proposal: ProposedViewSize(size))
                x -= gap
            }
        } else {
            var y = bounds.minY
            for subview in subviews.reversed() {
                let size = subview.sizeThatFits(ProposedViewSize(width: bounds.width, height: nil))
                subview.place(at: CGPoint(x: bounds.minX, y: y), anchor: .topLeading,
                              proposal: ProposedViewSize(width: bounds.width, height: size.height))
                y += size.height + gap
            }
        }
    }
}

/// Mide el ancho de lo que envuelve y lo publica en `brandDialogStacked`.
struct BrandDialogWidthReader<Content: View>: View {
    @State private var width: CGFloat = 0
    @ViewBuilder let content: Content

    var body: some View {
        content
            .environment(\.brandDialogStacked, width > 0 && width < brandDialogRowThreshold)
            .background {
                GeometryReader { proxy in
                    Color.clear.onAppear { width = proxy.size.width }
                        .onChange(of: proxy.size.width) { _, new in width = new }
                }
            }
    }
}
