import SwiftUI

/// Ancho a partir del cual un bloque con mensaje y acciones pasa de columna a fila: el umbral `sm` (480 pt), el
/// equivalente nativo del salto a `md` de la web (`Banner`, `PageIntro`). Es el mismo que el del pie de un diálogo.
let brandAdaptiveRowThreshold: CGFloat = 480

private struct BrandStretchButtonsKey: EnvironmentKey {
    static let defaultValue = false
}

extension EnvironmentValues {
    /// `true` cuando los botones de la ranura de acciones que los contiene van apilados y ocupan la línea
    /// (`.banner__actions > * { inline-size: 100% }` en la web). Lo fijan `BrandBanner` y `BrandPageIntro`; el
    /// botón de la marca lo lee y se comporta como `block`.
    var brandStretchButtons: Bool {
        get { self[BrandStretchButtonsKey.self] }
        set { self[BrandStretchButtonsKey.self] = newValue }
    }
}

/// Dos bloques —el mensaje y las acciones— que van en **fila** si el ancho llega al umbral (el primero se queda con
/// el sobrante y el segundo mide lo que mide) y en **columna** si no (los dos a todo el ancho). Con un solo hijo
/// es una columna de uno. Interno.
///
/// `widthOffset` suma el ancho de lo que rodea al layout (relleno lateral) para que el umbral se compare con el
/// ancho del componente entero y no con el de su interior.
struct BrandAdaptiveRowLayout: Layout {
    var threshold: CGFloat = brandAdaptiveRowThreshold
    var widthOffset: CGFloat = 0
    var rowSpacing: CGFloat
    var stackSpacing: CGFloat
    var alignment: VerticalAlignment = .center

    private func isRow(_ width: CGFloat?) -> Bool { (width ?? .infinity) + widthOffset >= threshold }

    func sizeThatFits(proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) -> CGSize {
        guard let first = subviews.first else { return .zero }
        guard subviews.count > 1 else { return first.sizeThatFits(proposal) }
        let second = subviews[1]
        if isRow(proposal.width) {
            let secondSize = second.sizeThatFits(.unspecified)
            let firstProposal = proposal.width.map { ProposedViewSize(width: max(0, $0 - secondSize.width - rowSpacing), height: nil) } ?? .unspecified
            let firstSize = first.sizeThatFits(firstProposal)
            let (_, height) = rowPlacement(firstSize: firstSize, firstBaseline: first.dimensions(in: firstProposal)[alignment],
                                           secondSize: secondSize, secondBaseline: second.dimensions(in: .unspecified)[alignment])
            return CGSize(width: proposal.width ?? (firstSize.width + rowSpacing + secondSize.width), height: height)
        }
        let width = proposal.width ?? max(first.sizeThatFits(.unspecified).width, second.sizeThatFits(.unspecified).width)
        let column = ProposedViewSize(width: width, height: nil)
        let heights = subviews.map { $0.sizeThatFits(column).height }
        return CGSize(width: width, height: heights.reduce(0, +) + stackSpacing * CGFloat(subviews.count - 1))
    }

    func placeSubviews(in bounds: CGRect, proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) {
        guard let first = subviews.first else { return }
        guard subviews.count > 1 else {
            first.place(at: bounds.origin, anchor: .topLeading, proposal: ProposedViewSize(width: bounds.width, height: bounds.height))
            return
        }
        let second = subviews[1]
        if isRow(bounds.width) {
            let secondSize = second.sizeThatFits(.unspecified)
            let firstProposal = ProposedViewSize(width: max(0, bounds.width - secondSize.width - rowSpacing), height: nil)
            let firstSize = first.sizeThatFits(firstProposal)
            let (offsets, _) = rowPlacement(firstSize: firstSize, firstBaseline: first.dimensions(in: firstProposal)[alignment],
                                            secondSize: secondSize, secondBaseline: second.dimensions(in: .unspecified)[alignment])
            first.place(at: CGPoint(x: bounds.minX, y: bounds.minY + offsets.0), anchor: .topLeading,
                        proposal: ProposedViewSize(width: firstSize.width, height: firstSize.height))
            second.place(at: CGPoint(x: bounds.maxX - secondSize.width, y: bounds.minY + offsets.1), anchor: .topLeading,
                         proposal: ProposedViewSize(secondSize))
        } else {
            var y = bounds.minY
            for subview in subviews {
                let size = subview.sizeThatFits(ProposedViewSize(width: bounds.width, height: nil))
                subview.place(at: CGPoint(x: bounds.minX, y: y), anchor: .topLeading,
                              proposal: ProposedViewSize(width: bounds.width, height: size.height))
                y += size.height + stackSpacing
            }
        }
    }

    /// Dónde cae cada bloque en la fila (desplazamiento vertical) y cuánto mide la fila.
    private func rowPlacement(firstSize: CGSize, firstBaseline: CGFloat, secondSize: CGSize, secondBaseline: CGFloat)
        -> ((CGFloat, CGFloat), CGFloat) {
        if alignment == .center {
            let height = max(firstSize.height, secondSize.height)
            return (((height - firstSize.height) / 2, (height - secondSize.height) / 2), height)
        }
        let line = max(firstBaseline, secondBaseline)
        let offsets = (line - firstBaseline, line - secondBaseline)
        return (offsets, max(offsets.0 + firstSize.height, offsets.1 + secondSize.height))
    }
}
