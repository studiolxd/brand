import SwiftUI
import XCTest
@testable import StudiolxdBrand

/// Los ejemplos de `native/README.md`, tal cual, para que la documentación **compile**: si cambia una firma y el
/// README se queda atrás, esto deja de compilar. No se ejecutan (solo se construyen las vistas).
@MainActor
private enum ReadmeExamples {
    enum Plan: Hashable { case monthly, yearly }

    struct Demo: View {
        @State var email = ""
        @State var query = ""
        @State var qty = 1.0
        @State var lang = "es"
        @State var on = true
        @State var accepted = false
        @State var plan: Plan? = .monthly
        @State var filters: Set<Plan> = []
        @State var theme = BrandThemeChoice.system
        @State var showFilters = false
        @State var askDelete = false

        func save() {}
        func delete() {}
        func dismiss() {}
        func add() {}
        func apply() {}

        var body: some View {
            VStack {
                // Button, texto e iconos
                Button("Guardar") { save() }.buttonStyle(.brand(.primary))
                BrandButton("Eliminar", variant: .outline, destructive: true) { delete() }
                BrandButton(icon: .close, accessibilityLabel: "Cerrar", variant: .ghost) { dismiss() }
                BrandHeading("Tus viviendas")
                BrandHeading("Resumen", level: .h2, size: .s5)
                BrandParagraph("Revisa los datos.", size: .small)
                BrandParagraph(Text("Esta acción ") + Text("borra").brand(.strong, tone: .destructive) + Text(" el curso."))
                BrandIcon(.search)

                // Campos de formulario
                BrandInputField("Correo", text: $email, type: .email, helperText: "Te escribiremos aquí")
                BrandInputField("Buscar", text: $query, labelHidden: true, kind: .search, clearable: true)
                BrandNumberInputField("Cantidad", value: $qty, min: 0, max: 99)
                BrandSelectField("Idioma", selection: $lang, options: [.option("es", "Español"), .option("en", "Inglés")])

                // Interruptores, grupos de botones, tema y etiquetas
                BrandTag("Pagado", variant: .success)
                Toggle("Notificaciones", isOn: $on).toggleStyle(.brandSwitch(size: .sm))
                BrandSwitcherField("Acepto las condiciones", isOn: $accepted, errorMessage: "Debes aceptarlas.")
                BrandToggleGroup(selection: $plan) {
                    BrandToggleGroupItem("Mensual", value: Plan.monthly)
                    BrandToggleGroupItem("Anual", value: Plan.yearly)
                }
                .accessibilityLabel("Plan")
                BrandToggleGroup(selection: $filters, multiple: true, size: .sm) {
                    BrandToggleGroupItem("Mensual", value: Plan.monthly)
                }
                BrandThemeSwitcher(value: $theme, variant: .list)

                // Listas, estados vacíos y esqueletos
                BrandList(type: .ordered) { BrandListItem("Abre la app"); BrandListItem("Elige tu vivienda") }
                BrandList(type: .plain, showsSeparators: true) {
                    BrandListItem(content: { Text("Notificaciones") }, secondary: { Text("Avisos de la comunidad") },
                                  trailing: { BrandIcon(.chevron, size: .sm) })
                }
                BrandEmptyState(title: "Sin viviendas", description: "Añade tu primera vivienda para empezar.",
                                icon: .folder, action: EmptyStateAction("Añadir vivienda") { add() })
                BrandSkeleton(width: 160)

                // Hojas, diálogos y avisos
                Button("Filtros") { showFilters = true }
                    .brandSheet(isPresented: $showFilters, title: "Filtros", description: "Afina los resultados") {
                        Text("Formulario")
                    } footer: {
                        BrandDialogButton("Cancelar", variant: .outline) { showFilters = false }
                        BrandDialogButton("Aplicar") { apply(); showFilters = false }
                    }
                Text("Borrar")
                    .brandConfirmDialog(isPresented: $askDelete, title: "¿Eliminar la vivienda?",
                                        description: "Se borrarán sus documentos. No se puede deshacer.",
                                        confirmLabel: "Eliminar la vivienda", destructive: true) { try await Task.sleep(nanoseconds: 1) }
                Text("Raíz").toastHost(position: .bottomRight)
            }
            .brandControlSize(.lg)
        }

        func toasts() async throws {
            ToastCenter.shared.success("Cambios guardados")
            let id = ToastCenter.shared.loading("Subiendo…")
            ToastCenter.shared.error("No se pudo subir", id: id, description: "Revisa la conexión.")
            try await ToastCenter.shared.promise(loading: "Guardando", success: { _ in "Guardado" }, error: { _ in "Falló" }) {
                try await Task.sleep(nanoseconds: 1)
            }
        }
    }
}

final class ReadmeExamplesTests: XCTestCase {
    /// Basta con que `ReadmeExamples` compile; aquí solo se comprueba que la vista se puede construir.
    @MainActor
    func testReadmeExamplesBuild() {
        _ = ReadmeExamples.Demo().body
    }
}
