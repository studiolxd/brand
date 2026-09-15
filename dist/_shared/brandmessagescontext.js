import { createContext as e, useContext as t } from "react";
//#region src/stories/messages/BrandMessagesContext.ts
var n = e(null);
function r(e) {
	let r = t(n);
	return function(t, n) {
		if (n !== void 0) return n;
		if (!r) throw Error(`@studiolxd/brand: falta el texto «${String(e)}.${String(t)}» y no hay catálogo montado. Monta <BrandMessagesProvider> en la raíz de la aplicación con los textos del idioma vigente, o pasa la prop suelta en este uso concreto.`);
		let i = r[e]?.[t];
		if (i === void 0) throw Error(`@studiolxd/brand: el catálogo montado no trae «${String(e)}.${String(t)}».`);
		return i;
	};
}
//#endregion
export { r as n, n as t };
