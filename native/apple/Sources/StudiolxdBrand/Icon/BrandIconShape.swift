import SwiftUI

/// Un trazo de un icono, tal y como lo declara `Icon.tsx` (retícula de 24 × 24, trazo de 1 pt que no escala).
enum BrandIconShape: Sendable {
    /// `<path d="…">`; `round` = `strokeLinecap="round"`, `roundJoin` = `strokeLinejoin="round"`.
    case path(String, round: Bool = false, roundJoin: Bool = false, filled: Bool = false, stroked: Bool = true)
    case circle(cx: Double, cy: Double, r: Double, filled: Bool = false, stroked: Bool = true)
    case line(x1: Double, y1: Double, x2: Double, y2: Double, round: Bool = false)

    /// La retícula del `viewBox` de todos los iconos.
    static let grid: CGFloat = 24

    var isFilled: Bool {
        switch self {
        case .path(_, _, _, let filled, _), .circle(_, _, _, let filled, _): filled
        case .line: false
        }
    }

    var isStroked: Bool {
        switch self {
        case .path(_, _, _, _, let stroked), .circle(_, _, _, _, let stroked): stroked
        case .line: true
        }
    }

    var lineCap: CGLineCap {
        switch self {
        case .path(_, let round, _, _, _), .line(_, _, _, _, let round): round ? .round : .butt
        case .circle: .butt
        }
    }

    var lineJoin: CGLineJoin {
        if case .path(_, _, let roundJoin, _, _) = self { return roundJoin ? .round : .miter }
        return .miter
    }

    /// El trazo en una caja de `rect`, escalando la retícula de 24 a ella.
    func path(in rect: CGRect) -> Path {
        let scale = min(rect.width, rect.height) / Self.grid
        let transform = CGAffineTransform(translationX: rect.minX, y: rect.minY).scaledBy(x: scale, y: scale)
        var path = Path()
        switch self {
        case .path(let d, _, _, _, _):
            path = SVGPathParser.path(from: d)
        case .circle(let cx, let cy, let r, _, _):
            path.addEllipse(in: CGRect(x: cx - r, y: cy - r, width: 2 * r, height: 2 * r))
        case .line(let x1, let y1, let x2, let y2, _):
            path.move(to: CGPoint(x: x1, y: y1))
            path.addLine(to: CGPoint(x: x2, y: y2))
        }
        return path.applying(transform)
    }
}

/// Un `Shape` por trazo, para pintarlo con `fill` o `stroke`.
struct BrandIconStrokeShape: Shape {
    let shape: BrandIconShape
    func path(in rect: CGRect) -> Path { shape.path(in: rect) }
}
