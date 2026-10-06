//#region src/stories/constants/assign-ref.ts
function e(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
//#endregion
export { e as t };
