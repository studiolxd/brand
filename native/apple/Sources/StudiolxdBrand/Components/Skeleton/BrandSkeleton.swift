import SwiftUI

/// Marcador de contenido que aún está cargando: un bloque con un brillo que lo barre de izquierda a derecha
/// (`skeleton.duration`, en bucle). Es decorativo —se oculta a VoiceOver—: el contenedor debe anunciar la carga
/// (`accessibilityLabel`, `aria-busy`…). Con «Reducir movimiento» se queda como fondo plano.
///
/// ```swift
/// VStack(spacing: BrandSpacing.s3) {
///     BrandSkeleton(width: 160)                 // una línea de texto
///     BrandSkeleton(height: 44)
///     BrandSkeleton(width: 48, height: 48, circle: true)
/// }
/// .accessibilityElement(children: .ignore)
/// .accessibilityLabel("Cargando")
/// ```
public struct BrandSkeleton: View {
    private let width: CGFloat?
    private let height: CGFloat?
    private let circle: Bool
    /// Fase congelada del barrido (0…1), para las capturas. `nil` = animado.
    private let frozenPhase: Double?
    /// Fuerza el modo de movimiento reducido (para las capturas: el entorno no se puede escribir).
    private let forcesReducedMotion: Bool

    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @ScaledMetric(relativeTo: .body) private var lineHeight: CGFloat = BrandTextTokens.fontSize * BrandTextTokens.lineHeight

    /// - Parameters:
    ///   - width: sin valor, ocupa todo el ancho disponible (con `circle`, el alto).
    ///   - height: sin valor, una línea de texto (`1lh` en React: cuerpo × interlineado).
    public init(width: CGFloat? = nil, height: CGFloat? = nil, circle: Bool = false) {
        self.init(width: width, height: height, circle: circle, frozenPhase: nil)
    }

    init(width: CGFloat?, height: CGFloat?, circle: Bool, frozenPhase: Double?, forcesReducedMotion: Bool = false) {
        self.forcesReducedMotion = forcesReducedMotion
        self.width = width
        self.height = height
        self.circle = circle
        self.frozenPhase = frozenPhase
    }

    public var body: some View {
        let h = height ?? lineHeight
        let shape = RoundedRectangle(cornerRadius: circle ? BrandSkeletonTokens.circleBorderRadius : BrandSkeletonTokens.borderRadius)
        Group {
            if let frozenPhase {
                block(phase: frozenPhase, shape: shape)
            } else if reduceMotion || forcesReducedMotion {
                block(phase: nil, shape: shape)
            } else {
                TimelineView(.animation) { context in
                    let t = context.date.timeIntervalSinceReferenceDate / BrandSkeletonTokens.duration
                    block(phase: t - t.rounded(.down), shape: shape)
                }
            }
        }
        .frame(width: circle ? (width ?? h) : width, height: h)
        .frame(maxWidth: (width == nil && !circle) ? .infinity : nil)
        .accessibilityHidden(true)
    }

    /// El fondo y, encima, el brillo: una caja de 2× el ancho con un degradado transparente → brillo → transparente
    /// que va de fuera por la izquierda a fuera por la derecha (`background-position` de 200 % a −200 %).
    private func block(phase: Double?, shape: RoundedRectangle) -> some View {
        shape.fill(BrandSkeletonTokens.bg)
            .overlay {
                if let phase {
                    GeometryReader { proxy in
                        let w = proxy.size.width
                        LinearGradient(
                            colors: [.clear, BrandSkeletonTokens.highlight, .clear],
                            startPoint: .leading, endPoint: .trailing
                        )
                        .frame(width: 2 * w)
                        .offset(x: -2 * w + 4 * w * phase)
                    }
                    .clipShape(shape)
                }
            }
    }
}

#Preview("Skeleton") {
    VStack(alignment: .leading, spacing: BrandSpacing.s3) {
        BrandSkeleton()
        BrandSkeleton(width: 160)
        BrandSkeleton(height: 44)
        HStack {
            BrandSkeleton(width: 48, height: 48, circle: true)
            VStack { BrandSkeleton(); BrandSkeleton(width: 120) }
        }
    }
    .padding()
}
