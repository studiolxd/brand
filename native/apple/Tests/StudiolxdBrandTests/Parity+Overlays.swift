import StudiolxdBrand

/// Paridad de Sheet, ConfirmDialog y Toast/Toaster. Sheet y ConfirmDialog solo tienen booleanos (no se registran);
/// `Toaster.position` es la única unión de las props. `ToastIntent` no es una prop de la ficha: lo vigila
/// `OverlaysLogicTests`.
let overlaysParity: [String: [String: [String]]] = [
    "Sheet": [:],
    "ConfirmDialog": [:],
    "Toaster": [
        "position": ToastPosition.allCases.map(\.rawValue),
    ],
    "Toast": [:],
]
