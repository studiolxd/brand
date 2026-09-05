//#region src/stories/atoms/FileUpload/validate.ts
function e(e) {
	return e < 1024 ? `${e} B` : e < 1024 * 1024 ? `${(e / 1024).toFixed(1)} KB` : `${(e / (1024 * 1024)).toFixed(1)} MB`;
}
function t(t, n, r, i, a) {
	return r !== void 0 && t.size > r ? i(e(r)) : n && !n.split(",").map((e) => e.trim()).some((e) => e.startsWith(".") ? t.name.toLowerCase().endsWith(e.toLowerCase()) : e.endsWith("/*") ? t.type.startsWith(e.slice(0, -2)) : t.type === e) ? a : null;
}
//#endregion
export { t as n, e as t };
