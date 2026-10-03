#!/bin/sh
# Guarda una pareja React/SwiftUI en native/apple/Comparisons/<Componente>/ a la MISMA escala.
#
#   native/apple/scripts/pair-comparison.sh <ios.png> <react.png> <carpeta> <caso> <claro|oscuro>
#
# Las dos imágenes han de venir a @2x y SIN reducir (la captura iOS de swift-snapshot-testing, tal cual, y la de
# `capture-story.mjs`, que ya sale a @2x). Si la más ancha pasa de 640 px, las dos se reducen por el MISMO factor:
# así un tamaño de letra o un margen miden lo mismo en las dos y las diferencias que se ven son reales.
set -eu
ios=$1; react=$2; dir=$3; name=$4; scheme=$5
w_ios=$(magick identify -format %w "$ios"); w_react=$(magick identify -format %w "$react")
wide=$(( w_ios > w_react ? w_ios : w_react ))
pct=100
if [ "$wide" -gt 640 ]; then pct=$(( 64000 / wide )); fi
mkdir -p "$dir"
for pair in "$react:react" "$ios:ios"; do
  src=${pair%%:*}; kind=${pair##*:}
  magick "$src" -resize "${pct}%" -strip -define png:compression-level=9 "$dir/$name.$kind.$scheme.png"
done
echo "✔ $dir/$name.{react,ios}.$scheme.png (${pct}%)"
