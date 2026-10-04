import { useCallback as e, useSyncExternalStore as t } from "react";
//#region src/stories/constants/media-query.ts
var n = () => null;
function r(r) {
	return t(e((e) => {
		if (typeof window.matchMedia != "function") return () => {};
		let t = window.matchMedia(r);
		return t.addEventListener("change", e), () => t.removeEventListener("change", e);
	}, [r]), () => typeof window.matchMedia == "function" ? window.matchMedia(r).matches : null, n);
}
//#endregion
export { r as t };
