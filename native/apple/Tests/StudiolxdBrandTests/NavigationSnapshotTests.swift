import SwiftUI
import XCTest
@testable import StudiolxdBrand

/// Capturas de Banner, Menu y ContextMenu (el disparador), Tabs, DatePickerField y PageIntro: cada variante y estado,
/// en claro y oscuro, en iOS y en macOS.
@MainActor
final class NavigationSnapshotTests: XCTestCase {
    override func setUp() async throws { StudiolxdBrand.registerFonts() }

    // MARK: Banner

    func testBannerVariantsStacked() {
        let view = VStack(spacing: BrandSpacing.s3) {
            BrandBanner(verbatim: "Estás viendo la aplicación como ana.perez@studiolxd.com.")
            BrandBanner("El mantenimiento empieza hoy a las 22:00 y durará una hora.", tone: .warning)
            BrandBanner("No hemos podido guardar los cambios.", tone: .error)
        }
        assertBrandSnapshots(view, width: 375, height: 280, named: "variantes", padding: 0)
    }

    func testBannerActionsAndDismissStacked() {
        let view = VStack(spacing: BrandSpacing.s3) {
            BrandBanner(verbatim: "Estás viendo la aplicación como ana.perez@studiolxd.com.") {
                BrandButton("Dejar de suplantar", variant: .outline, size: .sm) {}
            }
            BrandBanner(verbatim: "Estás viendo la aplicación como ana.perez@studiolxd.com.", onDismiss: {}) {
                BrandButton("Dejar de suplantar", variant: .outline, size: .sm) {}
            }
            BrandBanner("El mantenimiento empieza a las 22:00.", tone: .warning, onDismiss: {}) {
                BrandButton("Ver detalles", variant: .outline, size: .sm) {}
            }
            BrandBanner("No hemos podido guardar.", tone: .error, onDismiss: {}) {
                BrandButton("Reintentar", variant: .outline, size: .sm) {}
            }
        }
        assertBrandSnapshots(view, width: 375, height: 560, named: "acciones-y-cierre", padding: 0)
    }

    func testBannerRowWhenWide() {
        let view = VStack(spacing: BrandSpacing.s3) {
            BrandBanner(verbatim: "Estás viendo la aplicación como ana.perez@studiolxd.com.", onDismiss: {}) {
                BrandButton("Dejar de suplantar", variant: .outline, size: .sm) {}
            }
            BrandBanner("El mantenimiento empieza a las 22:00.", tone: .warning, onDismiss: {}) {
                BrandButton("Ver detalles", variant: .outline, size: .sm) {}
            }
            BrandBanner("Un mensaje sin acciones.", tone: .error)
        }
        assertBrandSnapshots(view, width: 720, height: 220, named: "fila", padding: 0)
    }

    // MARK: Menu y ContextMenu (el disparador; el panel es del sistema y no se captura abierto)

    func testContextMenuTriggers() {
        let items: [BrandMenuItem] = [.button("Editar", action: {}), .button("Eliminar", destructive: true, action: {})]
        let view = VStack(alignment: .leading, spacing: BrandSpacing.s4) {
            HStack(spacing: BrandSpacing.s4) {
                ForEach(ContextMenuTriggerSize.allCases, id: \.self) { BrandContextMenu(items, triggerSize: $0) }
            }
            HStack(spacing: BrandSpacing.s4) {
                ForEach(ContextMenuTriggerSize.allCases, id: \.self) { BrandContextMenu(items, triggerSize: $0, triggerOrientation: .vertical) }
                BrandContextMenu(items).disabled(true)
            }
        }
        assertBrandSnapshots(view, width: 280, height: 150, named: "disparadores")
    }

    func testMenuTextTrigger() {
        let view = BrandMenu("Acciones", items: [.button("Editar", action: {})]).buttonStyle(.brand(.outline))
        assertBrandSnapshots(view, width: 200, height: 64, named: "disparador-texto")
    }

    // MARK: Tabs

    func testTabsHorizontalVariants() {
        let view = VStack(alignment: .leading, spacing: BrandSpacing.s5) {
            BrandTabs(selection: .constant("seguridad")) {
                BrandTab(verbatim: "General", value: "general")
                BrandTab(verbatim: "Seguridad", value: "seguridad")
                BrandTab(verbatim: "Sin acceso", value: "bloqueada", disabled: true)
            }
            BrandTabs(selection: .constant("mes"), variant: .pill) {
                BrandTab(verbatim: "Semana", value: "semana")
                BrandTab(verbatim: "Mes", value: "mes")
                BrandTab(verbatim: "Año", value: "año")
                BrandTab(verbatim: "Sin datos", value: "vacío", disabled: true)
            }
        }
        assertBrandSnapshots(view, width: 400, height: 190, named: "horizontal")
    }

    func testTabsVertical() {
        let view = HStack(alignment: .top, spacing: BrandSpacing.s6) {
            BrandTabs(selection: .constant("equipo"), orientation: .vertical) {
                BrandTab(verbatim: "Perfil", value: "perfil")
                BrandTab(verbatim: "Equipo", value: "equipo")
                BrandTab(verbatim: "Facturación", value: "facturacion")
                BrandTab(verbatim: "Cerrada", value: "cerrada", disabled: true)
            }
            BrandTabs(selection: .constant("año"), variant: .pill, orientation: .vertical) {
                BrandTab(verbatim: "Mes", value: "mes")
                BrandTab(verbatim: "Año", value: "año")
            }
        }
        assertBrandSnapshots(view, width: 360, height: 260, named: "vertical")
    }

    func testTabsOverflowScrolls() {
        let view = BrandTabs(selection: .constant("a")) {
            BrandTab(verbatim: "Resumen", value: "a")
            BrandTab(verbatim: "Documentos", value: "b")
            BrandTab(verbatim: "Facturación", value: "c")
            BrandTab(verbatim: "Notificaciones", value: "d")
        }
        assertBrandSnapshots(view, width: 260, height: 72, named: "desborda")
    }

    // MARK: DatePickerField

    private var may18: Date { Calendar.current.date(from: DateComponents(year: 2026, month: 5, day: 18))! }

    func testDatePickerStates() {
        let view = VStack(alignment: .leading, spacing: BrandSpacing.s4) {
            BrandDatePickerField("Sin fecha", date: .constant(nil))
            BrandDatePickerField("Con fecha y aspa", date: .constant(may18), helperText: "La fecha en la que empieza el contrato.")
            BrandDatePickerField("Con error", date: .constant(nil), errorMessage: "Elige una fecha.")
            BrandDatePickerField("Solo lectura", date: .constant(may18), readOnly: true)
            BrandDatePickerField("Deshabilitado", date: .constant(may18)).disabled(true)
            BrandDatePickerField("Etiqueta oculta", date: .constant(may18), labelHidden: true)
        }
        assertBrandSnapshots(view, width: 340, height: 520, named: "estados")
    }

    func testDatePickerSizes() {
        let view = VStack(alignment: .leading, spacing: BrandSpacing.s4) {
            ForEach(DatePickerFieldSize.allCases, id: \.self) { size in
                BrandDatePickerField("Talla \(size.rawValue)", date: .constant(nil), size: size)
            }
        }
        assertBrandSnapshots(view, width: 340, height: 300, named: "tallas")
    }

    // MARK: PageIntro

    func testPageIntroStacked() {
        let view = VStack(alignment: .leading, spacing: BrandSpacing.s6) {
            BrandPageIntro("¿Olvidaste tu contraseña?", description: "Ingresa tu correo y te enviaremos un enlace.")
            BrandPageIntro("Webhooks", actions: {
                BrandButton("Crear webhook") {}
                BrandButton("Ver registro", variant: .outline) {}
            })
            BrandPageIntro("Automatizaciones", description: "Reglas que se disparan solas.",
                           eyebrow: { BrandTag("Beta") },
                           content: { BrandParagraph("Disponible solo para el plan Studio.", size: .sm) })
        }
        assertBrandSnapshots(view, width: 375, height: 640, named: "apilado")
    }

    func testPageIntroRowWhenWide() {
        let view = VStack(alignment: .leading, spacing: BrandSpacing.s6) {
            BrandPageIntro("Miembros", description: "Quién entra en la organización y con qué permisos.",
                           actions: { BrandButton("Invitar miembro") {} })
            BrandPageIntro("Webhooks", eyebrow: { BrandTag("Beta") }, actions: {
                BrandButton("Crear webhook") {}
                BrandButton("Ver registro", variant: .outline) {}
            })
            BrandPageIntro("Sesiones activas", level: .h2, size: .s5, actions: { BrandButton("Cerrar todas", variant: .outline) {} })
        }
        assertBrandSnapshots(view, width: 720, height: 470, named: "fila")
    }
}
