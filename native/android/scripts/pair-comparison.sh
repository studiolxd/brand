#!/bin/sh
# Guarda una pareja React/Android en native/android/Comparisons/<Componente>/ a la MISMA escala que la de iOS.
#
#   native/android/scripts/pair-comparison.sh <captura-paparazzi.png> <react.png> <carpeta> <caso> <claro|oscuro> <ancho-dp> <alto-dp>
#
# - La captura de Paparazzi (PIXEL_5, 3 px por dp; si pasa de 1000 px Paparazzi la reduce) sale con la pantalla cuadrada o más
#   alta que el lienzo: aquí se recorta a `<ancho-dp> × <alto-dp>` (el lienzo de la pareja de iOS, ver
#   native/apple/Comparisons/) desde la esquina superior izquierda. Los píxeles por dp se sacan del propio PNG.
# - La imagen de React es la que ya está en native/apple/Comparisons/<Componente>/ (misma story, mismo lienzo, @2x y ya
#   reducida con la regla de iOS): se copia tal cual.
# - Android se pasa de @3x a @2x y se reduce por el mismo factor que reduce `native/apple/scripts/pair-comparison.sh` (≤ 640 px de
#   ancho del lienzo @2x): así un tamaño de letra o un margen miden lo mismo en las dos y las diferencias que se ven son reales.
set -eu
android=$1; react=$2; dir=$3; name=$4; scheme=$5; w=$6; h=$7
wide=$(( w * 2 ))
pct=100
if [ "$wide" -gt 640 ]; then pct=$(( 64000 / wide )); fi
target_w=$(( wide * pct / 100 ))
mkdir -p "$dir"
cp "$react" "$dir/$name.react.$scheme.png"
screen=$(( w > h ? w : h ))
img_w=$(magick identify -format %w "$android")
cw=$(( w * img_w / screen )); ch=$(( h * img_w / screen ))
magick "$android" -crop "${cw}x${ch}+0+0" +repage -resize "${target_w}x" -strip -define png:compression-level=9 "$dir/$name.android.$scheme.png"
echo "✔ $dir/$name.{react,android}.$scheme.png (${pct}%)"
