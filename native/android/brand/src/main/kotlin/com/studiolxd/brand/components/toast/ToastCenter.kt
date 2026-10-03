package com.studiolxd.brand.components.toast

import androidx.compose.runtime.Immutable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import kotlin.coroutines.cancellation.CancellationException
import kotlin.time.Duration
import kotlin.time.Duration.Companion.seconds

/**
 * Intención de un aviso (`ToastIntent`): la misma escala que la variante del `Alert`, más `info` (que cae en el
 * neutro) y `loading` (un aviso que espera y no se cierra solo).
 */
enum class ToastIntent(val value: String) {
    Default("default"),
    Success("success"),
    Error("error"),
    Warning("warning"),
    Info("info"),
    Loading("loading"),
}

/** Esquina de la pantalla donde se monta la pila (`Toaster` `position`). */
enum class ToastPosition(val value: String) {
    BottomRight("bottom-right"),
    BottomLeft("bottom-left"),
    BottomCenter("bottom-center"),
    TopRight("top-right"),
    TopLeft("top-left"),
    TopCenter("top-center"),
    ;

    internal val isTop: Boolean get() = this == TopRight || this == TopLeft || this == TopCenter
}

/** La acción opcional de un aviso: un botón con su rótulo y su manejador. El rótulo lo pone quien llama. */
@Immutable
class ToastAction(val label: String, val onClick: () -> Unit)

/**
 * Un aviso vivo en la cola.
 *
 * @property duration lo que vive; [Duration.INFINITE] lo deja fijo y `null` toma el del [ToastHost] (un `loading` no se
 * cierra solo nunca).
 * @property revision sube cada vez que se actualiza el aviso por su `id`: reinicia su reloj.
 */
@Immutable
data class ToastItem(
    val id: String,
    val title: String,
    val intent: ToastIntent = ToastIntent.Default,
    val description: String? = null,
    val duration: Duration? = null,
    val action: ToastAction? = null,
    val onClose: (() -> Unit)? = null,
    val revision: Int = 0,
)

/**
 * Cuánto vive el aviso antes de cerrarse solo, o `null` si no se cierra solo (un `loading`, una duración infinita o
 * no positiva). [hostDuration] es la del [ToastHost] cuando el aviso no trae la suya.
 */
internal fun ToastItem.lifetime(hostDuration: Duration): Duration? {
    if (intent == ToastIntent.Loading) return null
    val value = duration ?: hostDuration
    return if (value.isFinite() && value > Duration.ZERO) value else null
}

/**
 * La cola de avisos (el `toastManager` de React). Se usa `ToastCenter.shared` —o se crea una y se pasa al
 * [ToastHost]—, se monta un [ToastHost] **una vez en la raíz** de la app y se llama desde cualquier sitio:
 *
 * ```kotlin
 * ToastCenter.shared.success("Cambios guardados")
 * val id = ToastCenter.shared.loading("Subiendo…")
 * ToastCenter.shared.success("Subido", id = id)        // actualiza el mismo aviso en su sitio
 * ```
 *
 * La lista [items] es estado de Compose: el [ToastHost] se recompone solo. Los relojes de cierre los lleva el
 * [ToastHost] (se detienen mientras el dedo o el puntero están sobre la pila); sin host montado los avisos no
 * caducan.
 */
class ToastCenter {
    private val lock = Any()
    private var counter = 0

    /** Los avisos vivos, del más nuevo al más antiguo. */
    var items: List<ToastItem> by mutableStateOf(emptyList())
        private set

    // MARK: Lanzar

    /**
     * Lanza un aviso. Devuelve su `id`: sirve para actualizarlo (`id =`) o cerrarlo ([dismiss]). Si ya hay uno vivo con
     * ese `id`, **lo actualiza en su sitio** en vez de apilar otro (`loading` → `success`).
     */
    fun show(
        title: String,
        intent: ToastIntent = ToastIntent.Default,
        id: String? = null,
        description: String? = null,
        duration: Duration? = null,
        action: ToastAction? = null,
        onClose: (() -> Unit)? = null,
    ): String = synchronized(lock) {
        val existing = id?.let { wanted -> items.firstOrNull { it.id == wanted } }
        if (existing != null) {
            val updated = existing.copy(
                title = title, intent = intent, description = description, duration = duration, action = action,
                onClose = onClose, revision = existing.revision + 1,
            )
            items = items.map { if (it.id == existing.id) updated else it }
            existing.id
        } else {
            counter += 1
            val newId = id ?: "toast-$counter"
            items = listOf(ToastItem(newId, title, intent, description, duration, action, onClose)) + items
            newId
        }
    }

    /**
     * Actualiza un aviso vivo por su `id` (`loading` → `success`). Devuelve `false` si ya no está (se cerró): no
     * crea otro.
     */
    fun update(
        id: String,
        title: String,
        intent: ToastIntent = ToastIntent.Default,
        description: String? = null,
        duration: Duration? = null,
        action: ToastAction? = null,
        onClose: (() -> Unit)? = null,
    ): Boolean {
        if (items.none { it.id == id }) return false
        show(title, intent, id, description, duration, action, onClose)
        return true
    }

    /** Aviso neutro, sin intención. */
    fun message(title: String, id: String? = null, description: String? = null, duration: Duration? = null, action: ToastAction? = null): String =
        show(title, ToastIntent.Default, id, description, duration, action)

    /** Algo ha salido bien. */
    fun success(title: String, id: String? = null, description: String? = null, duration: Duration? = null, action: ToastAction? = null): String =
        show(title, ToastIntent.Success, id, description, duration, action)

    /** Algo ha fallado. TalkBack lo anuncia interrumpiendo. */
    fun error(title: String, id: String? = null, description: String? = null, duration: Duration? = null, action: ToastAction? = null): String =
        show(title, ToastIntent.Error, id, description, duration, action)

    /** Algo pide atención antes de seguir. TalkBack lo anuncia interrumpiendo. */
    fun warning(title: String, id: String? = null, description: String? = null, duration: Duration? = null, action: ToastAction? = null): String =
        show(title, ToastIntent.Warning, id, description, duration, action)

    /** Un dato de contexto. Sin relleno propio: cae en el neutro, como en el `Alert`. */
    fun info(title: String, id: String? = null, description: String? = null, duration: Duration? = null, action: ToastAction? = null): String =
        show(title, ToastIntent.Info, id, description, duration, action)

    /** Aviso de espera: **no se cierra solo**. Se resuelve actualizándolo con su `id` o con [dismiss]. */
    fun loading(title: String, id: String? = null, description: String? = null, action: ToastAction? = null): String =
        show(title, ToastIntent.Loading, id, description, null, action)

    /**
     * Sigue una tarea con un solo aviso: espera mientras corre y se convierte en éxito o error al terminar. Devuelve el
     * resultado de [block] y relanza su error (como `toast.promise`). Si la corrutina se cancela, el aviso se cierra.
     *
     * ```kotlin
     * val home = ToastCenter.shared.promise(
     *     loading = "Guardando…",
     *     success = { "Guardada «${it.name}»" },
     *     error = { "No se pudo guardar" },
     * ) { repository.save(draft) }
     * ```
     */
    suspend fun <T> promise(
        loading: String,
        success: (T) -> String,
        error: (Throwable) -> String,
        block: suspend () -> T,
    ): T {
        val id = this.loading(loading)
        try {
            val value = block()
            this.success(success(value), id = id)
            return value
        } catch (cancelled: CancellationException) {
            dismiss(id)
            throw cancelled
        } catch (failure: Throwable) {
            this.error(error(failure), id = id)
            throw failure
        }
    }

    // MARK: Cerrar

    /** Cierra un aviso por `id`, o todos los que haya en pantalla si no se pasa ninguno. Llama a su `onClose`. */
    fun dismiss(id: String? = null) {
        val closing = synchronized(lock) {
            val gone = if (id == null) items else items.filter { it.id == id }
            if (gone.isNotEmpty()) items = items - gone.toSet()
            gone
        }
        closing.forEach { it.onClose?.invoke() }
    }

    companion object {
        /** La cola global, como el objeto `toast` de React. */
        val shared: ToastCenter = ToastCenter()

        /**
         * Vida por defecto de un aviso: lo que tarda en leerse un rótulo corto sin llegar a molestar. En la web es el
         * `duration` del `Toaster` (5000 ms); no es un token porque lo mide el motor, no el CSS.
         */
        val defaultDuration: Duration = 5.seconds
    }
}
