import { createContext as e, useContext as t } from "react";
//#region src/stories/messages/BrandMessagesContext.ts
var n = e(null);
function r() {
	try {
		return process.env.NODE_ENV !== "production";
	} catch {
		return !1;
	}
}
var i = /* @__PURE__ */ new Set();
function a(e) {
	i.has(e) || !r() || (i.add(e), console.warn(`@studiolxd/brand: falta «${e}» en el catálogo; sale en castellano.`));
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
function c(e, r) {
	let i = t(n);
	return function(t, n) {
		if (n != null) return n;
		let o = `${String(e)}.${String(t)}`, c = i?.[e]?.[t], l = r?.[t];
		if (c != null) return s(c, l, o);
		if (l !== void 0) return a(o), l;
		throw Error(`@studiolxd/brand: falta el texto «${o}», no hay catálogo que lo traiga y este lector no tiene castellano de respaldo. Pasa el espacio de respaldo como segundo argumento de useBrandMessages, monta <BrandMessagesProvider> con el texto o pasa la prop.`);
	};
}
//#endregion
export { c as n, n as t };
