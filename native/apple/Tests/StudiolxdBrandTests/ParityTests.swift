import Foundation
import XCTest

/// Una ficha de paridad (`native/parity/schema.json`), solo con lo que comprueban las pruebas.
struct ParityCard: Decodable {
    struct Prop: Decodable {
        let type: String
        let values: [String]?
    }

    struct Excluded: Decodable {
        let prop: String
    }

    let component: String
    let props: [String: Prop]
    let excluded: [Excluded]?
}

/// Compara una ficha con lo que expone el componente nativo y devuelve los problemas, uno por línea.
func parityProblems(card: ParityCard, registry: [String: [String: [String]]]) -> [String] {
    guard let exposed = registry[card.component] else {
        return ["\(card.component): no está en `parityRegistry` (ParityRegistry.swift)"]
    }
    var problems: [String] = []
    let excluded = Set((card.excluded ?? []).map(\.prop))
    for (name, prop) in card.props where prop.type == "union" {
        guard let native = exposed[name] else {
            problems.append("\(card.component).\(name): el componente nativo no expone esta prop")
            continue
        }
        let expected = Set(prop.values ?? [])
        if Set(native) != expected || native.count != expected.count {
            problems.append("\(card.component).\(name): nativo \(native.sorted()) ≠ React \(expected.sorted())")
        }
    }
    for name in exposed.keys where card.props[name] == nil || excluded.contains(name) {
        problems.append("\(card.component).\(name): el nativo la expone pero la ficha no la declara (o la excluye)")
    }
    return problems
}

final class ParityTests: XCTestCase {
    /// `native/parity/components/`, relativo a este fichero (`native/apple/Tests/StudiolxdBrandTests/`).
    private var cardsDirectory: URL {
        var url = URL(fileURLWithPath: #filePath)
        for _ in 0..<4 { url.deleteLastPathComponent() }
        return url.appendingPathComponent("parity/components")
    }

    /// Recorre las fichas de `native/parity/components/` y comprueba que cada componente nativo expone
    /// exactamente los casos de React. Con cero fichas pasa.
    func testNativeComponentsMatchTheirParityCards() throws {
        let files = (try? FileManager.default.contentsOfDirectory(at: cardsDirectory, includingPropertiesForKeys: nil)) ?? []
        let cards = try files.filter { $0.pathExtension == "json" }.map {
            try JSONDecoder().decode(ParityCard.self, from: Data(contentsOf: $0))
        }
        let problems = cards.flatMap { parityProblems(card: $0, registry: parityRegistry) }
        XCTAssertTrue(problems.isEmpty, problems.joined(separator: "\n"))

        let unknown = Set(parityRegistry.keys).subtracting(cards.map(\.component))
        XCTAssertTrue(unknown.isEmpty, "En `parityRegistry` hay componentes sin ficha: \(unknown.sorted())")
    }

    /// El comparador en sí: detecta un caso de más, uno de menos, una prop sin exponer y un componente sin registrar.
    func testParityComparatorDetectsDrift() throws {
        let card = try JSONDecoder().decode(ParityCard.self, from: Data("""
        {
          "component": "Demo",
          "props": {
            "variant": { "type": "union", "values": ["primary", "outline"] },
            "disabled": { "type": "boolean" }
          }
        }
        """.utf8))

        XCTAssertEqual(parityProblems(card: card, registry: ["Demo": ["variant": ["outline", "primary"]]]), [])
        XCTAssertEqual(parityProblems(card: card, registry: ["Demo": ["variant": ["primary"]]]).count, 1)
        XCTAssertEqual(parityProblems(card: card, registry: ["Demo": ["variant": ["primary", "outline", "ghost"]]]).count, 1)
        XCTAssertEqual(parityProblems(card: card, registry: ["Demo": [:]]).count, 1)
        XCTAssertEqual(parityProblems(card: card, registry: ["Demo": ["variant": ["primary", "outline"], "size": ["sm"]]]).count, 1)
        XCTAssertEqual(parityProblems(card: card, registry: [:]).count, 1)
    }
}
