import SwiftUI

/// El contenido de un cajón de la marca (`Sheet`): cabecera con título y descripción, aspa de cierre en la esquina,
/// cuerpo con desplazamiento y pie de acciones. Es lo que `brandSheet(isPresented:…)` presenta con el `.sheet` nativo;
/// también se puede usar suelto dentro de cualquier presentación propia.
///
/// El título es obligatorio y es el nombre accesible del cajón (VoiceOver lo anuncia como encabezado). `titleHidden` lo
/// deja solo para el lector de pantalla.
public struct BrandSheetContent<Content: View, Footer: View>: View {
    private let title: LocalizedStringKey
    private let titleHidden: Bool
    private let description: LocalizedStringKey?
    private let closeLabel: LocalizedStringKey
    private let hideClose: Bool
    private let onClose: () -> Void
    private let content: Content
    private let footer: Footer

    private typealias T = BrandSheetTokens

    public init(
        title: LocalizedStringKey,
        titleHidden: Bool = false,
        description: LocalizedStringKey? = nil,
        closeLabel: LocalizedStringKey = "Cerrar",
        hideClose: Bool = false,
        onClose: @escaping () -> Void,
        @ViewBuilder footer: () -> Footer,
        @ViewBuilder content: () -> Content
    ) {
        self.title = title
        self.titleHidden = titleHidden
        self.description = description
        self.closeLabel = closeLabel
        self.hideClose = hideClose
        self.onClose = onClose
        self.footer = footer()
        self.content = content()
    }

    private var hasFooter: Bool { Footer.self != EmptyView.self }

    public var body: some View {
        BrandDialogWidthReader {
            VStack(alignment: .leading, spacing: T.gap) {
                ScrollView {
                    VStack(alignment: .leading, spacing: T.gap) {
                        header
                        content.frame(maxWidth: .infinity, alignment: .leading)
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                }
                .scrollBounceBehavior(.basedOnSize)
                if hasFooter {
                    BrandDialogFooter(gap: T.footerGap) { footer }
                }
            }
        }
        .padding(.vertical, T.paddingBlock)
        .padding(.horizontal, T.paddingInline)
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
        .background(T.bg)
        .overlay(alignment: .topTrailing) {
            if !hideClose {
                BrandCloseButton(closeLabel, size: .md, action: onClose)
                    .padding(T.closeInset)
            }
        }
        .accessibilityElement(children: .contain)
        .accessibilityAction(.escape, onClose)
    }

    @ViewBuilder
    private var header: some View {
        VStack(alignment: .leading, spacing: T.headerGap) {
            if titleHidden {
                Text(title).brandFont(size: T.titleFontSize, weight: T.titleFontWeight, relativeTo: .title)
                    .frame(width: 0, height: 0).clipped().opacity(0)
                    .accessibilityAddTraits(.isHeader)
            } else {
                // El título es un `<h2>` y `.sheet__title` no fija `line-height`: hereda el de `h2` (`text.h2-line-height`).
                Text(title)
                    .brandLinedFont(size: T.titleFontSize, weight: T.titleFontWeight, lineHeight: BrandTextTokens.h2LineHeight,
                                    relativeTo: .title)
                    .foregroundStyle(T.titleColor)
                    .fixedSize(horizontal: false, vertical: true)
                    .accessibilityAddTraits(.isHeader)
            }
            if let description {
                // `.sheet__description` hereda el `line-height` del cuerpo (`text.line-height`).
                Text(description)
                    .brandLinedFont(size: T.descriptionFontSize, lineHeight: BrandTextTokens.lineHeight)
                    .foregroundStyle(T.descriptionColor)
                    .fixedSize(horizontal: false, vertical: true)
            }
        }
        // Sitio para el aspa, como `--dialog-header-close-room` en la web.
        .padding(.trailing, hideClose ? 0 : T.paddingInline)
    }
}

extension BrandSheetContent where Footer == EmptyView {
    public init(
        title: LocalizedStringKey,
        titleHidden: Bool = false,
        description: LocalizedStringKey? = nil,
        closeLabel: LocalizedStringKey = "Cerrar",
        hideClose: Bool = false,
        onClose: @escaping () -> Void,
        @ViewBuilder content: () -> Content
    ) {
        self.init(
            title: title, titleHidden: titleHidden, description: description, closeLabel: closeLabel,
            hideClose: hideClose, onClose: onClose, footer: { EmptyView() }, content: content
        )
    }
}

extension View {
    /// Presenta un cajón de la marca con el `.sheet` nativo: gestos de arrastre, detents, cierre con el gesto de
    /// escape de VoiceOver y `Esc` en macOS. Equivale a `Sheet` de React con `side: bottom`.
    ///
    /// ```swift
    /// Button("Filtros") { showFilters = true }
    ///     .brandSheet(isPresented: $showFilters, title: "Filtros", description: "Afina los resultados") {
    ///         FilterForm()
    ///     } footer: {
    ///         BrandDialogButton("Cancelar", variant: .outline) { showFilters = false }
    ///         BrandDialogButton("Aplicar") { apply(); showFilters = false }
    ///     }
    /// ```
    ///
    /// - Parameters:
    ///   - isPresented: `open` + `onOpenChange` de React.
    ///   - detents: alturas a las que se detiene en iOS (por defecto, media pantalla y completa).
    public func brandSheet<Content: View, Footer: View>(
        isPresented: Binding<Bool>,
        title: LocalizedStringKey,
        titleHidden: Bool = false,
        description: LocalizedStringKey? = nil,
        closeLabel: LocalizedStringKey = "Cerrar",
        hideClose: Bool = false,
        detents: Set<PresentationDetent> = [.medium, .large],
        @ViewBuilder content: @escaping () -> Content,
        @ViewBuilder footer: @escaping () -> Footer
    ) -> some View {
        sheet(isPresented: isPresented) {
            BrandSheetContent(
                title: title, titleHidden: titleHidden, description: description, closeLabel: closeLabel,
                hideClose: hideClose, onClose: { isPresented.wrappedValue = false }, footer: footer, content: content
            )
            .presentationDetents(detents)
            .presentationDragIndicator(.visible)
            .presentationBackground(BrandSheetTokens.bg)
            #if os(macOS)
            .frame(minWidth: BrandSheetContentMetrics.macOSMinWidth, minHeight: BrandSheetContentMetrics.macOSMinHeight)
            #endif
        }
    }

    /// Un cajón sin pie de acciones.
    public func brandSheet<Content: View>(
        isPresented: Binding<Bool>,
        title: LocalizedStringKey,
        titleHidden: Bool = false,
        description: LocalizedStringKey? = nil,
        closeLabel: LocalizedStringKey = "Cerrar",
        hideClose: Bool = false,
        detents: Set<PresentationDetent> = [.medium, .large],
        @ViewBuilder content: @escaping () -> Content
    ) -> some View {
        brandSheet(
            isPresented: isPresented, title: title, titleHidden: titleHidden, description: description,
            closeLabel: closeLabel, hideClose: hideClose, detents: detents, content: content, footer: { EmptyView() }
        )
    }
}

/// Medidas de la hoja en macOS, donde no hay detents. El token `sheet.inline-size` es `min(20rem, 85vw)` (una
/// función de CSS que no se genera): 20 rem = 320 pt es su primer término. El alto no tiene token en la web.
enum BrandSheetContentMetrics {
    static let macOSMinWidth: CGFloat = 320
    static let macOSMinHeight: CGFloat = 240
}

#Preview("Sheet — contenido") {
    BrandSheetContent(
        title: "Filtros", description: "Afina los resultados de la lista.", onClose: {},
        footer: {
            BrandDialogButton("Cancelar", variant: .outline) {}
            BrandDialogButton("Aplicar") {}
        },
        content: { BrandParagraph(verbatim: "El cuerpo del cajón va aquí.") }
    )
    .frame(width: 390, height: 460)
}
