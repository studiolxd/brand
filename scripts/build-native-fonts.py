#!/usr/bin/env python3
"""Genera las fuentes de las librerías nativas (SwiftUI y Compose) desde los woff2 de la web.

Los woff2 de `src/assets/fonts/` son fuentes VARIABLES; aquí se descomprimen a TTF (iOS,
macOS y Android no leen woff2) sin tocar sus tablas: el mismo diseño, con los mismos ejes
(`wght` y, en la sans, `opsz`), que la web. Un solo fichero por estilo cubre todos los pesos.

Solo la cara `latin`: es la que cubre español, inglés, portugués, francés, italiano y alemán.
La `latin-ext` (polaco, checo, turco…) no se incluye: sus glifos caen a la fuente del sistema.

Salidas (todo generado: no se edita a mano):
  native/apple/Sources/StudiolxdBrand/Resources/Fonts/<nombre>.ttf  + <familia>.LICENSE.txt
  native/android/brand/src/main/res/font/<nombre_con_guiones_bajos>.ttf
  native/android/brand/src/main/assets/licenses/fonts/<familia>.LICENSE.txt

Android exige nombres de recurso en minúsculas y con `_`, y no admite ficheros que no sean
fuentes en `res/font`: de ahí que las licencias (SIL OFL 1.1) vayan en `assets/`.

Uso: pnpm build:native-fonts   (requiere `pip3 install fonttools brotli`)
"""

import shutil
import sys
from pathlib import Path

try:
    from fontTools.ttLib import TTFont
    import brotli  # noqa: F401  (fontTools lo necesita para leer woff2)
except ImportError as error:
    sys.exit(f"Falta una dependencia de Python ({error.name}). Instala: pip3 install fonttools brotli")

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src/assets/fonts"
APPLE = ROOT / "native/apple/Sources/StudiolxdBrand/Resources/Fonts"
ANDROID_FONT = ROOT / "native/android/brand/src/main/res/font"
ANDROID_LICENSES = ROOT / "native/android/brand/src/main/assets/licenses/fonts"

# (carpeta de origen, fichero woff2, nombre de salida sin extensión)
FONTS = [
    ("google-sans-flex", "google-sans-flex-normal-latin.woff2", "google-sans-flex"),
    ("google-sans-code", "google-sans-code-normal-latin.woff2", "google-sans-code"),
    ("google-sans-code", "google-sans-code-italic-latin.woff2", "google-sans-code-italic"),
    ("libre-bodoni", "libre-bodoni-normal-latin.woff2", "libre-bodoni"),
    ("libre-bodoni", "libre-bodoni-italic-latin.woff2", "libre-bodoni-italic"),
]


def reset(directory: Path) -> None:
    shutil.rmtree(directory, ignore_errors=True)
    directory.mkdir(parents=True)


def main() -> None:
    for directory in (APPLE, ANDROID_FONT, ANDROID_LICENSES):
        reset(directory)

    for family_dir, woff2, name in FONTS:
        font = TTFont(SRC / family_dir / woff2)
        font.flavor = None  # TTF sin envoltorio woff2
        font.save(APPLE / f"{name}.ttf")
        font.save(ANDROID_FONT / f"{name.replace('-', '_')}.ttf")
        axes = ", ".join(f"{a.axisTag} {a.minValue:g}–{a.maxValue:g}" for a in font["fvar"].axes)
        print(f"✔︎ {name}.ttf  ({axes})")

    for family_dir in sorted({f[0] for f in FONTS}):
        license_text = (SRC / family_dir / "LICENSE.txt").read_text()
        (APPLE / f"{family_dir}.LICENSE.txt").write_text(license_text)
        (ANDROID_LICENSES / f"{family_dir}.LICENSE.txt").write_text(license_text)
    print("✔︎ licencias (SIL OFL 1.1)")


if __name__ == "__main__":
    main()
