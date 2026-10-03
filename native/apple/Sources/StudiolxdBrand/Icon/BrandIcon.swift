import SwiftUI

/// Talla de un icono (`Icon` `size`). Las cinco fijas salen de `icon.size-*`; `text` mide `1em`: el tamaño de la
/// tipografía que lo rodea (`brandIconTextSize`), como en un botón o un enlace.
public enum BrandIconSize: String, CaseIterable, Sendable {
    case xs, sm, md, lg, xl, text
}

private struct BrandIconTextSizeKey: EnvironmentKey {
    static let defaultValue: CGFloat = BrandFontSize.s2
}

extension EnvironmentValues {
    /// El tamaño de fuente que mide un icono `size: .text` (`1em`). Los controles lo fijan a su tipografía.
    public var brandIconTextSize: CGFloat {
        get { self[BrandIconTextSizeKey.self] }
        set { self[BrandIconTextSizeKey.self] = newValue }
    }
}

/// Un icono del catálogo de Brand, dibujado con los mismos trazos que el `Icon` de React (retícula de 24, trazo de
/// 1 pt que no escala con la talla). Pinta con el color de primer plano del entorno (`currentColor`), no es
/// accesible por sí solo (`aria-hidden`) y crece con el tipo dinámico.
public struct BrandIcon: View {
    private let name: BrandIconName
    private let size: BrandIconSize

    @Environment(\.brandIconTextSize) private var textSize
    @ScaledMetric(relativeTo: .body) private var scale: CGFloat = 1

    public init(_ name: BrandIconName, size: BrandIconSize = .md) {
        self.name = name
        self.size = size
    }

    /// El lado de la caja, en puntos, antes de aplicar el tipo dinámico.
    static func points(for size: BrandIconSize, textSize: CGFloat) -> CGFloat {
        switch size {
        case .xs: BrandIconTokens.sizeXs
        case .sm: BrandIconTokens.sizeSm
        case .md: BrandIconTokens.sizeMd
        case .lg: BrandIconTokens.sizeLg
        case .xl: BrandIconTokens.sizeXl
        case .text: textSize
        }
    }

    public var body: some View {
        let side = Self.points(for: size, textSize: textSize) * scale
        ZStack {
            ForEach(Array(name.shapes.enumerated()), id: \.offset) { _, shape in
                if shape.isFilled {
                    BrandIconStrokeShape(shape: shape).fill()
                }
                if shape.isStroked {
                    BrandIconStrokeShape(shape: shape)
                        .stroke(style: StrokeStyle(lineWidth: BrandBorderWidth.default, lineCap: shape.lineCap, lineJoin: shape.lineJoin))
                }
            }
        }
        .frame(width: side, height: side)
        .accessibilityHidden(true)
    }
}

#Preview("Iconos") {
    ScrollView {
        LazyVGrid(columns: Array(repeating: GridItem(.flexible()), count: 6), spacing: BrandSpacing.s4) {
            ForEach(BrandIconName.allCases, id: \.self) { name in
                VStack(spacing: BrandSpacing.s1) {
                    BrandIcon(name)
                    Text(name.rawValue).font(.brand(.bodySmall)).lineLimit(1)
                }
            }
        }
        .padding()
    }
    .foregroundStyle(BrandColorRoles.text)
}
