import StudiolxdBrand

/// Paridad de Banner, Menu, ContextMenu, Tabs (y su lista y su pestaña), DatePickerField y PageIntro. Cada entrada:
/// nombre de la ficha → prop `union` → `rawValue` de los casos del enum.
let navigationParity: [String: [String: [String]]] = [
    "Banner": [
        "tone": BannerTone.allCases.map(\.rawValue),
    ],
    // `Menu` y `TabsTrigger` solo tienen props de otro tipo (`excluded` y booleanos): no enumeran casos.
    "Menu": [:],
    "ContextMenu": [
        "triggerSize": ContextMenuTriggerSize.allCases.map(\.rawValue),
        "triggerOrientation": ContextMenuTriggerOrientation.allCases.map(\.rawValue),
    ],
    "Tabs": [
        "orientation": TabsOrientation.allCases.map(\.rawValue),
    ],
    "TabsList": [
        "variant": TabsVariant.allCases.map(\.rawValue),
    ],
    "TabsTrigger": [:],
    "DatePickerField": [
        "size": DatePickerFieldSize.allCases.map(\.rawValue),
    ],
    "PageIntro": [
        "level": HeadingLevel.allCases.map { String($0.rawValue) },
        "size": HeadingSize.allCases.map { String($0.rawValue) },
    ],
]
