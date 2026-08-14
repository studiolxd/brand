# Changelog

Este fichero arranca en `v13.5.0`. El histórico anterior vive en los mensajes de commit
de cada tag (`git log --tags`).

El paquete sigue [semver](https://semver.org/lang/es/): **patch** para bug fixes y
regeneración de `dist`, **minor** para componentes/props/variantes/tokens nuevos, **major**
para breaking changes.

## v13.5.0

### Añadido

- **Pagination — etiquetas accesibles configurables.** Todos los textos que el componente
  emitía cableados en castellano son ahora props opcionales, con el texto actual como valor
  por defecto:

  | Prop | Default | Dónde aparece |
  | --- | --- | --- |
  | `pageLabel?: (page: number) => string` | `` `Página ${page}` `` | `aria-label` de cada botón/enlace de página |
  | `previousLabel?: string` | `"Página anterior"` | `aria-label` del control anterior |
  | `nextLabel?: string` | `"Página siguiente"` | `aria-label` del control siguiente |
  | `pagesGroupLabel?: string` | `"Páginas"` | `aria-label` del `role="group"` de los controles |
  | `pageSizeLabel?: string` | `"Registros por página"` | `aria-label` del `Select` de registros por página |
  | `totalLabel?: (total: number) => string` | `` `${total} resultados` `` | texto del sumario de `showTotal` |

  `ariaLabel` (el `aria-label` del `<nav>`) ya era configurable y no cambia.

  Motivación: un consumidor multiidioma que delegaba en este componente perdía sus
  traducciones y anunciaba "Página 3" a un lector de pantalla en inglés o alemán. Ahora
  puede inyectar sus textos traducidos. Sin pasar ninguna prop el marcado es idéntico al
  de `v13.4.1`, así que el cambio es retrocompatible.

  Documentado en el JSDoc de `PaginationProps` y en la sección "Internacionalización de las
  etiquetas" de `Pagination.mdx`. Cubierto por dos stories de test: una verifica los textos
  por defecto, otra que las props pasadas ganan.
