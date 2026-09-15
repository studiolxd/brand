//#region src/stories/atoms/FileUpload/validate.ts
var e = "es-ES";
function t(t, n = e) {
	let [r, i, a] = t < 1024 ? [
		t,
		"byte",
		0
	] : t < 1024 * 1024 ? [
		t / 1024,
		"kilobyte",
		1
	] : [
		t / (1024 * 1024),
		"megabyte",
		1
	];
	return new Intl.NumberFormat(n, {
		style: "unit",
		unit: i,
		unitDisplay: "short",
		minimumFractionDigits: a,
		maximumFractionDigits: a
	}).format(r);
}
function n(t, n = e) {
	return new Intl.ListFormat(n, {
		style: "long",
		type: "disjunction"
	}).format(t);
}
function r(n, r, i, a, o, s = e) {
	return i !== void 0 && n.size > i ? a(t(i, s)) : r && !r.split(",").map((e) => e.trim()).some((e) => e.startsWith(".") ? n.name.toLowerCase().endsWith(e.toLowerCase()) : e.endsWith("/*") ? n.type.startsWith(e.slice(0, -2)) : n.type === e) ? o : null;
}
//#endregion
export { r as i, t as n, n as r, e as t };
