import { useMemo as e } from "react";
//#region src/stories/constants/css-properties.ts
function t(t) {
	let n = JSON.stringify(t);
	return e(() => (e) => {
		if (!e) return;
		let t = Object.entries(JSON.parse(n));
		for (let [n, r] of t) r == null ? e.style.removeProperty(n) : e.style.setProperty(n, r);
	}, [n]);
}
//#endregion
export { t };
