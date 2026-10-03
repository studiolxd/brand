package com.studiolxd.brand

import com.studiolxd.brand.components.toast.ToastPosition

/**
 * Paridad de los componentes superpuestos: Sheet, ConfirmDialog, Toast y Toaster.
 *
 * Sheet, ConfirmDialog y Toast no tienen props de unión (sus fichas solo declaran booleanos); `ToastIntent` y
 * `BrandSheetDetent` los vigila `OverlaysLogicTest` porque la ficha no tipa uniones fuera de las props.
 */
internal val parityOverlays: Map<String, Map<String, List<String>>> = mapOf(
    "Sheet" to emptyMap(),
    "ConfirmDialog" to emptyMap(),
    "Toast" to emptyMap(),
    "Toaster" to mapOf(
        "position" to ToastPosition.entries.map { it.value },
    ),
)
