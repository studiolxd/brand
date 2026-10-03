import SwiftUI

/// `List` `type`: con viñetas, numerada o sin decoración.
public enum ListType: String, CaseIterable, Sendable {
    case unordered, ordered, plain
}

/// Una lista de la marca: con viñetas, numerada o `plain` (sin marcas ni sangría). Viste el contenido con la tipografía
/// de lista del sistema (`text.list.*`) y deja entre ítems el aire `text.list.gap`. Los ítems son `BrandListItem`
/// (o cualquier vista: cada hijo es una fila).
///
/// ```swift
/// BrandList(type: .ordered) {
///     BrandListItem { Text("Abre la app") }
///     BrandListItem { Text("Elige tu vivienda") }
/// }
/// ```
///
/// Para la fila de una lista de ajustes o de datos (contenido principal, secundario y accesorio final, con
/// separadores) usa `BrandList(type: .plain, showsSeparators: true)` con `BrandListItem(content:secondary:trailing:)`.
public struct BrandList<Content: View>: View {
    private let type: ListType
    private let showsSeparators: Bool
    private let content: Content

    /// - Parameter showsSeparators: solo nativo. Dibuja la línea de `separator.*` entre filas, con el aire
    ///   `separator.spacing-md` a cada lado, en lugar del `text.list.gap` (ver la ficha: `differences`).
    public init(type: ListType = .unordered, showsSeparators: Bool = false, @ViewBuilder content: () -> Content) {
        self.type = type
        self.showsSeparators = showsSeparators
        self.content = content()
    }

    public var body: some View {
        _VariadicView.Tree(BrandListLayout(type: type, showsSeparators: showsSeparators)) { content }
            .brandFont(size: BrandTextTokens.listFontSize, weight: BrandTextTokens.listFontWeight, family: BrandTextTokens.listFontFamily)
            .foregroundStyle(BrandTextTokens.listColor)
            .lineSpacing(BrandTextTokens.listFontSize * (BrandTextTokens.listLineHeight - 1))
            .tracking(BrandTextTokens.listLetterSpacing * BrandTextTokens.listFontSize)
            .accessibilityElement(children: .contain)
    }
}

private struct BrandListLayout: _VariadicView_UnaryViewRoot {
    let type: ListType
    let showsSeparators: Bool

    @ViewBuilder
    func body(children: _VariadicView.Children) -> some View {
        VStack(alignment: .leading, spacing: showsSeparators ? 0 : BrandTextTokens.listGap) {
            ForEach(Array(children.enumerated()), id: \.element.id) { index, child in
                row(index: index, child: child)
                if showsSeparators, index < children.count - 1 {
                    Rectangle()
                        .fill(BrandSeparatorTokens.color)
                        .frame(height: BrandSeparatorTokens.thickness)
                        .padding(.vertical, BrandSeparatorTokens.spacingMd)
                        .accessibilityHidden(true)
                }
            }
        }
    }

    @ViewBuilder
    private func row(index: Int, child: _VariadicView.Children.Element) -> some View {
        if type == .plain {
            child.frame(maxWidth: .infinity, alignment: .leading)
        } else {
            HStack(alignment: .firstTextBaseline, spacing: 0) {
                Text(verbatim: type == .ordered ? "\(index + 1). " : "• ")
                    .frame(width: BrandTextTokens.listPaddingInlineStart, alignment: .trailing)
                    .accessibilityHidden(true)
                child.frame(maxWidth: .infinity, alignment: .leading)
            }
        }
    }
}

/// Un ítem de `BrandList`. Con solo contenido es el `<li>` de React; con `secondary` (una línea menor y atenuada) y
/// `trailing` (un accesorio al final: etiqueta, interruptor, chevron) es la fila de una lista de datos.
public struct BrandListItem<Content: View, Secondary: View, Trailing: View>: View {
    private let content: Content
    private let secondary: Secondary
    private let trailing: Trailing

    public init(
        @ViewBuilder content: () -> Content,
        @ViewBuilder secondary: () -> Secondary,
        @ViewBuilder trailing: () -> Trailing
    ) {
        self.content = content()
        self.secondary = secondary()
        self.trailing = trailing()
    }

    public var body: some View {
        HStack(alignment: .center, spacing: BrandSpacing.s3) {
            VStack(alignment: .leading, spacing: 0) {
                content
                secondary
                    .brandFont(size: BrandTextTokens.paragraphSmallFontSize, weight: BrandTextTokens.listFontWeight, family: BrandTextTokens.listFontFamily)
                    .foregroundStyle(BrandColorRoles.textMuted)
            }
            if Trailing.self != EmptyView.self {
                Spacer(minLength: BrandSpacing.s2)
                trailing
            }
        }
    }
}

extension BrandListItem where Secondary == EmptyView, Trailing == EmptyView {
    /// El ítem simple: `BrandListItem { Text("…") }`.
    public init(@ViewBuilder content: () -> Content) {
        self.init(content: content, secondary: { EmptyView() }, trailing: { EmptyView() })
    }
}

extension BrandListItem where Content == Text, Secondary == Text?, Trailing == EmptyView {
    /// Un ítem de texto con línea secundaria opcional.
    public init(_ title: LocalizedStringKey, subtitle: LocalizedStringKey? = nil) {
        self.init(content: { Text(title) }, secondary: { subtitle.map { Text($0) } }, trailing: { EmptyView() })
    }
}

#Preview("List") {
    ScrollView {
        VStack(alignment: .leading, spacing: BrandSpacing.s6) {
            ForEach(ListType.allCases, id: \.self) { type in
                BrandList(type: type) {
                    BrandListItem("Primer elemento de la lista")
                    BrandListItem("Segundo elemento de la lista")
                    BrandListItem("Tercer elemento de la lista")
                }
            }
            BrandList(type: .plain, showsSeparators: true) {
                BrandListItem(content: { Text("Notificaciones") }, secondary: { Text("Avisos de la comunidad") }, trailing: { BrandIcon(.chevron, size: .sm) })
                BrandListItem(content: { Text("Idioma") }, secondary: { EmptyView() }, trailing: { Text("Español").brand(tone: .muted) })
                BrandListItem("Cerrar sesión")
            }
        }
        .padding()
    }
}
