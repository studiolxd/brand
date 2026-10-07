import SwiftUI
import XCTest
@testable import StudiolxdBrand

/// Capturas de Sheet, ConfirmDialog y Toast. Sheet y ConfirmDialog son presentaciones: se fotografía su contenido
/// (cabecera, cuerpo, pie) en una vista fija, a dos anchos —apilado (390) y en fila (560)—. Claro y oscuro, iOS y macOS.
@MainActor
final class OverlaysSnapshotTests: XCTestCase {
    override func setUp() async throws { StudiolxdBrand.registerFonts() }

    // MARK: Sheet

    private func sheet(width: CGFloat, hideClose: Bool = false) -> some View {
        BrandSheetContent(
            title: "Filtros", description: "Afina los resultados de la lista.", hideClose: hideClose, onClose: {},
            footer: {
                BrandDialogButton("Cancelar", variant: .outline) {}
                BrandDialogButton("Aplicar") {}
            },
            content: {
                BrandParagraph(verbatim: "El cuerpo del cajón: lo que cada pantalla quiera poner entre la cabecera y el pie.")
            }
        )
        .frame(width: width, height: 440)
    }

    func testSheetStackedFooter() {
        assertBrandSnapshots(sheet(width: 390), width: 390, height: 440, named: "stacked", padding: 0)
    }

    func testSheetRowFooter() {
        assertBrandSnapshots(sheet(width: 560), width: 560, height: 440, named: "row", padding: 0)
    }

    func testSheetWithoutFooterOrClose() {
        let view = BrandSheetContent(title: "Detalle", hideClose: true, onClose: {}, content: {
            BrandParagraph(verbatim: "Un cajón sin aspa ni pie.")
        })
        .frame(width: 390, height: 260)
        assertBrandSnapshots(view, width: 390, height: 260, named: "plain", padding: 0)
    }

    // MARK: ConfirmDialog

    private func dialog(
        destructive: Bool = true,
        secondary: Bool = false,
        phrase: BrandConfirmDialog<EmptyView>.Phrase? = nil,
        state: (pending: Bool, typed: String, attempted: Bool) = (false, "", false)
    ) -> some View {
        BrandConfirmDialog<EmptyView>(
            title: "¿Eliminar la vivienda?",
            description: "Se borrarán sus documentos y recibos. No se puede deshacer.",
            confirmLabel: "Eliminar la vivienda",
            cancelLabel: "Cancelar",
            pendingLabel: "Confirmando…",
            closeLabel: "Cerrar",
            destructive: destructive,
            secondaryActionLabel: secondary ? "Archivar" : nil,
            onSecondaryAction: secondary ? {} : nil,
            confirmPhrase: phrase,
            onConfirm: {},
            onCancel: {},
            onConfirmError: nil,
            onDismiss: {},
            extra: { EmptyView() },
            state: state
        )
    }

    func testConfirmDestructiveStacked() {
        assertBrandSnapshots(dialog(), width: 390, height: 440, named: "destructive-stacked")
    }

    func testConfirmDestructiveRow() {
        assertBrandSnapshots(dialog(), width: 590, height: 330, named: "destructive-row")
    }

    func testConfirmPrimaryWithSecondaryAction() {
        assertBrandSnapshots(dialog(destructive: false, secondary: true), width: 590, height: 330, named: "secondary-row")
    }

    func testConfirmPhraseMismatch() {
        let phrase = BrandConfirmDialog<EmptyView>.Phrase("Casa del lago", label: "Escribe «Casa del lago» para confirmar",
                                                          mismatch: "No coincide con el nombre de la vivienda.")
        assertBrandSnapshots(dialog(phrase: phrase, state: (false, "Casa del", true)), width: 590, height: 440, named: "phrase-mismatch")
    }

    func testConfirmPending() {
        assertBrandSnapshots(dialog(state: (true, "", false)), width: 590, height: 330, named: "pending")
    }


    // MARK: Parejas con React (mismo ancho que la story, sin relleno)

    func testComparisonConfirmDestructive() {
        assertBrandSnapshots(dialog(), width: 550, height: 250, named: "compare-confirm", padding: 0)
    }

    func testComparisonSheet() {
        assertBrandSnapshots(sheet(width: 320), width: 320, height: 560, named: "compare-sheet", padding: 0)
    }

    func testComparisonToasts() {
        let view = VStack(spacing: BrandSpacing.s2) {
            BrandToastCard(item: ToastItem(id: "n", title: "Cambios guardados"), onClose: {})
            BrandToastCard(item: ToastItem(id: "e", title: "No se pudo guardar el proyecto", intent: .error), onClose: {})
        }
        assertBrandSnapshots(view, width: 360, height: 190, named: "compare-toasts", padding: 0)
    }

    /// La story «Apilado» del Toaster (`Molecules/Toast`): tres avisos —neutro, éxito y error, el más nuevo delante—
    /// en la esquina de abajo a la derecha de un lienzo del ancho del viewport de la captura de React (480) y de su
    /// alto, sin margen: la pila se coloca sola con sus `toast.inset-*`, como la región fija de la web.
    private func toasterLikeStory(expand: Bool) -> some View {
        let center = ToastCenter()
        center.show("Primer aviso", duration: .infinity)
        center.show("Segundo aviso", intent: .success, duration: .infinity)
        center.show("Tercer aviso", intent: .error, duration: .infinity)
        return ToastStack(
            center: center, position: .bottomRight, closeButton: true, closeLabel: "Cerrar", containerLabel: "Notificaciones",
            gap: BrandToastTokens.gap, visibleToasts: 3, expand: expand
        )
    }

    func testComparisonToaster() {
        assertBrandSnapshots(toasterLikeStory(expand: true), width: 480, height: 240, named: "compare-toaster-desplegado", padding: 0)
        assertBrandSnapshots(toasterLikeStory(expand: false), width: 480, height: 140, named: "compare-toaster-recogido", padding: 0)
    }

    /// Las stories «Por defecto», «Compacto» y «Grande» de `Atoms/CloseButton`: el aspa en la esquina, con los 16 pt de
    /// margen de la story (`layout: 'padded'`) y el alto de su captura.
    func testComparisonCloseButton() {
        let cases: [(BrandControlSize, String, CGFloat)] = [(.md, "por-defecto", 72), (.sm, "compacto", 67), (.lg, "grande", 80)]
        for (size, name, height) in cases {
            assertBrandSnapshots(BrandCloseButton(size: size) {}, width: 480, height: height, named: "compare-closebutton-\(name)", padding: 16)
        }
    }

    // MARK: Toast

    private func item(_ intent: ToastIntent, action: Bool = false) -> ToastItem {
        ToastItem(
            id: intent.rawValue, title: "Aviso \(intent.rawValue)", intent: intent, description: "Segunda línea del aviso.",
            duration: nil, action: action ? ToastAction(label: "Deshacer", onClick: {}) : nil, onClose: nil
        )
    }

    func testToastCards() {
        let view = VStack(spacing: BrandSpacing.s2) {
            ForEach(ToastIntent.allCases, id: \.self) { BrandToastCard(item: self.item($0), onClose: {}) }
        }
        assertBrandSnapshots(view, width: 360, height: 640, named: "intents")
    }

    func testToastCardWithAction() {
        let view = VStack(spacing: BrandSpacing.s2) {
            BrandToastCard(item: item(.default, action: true), onClose: {})
            BrandToastCard(item: item(.warning, action: true), onClose: {})
        }
        assertBrandSnapshots(view, width: 360, height: 330, named: "action")
    }

    private func stack(expand: Bool) -> some View {
        let center = ToastCenter()
        center.show("Primer aviso", intent: .success, description: "El más antiguo.", duration: .infinity)
        center.show("Segundo aviso", intent: .default, duration: .infinity)
        center.show("Tercer aviso", intent: .error, description: "El más nuevo, delante.", duration: .infinity)
        return ToastStack(
            center: center, position: .bottomRight, closeButton: true, closeLabel: "Cerrar", containerLabel: "Notificaciones",
            gap: BrandToastTokens.gap, visibleToasts: 3, expand: expand
        )
    }

    func testToastStackCollapsed() {
        assertBrandSnapshots(stack(expand: false), width: 400, height: 260, named: "stack-collapsed", padding: 0)
    }

    func testToastStackExpanded() {
        assertBrandSnapshots(stack(expand: true), width: 400, height: 380, named: "stack-expanded", padding: 0)
    }
}

/// Lógica que no se puede fotografiar: la cola de avisos, sus relojes y los enums de la ficha.
@MainActor
final class OverlaysLogicTests: XCTestCase {
    func testEnumsMatchReact() {
        XCTAssertEqual(ToastIntent.allCases.map(\.rawValue), ["default", "success", "error", "warning", "info", "loading"])
        XCTAssertEqual(
            ToastPosition.allCases.map(\.rawValue),
            ["bottom-right", "bottom-left", "bottom-center", "top-right", "top-left", "top-center"]
        )
    }

    func testShowWithExistingIdUpdatesInPlace() {
        let center = ToastCenter()
        let id = center.loading("Subiendo…")
        center.success("Subido", id: id)
        XCTAssertEqual(center.items.count, 1)
        XCTAssertEqual(center.items.first?.title, "Subido")
        XCTAssertEqual(center.items.first?.intent, .success)
    }

    func testNewestFirstAndDismiss() {
        let center = ToastCenter()
        let a = center.info("A", duration: .infinity)
        let b = center.info("B", duration: .infinity)
        XCTAssertEqual(center.items.map(\.id), [b, a])
        center.dismiss(a)
        XCTAssertEqual(center.items.map(\.id), [b])
        center.dismiss()
        XCTAssertTrue(center.items.isEmpty)
    }

    func testAutoCloseAndLoadingStaysOpen() async throws {
        let center = ToastCenter()
        center.message("Efímero", duration: 0.05)
        center.loading("Espera")
        try await Task.sleep(for: .milliseconds(300))
        XCTAssertEqual(center.items.map(\.title), ["Espera"])
    }

    func testOnCloseFiresOnDismiss() {
        let center = ToastCenter()
        var closed = false
        let id = center.show("Con cierre", duration: .infinity, onClose: { closed = true })
        center.dismiss(id)
        XCTAssertTrue(closed)
    }

    func testPromiseTurnsLoadingIntoSuccessOrError() async throws {
        let center = ToastCenter()
        let value = try await center.promise(loading: "Guardando", success: { "Guardado \($0)" }, error: { _ in "Falló" }) { 7 }
        XCTAssertEqual(value, 7)
        XCTAssertEqual(center.items.first?.title, "Guardado 7")
        XCTAssertEqual(center.items.first?.intent, .success)

        struct Boom: Error {}
        let failing = ToastCenter()
        do {
            _ = try await failing.promise(loading: "Guardando", success: { (_: Int) in "ok" }, error: { _ in "Falló" }) { throw Boom() }
            XCTFail("debía relanzar el error")
        } catch {
            XCTAssertEqual(failing.items.first?.intent, .error)
            XCTAssertEqual(failing.items.first?.title, "Falló")
        }
    }

    func testDialogRowThresholdIsTheSmBreakpoint() {
        XCTAssertEqual(brandDialogRowThreshold, 480)
    }
}
