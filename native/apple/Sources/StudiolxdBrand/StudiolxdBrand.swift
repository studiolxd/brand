import CoreText
import Foundation

/// Punto de entrada de la librería: lo que no es un token ni un componente.
public enum StudiolxdBrand {
    /// Registra en el proceso las fuentes de la marca (Google Sans Flex, Google Sans Code y Libre Bodoni).
    ///
    /// Hay que llamarla una vez, al arrancar la app, antes de pintar texto con `Font.brand(_:)`. Es idempotente:
    /// llamarla más veces no hace nada. Devuelve `false` si alguna fuente no se pudo registrar.
    @discardableResult
    public static func registerFonts() -> Bool { fontRegistration }

    private static let fontRegistration: Bool = {
        guard let urls = Bundle.module.urls(forResourcesWithExtension: "ttf", subdirectory: "Fonts"), !urls.isEmpty else {
            return false
        }
        // Un fallo por «ya registrada» no lo es: la fuente está disponible igualmente.
        return urls.allSatisfy { url in
            var error: Unmanaged<CFError>?
            if CTFontManagerRegisterFontsForURL(url as CFURL, .process, &error) { return true }
            let code = error.map { CFErrorGetCode($0.takeRetainedValue()) }
            return code == CTFontManagerError.alreadyRegistered.rawValue
        }
    }()
}
