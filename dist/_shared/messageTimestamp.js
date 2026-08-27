//#region src/stories/molecules/_shared/messageTimestamp.ts
var e = {
	hour: "2-digit",
	minute: "2-digit"
};
function t(t, n = "es-ES", r = e) {
	if (t == null) return null;
	let i = t instanceof Date ? t : new Date(t);
	return Number.isNaN(i.getTime()) ? null : {
		dateTime: i.toISOString(),
		label: new Intl.DateTimeFormat(n, r).format(i)
	};
}
//#endregion
export { t };
