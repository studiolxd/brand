import SwiftUI
import XCTest
@testable import StudiolxdBrand

/// Las mismas composiciones que las stories de Storybook que se usan en `native/apple/Comparisons/` (Banner, Tabs,
/// DatePickerField, PageIntro, ContextMenu y Menu): mismo contenido y mismo lienzo (el ancho del viewport de la captura de
/// React y, salvo en el Banner, que va a sangre, 16 pt de margen). Las dimensiones son las de la captura de React
/// (`capture-story.mjs`, @2x ÷ 2).
@MainActor
final class NavigationComparisonSnapshotTests: XCTestCase {
    override func setUp() async throws { StudiolxdBrand.registerFonts() }

    private let margin: CGFloat = 16

    // MARK: Banner

    /// En la web la barra apila por debajo de `md` (768 px), así que a 480 px apila; en nativo el umbral es 480 pt y
    /// a 480 exactos iría en fila. Para que la pareja enseñe lo mismo que la web, la barra mide 479 pt dentro del
    /// lienzo de 480.
    private func bannerCanvas<V: View>(_ banner: V) -> some View {
        banner.frame(width: 479, alignment: .leading)
    }

    private let impersonating = "Estás viendo la aplicación como ana.perez@studiolxd.com."
    private let maintenance = "El mantenimiento previsto empieza hoy a las 22:00 y durará una hora."

    func testBannerInfoLikeStory() {
        assertBrandSnapshots(bannerCanvas(BrandBanner(verbatim: impersonating)), width: 480, height: 82, named: "banner-info", padding: 0)
    }

    func testBannerWarningLikeStory() {
        assertBrandSnapshots(bannerCanvas(BrandBanner(verbatim: maintenance, variant: .warning)),
                             width: 480, height: 106, named: "banner-aviso", padding: 0)
    }

    func testBannerErrorLikeStory() {
        let banner = BrandBanner(verbatim: impersonating, variant: .error) {
            BrandButton("Dejar de suplantar", variant: .outline, size: .sm) {}
        }
        assertBrandSnapshots(bannerCanvas(banner), width: 480, height: 130, named: "banner-error", padding: 0)
    }

    func testBannerActionLikeStory() {
        let banner = BrandBanner(verbatim: impersonating) {
            BrandButton("Dejar de suplantar", variant: .outline, size: .sm) {}
        }
        assertBrandSnapshots(bannerCanvas(banner), width: 480, height: 130, named: "banner-accion", padding: 0)
    }

    func testBannerDismissLikeStory() {
        let banner = BrandBanner(verbatim: impersonating, onDismiss: {}) {
            BrandButton("Dejar de suplantar", variant: .outline, size: .sm) {}
        }
        assertBrandSnapshots(bannerCanvas(banner), width: 480, height: 154, named: "banner-cierre", padding: 0)
    }

    // MARK: Tabs

    func testTabsUnderlineLikeStory() {
        let view = VStack(alignment: .leading, spacing: 0) {
            BrandTabs(selection: .constant("general")) {
                BrandTab(verbatim: "General", value: "general")
                BrandTab(verbatim: "Seguridad", value: "seguridad")
                BrandTab(verbatim: "Notificaciones", value: "notificaciones")
            }
            BrandParagraph(verbatim: "Configuración general de la cuenta: nombre, correo, zona horaria y preferencias de idioma.")
                .padding(.vertical, BrandTabsTokens.contentPaddingBlock)
        }
        assertBrandSnapshots(view, width: 480, height: 155, named: "tabs-underline", padding: margin)
    }

    func testTabsPillLikeStory() {
        let view = VStack(alignment: .leading, spacing: 0) {
            BrandTabs(selection: .constant("mes"), variant: .pill) {
                BrandTab(verbatim: "Semana", value: "semana")
                BrandTab(verbatim: "Mes", value: "mes")
                BrandTab(verbatim: "Año", value: "año")
            }
            BrandParagraph(verbatim: "Datos del último mes.").padding(.vertical, BrandTabsTokens.contentPaddingBlock)
        }
        assertBrandSnapshots(view, width: 480, height: 138, named: "tabs-pill", padding: margin)
    }

    func testTabsVerticalLikeStory() {
        let view = HStack(alignment: .top, spacing: 0) {
            BrandTabs(selection: .constant("perfil"), orientation: .vertical) {
                BrandTab(verbatim: "Perfil", value: "perfil")
                BrandTab(verbatim: "Equipo", value: "equipo")
                BrandTab(verbatim: "Facturación", value: "facturacion")
                BrandTab(verbatim: "API", value: "api")
            }
            BrandParagraph(verbatim: "Información personal: foto de perfil, nombre y descripción.")
                .padding(.leading, BrandTabsTokens.contentPaddingBlock)
        }
        assertBrandSnapshots(view, width: 480, height: 213, named: "tabs-vertical", padding: margin)
    }

    // MARK: DatePickerField

    private var may18: Date { Calendar.current.date(from: DateComponents(year: 2026, month: 5, day: 18))! }
    private let fieldWidth: CGFloat = 320

    func testDatePickerEmptyLikeStory() {
        let view = BrandDatePickerField("Fecha de inicio", date: .constant(nil)).frame(width: fieldWidth)
        assertBrandSnapshots(view, width: 480, height: 101, named: "datepicker-vacio", padding: margin)
    }

    func testDatePickerValueLikeStory() {
        let view = BrandDatePickerField("Fecha de inicio", date: .constant(may18)).frame(width: fieldWidth)
        assertBrandSnapshots(view, width: 480, height: 101, named: "datepicker-valor", padding: margin)
    }

    func testDatePickerErrorLikeStory() {
        let view = BrandDatePickerField("Fecha de inicio", date: .constant(nil), errorMessage: "Elige una fecha.",
                                        helperText: "La fecha en la que empieza el contrato.").frame(width: fieldWidth)
        assertBrandSnapshots(view, width: 480, height: 159, named: "datepicker-error", padding: margin)
    }

    func testDatePickerSizesLikeStory() {
        let view = VStack(alignment: .leading, spacing: BrandSpacing.s4) {
            BrandDatePickerField("Pequeño", date: .constant(nil), size: .sm)
            BrandDatePickerField("Mediano", date: .constant(nil), size: .md)
            BrandDatePickerField("Grande", date: .constant(nil), size: .lg)
        }
        .frame(width: fieldWidth)
        assertBrandSnapshots(view, width: 480, height: 280, named: "datepicker-tallas", padding: margin)
    }

    func testDatePickerDisabledLikeStory() {
        let view = BrandDatePickerField("Fecha de inicio", date: .constant(may18)).disabled(true).frame(width: fieldWidth)
        assertBrandSnapshots(view, width: 480, height: 101, named: "datepicker-deshabilitado", padding: margin)
    }

    // MARK: PageIntro

    func testPageIntroSentenceLikeStory() {
        let view = BrandPageIntro("¿Olvidaste tu contraseña?", description: "Ingresa tu correo y te enviaremos un enlace para restablecerla.")
        assertBrandSnapshots(view, width: 480, height: 192, named: "pageintro-frase", padding: margin)
    }

    func testPageIntroActionLikeStory() {
        let view = BrandPageIntro("Miembros", actions: { BrandButton("Invitar miembro") {} })
        assertBrandSnapshots(view, width: 480, height: 128, named: "pageintro-accion", padding: margin)
    }

    func testPageIntroTwoActionsLikeStory() {
        let view = BrandPageIntro("Webhooks", actions: {
            BrandButton("Crear webhook") {}
            BrandButton("Ver registro", variant: .outline) {}
        })
        assertBrandSnapshots(view, width: 480, height: 180, named: "pageintro-dos-acciones", padding: margin)
    }

    func testPageIntroEyebrowLikeStory() {
        let view = VStack(alignment: .leading, spacing: BrandSpacing.s7) {
            BrandPageIntro("Automatizaciones", description: "Reglas que se disparan solas cuando algo cambia en la organización.",
                           eyebrow: { BrandTag("Beta", variant: .info) },
                           content: { BrandParagraph("Disponible solo para el plan Studio.") })
            BrandPageIntro("Webhooks", eyebrow: { BrandTag("Beta", variant: .info) }, actions: { BrandButton("Crear webhook") {} })
        }
        assertBrandSnapshots(view, width: 480, height: 412, named: "pageintro-eyebrow", padding: margin)
    }

    // MARK: ContextMenu

    func testContextMenuClosedLikeStory() {
        let items: [BrandMenuItem] = [
            .button("Duplicar", action: {}), .button("Editar", action: {}), .separator,
            .button("Ver detalle", action: {}), .separator, .button("Eliminar", destructive: true, action: {}),
        ]
        let view = BrandContextMenu(items).frame(maxWidth: .infinity, maxHeight: .infinity)
        assertBrandSnapshots(view, width: 480, height: 200, named: "contextmenu-cerrado", padding: 0)
    }

    // MARK: Menu (el disparador; el panel es el del sistema y no se captura abierto)

    /// La story «Trigger a medida»: un botón `outline` con el icono `download` y «Exportar», centrado en el lienzo.
    func testMenuCustomTriggerLikeStory() {
        let items: [BrandMenuItem] = [.button("CSV", action: {}), .button("Excel", action: {})]
        let view = BrandMenu(items) {
            HStack(spacing: BrandSpacing.s2) {
                BrandIcon(.download, size: .sm)
                Text("Exportar")
            }
        }
        .buttonStyle(.brand(.outline))
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        assertBrandSnapshots(view, width: 480, height: 200, named: "menu-a-medida", padding: 0)
    }

    /// La story «Trigger de icono»: un botón `ghost` de solo icono (`settings`), centrado en el lienzo.
    func testMenuIconTriggerLikeStory() {
        let items: [BrandMenuItem] = [
            .button("English", action: {}), .button("Español", action: {}), .separator, .button("Français", action: {}),
        ]
        let view = BrandMenu(items) { AccessibleIcon(name: .settings, label: "Cambiar de idioma") }
            .buttonStyle(.brand(.ghost, iconOnly: true))
            .frame(maxWidth: .infinity, maxHeight: .infinity)
        assertBrandSnapshots(view, width: 480, height: 200, named: "menu-icono", padding: 0)
    }
}
