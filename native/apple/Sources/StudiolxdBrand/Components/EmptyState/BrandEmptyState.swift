import SwiftUI

/// `EmptyState` `size`: `md` por defecto; `sm` para huecos pequeños (una tarjeta, un panel).
public enum EmptyStateSize: String, CaseIterable, Sendable {
    case sm, md
}

/// La acción de un estado vacío (`action` en React: `label` + `onClick`; `href` no existe en nativo).
public struct EmptyStateAction {
    public let label: LocalizedStringKey
    public let perform: () -> Void

    public init(_ label: LocalizedStringKey, perform: @escaping () -> Void) {
        self.label = label
        self.perform = perform
    }
}

/// El estado de una pantalla o lista sin nada que mostrar: icono, rótulo, frase que lo explica y una acción
/// (`BrandButton` outline, `sm` en la talla `sm`).
///
/// ```swift
/// BrandEmptyState(
///     title: "Sin viviendas",
///     description: "Añade tu primera vivienda para empezar.",
///     icon: .folder,
///     action: EmptyStateAction("Añadir vivienda") { add() }
/// )
/// ```
///
/// El rótulo no lleva punto y la descripción termina en punto (Foundations → Redacción).
public struct BrandEmptyState<Icon: View>: View {
    private let title: LocalizedStringKey
    private let description: LocalizedStringKey?
    private let icon: Icon
    private let action: EmptyStateAction?
    private let size: EmptyStateSize
    private let hasIcon: Bool

    public init(
        title: LocalizedStringKey,
        description: LocalizedStringKey? = nil,
        size: EmptyStateSize = .md,
        action: EmptyStateAction? = nil,
        @ViewBuilder icon: () -> Icon
    ) {
        self.init(title: title, description: description, size: size, action: action, hasIcon: Icon.self != EmptyView.self, icon: icon)
    }

    fileprivate init(
        title: LocalizedStringKey,
        description: LocalizedStringKey?,
        size: EmptyStateSize,
        action: EmptyStateAction?,
        hasIcon: Bool,
        @ViewBuilder icon: () -> Icon
    ) {
        self.hasIcon = hasIcon
        self.title = title
        self.description = description
        self.size = size
        self.action = action
        self.icon = icon()
    }

    private var isSmall: Bool { size == .sm }

    public var body: some View {
        VStack(spacing: BrandEmptyStateTokens.gap) {
            if hasIcon {
                icon
                    .frame(width: isSmall ? BrandEmptyStateTokens.iconSizeSm : BrandEmptyStateTokens.iconSize,
                           height: isSmall ? BrandEmptyStateTokens.iconSizeSm : BrandEmptyStateTokens.iconSize)
                    .foregroundStyle(BrandEmptyStateTokens.iconColor)
                    .accessibilityHidden(true)
            }
            VStack(spacing: BrandEmptyStateTokens.bodyGap) {
                Text(title)
                    .brandFont(size: isSmall ? BrandEmptyStateTokens.titleFontSizeSm : BrandEmptyStateTokens.titleFontSize,
                               weight: BrandEmptyStateTokens.titleFontWeight, family: BrandEmptyStateTokens.titleFontFamily,
                               relativeTo: .title3)
                    .foregroundStyle(BrandEmptyStateTokens.titleColor)
                    .accessibilityAddTraits(.isHeader)
                if let description {
                    Text(description)
                        .brandFont(size: isSmall ? BrandEmptyStateTokens.descriptionFontSizeSm : BrandEmptyStateTokens.descriptionFontSize,
                                   family: BrandEmptyStateTokens.descriptionFontFamily)
                        .foregroundStyle(BrandEmptyStateTokens.descriptionColor)
                }
            }
            .multilineTextAlignment(.center)
            .fixedSize(horizontal: false, vertical: true)
            if let action {
                BrandButton(action.label, variant: .outline, size: isSmall ? .sm : .md, action: action.perform)
            }
        }
        .padding(.vertical, BrandEmptyStateTokens.paddingBlock)
        .padding(.horizontal, BrandEmptyStateTokens.paddingInline)
        .frame(maxWidth: .infinity)
        .accessibilityElement(children: .contain)
    }
}

extension BrandEmptyState where Icon == AnyView {
    /// Con un icono del catálogo (`BrandIconName`); sin icono, `nil`.
    public init(
        title: LocalizedStringKey,
        description: LocalizedStringKey? = nil,
        icon: BrandIconName? = nil,
        size: EmptyStateSize = .md,
        action: EmptyStateAction? = nil
    ) {
        self.init(title: title, description: description, size: size, action: action, hasIcon: icon != nil) {
            // El icono llena la caja del token (`icon-size` / `icon-size-sm`), como el `<svg>` al 100 % de React.
            AnyView(Group {
                if let icon {
                    BrandIcon(icon, size: .text)
                        .environment(\.brandIconTextSize, size == .sm ? BrandEmptyStateTokens.iconSizeSm : BrandEmptyStateTokens.iconSize)
                }
            })
        }
    }
}

#Preview("EmptyState") {
    ScrollView {
        VStack(spacing: BrandSpacing.s4) {
            BrandEmptyState(title: "Sin resultados")
            BrandEmptyState(title: "Sin proyectos", description: "Esta carpeta está vacía. Crea un proyecto para empezar.", icon: .folder)
            BrandEmptyState(title: "Sin datos", description: "No hay datos disponibles.", icon: .folder, size: .sm,
                            action: EmptyStateAction("Añadir") {})
            BrandEmptyState(title: "Sin viviendas", description: "Añade tu primera vivienda.", icon: .search,
                            action: EmptyStateAction("Añadir vivienda") {})
        }
    }
}
