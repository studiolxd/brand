import StudiolxdBrand

/// Paridad de List, ListItem, EmptyState y Skeleton. Cada entrada: nombre de la ficha → prop `union` → `rawValue` de los casos.
let listsParity: [String: [String: [String]]] = [
    "List": ["type": ListType.allCases.map(\.rawValue)],
    "ListItem": [:],
    "EmptyState": ["size": EmptyStateSize.allCases.map(\.rawValue)],
    "Skeleton": [:],
]
