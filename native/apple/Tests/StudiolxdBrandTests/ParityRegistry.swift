/// Lo que cada componente nativo expone, por componente y por prop: los valores de sus enums.
///
/// Es la mitad nativa de la paridad con React (ver `native/parity/README.md`). Al portar un componente se añade
/// aquí una entrada con el nombre de su ficha (`native/parity/components/<Componente>.json`) y, por cada prop
/// de tipo `union`, los `rawValue` de su enum:
///
/// ```swift
/// "Button": [
///     "variant": ButtonVariant.allCases.map(\.rawValue),
///     "size": ButtonSize.allCases.map(\.rawValue),
/// ],
/// ```
///
/// El enum es `enum ButtonVariant: String, CaseIterable` y cada caso lleva como `rawValue` exactamente el valor de
/// React (`case primary = "primary"`, `case iconOnly = "icon-only"`). Con cero fichas el registro va vacío.
let parityRegistry: [String: [String: [String]]] = [:]
