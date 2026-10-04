import SwiftUI

/// `Banner` `variant`: la intención de la barra. `info` es el relleno prusia; `warning` y `error` son los rellenos de
/// aviso y de error, para el estado que hay que ver antes que nada.
public enum BannerVariant: String, CaseIterable, Sendable {
    case info, warning, error
}

/// Una barra de sistema (`Banner` de React): un aviso persistente, a ancho completo, que acompaña a toda la sesión y
/// vive **fuera** del contenido —el caso de referencia es «estás viendo la aplicación como alguien» con el botón de
/// dejar de suplantar—.
///
/// ```swift
/// BrandBanner(verbatim: "Estás viendo la aplicación como ana.perez@studiolxd.com.", onDismiss: { hide() }) {
///     BrandButton("Dejar de suplantar", variant: .outline) { stop() }
/// }
/// BrandBanner("El mantenimiento empieza hoy a las 22:00.", variant: .warning)
/// ```
///
/// - **No fija su posición**: la app la coloca (arriba con `safeAreaInset`, o en la columna de la pantalla).
/// - **No se oculta sola**: `onDismiss` avisa y la app decide; con `onDismiss` la barra pinta el aspa.
/// - Los tres rellenos son **universales** (iguales en claro y oscuro) y lo que se compone dentro (el mensaje, los
///   botones de `actions`, el aspa) lee con la tinta del relleno: el `info` y el `error` en la cara oscura, el
///   `warning` (amarillo) en la clara.
/// - El mensaje y las acciones **apilan** por debajo de 480 pt de ancho (los botones ocupan la línea); a partir de
///   ahí van en una fila. El aspa va en la esquina superior derecha, a `close-inset`.
/// - VoiceOver: `error` y `warning` se anuncian como aviso (leídos antes que el resto, `updatesFrequently`) y `info`
///   informa sin interrumpir.
public struct BrandBanner<Content: View, Actions: View>: View {
    private let variant: BannerVariant
    private let onDismiss: (() -> Void)?
    private let dismissLabel: LocalizedStringKey
    private let content: Content
    private let actions: Actions
    private let hasActions: Bool

    @State private var width: CGFloat = 0

    private typealias T = BrandBannerTokens

    /// - Parameters:
    ///   - onDismiss: qué hacer al descartar. Si se pasa, la barra pinta el aspa; la barra no se oculta sola.
    ///   - dismissLabel: nombre accesible del aspa. Por defecto «Descartar» (castellano).
    ///   - content: el mensaje: texto corriente, una frase y no un bloque.
    ///   - actions: ranura de acciones, normalmente un `BrandButton`.
    public init(
        variant: BannerVariant = .info,
        onDismiss: (() -> Void)? = nil,
        dismissLabel: LocalizedStringKey = "Descartar",
        @ViewBuilder content: () -> Content,
        @ViewBuilder actions: () -> Actions
    ) {
        self.variant = variant
        self.onDismiss = onDismiss
        self.dismissLabel = dismissLabel
        self.content = content()
        self.actions = actions()
        hasActions = true
    }

    private var fill: (bg: Color, ink: Color, border: Color) {
        switch variant {
        case .info: (T.infoBg, T.infoColor, T.infoBorderColor)
        case .warning: (T.warningBg, T.warningColor, T.warningBorderColor)
        case .error: (T.errorBg, T.errorColor, T.errorBorderColor)
        }
    }

    /// La superficie de lo que se compone DENTRO del relleno (`.surface-dark` en `info` y `error`, `.surface-light` en
    /// `warning`): el relleno es el mismo en las dos superficies, así que su contenido no sigue a la de la página.
    private var innerScheme: ColorScheme { variant == .warning ? .light : .dark }

    /// El relleno del lado del aspa: con aspa, `close-inset × 2 + close-size` (`padding-inline-end` de
    /// `.banner--dismissible`, que sustituye al relleno lateral); sin ella, el relleno lateral de siempre.
    private var trailingInset: CGFloat { onDismiss == nil ? T.paddingInline : T.closeInset * 2 + T.closeSize }

    /// Por debajo del umbral el mensaje y las acciones apilan y los botones ocupan la línea.
    private var stacked: Bool { width > 0 && width < brandAdaptiveRowThreshold }

    public var body: some View {
        let fill = fill
        BrandAdaptiveRowLayout(widthOffset: T.paddingInline + trailingInset, rowSpacing: T.gap, stackSpacing: T.gap) {
            message(ink: fill.ink)
            if hasActions { actionsSlot }
        }
        .padding(.vertical, T.paddingBlock)
        .padding(.leading, T.paddingInline)
        .padding(.trailing, trailingInset)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(fill.bg)
        .overlay(alignment: .top) { Rectangle().fill(fill.border).frame(height: T.borderWidth) }
        .overlay(alignment: .bottom) { Rectangle().fill(fill.border).frame(height: T.borderWidth) }
        .overlay(alignment: .topTrailing) {
            if let onDismiss {
                BrandCloseButton(dismissLabel, size: .sm, action: onDismiss)
                    .environment(\.colorScheme, innerScheme)
                    .padding(T.closeInset)
            }
        }
        .background {
            GeometryReader { proxy in
                Color.clear.onAppear { width = proxy.size.width }
                    .onChange(of: proxy.size.width) { _, new in width = new }
            }
        }
        .accessibilityElement(children: .contain)
        .accessibilityAddTraits(.updatesFrequently)
        .accessibilitySortPriority(variant == .info ? 0 : 1)
    }

    private func message(ink: Color) -> some View {
        content
            .brandLinedFont(size: T.fontSize, lineHeight: T.lineHeight)
            .foregroundStyle(ink)
            .frame(maxWidth: .infinity, alignment: .leading)
            .fixedSize(horizontal: false, vertical: true)
            .environment(\.colorScheme, innerScheme)
    }

    /// Las acciones, en una sola ranura: una columna que ocupa la línea por debajo del umbral y una fila a partir de él.
    private var actionsSlot: some View {
        Group {
            if stacked {
                VStack(spacing: T.gap) { actions }
            } else {
                HStack(spacing: T.gap) { actions }
            }
        }
        .environment(\.brandStretchButtons, stacked)
        .environment(\.colorScheme, innerScheme)
        .frame(maxWidth: stacked ? .infinity : nil, alignment: .trailing)
    }
}

extension BrandBanner where Actions == EmptyView {
    /// Una barra sin acciones.
    public init(
        variant: BannerVariant = .info,
        onDismiss: (() -> Void)? = nil,
        dismissLabel: LocalizedStringKey = "Descartar",
        @ViewBuilder content: () -> Content
    ) {
        self.variant = variant
        self.onDismiss = onDismiss
        self.dismissLabel = dismissLabel
        self.content = content()
        actions = EmptyView()
        hasActions = false
    }
}

extension BrandBanner where Content == Text {
    /// Una barra con un mensaje de texto y, si hace falta, acciones.
    public init(
        _ message: LocalizedStringKey,
        variant: BannerVariant = .info,
        onDismiss: (() -> Void)? = nil,
        dismissLabel: LocalizedStringKey = "Descartar",
        @ViewBuilder actions: () -> Actions
    ) {
        self.init(variant: variant, onDismiss: onDismiss, dismissLabel: dismissLabel, content: { Text(message) }, actions: actions)
    }

    /// Para mensajes que salen de los datos (un correo, un nombre).
    public init(
        verbatim message: String,
        variant: BannerVariant = .info,
        onDismiss: (() -> Void)? = nil,
        dismissLabel: LocalizedStringKey = "Descartar",
        @ViewBuilder actions: () -> Actions
    ) {
        self.init(variant: variant, onDismiss: onDismiss, dismissLabel: dismissLabel, content: { Text(verbatim: message) }, actions: actions)
    }
}

extension BrandBanner where Content == Text, Actions == EmptyView {
    /// Una barra con un mensaje de texto y sin acciones.
    public init(
        _ message: LocalizedStringKey,
        variant: BannerVariant = .info,
        onDismiss: (() -> Void)? = nil,
        dismissLabel: LocalizedStringKey = "Descartar"
    ) {
        self.init(variant: variant, onDismiss: onDismiss, dismissLabel: dismissLabel, content: { Text(message) })
    }

    public init(
        verbatim message: String,
        variant: BannerVariant = .info,
        onDismiss: (() -> Void)? = nil,
        dismissLabel: LocalizedStringKey = "Descartar"
    ) {
        self.init(variant: variant, onDismiss: onDismiss, dismissLabel: dismissLabel, content: { Text(verbatim: message) })
    }
}

#Preview("Banner") {
    ScrollView {
        VStack(spacing: BrandSpacing.s5) {
            BrandBanner(verbatim: "Estás viendo la aplicación como ana.perez@studiolxd.com.")
            BrandBanner("El mantenimiento previsto empieza hoy a las 22:00 y durará una hora.", variant: .warning)
            BrandBanner("No hemos podido guardar los cambios. Revisa la conexión.", variant: .error)
            BrandBanner(verbatim: "Estás viendo la aplicación como ana.perez@studiolxd.com.") {
                BrandButton("Dejar de suplantar", variant: .outline) {}
            }
            BrandBanner(verbatim: "Estás viendo la aplicación como ana.perez@studiolxd.com.", onDismiss: {}) {
                BrandButton("Dejar de suplantar", variant: .outline) {}
            }
            BrandBanner("El mantenimiento empieza a las 22:00.", variant: .warning, onDismiss: {}) {
                BrandButton("Más información", variant: .outline) {}
            }
        }
    }
}
