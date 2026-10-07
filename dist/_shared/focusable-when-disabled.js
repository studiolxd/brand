//#region src/stories/constants/focusable-when-disabled.ts
var e = Symbol.for("@studiolxd/brand:focusableWhenDisabled");
function t(t) {
	return t[e] = !0, t;
}
function n(t) {
	return (typeof t == "object" || typeof t == "function") && t !== null && t[e] === !0;
}
//#endregion
export { n, t };
