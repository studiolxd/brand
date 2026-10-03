import SwiftUI

/// Lee el atributo `d` de un `<path>` de SVG y lo convierte en un `Path` de SwiftUI. Entiende lo que usan los
/// iconos de Brand: `M L H V C S Q T A Z` en absoluto y relativo, con comandos implícitos repetidos y los
/// indicadores de arco pegados («a1 1 0 011 1»).
enum SVGPathParser {
    static func path(from d: String) -> Path {
        var scanner = Scanner(d)
        var path = Path()
        var current = CGPoint.zero
        var start = CGPoint.zero
        var lastControl: CGPoint?
        var lastCommand: Character = " "

        while let command = scanner.nextCommand(after: lastCommand) {
            let relative = command.isLowercase
            let origin = relative ? current : .zero
            switch Character(command.uppercased()) {
            case "M":
                guard let x = scanner.number(), let y = scanner.number() else { return path }
                current = CGPoint(x: origin.x + x, y: origin.y + y)
                start = current
                path.move(to: current)
                lastControl = nil
                lastCommand = relative ? "l" : "L" // los pares siguientes son líneas
                continue
            case "L":
                guard let x = scanner.number(), let y = scanner.number() else { return path }
                current = CGPoint(x: origin.x + x, y: origin.y + y)
                path.addLine(to: current)
                lastControl = nil
            case "H":
                guard let x = scanner.number() else { return path }
                current = CGPoint(x: origin.x + x, y: current.y)
                path.addLine(to: current)
                lastControl = nil
            case "V":
                guard let y = scanner.number() else { return path }
                current = CGPoint(x: current.x, y: origin.y + y)
                path.addLine(to: current)
                lastControl = nil
            case "C":
                guard let x1 = scanner.number(), let y1 = scanner.number(), let x2 = scanner.number(),
                      let y2 = scanner.number(), let x = scanner.number(), let y = scanner.number() else { return path }
                let c1 = CGPoint(x: origin.x + x1, y: origin.y + y1)
                let c2 = CGPoint(x: origin.x + x2, y: origin.y + y2)
                current = CGPoint(x: origin.x + x, y: origin.y + y)
                path.addCurve(to: current, control1: c1, control2: c2)
                lastControl = c2
            case "S":
                guard let x2 = scanner.number(), let y2 = scanner.number(), let x = scanner.number(),
                      let y = scanner.number() else { return path }
                let c1 = lastControl.map { CGPoint(x: 2 * current.x - $0.x, y: 2 * current.y - $0.y) } ?? current
                let c2 = CGPoint(x: origin.x + x2, y: origin.y + y2)
                current = CGPoint(x: origin.x + x, y: origin.y + y)
                path.addCurve(to: current, control1: c1, control2: c2)
                lastControl = c2
            case "Q":
                guard let x1 = scanner.number(), let y1 = scanner.number(), let x = scanner.number(),
                      let y = scanner.number() else { return path }
                let c = CGPoint(x: origin.x + x1, y: origin.y + y1)
                current = CGPoint(x: origin.x + x, y: origin.y + y)
                path.addQuadCurve(to: current, control: c)
                lastControl = c
            case "T":
                guard let x = scanner.number(), let y = scanner.number() else { return path }
                let c = lastControl.map { CGPoint(x: 2 * current.x - $0.x, y: 2 * current.y - $0.y) } ?? current
                current = CGPoint(x: origin.x + x, y: origin.y + y)
                path.addQuadCurve(to: current, control: c)
                lastControl = c
            case "A":
                guard let rx = scanner.number(), let ry = scanner.number(), let rotation = scanner.number(),
                      let large = scanner.flag(), let sweep = scanner.flag(), let x = scanner.number(),
                      let y = scanner.number() else { return path }
                let end = CGPoint(x: origin.x + x, y: origin.y + y)
                addArc(to: &path, from: current, to: end, rx: rx, ry: ry, rotation: rotation, large: large, sweep: sweep)
                current = end
                lastControl = nil
            case "Z":
                path.closeSubpath()
                current = start
                lastControl = nil
            default:
                return path
            }
            lastCommand = command
        }
        return path
    }

    /// Un arco SVG de punto final (apéndice F.6 de la especificación) como curvas de Bézier de ≤ 90°.
    private static func addArc(to path: inout Path, from p0: CGPoint, to p1: CGPoint, rx rxIn: Double, ry ryIn: Double,
                               rotation: Double, large: Bool, sweep: Bool) {
        var rx = abs(rxIn), ry = abs(ryIn)
        guard p0 != p1 else { return }
        guard rx > 0, ry > 0 else { path.addLine(to: p1); return }

        let phi = rotation * .pi / 180
        let cosPhi = cos(phi), sinPhi = sin(phi)
        let dx = (p0.x - p1.x) / 2, dy = (p0.y - p1.y) / 2
        let x1p = cosPhi * dx + sinPhi * dy
        let y1p = -sinPhi * dx + cosPhi * dy

        let lambda = (x1p * x1p) / (rx * rx) + (y1p * y1p) / (ry * ry)
        if lambda > 1 { rx *= lambda.squareRoot(); ry *= lambda.squareRoot() }

        let numerator = rx * rx * ry * ry - rx * rx * y1p * y1p - ry * ry * x1p * x1p
        let denominator = rx * rx * y1p * y1p + ry * ry * x1p * x1p
        let factor = (large == sweep ? -1.0 : 1.0) * max(0, numerator / denominator).squareRoot()
        let cxp = factor * rx * y1p / ry
        let cyp = -factor * ry * x1p / rx
        let cx = cosPhi * cxp - sinPhi * cyp + (p0.x + p1.x) / 2
        let cy = sinPhi * cxp + cosPhi * cyp + (p0.y + p1.y) / 2

        func angle(_ ux: Double, _ uy: Double, _ vx: Double, _ vy: Double) -> Double {
            let sign: Double = ux * vy - uy * vx < 0 ? -1 : 1
            let dot = (ux * vx + uy * vy) / ((ux * ux + uy * uy).squareRoot() * (vx * vx + vy * vy).squareRoot())
            return sign * acos(min(1, max(-1, dot)))
        }
        let theta1 = angle(1, 0, (x1p - cxp) / rx, (y1p - cyp) / ry)
        var delta = angle((x1p - cxp) / rx, (y1p - cyp) / ry, (-x1p - cxp) / rx, (-y1p - cyp) / ry)
        if !sweep, delta > 0 { delta -= 2 * .pi }
        if sweep, delta < 0 { delta += 2 * .pi }

        let segments = max(1, Int(ceil(abs(delta) / (.pi / 2) - 1e-9)))
        let step = delta / Double(segments)
        let t = 4.0 / 3.0 * tan(step / 4)

        func point(_ angle: Double) -> (CGPoint, CGPoint) { // posición y tangente en `angle`
            let ca = cos(angle), sa = sin(angle)
            let x = cosPhi * rx * ca - sinPhi * ry * sa + cx
            let y = sinPhi * rx * ca + cosPhi * ry * sa + cy
            let tx = -cosPhi * rx * sa - sinPhi * ry * ca
            let ty = -sinPhi * rx * sa + cosPhi * ry * ca
            return (CGPoint(x: x, y: y), CGPoint(x: tx, y: ty))
        }

        var a = theta1
        for _ in 0..<segments {
            let (pa, ta) = point(a)
            let (pb, tb) = point(a + step)
            path.addCurve(
                to: pb,
                control1: CGPoint(x: pa.x + t * ta.x, y: pa.y + t * ta.y),
                control2: CGPoint(x: pb.x - t * tb.x, y: pb.y - t * tb.y)
            )
            a += step
        }
    }

    /// Un lector de comandos, números e indicadores de arco.
    private struct Scanner {
        private let chars: [Character]
        private var index = 0

        init(_ d: String) { chars = Array(d) }

        private mutating func skipSeparators() {
            while index < chars.count, chars[index] == " " || chars[index] == "," || chars[index].isNewline || chars[index] == "\t" {
                index += 1
            }
        }

        /// El siguiente comando; si el siguiente token es un número, repite el anterior (comando implícito).
        mutating func nextCommand(after previous: Character) -> Character? {
            skipSeparators()
            guard index < chars.count else { return nil }
            let c = chars[index]
            if c.isLetter {
                index += 1
                return c
            }
            return previous == " " ? nil : previous
        }

        mutating func number() -> Double? {
            skipSeparators()
            let startIndex = index
            if index < chars.count, chars[index] == "-" || chars[index] == "+" { index += 1 }
            var seenDot = false
            while index < chars.count {
                let c = chars[index]
                if c.isNumber { index += 1 }
                else if c == ".", !seenDot { seenDot = true; index += 1 }
                else { break }
            }
            guard index > startIndex else { return nil }
            return Double(String(chars[startIndex..<index]))
        }

        mutating func flag() -> Bool? {
            skipSeparators()
            guard index < chars.count, chars[index] == "0" || chars[index] == "1" else { return nil }
            defer { index += 1 }
            return chars[index] == "1"
        }
    }
}
