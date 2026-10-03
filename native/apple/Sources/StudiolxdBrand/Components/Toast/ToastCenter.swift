import Observation
import SwiftUI

/// Intención de un aviso (`ToastIntent`): la misma escala que la variante del `Alert`, más `info` (que cae en el
/// neutro) y `loading` (un aviso que espera y no se cierra solo).
public enum ToastIntent: String, CaseIterable, Sendable {
    case `default`, success, error, warning, info, loading
}

/// Esquina de la pantalla donde se monta la pila (`Toaster` `position`).
public enum ToastPosition: String, CaseIterable, Sendable {
    case bottomRight = "bottom-right"
    case bottomLeft = "bottom-left"
    case bottomCenter = "bottom-center"
    case topRight = "top-right"
    case topLeft = "top-left"
    case topCenter = "top-center"

    var isTop: Bool { [.topRight, .topLeft, .topCenter].contains(self) }
    var horizontal: HorizontalAlignment {
        switch self {
        case .bottomRight, .topRight: .trailing
        case .bottomLeft, .topLeft: .leading
        case .bottomCenter, .topCenter: .center
        }
    }
}

/// La acción opcional de un aviso: un botón con su rótulo y su manejador. El rótulo lo pone quien llama.
public struct ToastAction: Sendable {
    public let label: String
    public let onClick: @MainActor @Sendable () -> Void

    public init(label: String, onClick: @escaping @MainActor @Sendable () -> Void) {
        self.label = label
        self.onClick = onClick
    }
}

/// Un aviso vivo en la cola.
public struct ToastItem: Identifiable, Sendable {
    public let id: String
    public var title: String
    public var intent: ToastIntent
    public var description: String?
    /// Segundos que vive; `.infinity` (o `nil` en un `loading`) lo deja fijo.
    public var duration: TimeInterval?
    public var action: ToastAction?
    var onClose: (@MainActor @Sendable () -> Void)?

    public init(id: String, title: String, intent: ToastIntent = .default, description: String? = nil,
                duration: TimeInterval? = nil, action: ToastAction? = nil, onClose: (@MainActor @Sendable () -> Void)? = nil) {
        self.id = id
        self.title = title
        self.intent = intent
        self.description = description
        self.duration = duration
        self.action = action
        self.onClose = onClose
    }
}

/// La cola de avisos (el `toastManager` de React). Se crea una vez —o se usa `ToastCenter.shared`—, se conecta con
/// `.toastHost(_:)` en la raíz de la app y se llama desde cualquier sitio:
///
/// ```swift
/// ToastCenter.shared.success("Cambios guardados")
/// let id = ToastCenter.shared.loading("Subiendo…")
/// ToastCenter.shared.success("Subido", id: id)        // actualiza el mismo aviso en su sitio
/// ```
@MainActor @Observable
public final class ToastCenter {
    /// La cola global, como el objeto `toast` de React.
    public static let shared = ToastCenter()

    /// Vida por defecto de un aviso, en segundos: lo que tarda en leerse un rótulo corto sin llegar a molestar.
    /// En la web es el `duration` del `Toaster` (5000 ms); no es un token porque lo mide el motor, no el CSS.
    public static let defaultDuration: TimeInterval = 5

    /// Los avisos vivos, del más nuevo al más antiguo.
    public private(set) var items: [ToastItem] = []

    /// El `ToastHost` publica aquí su `duration`, para que un aviso actualizado por `id` viva lo mismo que uno nuevo.
    var hostDuration: TimeInterval = ToastCenter.defaultDuration
    /// Mientras el puntero o el dedo están sobre la pila, los relojes se paran.
    var isPaused = false {
        didSet { if !isPaused { items.forEach { schedule($0) } } else { cancelAllTimers() } }
    }

    private var timers: [String: Task<Void, Never>] = [:]
    private var counter = 0

    public init() {}

    // MARK: Lanzar

    /// Lanza un aviso. Devuelve su `id`: sirve para actualizarlo (`id:`) o cerrarlo (`dismiss(_:)`). Si ya hay uno
    /// vivo con ese `id`, **lo actualiza en su sitio** en vez de apilar otro (`loading` → `success`).
    @discardableResult
    public func show(
        _ title: String,
        intent: ToastIntent = .default,
        id: String? = nil,
        description: String? = nil,
        duration: TimeInterval? = nil,
        action: ToastAction? = nil,
        onClose: (@MainActor @Sendable () -> Void)? = nil
    ) -> String {
        if let id, let index = items.firstIndex(where: { $0.id == id }) {
            items[index].title = title
            items[index].intent = intent
            items[index].description = description
            items[index].duration = duration
            items[index].action = action
            items[index].onClose = onClose
            schedule(items[index])
            announce(items[index])
            return id
        }
        counter += 1
        let newID = id ?? "toast-\(counter)"
        let item = ToastItem(id: newID, title: title, intent: intent, description: description, duration: duration,
                             action: action, onClose: onClose)
        items.insert(item, at: 0)
        schedule(item)
        announce(item)
        return newID
    }

    /// Aviso neutro, sin intención.
    @discardableResult
    public func message(_ title: String, id: String? = nil, description: String? = nil, duration: TimeInterval? = nil,
                        action: ToastAction? = nil) -> String {
        show(title, intent: .default, id: id, description: description, duration: duration, action: action)
    }

    /// Algo ha salido bien.
    @discardableResult
    public func success(_ title: String, id: String? = nil, description: String? = nil, duration: TimeInterval? = nil,
                        action: ToastAction? = nil) -> String {
        show(title, intent: .success, id: id, description: description, duration: duration, action: action)
    }

    /// Algo ha fallado. Interrumpe al lector de pantalla.
    @discardableResult
    public func error(_ title: String, id: String? = nil, description: String? = nil, duration: TimeInterval? = nil,
                      action: ToastAction? = nil) -> String {
        show(title, intent: .error, id: id, description: description, duration: duration, action: action)
    }

    /// Algo pide atención antes de seguir. Interrumpe al lector de pantalla.
    @discardableResult
    public func warning(_ title: String, id: String? = nil, description: String? = nil, duration: TimeInterval? = nil,
                        action: ToastAction? = nil) -> String {
        show(title, intent: .warning, id: id, description: description, duration: duration, action: action)
    }

    /// Un dato de contexto. Sin relleno propio: cae en el neutro, como en el `Alert`.
    @discardableResult
    public func info(_ title: String, id: String? = nil, description: String? = nil, duration: TimeInterval? = nil,
                     action: ToastAction? = nil) -> String {
        show(title, intent: .info, id: id, description: description, duration: duration, action: action)
    }

    /// Aviso de espera: **no se cierra solo**. Se resuelve actualizándolo con su `id` o con `dismiss(_:)`.
    @discardableResult
    public func loading(_ title: String, id: String? = nil, description: String? = nil, action: ToastAction? = nil) -> String {
        show(title, intent: .loading, id: id, description: description, action: action)
    }

    /// Sigue una tarea con un solo aviso: espera mientras corre y se convierte en éxito o error al terminar.
    /// Devuelve el resultado de la tarea (y relanza su error, como `toast.promise`).
    @discardableResult
    public func promise<Value: Sendable>(
        loading loadingTitle: String,
        success successTitle: @escaping @Sendable (Value) -> String,
        error errorTitle: @escaping @Sendable (Error) -> String,
        _ operation: @Sendable () async throws -> Value
    ) async throws -> Value {
        let id = loading(loadingTitle)
        do {
            let value = try await operation()
            success(successTitle(value), id: id)
            return value
        } catch {
            self.error(errorTitle(error), id: id)
            throw error
        }
    }

    // MARK: Cerrar

    /// Cierra un aviso por `id`, o todos los que haya en pantalla si no se pasa ninguno.
    public func dismiss(_ id: String? = nil) {
        let closing = id.map { id in items.filter { $0.id == id } } ?? items
        for item in closing {
            timers[item.id]?.cancel()
            timers[item.id] = nil
            items.removeAll { $0.id == item.id }
            item.onClose?()
        }
    }

    // MARK: Relojes y anuncios

    private func schedule(_ item: ToastItem) {
        timers[item.id]?.cancel()
        timers[item.id] = nil
        guard item.intent != .loading, !isPaused else { return }
        let seconds = item.duration ?? hostDuration
        guard seconds.isFinite, seconds > 0 else { return }
        timers[item.id] = Task { [weak self] in
            try? await Task.sleep(for: .seconds(seconds))
            guard !Task.isCancelled else { return }
            self?.dismiss(item.id)
        }
    }

    private func cancelAllTimers() {
        timers.values.forEach { $0.cancel() }
        timers.removeAll()
    }

    /// `error` y `warning` interrumpen (anuncio de prioridad alta); el resto informa sin interrumpir.
    private func announce(_ item: ToastItem) {
        let text = [item.title, item.description].compactMap { $0 }.joined(separator: ". ")
        var announcement = AttributedString(text)
        announcement.accessibilitySpeechAnnouncementPriority = (item.intent == .error || item.intent == .warning) ? .high : .low
        AccessibilityNotification.Announcement(announcement).post()
    }
}
