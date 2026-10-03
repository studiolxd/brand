import SwiftUI

/// El aspa que cierra un diálogo, un cajón o un aviso (`CloseButton`): un botón cuadrado sin fondo ni borde, con la
/// tinta de la superficie desde el reposo. El único estado que marca es el foco de teclado, como en la web.
///
/// El nombre accesible es obligatorio (`aria-label` en React): sin texto visible, el lector de pantalla lo necesita.
public struct BrandCloseButton: View {
    private let label: LocalizedStringKey
    private let size: BrandControlSize
    private let action: () -> Void

    @Environment(\.isFocused) private var isFocused
    @ScaledMetric(relativeTo: .body) private var scale: CGFloat = 1

    /// - Parameter label: nombre accesible del aspa. Castellano por defecto («Cerrar»); se traduce pasando el texto.
    public init(_ label: LocalizedStringKey = "Cerrar", size: BrandControlSize = .md, action: @escaping () -> Void) {
        self.label = label
        self.size = size
        self.action = action
    }

    private var side: CGFloat {
        switch size {
        case .sm: BrandCloseButtonTokens.sizeSm
        case .md: BrandCloseButtonTokens.sizeMd
        case .lg: BrandCloseButtonTokens.sizeLg
        }
    }

    public var body: some View {
        let box = side * scale
        Button(action: action) {
            BrandIcon(.close, size: .md)
                .foregroundStyle(BrandCloseButtonTokens.color)
                .frame(width: box, height: box)
                .overlay {
                    if isFocused {
                        Rectangle()
                            .stroke(BrandCloseButtonTokens.focusRingColor, lineWidth: BrandCloseButtonTokens.focusRingWidth)
                            .padding(-(BrandCloseButtonTokens.focusRingOffset + BrandCloseButtonTokens.focusRingWidth / 2))
                    }
                }
                .contentShape(Rectangle())
                .brandHitTarget(width: box, height: box)
        }
        .buttonStyle(.plain)
        .focusEffectDisabled()
        .accessibilityLabel(Text(label))
    }
}

#Preview("CloseButton") {
    HStack {
        ForEach(BrandControlSize.allCases, id: \.self) { BrandCloseButton(size: $0) {} }
    }
    .padding()
}
