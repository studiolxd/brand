package com.studiolxd.brand

import java.io.File
import org.json.JSONObject
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

/**
 * Lo que cada componente nativo expone, por componente y por prop: los valores de sus enums.
 *
 * Es la mitad Kotlin de la paridad con React (ver `native/parity/README.md`). Al portar un componente se añade aquí
 * una entrada con el nombre de su ficha (`native/parity/components/<Componente>.json`) y, por cada prop de tipo
 * `union`, el valor de React de cada caso de su enum:
 *
 * ```kotlin
 * "Button" to mapOf(
 *     "variant" to ButtonVariant.entries.map { it.value },
 *     "size" to ButtonSize.entries.map { it.value },
 * ),
 * ```
 *
 * El enum es `enum class ButtonVariant(val value: String) { Primary("primary"), IconOnly("icon-only") }`: el
 * identificador sigue la convención de Kotlin y `value` lleva exactamente el valor de React. Cada grupo vive en su fichero `Parity<Grupo>.kt`.
 */
private val parityRegistry: Map<String, Map<String, List<String>>> =
    // AQUÍ SE SUMAN LOS GRUPOS: cada uno registra sus componentes en `Parity<Grupo>.kt` (`internal val parity<Grupo>`).
    // Al integrar, añadir `+ parityFields + parityOverlays + parityLists` (u otros) a esta línea.
    parityCore

/** Una ficha de paridad (`native/parity/schema.json`), solo con lo que comprueban las pruebas. */
private class ParityCard(json: JSONObject) {
    val component: String = json.getString("component")
    val unionProps: Map<String, List<String>>
    val allProps: Set<String>
    val excluded: Set<String>

    init {
        val props = json.getJSONObject("props")
        allProps = props.keys().asSequence().toSet()
        unionProps = allProps
            .filter { props.getJSONObject(it).getString("type") == "union" }
            .associateWith { name -> props.getJSONObject(name).getJSONArray("values").let { a -> List(a.length()) { a.getString(it) } } }
        excluded = json.optJSONArray("excluded")?.let { a -> List(a.length()) { a.getJSONObject(it).getString("prop") }.toSet() } ?: emptySet()
    }
}

/** Compara una ficha con lo que expone el componente nativo y devuelve los problemas, uno por línea. */
private fun parityProblems(card: ParityCard, registry: Map<String, Map<String, List<String>>>): List<String> {
    val exposed = registry[card.component]
        ?: return listOf("${card.component}: no está en `parityRegistry` (ParityTest.kt)")
    val problems = mutableListOf<String>()
    for ((name, expected) in card.unionProps) {
        val native = exposed[name]
        when {
            native == null -> problems += "${card.component}.$name: el componente nativo no expone esta prop"
            native.toSet() != expected.toSet() || native.size != expected.size ->
                problems += "${card.component}.$name: nativo ${native.sorted()} ≠ React ${expected.sorted()}"
        }
    }
    for (name in exposed.keys) {
        if (name !in card.allProps || name in card.excluded) {
            problems += "${card.component}.$name: el nativo la expone pero la ficha no la declara (o la excluye)"
        }
    }
    return problems
}

class ParityTest {
    /** `native/parity/components/`: el directorio de trabajo de las pruebas es el del módulo (`native/android/brand`). */
    private val cardsDirectory = File("../../parity/components")

    /** Recorre las fichas y comprueba que cada componente nativo expone exactamente los casos de React. Con cero fichas pasa. */
    @Test
    fun nativeComponentsMatchTheirParityCards() {
        val cards = cardsDirectory.listFiles { f -> f.extension == "json" }.orEmpty()
            .map { ParityCard(JSONObject(it.readText())) }
        val problems = cards.flatMap { parityProblems(it, parityRegistry) }
        assertTrue(problems.isEmpty(), problems.joinToString("\n"))

        val unknown = parityRegistry.keys - cards.map { it.component }.toSet()
        assertTrue(unknown.isEmpty(), "En `parityRegistry` hay componentes sin ficha: ${unknown.sorted()}")
    }

    /** El comparador en sí: detecta un caso de más, uno de menos, una prop sin exponer y un componente sin registrar. */
    @Test
    fun comparatorDetectsDrift() {
        val card = ParityCard(
            JSONObject(
                """
                {
                  "component": "Demo",
                  "props": {
                    "variant": { "type": "union", "values": ["primary", "outline"] },
                    "disabled": { "type": "boolean" }
                  }
                }
                """.trimIndent(),
            ),
        )
        assertEquals(emptyList(), parityProblems(card, mapOf("Demo" to mapOf("variant" to listOf("outline", "primary")))))
        assertEquals(1, parityProblems(card, mapOf("Demo" to mapOf("variant" to listOf("primary")))).size)
        assertEquals(1, parityProblems(card, mapOf("Demo" to mapOf("variant" to listOf("primary", "outline", "ghost")))).size)
        assertEquals(1, parityProblems(card, mapOf("Demo" to emptyMap())).size)
        assertEquals(1, parityProblems(card, mapOf("Demo" to mapOf("variant" to listOf("primary", "outline"), "size" to listOf("sm")))).size)
        assertEquals(1, parityProblems(card, emptyMap()).size)
    }
}
