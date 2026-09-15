'use client';

import { createContext, useContext } from 'react';

/**
 * El nodo donde montan su portal los componentes que abren una capa flotante
 * —la lista de un `Select`, el calendario de un `DatePicker`, el panel de un
 * `Popover`, el velo de un `Modal`— cuando no se les pasa `container`.
 *
 * **Por qué hace falta.** Un portal monta en `document.body`, que no es
 * descendiente de `.site-shell`. El tema oscuro sobrevive a eso porque se
 * activa en `<html>` y cascadea a todo el documento; la **superficie de
 * lectura** no: `.site-shell` remapea los tokens de texto y pone los controles
 * en talla `lg` (v45.1.0) desde una clase que está a media altura del árbol.
 * Resultado antes de esto: el campo se pintaba a 48px/20 y su lista se abría a
 * 40px/16, fuera del shell.
 *
 * **Cómo se arregla.** `SiteShell` publica su nodo raíz por este contexto y
 * todo componente con portal lo toma como destino por defecto. No hay nada que
 * pasar en cada uso: el árbol de React ya sabe dónde está el shell aunque el
 * árbol del DOM no lo sepa. El valor se guarda en **estado**, no en una ref —
 * el destino tiene que existir en el render en el que el portal se monta, y
 * una ref no provoca repintado al rellenarse. Es el patrón que `ChatShell` ya
 * usaba para el `container` de su cajón.
 *
 * La prop `container` sigue existiendo y **gana siempre**: es la salida para
 * quien quiera otro destino (el ancla de `FloatingDock`, un `.surface-dark`
 * anidado).
 *
 * `AppShell` **no** lo provee, y es deliberado: la superficie de aplicación es
 * la del `:root`, así que `document.body` ya resuelve los mismos valores y
 * meter los portales dentro de `.app-shell` —que es `overflow: clip` y de
 * altura fija— solo añadiría riesgo de recorte sin arreglar nada. El día que
 * la superficie de aplicación cambie de talla, el arreglo es una línea: montar
 * este mismo proveedor en `AppShell`.
 */
export const PortalContainerContext = createContext<HTMLElement | null>(null);

/**
 * Resuelve el destino del portal: la prop si el consumidor la pasa, y si no,
 * el nodo de la superficie que venga por contexto.
 *
 * Se llama **siempre**, con o sin prop —es un hook—, y devuelve `undefined`
 * cuando no hay ni una cosa ni la otra, que es lo que Base UI entiende por
 * «monta en `document.body`».
 */
export function usePortalContainer<T>(container: T): T | HTMLElement | undefined {
  const inherited = useContext(PortalContainerContext);
  if (container !== undefined) return container;
  return inherited ?? undefined;
}
