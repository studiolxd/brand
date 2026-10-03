import StudiolxdBrand

/// Paridad de SwitcherField, ToggleGroup, ThemeSwitcher y Tag. Cada entrada: nombre de la ficha → prop `union` →
/// `rawValue` de los casos del enum.
let togglesParity: [String: [String: [String]]] = [
    "Tag": [
        "variant": TagVariant.allCases.map(\.rawValue),
    ],
    "SwitcherField": [
        "size": BrandControlSize.allCases.map(\.rawValue),
    ],
    "ToggleGroup": [
        "size": BrandControlSize.allCases.map(\.rawValue),
        "orientation": ToggleGroupOrientation.allCases.map(\.rawValue),
    ],
    "ThemeSwitcher": [
        "value": BrandThemeChoice.allCases.map(\.rawValue),
        "variant": ThemeSwitcherVariant.allCases.map(\.rawValue),
        "layout": ThemeSwitcherLayout.allCases.map(\.rawValue),
        "size": BrandControlSize.allCases.map(\.rawValue),
    ],
]
