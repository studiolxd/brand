import { t as e } from "./env.js";
import { createContext as t, useContext as n } from "react";
//#region src/stories/messages/BrandMessagesContext.ts
var r = t(null), i = /* @__PURE__ */ new Set();
function a(t) {
	i.has(t) || !e() || (i.add(t), console.warn(`@studiolxd/brand: falta «${t}» en el catálogo; sale en castellano.`));
}
function o(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function s(e, t, n) {
	if (!o(e) || !o(t)) return e;
	let r = { ...t };
	for (let i of Object.keys(t)) {
		let o = e[i];
		o == null ? a(`${n}.${i}`) : r[i] = s(o, t[i], `${n}.${i}`);
	}
	return r;
}
function c(e, t) {
	let i = n(r);
	return function(n, r) {
		if (r != null) return r;
		let o = `${String(e)}.${String(n)}`, c = i?.[e]?.[n], l = t?.[n];
		if (c != null) return s(c, l, o);
		if (l !== void 0) return a(o), l;
		throw Error(`@studiolxd/brand: falta el texto «${o}», no hay catálogo que lo traiga y este lector no tiene castellano de respaldo. Pasa el espacio de respaldo como segundo argumento de useBrandMessages, monta <BrandMessagesProvider> con el texto o pasa la prop.`);
	};
}
//#endregion
export { c as n, r as t };
