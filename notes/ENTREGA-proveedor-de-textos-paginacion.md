# Entrega — el proveedor de textos, probado en `Pagination`

Rama `paginacion-proveedor`. **Sin release**: no se ha tocado
`package.json`, `CHANGELOG.md` ni `dist/` (sigue correspondiendo a v39.0.0).
Quien publique corre `pnpm release:check` —que regenera `dist/`— antes del tag.

Verde: `npx tsc -b`, `pnpm lint`, `pnpm test` (79 ficheros, 603 tests),
`pnpm test:stories` (179 ficheros, 1.535 tests, Chromium).

Es **una rebanada vertical** de la campaña del inventario
(`/Users/suvi/Dev/slxd/notes/INVENTARIO-textos-ds-2026-09-15.md`): el mecanismo
entero, aplicado a un solo componente y llevado hasta el final —incluido quitarle
sus defaults castellano—, para ver si el patrón aguanta antes de comprometer los
otros 110.

## El mecanismo

- `src/messages/BrandMessages.ts` — el contrato, **anidado por componente**
  (`{ pagination: PaginationMessages }`), con todas las claves obligatorias. El
  tipo **nace en el DS**; el catálogo de la app lo satisface.
- `src/messages/BrandMessagesContext.ts` — el contexto y `useBrandMessages`.
- `src/messages/BrandMessagesProvider.tsx` — el proveedor, montado una vez en la
  raíz de la app.
- `src/messages/index.ts` — el punto de entrada (`messages`).
- `PaginationMessages` vive **junto al componente**, como `RecoveryCodesLabels`;
  `BrandMessages` solo ensambla los espacios.

Orden de resolución: **prop → proveedor → error**. Sin cuarto escalón. El error se
lanza donde el texto se pinta, así que un paginador sin selector de registros no
exige el texto del selector.

## Pendientes que NO se han tocado (son de quien publica)

### 1. La entrada de `package.json#exports` — **bloqueante**

El módulo está registrado en `scripts/entry-points.mjs` y en `src/index.ts`, pero
`package.json` no se toca por encargo. Sin esta entrada, `dist/messages.js` se
compila pero **ningún consumidor puede importarlo** (el paquete no tiene export
raíz: todo va por subpath). Añadir, en orden alfabético:

```json
"./messages": {
  "types": "./dist/_types/messages/index.d.ts",
  "import": "./dist/messages.js"
},
```

### 2. Una clave nueva en `@slxd/messages`: `pagination.allOption`

La lista por defecto del selector de registros terminaba en un `Todos` cableado.
Ahora esa palabra sale del catálogo (`pagination.allOption`); las cifras siguen
sin traducirse. El espacio `pagination` de `es.json` tiene ya las otras siete
claves (`label`, `pagesGroup`, `previous`, `next`, `goToPage`, `perPage`,
`total`), así que es la única que hay que escribir en los seis idiomas.

### 3. Versionado

Es **breaking** (major): `Pagination` sin proveedor y sin props de texto lanza.
Ver «Qué les toca a los consumidores» en el mensaje de entrega.
