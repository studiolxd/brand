import SwiftUI

#if canImport(UIKit)
import UIKit
#endif

// MARK: - Heading

/// `Heading` `level`: el nivel semántico (h1–h6). Fija también el tamaño, salvo que `size` lo desacople.
public enum HeadingLevel: Int, CaseIterable, Sendable {
    case h1 = 1, h2, h3, h4, h5, h6
}

/// `Heading` `size`: un paso de la escala de títulos (`text.size.1`…`text.size.10`), independiente del nivel.
public enum HeadingSize: Int, CaseIterable, Sendable {
    case s1 = 1, s2, s3, s4, s5, s6, s7, s8, s9, s10

    /// El tamaño del paso, en puntos (token `text.size.N`).
    var points: CGFloat {
        switch self {
        case .s1: BrandTextTokens.size1
        case .s2: BrandTextTokens.size2
        case .s3: BrandTextTokens.size3
        case .s4: BrandTextTokens.size4
        case .s5: BrandTextTokens.size5
        case .s6: BrandTextTokens.size6
        case .s7: BrandTextTokens.size7
        case .s8: BrandTextTokens.size8
        case .s9: BrandTextTokens.size9
        case .s10: BrandTextTokens.size10
        }
    }
}

extension HeadingLevel {
    /// El tamaño del nivel, en puntos (token `text.hN.font-size`).
    var points: CGFloat { size }

    fileprivate var size: CGFloat {
        switch self {
        case .h1: BrandTextTokens.h1FontSize
        case .h2: BrandTextTokens.h2FontSize
        case .h3: BrandTextTokens.h3FontSize
        case .h4: BrandTextTokens.h4FontSize
        case .h5: BrandTextTokens.h5FontSize
        case .h6: BrandTextTokens.h6FontSize
        }
    }

    fileprivate var weight: Int {
        switch self {
        case .h1: BrandTextTokens.h1FontWeight
        case .h2: BrandTextTokens.h2FontWeight
        case .h3: BrandTextTokens.h3FontWeight
        case .h4: BrandTextTokens.h4FontWeight
        case .h5: BrandTextTokens.h5FontWeight
        case .h6: BrandTextTokens.h6FontWeight
        }
    }

    fileprivate var lineHeight: CGFloat {
        switch self {
        case .h1: BrandTextTokens.h1LineHeight
        case .h2: BrandTextTokens.h2LineHeight
        case .h3: BrandTextTokens.h3LineHeight
        case .h4: BrandTextTokens.h4LineHeight
        case .h5: BrandTextTokens.h5LineHeight
        case .h6: BrandTextTokens.h6LineHeight
        }
    }

    fileprivate var letterSpacing: CGFloat {
        switch self {
        case .h1: BrandTextTokens.h1LetterSpacing
        case .h2: BrandTextTokens.h2LetterSpacing
        case .h3: BrandTextTokens.h3LetterSpacing
        case .h4: BrandTextTokens.h4LetterSpacing
        case .h5: BrandTextTokens.h5LetterSpacing
        case .h6: BrandTextTokens.h6LetterSpacing
        }
    }

    fileprivate var color: Color {
        switch self {
        case .h1: BrandTextTokens.h1Color
        case .h2: BrandTextTokens.h2Color
        case .h3: BrandTextTokens.h3Color
        case .h4: BrandTextTokens.h4Color
        case .h5: BrandTextTokens.h5Color
        case .h6: BrandTextTokens.h6Color
        }
    }

    fileprivate var accessibilityLevel: AccessibilityHeadingLevel {
        switch self {
        case .h1: .h1
        case .h2: .h2
        case .h3: .h3
        case .h4: .h4
        case .h5: .h5
        case .h6: .h6
        }
    }
}

/// Un encabezado de la marca. El nivel dice qué es en el esquema del documento (VoiceOver lo anuncia como
/// encabezado de ese nivel); el tamaño, por defecto, sale del nivel. El peso es siempre el de énfasis del sistema.
///
/// ```swift
/// BrandHeading("Tus viviendas")                       // h2
/// BrandHeading("Resumen", level: .h2, size: .s5)      // un h2 con el tamaño de un h4
/// ```
public struct BrandHeading: View {
    private let content: Text
    private let level: HeadingLevel
    private let size: HeadingSize?

    public init(_ title: LocalizedStringKey, level: HeadingLevel = .h2, size: HeadingSize? = nil) {
        content = Text(title)
        self.level = level
        self.size = size
    }

    public init(verbatim title: String, level: HeadingLevel = .h2, size: HeadingSize? = nil) {
        content = Text(verbatim: title)
        self.level = level
        self.size = size
    }

    /// Un título ya construido como `Text` (para los componentes que lo componen, como `BrandPageIntro`).
    init(title: Text, level: HeadingLevel, size: HeadingSize?) {
        content = title
        self.level = level
        self.size = size
    }

    public var body: some View {
        let points = size?.points ?? level.size
        content
            .brandLinedFont(size: points, weight: level.weight, lineHeight: level.lineHeight, relativeTo: .title)
            .foregroundStyle(level.color)
            .tracking(level.letterSpacing * points)
            .fixedSize(horizontal: false, vertical: true)
            .accessibilityAddTraits(.isHeader)
            .accessibilityHeading(level.accessibilityLevel)
    }
}

// MARK: - Paragraph

/// `Paragraph` `size`: `sm` para notas y metadatos, `md` (el cuerpo) para leer, `lg` para entradillas.
public enum ParagraphSize: String, CaseIterable, Sendable {
    case sm, md, lg

    /// `small` es `sm` desde la v51 (las tallas se escriben `xs`…`4xl`). Se retira en la v52.
    @available(*, deprecated, renamed: "sm")
    public static let small = ParagraphSize.sm
    /// `default` es `md` desde la v51. Se retira en la v52.
    @available(*, deprecated, renamed: "md")
    public static let `default` = ParagraphSize.md
    /// `large` es `lg` desde la v51. Se retira en la v52.
    @available(*, deprecated, renamed: "lg")
    public static let large = ParagraphSize.lg
}

/// Un párrafo de la marca: el cuerpo del sistema (16 pt) y, en `sm` y `lg`, un peldaño por debajo y por encima.
///
/// ```swift
/// BrandParagraph("Revisa los datos antes de continuar.")
/// BrandParagraph("Última actualización: hoy", size: .sm)
/// ```
public struct BrandParagraph: View {
    private let content: Text
    private let size: ParagraphSize

    public init(_ text: LocalizedStringKey, size: ParagraphSize = .md) {
        content = Text(text)
        self.size = size
    }

    public init(verbatim text: String, size: ParagraphSize = .md) {
        content = Text(verbatim: text)
        self.size = size
    }

    /// Un párrafo con fragmentos marcados: el contenido es un `Text` concatenado con `Text.brand(…)`.
    ///
    /// ```swift
    /// BrandParagraph(Text("Al confirmar se ") + Text("borran").brand(.strong, tone: .destructive) + Text(" las respuestas."))
    /// ```
    public init(_ content: Text, size: ParagraphSize = .md) {
        self.content = content
        self.size = size
    }

    public var body: some View {
        let points: CGFloat
        let lineHeight: CGFloat
        switch size {
        case .sm:
            points = BrandTextTokens.paragraphSmallFontSize
            lineHeight = BrandTextTokens.paragraphSmallLineHeight
        case .md:
            points = BrandTextTokens.fontSize
            lineHeight = BrandTextTokens.lineHeight
        case .lg:
            points = BrandTextTokens.paragraphLargeFontSize
            lineHeight = BrandTextTokens.paragraphLargeLineHeight
        }
        return content
            .brandLinedFont(size: points, weight: BrandTextTokens.fontWeight, lineHeight: lineHeight)
            .foregroundStyle(BrandTextTokens.color)
            .tracking(BrandTextTokens.letterSpacing * points)
            .fixedSize(horizontal: false, vertical: true)
    }
}

// MARK: - Text (en línea)

/// `Text` `as`: qué se pinta, que es lo mismo que decir qué significa. `span` no añade significado, `em` marca énfasis
/// de lectura (cursiva), `strong` marca importancia (el peso de énfasis del sistema), `del` lo eliminado y `s` lo que ya
/// no es relevante: los dos últimos van tachados (SwiftUI no tiene el elemento, solo el aspecto).
public enum TextElement: String, CaseIterable, Sendable {
    case span, em, strong, del, s
}

/// `Text` `tone`: la intención del fragmento. `error` es un estado que ha fallado, `destructive` avisa de una acción
/// que hace perder algo, `success` dice que salió bien y `muted` marca una aclaración secundaria. `error` y
/// `destructive` comparten tinta; cambia lo que dicen. Es color de texto, nunca un relleno.
public enum TextTone: String, CaseIterable, Sendable {
    case `default`, muted, error, destructive, success
}

extension Text {
    /// Texto en línea de la marca: **devuelve un `Text`**, así que se puede concatenar con `+` sin romper la línea.
    ///
    /// ```swift
    /// Text("Esta acción ") + Text("borra").brand(.strong, tone: .destructive) + Text(" el curso.")
    /// ```
    ///
    /// - Parameter strikethrough: tacha el fragmento y lo atenúa (tinta secundaria); con un `tone` manda el del tono.
    ///   `.del` y `.s` tachan por sí solos. Es solo aspecto: VoiceOver no anuncia un tachado.
    /// - Parameter size: el tamaño de letra del texto que lo rodea (por defecto el del cuerpo, 16 pt). Solo hace falta
    ///   en `.strong`, que cambia el peso del eje `wght` y para eso necesita saber el tamaño: SwiftUI no cambia el peso
    ///   de una fuente variable de CoreText con `fontWeight(_:)`. Crece con el tipo dinámico del sistema.
    public func brand(_ element: TextElement = .span, tone: TextTone = .default, size: CGFloat = BrandTextTokens.fontSize, strikethrough: Bool = false) -> Text {
        var text = self
        let struck = strikethrough || element == .del || element == .s
        switch element {
        case .span, .del, .s: break
        case .em: text = text.italic()
        case .strong:
            text = text.font(Font(brandCTFont(family: BrandFontFamily.sans, size: scaledForDynamicType(size), weight: BrandTextInlineTokens.emphasisFontWeight)))
        }
        if struck { text = text.strikethrough() }
        switch tone {
        case .default: return struck ? text.foregroundStyle(BrandTextInlineTokens.strikethroughColor) : text
        case .muted: return text.foregroundStyle(BrandTextInlineTokens.mutedColor)
        case .error: return text.foregroundStyle(BrandTextInlineTokens.errorColor)
        case .destructive: return text.foregroundStyle(BrandTextInlineTokens.destructiveColor)
        case .success: return text.foregroundStyle(BrandTextInlineTokens.successColor)
        }
    }
}

/// El tamaño escalado con el tipo dinámico del sistema (en macOS no hay: el mismo tamaño).
private func scaledForDynamicType(_ size: CGFloat) -> CGFloat {
    #if canImport(UIKit)
    UIFontMetrics(forTextStyle: .body).scaledValue(for: size)
    #else
    size
    #endif
}

/// Un fragmento de texto en línea (la vista suelta de `Text.brand`). Hereda la fuente del texto que lo rodea.
public struct BrandText: View {
    private let content: Text
    private let element: TextElement
    private let tone: TextTone
    private let strikethrough: Bool

    public init(_ text: LocalizedStringKey, as element: TextElement = .span, tone: TextTone = .default, strikethrough: Bool = false) {
        content = Text(text)
        self.element = element
        self.tone = tone
        self.strikethrough = strikethrough
    }

    public init(verbatim text: String, as element: TextElement = .span, tone: TextTone = .default, strikethrough: Bool = false) {
        content = Text(verbatim: text)
        self.element = element
        self.tone = tone
        self.strikethrough = strikethrough
    }

    public var body: some View {
        content.brand(element, tone: tone, strikethrough: strikethrough)
    }
}

#Preview("Texto") {
    VStack(alignment: .leading, spacing: BrandSpacing.s3) {
        ForEach(HeadingLevel.allCases, id: \.self) { level in
            BrandHeading(verbatim: "Encabezado \(level.rawValue)", level: level)
        }
        BrandHeading("Un h2 con tamaño de h5", level: .h2, size: .s4)
        BrandParagraph("Párrafo de tamaño normal con texto de ejemplo.")
        BrandParagraph("Párrafo pequeño para notas.", size: .sm)
        BrandParagraph("Párrafo grande para entradillas.", size: .lg)
        (Text("Esta acción ") + Text("borra").brand(.strong, tone: .destructive) + Text(" el curso. ")
            + Text("Aclaración").brand(.em, tone: .muted))
            .font(.brand(.body))
    }
    .padding()
}
