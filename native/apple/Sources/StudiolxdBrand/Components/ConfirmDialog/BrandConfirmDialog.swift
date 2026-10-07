import SwiftUI

/// La pregunta antes de una acción que no se puede deshacer (`ConfirmDialog`): borrar una vivienda, revocar una clave,
/// expulsar a alguien. Es la tarjeta del diálogo de la marca —título, aspa, pregunta, contenido extra, frase de
/// confirmación opcional y pie—; `brandConfirmDialog(isPresented:…)` la presenta sobre la pantalla.
///
/// Las reglas del sistema, igual que en la web:
/// - **`confirmLabel` es obligatorio** y nombra lo que va a pasar («Eliminar la vivienda»), no «Confirmar».
/// - **`Cancelar` va primero en el pie** y la acción principal al final; con sitio, `Cancelar` queda a la izquierda y
///   la principal a la derecha; sin él, la principal arriba (regla 10 de CLAUDE.md).
/// - **El foco de VoiceOver arranca en «Cancelar»**, no en la acción que destruye; con `confirmPhrase`, en el campo.
/// - **`onConfirm` es asíncrono**: mientras corre, el diálogo queda ocupado (botones apagados, rótulo de espera) y se
///   cierra al terminar; si lanza un error, sigue abierto y se avisa por `onConfirmError`.
public struct BrandConfirmDialog<Extra: View>: View {
    private let title: LocalizedStringKey
    private let description: LocalizedStringKey?
    private let extra: Extra
    private let confirmLabel: LocalizedStringKey
    private let cancelLabel: LocalizedStringKey
    private let pendingLabel: LocalizedStringKey
    private let closeLabel: LocalizedStringKey
    private let destructive: Bool
    private let secondaryActionLabel: LocalizedStringKey?
    private let onSecondaryAction: (() -> Void)?
    private let phrase: Phrase?
    /// `false` solo en las capturas: dar el foco al campo en `onAppear` es una carrera con la fotografía (con foco salen
    /// el anillo y el cursor parpadeante), y una captura tiene que salir igual cada vez.
    private let autofocus: Bool
    private let onConfirm: () async throws -> Void
    private let onCancel: () -> Void
    private let onConfirmError: ((Error) -> Void)?
    private let onDismiss: () -> Void

    /// La barrera de teclear el identificador: la frase exacta y los dos textos del producto (no llevan default).
    public struct Phrase {
        public let value: String
        public let label: LocalizedStringKey
        public let mismatch: LocalizedStringKey

        public init(_ value: String, label: LocalizedStringKey, mismatch: LocalizedStringKey) {
            self.value = value
            self.label = label
            self.mismatch = mismatch
        }
    }

    @State private var pending: Bool
    @State private var typed: String
    @State private var attempted: Bool
    @AccessibilityFocusState private var cancelFocused: Bool
    @FocusState private var phraseFocused: Bool
    @ScaledMetric(relativeTo: .title) private var closeScale: CGFloat = 1

    private typealias M = BrandModalTokens

    /// - Parameters:
    ///   - onCancel: se llama al cancelar, al cerrar con el aspa, con `Esc` y al tocar fuera.
    ///   - onDismiss: cierra el diálogo tras confirmar con éxito (lo pone `brandConfirmDialog`).
    public init(
        title: LocalizedStringKey,
        description: LocalizedStringKey? = nil,
        confirmLabel: LocalizedStringKey,
        cancelLabel: LocalizedStringKey = "Cancelar",
        pendingLabel: LocalizedStringKey = "Confirmando…",
        closeLabel: LocalizedStringKey = "Cerrar",
        destructive: Bool = false,
        secondaryActionLabel: LocalizedStringKey? = nil,
        onSecondaryAction: (() -> Void)? = nil,
        confirmPhrase: Phrase? = nil,
        onConfirm: @escaping () async throws -> Void,
        onCancel: @escaping () -> Void,
        onConfirmError: ((Error) -> Void)? = nil,
        onDismiss: @escaping () -> Void = {},
        @ViewBuilder extra: () -> Extra
    ) {
        self.init(
            title: title, description: description, confirmLabel: confirmLabel, cancelLabel: cancelLabel,
            pendingLabel: pendingLabel, closeLabel: closeLabel, destructive: destructive,
            secondaryActionLabel: secondaryActionLabel, onSecondaryAction: onSecondaryAction,
            confirmPhrase: confirmPhrase, onConfirm: onConfirm, onCancel: onCancel, onConfirmError: onConfirmError,
            onDismiss: onDismiss, extra: extra, state: (false, "", false), autofocus: true
        )
    }

    /// Con el estado inicial fijado: lo usan las capturas para fotografiar «ocupado» y «frase que no coincide».
    init(
        title: LocalizedStringKey,
        description: LocalizedStringKey?,
        confirmLabel: LocalizedStringKey,
        cancelLabel: LocalizedStringKey,
        pendingLabel: LocalizedStringKey,
        closeLabel: LocalizedStringKey,
        destructive: Bool,
        secondaryActionLabel: LocalizedStringKey?,
        onSecondaryAction: (() -> Void)?,
        confirmPhrase: Phrase?,
        onConfirm: @escaping () async throws -> Void,
        onCancel: @escaping () -> Void,
        onConfirmError: ((Error) -> Void)?,
        onDismiss: @escaping () -> Void,
        @ViewBuilder extra: () -> Extra,
        state: (pending: Bool, typed: String, attempted: Bool),
        autofocus: Bool = false
    ) {
        self.autofocus = autofocus
        self.title = title
        self.description = description
        self.confirmLabel = confirmLabel
        self.cancelLabel = cancelLabel
        self.pendingLabel = pendingLabel
        self.closeLabel = closeLabel
        self.destructive = destructive
        self.secondaryActionLabel = secondaryActionLabel
        self.onSecondaryAction = onSecondaryAction
        self.phrase = confirmPhrase
        self.onConfirm = onConfirm
        self.onCancel = onCancel
        self.onConfirmError = onConfirmError
        self.onDismiss = onDismiss
        self.extra = extra()
        _pending = State(initialValue: state.pending)
        _typed = State(initialValue: state.typed)
        _attempted = State(initialValue: state.attempted)
    }

    // Se compara sin los espacios de los extremos pero sin normalizar caja ni acentos: la barrera vive de teclearlo igual.
    private var matches: Bool {
        guard let phrase else { return true }
        return typed.trimmingCharacters(in: .whitespacesAndNewlines) == phrase.value
    }

    private var mismatchShown: Bool { attempted && !matches }

    public var body: some View {
        BrandDialogWidthReader {
            VStack(alignment: .leading, spacing: 0) {
                header
                if let description {
                    Text(description)
                        // `.modal__description` no fija `line-height`: hereda el del cuerpo (`text.line-height`).
                        .brandLinedFont(size: M.descriptionFontSize, lineHeight: BrandTextTokens.lineHeight)
                        .foregroundStyle(M.descriptionColor)
                        .fixedSize(horizontal: false, vertical: true)
                        .padding(.bottom, M.descriptionMarginBlockEnd)
                }
                extra
                if let phrase { phraseField(phrase) }
                BrandDialogFooter(gap: M.footerGap) { footerActions }
                    .padding(.top, BrandConfirmDialogTokens.actionsSpaceBefore)
            }
        }
        .padding(.vertical, M.paddingBlock)
        .padding(.horizontal, M.paddingInline)
        .background(M.bg)
        .overlay(Rectangle().strokeBorder(M.borderColor, lineWidth: M.borderWidth))
        .brandShadow(M.shadow)
        .accessibilityElement(children: .contain)
        .accessibilityAddTraits(.isModal)
        .accessibilityAction(.escape, cancel)
        .onAppear {
            guard autofocus else { return }
            if phrase == nil { cancelFocused = true } else { phraseFocused = true }
        }
    }

    // MARK: Cabecera

    private var header: some View {
        HStack(alignment: .top, spacing: M.headerGap) {
            Text(title)
                .brandLinedFont(size: M.titleFontSize, weight: M.titleFontWeight, lineHeight: M.titleLineHeight, relativeTo: .title)
                .foregroundStyle(M.titleColor)
                .fixedSize(horizontal: false, vertical: true)
                .frame(maxWidth: .infinity, alignment: .leading)
                .accessibilityAddTraits(.isHeader)
            BrandCloseButton(closeLabel, size: .md, action: cancel)
                .disabled(pending)
                // El aspa se centra sobre la primera línea del título, como en la web: la mitad de lo que va de la
                // caja de esa línea (`title-font-size × title-line-height`) al aspa (`close-size`).
                .padding(.top, (M.titleFontSize * M.titleLineHeight - M.closeSize) / 2)
        }
        .padding(.bottom, M.headerGap)
    }

    // MARK: Frase de confirmación

    private func phraseField(_ phrase: Phrase) -> some View {
        PhraseField(
            label: phrase.label, mismatch: phrase.mismatch, text: $typed, showError: mismatchShown, disabled: pending,
            focused: $phraseFocused,
            onEdit: { attempted = false },
            onLeave: { if !typed.isEmpty { attempted = true } },
            onSubmit: {
                if matches { confirm() } else if !typed.isEmpty { attempted = true }
            }
        )
        .padding(.top, BrandConfirmDialogTokens.phraseSpaceBefore)
    }

    // MARK: Pie

    @ViewBuilder
    private var footerActions: some View {
        // El orden del DOM: salida segura → intermedia → principal. De él sale la colocación.
        BrandDialogButton(cancelLabel, variant: .outline, action: cancel)
            .disabled(pending)
            .accessibilityFocused($cancelFocused)
        if let secondaryActionLabel, let onSecondaryAction {
            BrandDialogButton(secondaryActionLabel, variant: .outline, action: onSecondaryAction)
                .disabled(pending)
        }
        BrandDialogButton(
            pending ? pendingLabel : confirmLabel,
            variant: destructive ? .outline : .primary,
            destructive: destructive,
            action: confirm
        )
        .disabled(pending || !matches)
        .accessibilityHint(pending ? Text(pendingLabel) : Text(""))
    }

    // MARK: Acciones

    private func cancel() {
        guard !pending else { return }
        onCancel()
    }

    private func confirm() {
        guard !pending, matches else { return }
        pending = true
        Task { @MainActor in
            do {
                try await onConfirm()
                pending = false
                onDismiss()
            } catch {
                // Sigue abierto: el error lo cuenta quien llama (un toast, un aviso en `extra`).
                pending = false
                onConfirmError?(error)
            }
        }
    }
}

extension BrandConfirmDialog where Extra == EmptyView {
    public init(
        title: LocalizedStringKey,
        description: LocalizedStringKey? = nil,
        confirmLabel: LocalizedStringKey,
        cancelLabel: LocalizedStringKey = "Cancelar",
        pendingLabel: LocalizedStringKey = "Confirmando…",
        closeLabel: LocalizedStringKey = "Cerrar",
        destructive: Bool = false,
        secondaryActionLabel: LocalizedStringKey? = nil,
        onSecondaryAction: (() -> Void)? = nil,
        confirmPhrase: Phrase? = nil,
        onConfirm: @escaping () async throws -> Void,
        onCancel: @escaping () -> Void,
        onConfirmError: ((Error) -> Void)? = nil,
        onDismiss: @escaping () -> Void = {}
    ) {
        self.init(
            title: title, description: description, confirmLabel: confirmLabel, cancelLabel: cancelLabel,
            pendingLabel: pendingLabel, closeLabel: closeLabel, destructive: destructive,
            secondaryActionLabel: secondaryActionLabel, onSecondaryAction: onSecondaryAction,
            confirmPhrase: confirmPhrase, onConfirm: onConfirm, onCancel: onCancel, onConfirmError: onConfirmError,
            onDismiss: onDismiss, extra: { EmptyView() }
        )
    }
}

/// El campo de la frase: etiqueta, caja con el borde de los campos de la marca y, si no coincide, el mensaje de error.
/// Pinta con los tokens `input.*`, `label.*` e `input-field.*` (es el `InputField` de React, reducido a lo que este
/// diálogo necesita).
private struct PhraseField: View {
    let label: LocalizedStringKey
    let mismatch: LocalizedStringKey
    @Binding var text: String
    let showError: Bool
    let disabled: Bool
    var focused: FocusState<Bool>.Binding
    let onEdit: () -> Void
    let onLeave: () -> Void
    let onSubmit: () -> Void

    @ScaledMetric(relativeTo: .body) private var height: CGFloat = BrandInputTokens.height

    var body: some View {
        VStack(alignment: .leading, spacing: BrandFormFieldTokens.gap) {
            Text(label)
                .brandLinedFont(size: BrandLabelTokens.fontSize, weight: BrandLabelTokens.fontWeight,
                                lineHeight: BrandLabelTokens.lineHeight, relativeTo: .subheadline)
                .foregroundStyle(BrandLabelTokens.color)
            TextField("", text: $text)
                .textFieldStyle(.plain)
                .focused(focused)
                .disabled(disabled)
                .autocorrectionDisabled()
                #if os(iOS)
                .textInputAutocapitalization(.never)
                #endif
                .brandFont(size: BrandInputTokens.fontSize, weight: BrandInputTokens.fontWeight)
                .foregroundStyle(disabled ? BrandInputTokens.disabledColor : BrandInputTokens.color)
                .padding(.horizontal, BrandInputTokens.paddingInline)
                .frame(minHeight: height)
                .background(disabled ? BrandInputTokens.disabledBg : (showError ? BrandInputTokens.errorBg : BrandInputTokens.bg))
                .overlay(Rectangle().strokeBorder(borderColor, lineWidth: BrandInputTokens.borderWidth))
                .overlay {
                    if focused.wrappedValue {
                        Rectangle()
                            .strokeBorder(showError ? BrandInputTokens.errorFocusRingColor : BrandInputTokens.focusRingColor,
                                          lineWidth: BrandInputTokens.focusRingWidth)
                            .padding(BrandInputTokens.focusRingInsetOffset)
                    }
                }
                .onChange(of: text) { onEdit() }
                .onChange(of: focused.wrappedValue) { _, isFocused in if !isFocused { onLeave() } }
                .onSubmit(onSubmit)
                .accessibilityLabel(Text(label))
                .accessibilityValue(showError ? Text(mismatch) : Text(""))
            if showError {
                Text(mismatch)
                    .brandLinedFont(size: BrandInputFieldTokens.errorFontSize, weight: BrandInputFieldTokens.errorFontWeight,
                                    lineHeight: BrandInputFieldTokens.errorLineHeight)
                    .foregroundStyle(BrandInputFieldTokens.errorColor)
                    .accessibilityHidden(true)
            }
        }
    }

    private var borderColor: Color {
        if disabled { return BrandInputTokens.disabledBorderColor }
        if showError { return focused.wrappedValue ? BrandInputTokens.errorFocusBorderColor : BrandInputTokens.errorBorderColor }
        return focused.wrappedValue ? BrandInputTokens.focusBorderColor : BrandInputTokens.borderColor
    }
}

// MARK: - Presentación

private struct ConfirmDialogPresenter<Extra: View>: ViewModifier {
    @Binding var isPresented: Bool
    let dialog: (_ dismiss: @escaping () -> Void) -> BrandConfirmDialog<Extra>
    let closeOnScrimTap: Bool

    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    func body(content: Content) -> some View {
        let animation: Animation? = reduceMotion ? nil : BrandModalTokens.transitionEasing.animation(duration: BrandModalTokens.transitionDuration)
        content
            .accessibilityHidden(isPresented)
            .overlay {
                if isPresented {
                    ZStack {
                        BrandModalTokens.backdropBg
                            .opacity(BrandModalTokens.backdropOpacity)
                            .ignoresSafeArea()
                            .contentShape(Rectangle())
                            .onTapGesture { if closeOnScrimTap { isPresented = false } }
                            .accessibilityHidden(true)
                        dialog { isPresented = false }
                            .containerRelativeFrame(.horizontal) { width, _ in min(width * 0.9, BrandModalTokens.widthMax) }
                            .transition(reduceMotion ? .opacity : .opacity.combined(with: .offset(y: -BrandModalTokens.contentEnterOffset)))
                    }
                    .transition(.opacity)
                    #if os(macOS)
                    .onExitCommand { isPresented = false }
                    #endif
                }
            }
            .animation(animation, value: isPresented)
    }
}

extension View {
    /// Presenta una confirmación de la marca sobre esta vista (`ConfirmDialog` de React). Sustituye al `.alert` nativo
    /// donde hace falta el aspecto de marca, la frase de confirmación o la acción intermedia.
    ///
    /// ```swift
    /// .brandConfirmDialog(
    ///     isPresented: $askDelete,
    ///     title: "¿Eliminar la vivienda?",
    ///     description: "Se borrarán sus documentos. No se puede deshacer.",
    ///     confirmLabel: "Eliminar la vivienda",
    ///     destructive: true
    /// ) {
    ///     try await repository.delete(home)      // se cierra al terminar; si lanza, sigue abierto
    /// }
    /// ```
    ///
    /// - Parameters:
    ///   - isPresented: `open` de React; el diálogo lo apaga al cancelar y al confirmar con éxito.
    ///   - onConfirmError: se llama si `onConfirm` lanza; el diálogo sigue abierto.
    public func brandConfirmDialog<Extra: View>(
        isPresented: Binding<Bool>,
        title: LocalizedStringKey,
        description: LocalizedStringKey? = nil,
        confirmLabel: LocalizedStringKey,
        cancelLabel: LocalizedStringKey = "Cancelar",
        pendingLabel: LocalizedStringKey = "Confirmando…",
        closeLabel: LocalizedStringKey = "Cerrar",
        destructive: Bool = false,
        secondaryActionLabel: LocalizedStringKey? = nil,
        onSecondaryAction: (() -> Void)? = nil,
        confirmPhrase: BrandConfirmDialog<Extra>.Phrase? = nil,
        onConfirmError: ((Error) -> Void)? = nil,
        onCancel: @escaping () -> Void = {},
        @ViewBuilder extra: @escaping () -> Extra,
        onConfirm: @escaping () async throws -> Void
    ) -> some View {
        modifier(ConfirmDialogPresenter(isPresented: isPresented, dialog: { dismiss in
            BrandConfirmDialog(
                title: title, description: description, confirmLabel: confirmLabel, cancelLabel: cancelLabel,
                pendingLabel: pendingLabel, closeLabel: closeLabel, destructive: destructive,
                secondaryActionLabel: secondaryActionLabel, onSecondaryAction: onSecondaryAction,
                confirmPhrase: confirmPhrase, onConfirm: onConfirm,
                onCancel: { onCancel(); dismiss() }, onConfirmError: onConfirmError, onDismiss: dismiss, extra: extra
            )
        }, closeOnScrimTap: true))
    }

    /// Una confirmación sin contenido extra.
    public func brandConfirmDialog(
        isPresented: Binding<Bool>,
        title: LocalizedStringKey,
        description: LocalizedStringKey? = nil,
        confirmLabel: LocalizedStringKey,
        cancelLabel: LocalizedStringKey = "Cancelar",
        pendingLabel: LocalizedStringKey = "Confirmando…",
        closeLabel: LocalizedStringKey = "Cerrar",
        destructive: Bool = false,
        secondaryActionLabel: LocalizedStringKey? = nil,
        onSecondaryAction: (() -> Void)? = nil,
        confirmPhrase: BrandConfirmDialog<EmptyView>.Phrase? = nil,
        onConfirmError: ((Error) -> Void)? = nil,
        onCancel: @escaping () -> Void = {},
        onConfirm: @escaping () async throws -> Void
    ) -> some View {
        brandConfirmDialog(
            isPresented: isPresented, title: title, description: description, confirmLabel: confirmLabel,
            cancelLabel: cancelLabel, pendingLabel: pendingLabel, closeLabel: closeLabel, destructive: destructive,
            secondaryActionLabel: secondaryActionLabel, onSecondaryAction: onSecondaryAction,
            confirmPhrase: confirmPhrase, onConfirmError: onConfirmError, onCancel: onCancel,
            extra: { EmptyView() }, onConfirm: onConfirm
        )
    }
}

#Preview("ConfirmDialog") {
    VStack(spacing: BrandSpacing.s6) {
        BrandConfirmDialog(
            title: "¿Eliminar la vivienda?", description: "Se borrarán sus documentos. No se puede deshacer.",
            confirmLabel: "Eliminar la vivienda", destructive: true, onConfirm: {}, onCancel: {}
        )
        BrandConfirmDialog(
            title: "¿Guardar los cambios?", confirmLabel: "Guardar",
            secondaryActionLabel: "Guardar como copia", onSecondaryAction: {}, onConfirm: {}, onCancel: {}
        )
    }
    .padding()
}
