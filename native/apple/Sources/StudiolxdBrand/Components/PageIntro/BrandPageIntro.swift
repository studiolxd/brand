import SwiftUI

/// El encabezado de una pantalla, DENTRO del contenido (`PageIntro` de React): un título con su entradilla, una
/// ranura encima del título (`eyebrow`: una etiqueta, una categoría), más contenido debajo y las acciones de la página.
///
/// ```swift
/// BrandPageIntro("Webhooks", description: "Reglas que se disparan solas cuando algo cambia.",
///                actions: { BrandButton("Crear webhook") { create() } })
/// BrandPageIntro("Automatizaciones", eyebrow: { BrandTag("Beta") })
/// ```
///
/// Las ranuras (`eyebrow`, `content`, `actions`) se pasan **con su nombre** y en ese orden; cualquier combinación vale.
///
/// - El título es un `BrandHeading` del `level` dado (por defecto **h1**: es el título de la página) y, con `size`,
///   con el tamaño de otro paso de la escala. VoiceOver lo anuncia como encabezado de ese nivel.
/// - La entradilla es un `BrandParagraph` de tamaño `large`.
/// - Con `actions`, el título va a la izquierda y las acciones a la derecha, en una fila, a partir de 480 pt de ancho;
///   por debajo, las acciones caen bajo el título y sus botones ocupan la línea.
///
/// **No** sustituye a la barra de navegación del sistema (`NavigationStack`, `toolbar`): esa sigue siendo del sistema.
public struct BrandPageIntro<Eyebrow: View, Content: View, Actions: View>: View {
    private let title: Text
    private let level: HeadingLevel
    private let size: HeadingSize?
    private let description: Text?
    private let eyebrow: Eyebrow?
    private let content: Content?
    private let actions: Actions?

    @ScaledMetric(relativeTo: .title) private var headingPoints: CGFloat = 0
    @State private var width: CGFloat = 0

    private typealias T = BrandPageIntroTokens

    /// El inicializador de fondo, con las ranuras ya construidas (`nil` = no hay). Los de abajo lo envuelven.
    ///
    /// - Parameters:
    ///   - level: el nivel del título en el esquema de la pantalla. Por defecto `h1`.
    ///   - size: un paso de la escala de títulos, independiente del nivel.
    ///   - description: la entradilla bajo el título.
    public init(
        title: Text,
        level: HeadingLevel = .h1,
        size: HeadingSize? = nil,
        description: Text? = nil,
        eyebrowView: Eyebrow?,
        contentView: Content?,
        actionsView: Actions?
    ) {
        self.title = title
        self.level = level
        self.size = size
        self.description = description
        eyebrow = eyebrowView
        content = contentView
        actions = actionsView
        _headingPoints = ScaledMetric(wrappedValue: size?.points ?? level.points, relativeTo: .title)
    }

    /// Por debajo del umbral las acciones caen bajo el título y sus botones ocupan la línea.
    private var stacked: Bool { width > 0 && width < brandAdaptiveRowThreshold }

    /// El aire bajo el título: `page-intro.title-space-after` en em (escala con el tamaño del título).
    private var spaceAfterTitle: CGFloat { T.titleSpaceAfter * headingPoints }

    private var titleGroup: some View {
        VStack(alignment: .leading, spacing: T.rowGap) {
            if let eyebrow { eyebrow }
            BrandHeading(title: title, level: level, size: size)
        }
    }

    public var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            if let actions {
                BrandAdaptiveRowLayout(rowSpacing: T.rowColumnGap, stackSpacing: T.rowGap, alignment: .firstTextBaseline) {
                    titleGroup.frame(maxWidth: .infinity, alignment: .leading)
                    Group {
                        if stacked {
                            VStack(spacing: T.actionsGap) { actions }
                        } else {
                            HStack(spacing: T.actionsGap) { actions }
                        }
                    }
                    .environment(\.brandStretchButtons, stacked)
                    .frame(maxWidth: stacked ? .infinity : nil, alignment: .trailing)
                }
            } else {
                titleGroup
            }
            // Bajo el título, el aire es su margen en em; si las acciones caen debajo, ya no separa el título de la
            // entradilla sino de un botón y la separación la pone el espaciado entre bloques.
            let gapBelowHeading = actions != nil && stacked ? BrandSpacing.s3 : spaceAfterTitle
            if let description {
                BrandParagraph(description, size: .large)
                    .padding(.top, gapBelowHeading)
            }
            if let content {
                content
                    .padding(.top, description == nil ? gapBelowHeading : BrandSpacing.s3)
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .background {
            GeometryReader { proxy in
                Color.clear.onAppear { width = proxy.size.width }
                    .onChange(of: proxy.size.width) { _, new in width = new }
            }
        }
    }
}

// MARK: - Atajos por ranuras

extension BrandPageIntro where Eyebrow == EmptyView, Content == EmptyView, Actions == EmptyView {
    public init(_ title: LocalizedStringKey, level: HeadingLevel = .h1, size: HeadingSize? = nil, description: LocalizedStringKey? = nil) {
        self.init(title: Text(title), level: level, size: size, description: description.map { Text($0) },
                  eyebrowView: nil, contentView: nil, actionsView: nil)
    }
}

extension BrandPageIntro where Eyebrow == EmptyView, Content == EmptyView {
    public init(_ title: LocalizedStringKey, level: HeadingLevel = .h1, size: HeadingSize? = nil, description: LocalizedStringKey? = nil,
                @ViewBuilder actions: () -> Actions) {
        self.init(title: Text(title), level: level, size: size, description: description.map { Text($0) },
                  eyebrowView: nil, contentView: nil, actionsView: actions())
    }
}

extension BrandPageIntro where Content == EmptyView, Actions == EmptyView {
    public init(_ title: LocalizedStringKey, level: HeadingLevel = .h1, size: HeadingSize? = nil, description: LocalizedStringKey? = nil,
                @ViewBuilder eyebrow: () -> Eyebrow) {
        self.init(title: Text(title), level: level, size: size, description: description.map { Text($0) },
                  eyebrowView: eyebrow(), contentView: nil, actionsView: nil)
    }
}

extension BrandPageIntro where Eyebrow == EmptyView, Actions == EmptyView {
    public init(_ title: LocalizedStringKey, level: HeadingLevel = .h1, size: HeadingSize? = nil, description: LocalizedStringKey? = nil,
                @ViewBuilder content: () -> Content) {
        self.init(title: Text(title), level: level, size: size, description: description.map { Text($0) },
                  eyebrowView: nil, contentView: content(), actionsView: nil)
    }
}

extension BrandPageIntro where Content == EmptyView {
    public init(_ title: LocalizedStringKey, level: HeadingLevel = .h1, size: HeadingSize? = nil, description: LocalizedStringKey? = nil,
                @ViewBuilder eyebrow: () -> Eyebrow, @ViewBuilder actions: () -> Actions) {
        self.init(title: Text(title), level: level, size: size, description: description.map { Text($0) },
                  eyebrowView: eyebrow(), contentView: nil, actionsView: actions())
    }
}

extension BrandPageIntro where Actions == EmptyView {
    public init(_ title: LocalizedStringKey, level: HeadingLevel = .h1, size: HeadingSize? = nil, description: LocalizedStringKey? = nil,
                @ViewBuilder eyebrow: () -> Eyebrow, @ViewBuilder content: () -> Content) {
        self.init(title: Text(title), level: level, size: size, description: description.map { Text($0) },
                  eyebrowView: eyebrow(), contentView: content(), actionsView: nil)
    }
}

extension BrandPageIntro where Eyebrow == EmptyView {
    public init(_ title: LocalizedStringKey, level: HeadingLevel = .h1, size: HeadingSize? = nil, description: LocalizedStringKey? = nil,
                @ViewBuilder content: () -> Content, @ViewBuilder actions: () -> Actions) {
        self.init(title: Text(title), level: level, size: size, description: description.map { Text($0) },
                  eyebrowView: nil, contentView: content(), actionsView: actions())
    }
}

extension BrandPageIntro {
    /// Con las tres ranuras.
    public init(_ title: LocalizedStringKey, level: HeadingLevel = .h1, size: HeadingSize? = nil, description: LocalizedStringKey? = nil,
                @ViewBuilder eyebrow: () -> Eyebrow, @ViewBuilder content: () -> Content, @ViewBuilder actions: () -> Actions) {
        self.init(title: Text(title), level: level, size: size, description: description.map { Text($0) },
                  eyebrowView: eyebrow(), contentView: content(), actionsView: actions())
    }
}

#Preview("PageIntro") {
    ScrollView {
        VStack(alignment: .leading, spacing: BrandSpacing.s6) {
            BrandPageIntro("¿Olvidaste tu contraseña?", description: "Ingresa tu correo y te enviaremos un enlace para restablecerla.")
            BrandPageIntro("Miembros", actions: { BrandButton("Invitar miembro") {} })
            BrandPageIntro("Webhooks", actions: {
                BrandButton("Crear webhook") {}
                BrandButton("Ver registro", variant: .outline) {}
            })
            BrandPageIntro("Automatizaciones", description: "Reglas que se disparan solas cuando algo cambia en la organización.",
                           eyebrow: { BrandTag("Beta") },
                           content: { BrandParagraph("Disponible solo para el plan Studio.", size: .small) })
            BrandPageIntro("Ajustes", level: .h2, size: .s5, description: "Un h2 con el tamaño de un h4.")
        }
        .padding()
    }
}
