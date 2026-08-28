//#region src/stories/molecules/_shared/messageTimestamp.ts
var e = {
	hour: "2-digit",
	minute: "2-digit"
};
function t() {
	return globalThis.process?.env?.NODE_ENV !== "production";
}
function n(n, r = "es-ES", i = e) {
	if (n == null) return null;
	let a = n instanceof Date ? n : new Date(n);
	return Number.isNaN(a.getTime()) ? (t() && console.warn(`[UserMessage/AssistantMessage] \`timestamp\` no es interpretable: ${JSON.stringify(n)}. Se espera un \`Date\` o una cadena ISO 8601 (ej. "2026-08-27T14:32:00Z"), no una hora ya formateada. No se pinta ninguna marca de tiempo.`), null) : {
		dateTime: a.toISOString(),
		label: new Intl.DateTimeFormat(r, i).format(a)
	};
}
//#endregion
export { n as t };
