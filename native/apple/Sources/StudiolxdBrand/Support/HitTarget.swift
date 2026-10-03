import SwiftUI

/// Zona táctil mínima de las guías de Apple (HIG: 44 × 44 pt). No es un token de diseño: es el mínimo de la
/// plataforma, que en la web cubre el puntero (`size-target.min`, 24) y aquí exige el dedo.
public enum BrandHitTarget {
    public static let minimum: CGFloat = 44
}

extension View {
    /// Amplía la zona que responde al toque hasta `BrandHitTarget.minimum` **sin cambiar el aspecto ni la maqueta**:
    /// `padding` positivo, `contentShape` y el mismo `padding` en negativo. `width` y `height` son el tamaño visible
    /// del control (`nil` si ya llena su eje). En macOS el puntero es preciso y no hace nada.
    @ViewBuilder
    public func brandHitTarget(width: CGFloat? = nil, height: CGFloat? = nil) -> some View {
        #if os(iOS)
        let horizontal = max(0, (BrandHitTarget.minimum - (width ?? BrandHitTarget.minimum)) / 2)
        let vertical = max(0, (BrandHitTarget.minimum - (height ?? BrandHitTarget.minimum)) / 2)
        self
            .padding(.horizontal, horizontal)
            .padding(.vertical, vertical)
            .contentShape(Rectangle())
            .padding(.horizontal, -horizontal)
            .padding(.vertical, -vertical)
        #else
        self
        #endif
    }
}
