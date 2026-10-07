import SwiftUI

/// `Banner` `tone`: la intención de la barra. `info` es el relleno prusia; `warning` y `error` son los rellenos de
/// aviso y de error, para el estado que hay que ver antes que nada.
public enum BannerTone: String, CaseIterable, Sendable {
    case info, warning, error
}

/// El nombre de `BannerTone` hasta la v50. Se retira en la v52.
@available(*, deprecated, renamed: "BannerTone")
public typealias BannerVariant = BannerTone

/// Una barra de sistema (`Banner` de React): un aviso persistente, a ancho completo, que acompaña a toda la sesión y
/// vive **fuera** del contenido —el caso de referencia es «estás viendo la aplicación como alguien» con el botón de
/// dejar de suplantar—.
///
/// ```swift
/// BrandBanner(verbatim: "Estás viendo la aplicación como ana.perez@studiolxd.com.", onDismiss: { hide() }) {
///     BrandButton("Dejar de suplantar", variant: .outline) { stop() }
/// }
/// BrandBanner("El mantenimiento empieza hoy a las 22:00.", tone: .warning)
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
    private let tone: BannerTone
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
        tone: BannerTone = .info,
        onDismiss: (() -> Void)? = nil,
        dismissLabel: LocalizedStringKey = "Descartar",
        @ViewBuilder content: () -> Content,
        @ViewBuilder actions: () -> Actions
    ) {
        self.tone = tone
        self.onDismiss = onDismiss
        self.dismissLabel = dismissLabel
        self.content = content()
        self.actions = actions()
        hasActions = true
    }

    private var fill: (bg: Color, ink: Color, border: Color) {
        switch tone {
        case .info: (T.infoBg, T.infoColor, T.infoBorderColor)
        case .warning: (T.warningBg, T.warningColor, T.warningBorderColor)
        case .error: (T.errorBg, T.errorColor, T.errorBorderColor)
        }
    }

    /// La superficie de lo que se compone DENTRO del relleno (`.surface-dark` en `info` y `error`, `.surface-light` en
    /// `warning`): el relleno es el mismo en las dos superficies, así que su contenido no sigue a la de la página.
    private var innerScheme: ColorScheme { tone == .warning ? .light : .dark }

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
        // El aspa se coloca desde el borde INTERIOR (el `position: absolute` de la web cuenta desde la caja de relleno):
        // por eso va antes del filete, a `close-inset` de la esquina del relleno (9 del canto, como en la web).
        .overlay(alignment: .topTrailing) {
            if let onDismiss {
                BrandCloseButton(dismissLabel, size: .sm, action: onDismiss)
                    .environment(\.colorScheme, innerScheme)
                    .padding(T.closeInset)
            }
        }
        // La caja de borde de CSS (`box-sizing: border-box`): los filetes de arriba y abajo ocupan sitio por fuera del
        // relleno, así que una barra de una línea mide 1 + 12 + 24 + 12 + 1 = 50, como en la web.
        .padding(.vertical, T.borderWidth)
        .background(fill.bg)
        .overlay(alignment: .top) { Rectangle().fill(fill.border).frame(height: T.borderWidth) }
        .overlay(alignment: .bottom) { Rectangle().fill(fill.border).frame(height: T.borderWidth) }
        .background {
            GeometryReader { proxy in
                Color.clear.onAppear { width = proxy.size.width }
                    .onChange(of: proxy.size.width) { _, new in width = new }
            }
        }
        .accessibilityElement(children: .contain)
        .accessibilityAddTraits(.updatesFrequently)
        .accessibilitySortPriority(tone == .info ? 0 : 1)
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
        tone: BannerTone = .info,
        onDismiss: (() -> Void)? = nil,
        dismissLabel: LocalizedStringKey = "Descartar",
        @ViewBuilder content: () -> Content
    ) {
        self.tone = tone
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
        tone: BannerTone = .info,
        onDismiss: (() -> Void)? = nil,
        dismissLabel: LocalizedStringKey = "Descartar",
        @ViewBuilder actions: () -> Actions
    ) {
        self.init(tone: tone, onDismiss: onDismiss, dismissLabel: dismissLabel, content: { Text(message) }, actions: actions)
    }

    /// Para mensajes que salen de los datos (un correo, un nombre).
    public init(
        verbatim message: String,
        tone: BannerTone = .info,
        onDismiss: (() -> Void)? = nil,
        dismissLabel: LocalizedStringKey = "Descartar",
        @ViewBuilder actions: () -> Actions
    ) {
        self.init(tone: tone, onDismiss: onDismiss, dismissLabel: dismissLabel, content: { Text(verbatim: message) }, actions: actions)
    }
}

extension BrandBanner where Content == Text, Actions == EmptyView {
    /// Una barra con un mensaje de texto y sin acciones.
    public init(
        _ message: LocalizedStringKey,
        tone: BannerTone = .info,
        onDismiss: (() -> Void)? = nil,
        dismissLabel: LocalizedStringKey = "Descartar"
    ) {
        self.init(tone: tone, onDismiss: onDismiss, dismissLabel: dismissLabel, content: { Text(message) })
    }

    public init(
        verbatim message: String,
        tone: BannerTone = .info,
        onDismiss: (() -> Void)? = nil,
        dismissLabel: LocalizedStringKey = "Descartar"
    ) {
        self.init(tone: tone, onDismiss: onDismiss, dismissLabel: dismissLabel, content: { Text(verbatim: message) })
    }
}

// MARK: - Alias obsoletos (v51): `variant` es `tone`. Se retiran en la v52.

extension BrandBanner {
    @available(*, deprecated, renamed: "init(tone:onDismiss:dismissLabel:content:actions:)")
    public init(
        variant: BannerTone,
        onDismiss: (() -> Void)? = nil,
        dismissLabel: LocalizedStringKey = "Descartar",
        @ViewBuilder content: () -> Content,
        @ViewBuilder actions: () -> Actions
    ) {
        self.init(tone: variant, onDismiss: onDismiss, dismissLabel: dismissLabel, content: content, actions: actions)
    }
}

extension BrandBanner where Actions == EmptyView {
    @available(*, deprecated, renamed: "init(tone:onDismiss:dismissLabel:content:)")
    public init(
        variant: BannerTone,
        onDismiss: (() -> Void)? = nil,
        dismissLabel: LocalizedStringKey = "Descartar",
        @ViewBuilder content: () -> Content
    ) {
        self.init(tone: variant, onDismiss: onDismiss, dismissLabel: dismissLabel, content: content)
    }
}

extension BrandBanner where Content == Text {
    @available(*, deprecated, renamed: "init(_:tone:onDismiss:dismissLabel:actions:)")
    public init(
        _ message: LocalizedStringKey,
        variant: BannerTone,
        onDismiss: (() -> Void)? = nil,
        dismissLabel: LocalizedStringKey = "Descartar",
        @ViewBuilder actions: () -> Actions
    ) {
        self.init(message, tone: variant, onDismiss: onDismiss, dismissLabel: dismissLabel, actions: actions)
    }

    @available(*, deprecated, renamed: "init(verbatim:tone:onDismiss:dismissLabel:actions:)")
    public init(
        verbatim message: String,
        variant: BannerTone,
        onDismiss: (() -> Void)? = nil,
        dismissLabel: LocalizedStringKey = "Descartar",
        @ViewBuilder actions: () -> Actions
    ) {
        self.init(verbatim: message, tone: variant, onDismiss: onDismiss, dismissLabel: dismissLabel, actions: actions)
    }
}

extension BrandBanner where Content == Text, Actions == EmptyView {
    @available(*, deprecated, renamed: "init(_:tone:onDismiss:dismissLabel:)")
    public init(
        _ message: LocalizedStringKey,
        variant: BannerTone,
        onDismiss: (() -> Void)? = nil,
        dismissLabel: LocalizedStringKey = "Descartar"
    ) {
        self.init(message, tone: variant, onDismiss: onDismiss, dismissLabel: dismissLabel)
    }

    @available(*, deprecated, renamed: "init(verbatim:tone:onDismiss:dismissLabel:)")
    public init(
        verbatim message: String,
        variant: BannerTone,
        onDismiss: (() -> Void)? = nil,
        dismissLabel: LocalizedStringKey = "Descartar"
    ) {
        self.init(verbatim: message, tone: variant, onDismiss: onDismiss, dismissLabel: dismissLabel)
    }
}

#Preview("Banner") {
    ScrollView {
        VStack(spacing: BrandSpacing.s5) {
            BrandBanner(verbatim: "Estás viendo la aplicación como ana.perez@studiolxd.com.")
            BrandBanner("El mantenimiento previsto empieza hoy a las 22:00 y durará una hora.", tone: .warning)
            BrandBanner("No hemos podido guardar los cambios. Revisa la conexión.", tone: .error)
            BrandBanner(verbatim: "Estás viendo la aplicación como ana.perez@studiolxd.com.") {
                BrandButton("Dejar de suplantar", variant: .outline) {}
            }
            BrandBanner(verbatim: "Estás viendo la aplicación como ana.perez@studiolxd.com.", onDismiss: {}) {
                BrandButton("Dejar de suplantar", variant: .outline) {}
            }
            BrandBanner("El mantenimiento empieza a las 22:00.", tone: .warning, onDismiss: {}) {
                BrandButton("Más información", variant: .outline) {}
            }
        }
    }
}
