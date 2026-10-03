import StudiolxdBrand

/// Paridad de InputField, NumberInputField, PasswordField, SelectField. Cada entrada: nombre de la ficha → prop `union` → `rawValue` de los casos del enum.
let formsParity: [String: [String: [String]]] = [
    "InputField": [
        "type": InputFieldType.allCases.map(\.rawValue),
        "kind": InputFieldKind.allCases.map(\.rawValue),
        "size": InputFieldSize.allCases.map(\.rawValue),
    ],
    "NumberInputField": [
        "size": NumberInputFieldSize.allCases.map(\.rawValue),
    ],
    "PasswordField": [
        "size": PasswordFieldSize.allCases.map(\.rawValue),
    ],
    "SelectField": [
        "size": SelectFieldSize.allCases.map(\.rawValue),
    ],
]
