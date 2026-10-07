import { t as e } from "./env.js";
import { createContext as t, useContext as n } from "react";
//#region src/stories/messages/BrandMessagesContext.ts
var r = t(null), i = t(!1), a = /* @__PURE__ */ new Set();
function o(t, n) {
	n || a.has(t) || !e() || (a.add(t), console.warn(`@studiolxd/brand: falta «${t}» en el catálogo; sale en castellano.`));
}
function s(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function c(e, t, n, r) {
	if (!s(e) || !s(t)) return e;
	let i = { ...t };
	for (let a of Object.keys(t)) {
		let s = e[a];
		s == null ? o(`${n}.${a}`, r) : i[a] = c(s, t[a], `${n}.${a}`, r);
	}
	return i;
}
function l(e, t) {
	let a = n(r), s = n(i);
	return function(n, r) {
		if (r != null) return r;
		let i = `${String(e)}.${String(n)}`, l = a?.[e]?.[n], u = t?.[n];
		if (l != null) return c(l, u, i, s);
		if (u !== void 0) return o(i, s), u;
		throw Error(`@studiolxd/brand: falta el texto «${i}», no hay catálogo que lo traiga y este lector no tiene castellano de respaldo. Pasa el espacio de respaldo como segundo argumento de useBrandMessages, monta <BrandMessagesProvider> con el texto o pasa la prop.`);
	};
}
//#endregion
export { i as n, l as r, r as t };
