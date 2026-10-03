package com.studiolxd.brand.components.confirmdialog

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.width
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.studiolxd.brand.support.BrandPreviewSurface

/** La tarjeta de confirmación en sus variantes: destructiva, con acción intermedia, con frase y ocupada. */
@Composable
internal fun ConfirmDialogPreviewContent() {
    val phrase = BrandConfirmPhrase("Casa del lago", "Escribe «Casa del lago» para confirmar", "No coincide con el nombre de la vivienda.")
    val modifier = Modifier.width(390.dp)
    Column(verticalArrangement = Arrangement.spacedBy(16.dp)) {
        ConfirmDialogPreviewCard(modifier, destructive = true)
        ConfirmDialogPreviewCard(modifier, destructive = false, secondary = true)
        ConfirmDialogPreviewCard(modifier, destructive = true, phrase = phrase, state = ConfirmDialogState(phrase.value, typed = "Casa del", attempted = true))
        ConfirmDialogPreviewCard(modifier, destructive = true, state = ConfirmDialogState(null, pending = true))
    }
}

@Composable
internal fun ConfirmDialogPreviewCard(
    modifier: Modifier,
    destructive: Boolean,
    secondary: Boolean = false,
    phrase: BrandConfirmPhrase? = null,
    state: ConfirmDialogState = ConfirmDialogState(phrase?.value),
) {
    BrandConfirmDialogCard(
        state = state,
        title = "¿Eliminar la vivienda?",
        description = "Se borrarán sus documentos y recibos. No se puede deshacer.",
        confirmLabel = "Eliminar la vivienda",
        cancelLabel = "Cancelar",
        pendingLabel = "Confirmando…",
        closeLabel = "Cerrar",
        destructive = destructive,
        secondaryActionLabel = if (secondary) "Archivar" else null,
        onSecondaryAction = if (secondary) ({}) else null,
        phrase = phrase,
        onCancel = {},
        onConfirm = {},
        modifier = modifier,
    )
}

@Preview(name = "ConfirmDialog — claro", showBackground = true, widthDp = 430, heightDp = 1500)
@Composable
internal fun ConfirmDialogPreviewLight() = BrandPreviewSurface(dark = false) { ConfirmDialogPreviewContent() }

@Preview(name = "ConfirmDialog — oscuro", showBackground = true, widthDp = 430, heightDp = 1500)
@Composable
internal fun ConfirmDialogPreviewDark() = BrandPreviewSurface(dark = true) { ConfirmDialogPreviewContent() }
