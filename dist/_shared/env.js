//#region src/stories/constants/env.ts
function e() {
	try {
		return process.env.NODE_ENV !== "production";
	} catch {
		return !1;
	}
}
var t = /* @__PURE__ */ new Set();
function n(n, r) {
	!e() || t.has(n) || (t.add(n), console.warn(`@studiolxd/brand: ${r}`));
}
function r(e, t, r) {
	n(`deprecated:${e}:${t}`, `\`<${e} ${t}>\` está obsoleta; usa ${r}. Se retira en la v52.`);
}
//#endregion
export { r as n, e as t };
