import SwiftUI
import XCTest
@testable import StudiolxdBrand

/// Capturas de List, EmptyState y Skeleton, en claro y oscuro, iOS y macOS.
@MainActor
final class ListsSnapshotTests: XCTestCase {
    override func setUp() async throws { StudiolxdBrand.registerFonts() }

    func testListTypes() {
        for type in ListType.allCases {
            let view = BrandList(type: type) {
                BrandListItem("Primer elemento de la lista")
                BrandListItem("Segundo elemento de la lista")
                BrandListItem("Tercer elemento de la lista")
            }
            assertBrandSnapshots(view, width: 340, height: 130, named: type.rawValue, padding: BrandSpacing.s4)
        }
    }

    func testListNested() {
        let view = BrandList {
            BrandListItem { Text("Planta baja") }
            BrandListItem {
                VStack(alignment: .leading, spacing: BrandTextTokens.listGap) {
                    Text("Primera planta")
                    BrandList(type: .ordered) {
                        BrandListItem("Dormitorio")
                        BrandListItem("Baño")
                    }
                }
            }
            BrandListItem { Text("Ático") }
        }
        assertBrandSnapshots(view, width: 340, height: 170, named: "nested")
    }

    func testListRowsWithSeparators() {
        let view = BrandList(type: .plain, showSeparators: true) {
            BrandListItem(content: { Text("Notificaciones") }, secondary: { Text("Avisos de la comunidad") },
                          trailing: { BrandIcon(.chevron, size: .sm) })
            BrandListItem(content: { Text("Idioma") }, secondary: { EmptyView() }, trailing: { Text("Español").brand(tone: .muted) })
            BrandListItem("Cerrar sesión")
        }
        assertBrandSnapshots(view, width: 340, height: 190, named: "rows")
    }

    func testEmptyStates() {
        assertBrandSnapshots(BrandEmptyState(title: "Sin resultados"), width: 360, height: 150, named: "title-only")
        assertBrandSnapshots(
            BrandEmptyState(title: "Sin proyectos", description: "Esta carpeta está vacía. Crea un proyecto para empezar.", icon: .folder),
            width: 360, height: 300, named: "icon-description")
        assertBrandSnapshots(
            BrandEmptyState(title: "Sin datos", description: "No hay datos disponibles.", icon: .folder, size: .sm,
                            action: EmptyStateAction("Añadir") {}),
            width: 360, height: 300, named: "sm-action")
        assertBrandSnapshots(
            BrandEmptyState(title: "Sin viviendas", description: "Añade tu primera vivienda para empezar.", icon: .search,
                            action: EmptyStateAction("Añadir vivienda") {}),
            width: 360, height: 350, named: "md-action")
    }

    func testSkeletons() {
        let view = VStack(alignment: .leading, spacing: BrandSpacing.s3) {
            BrandSkeleton(width: nil, height: nil, circle: false, frozenPhase: 0.4)
            BrandSkeleton(width: 160, height: nil, circle: false, frozenPhase: 0.5)
            BrandSkeleton(width: nil, height: 44, circle: false, frozenPhase: 0.6)
            HStack(spacing: BrandSpacing.s3) {
                BrandSkeleton(width: 48, height: 48, circle: true, frozenPhase: 0.5)
                VStack(spacing: BrandSpacing.s2) {
                    BrandSkeleton(width: nil, height: nil, circle: false, frozenPhase: 0.5)
                    BrandSkeleton(width: 120, height: nil, circle: false, frozenPhase: 0.5)
                }
            }
        }
        assertBrandSnapshots(view, width: 320, height: 190, named: "blocks")
    }

    func testSkeletonStaticWithoutPhase() {
        // «Reducir movimiento»: sin fase, el bloque es el fondo plano.
        let view = BrandSkeleton(width: 200, height: 24, circle: false, frozenPhase: nil, forcesReducedMotion: true)
        assertBrandSnapshots(view, width: 240, height: 56, named: "reduce-motion")
    }
}

final class ListsLogicTests: XCTestCase {
    func testEnumRawValuesMatchReact() {
        XCTAssertEqual(ListType.allCases.map(\.rawValue), ["unordered", "ordered", "plain"])
        XCTAssertEqual(EmptyStateSize.allCases.map(\.rawValue), ["sm", "md"])
    }
}
