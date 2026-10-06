import StudiolxdBrand

/// Paridad de los componentes base: Button, CloseButton, Heading, Paragraph, Text.
let coreParity: [String: [String: [String]]] = [
    "Button": [
        "variant": ButtonVariant.allCases.map(\.rawValue),
        "tone": ButtonTone.allCases.map(\.rawValue),
        "size": ButtonSize.allCases.map(\.rawValue),
    ],
    "CloseButton": [
        "size": BrandControlSize.allCases.map(\.rawValue),
    ],
    "Heading": [
        "level": HeadingLevel.allCases.map { String($0.rawValue) },
        "size": HeadingSize.allCases.map { String($0.rawValue) },
    ],
    "Paragraph": [
        "size": ParagraphSize.allCases.map(\.rawValue),
    ],
    "Text": [
        "as": TextElement.allCases.map(\.rawValue),
        "tone": TextTone.allCases.map(\.rawValue),
    ],
]
