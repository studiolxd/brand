//#region src/stories/constants/env.ts
function e() {
	try {
		return process.env.NODE_ENV !== "production";
	} catch {
		return !1;
	}
}
//#endregion
export { e as t };
