import { t as e } from "./env.js";
//#region src/stories/molecules/_shared/messageTimestamp.ts
var t = {
	hour: "2-digit",
	minute: "2-digit"
};
function n(n, r = "es-ES", i = t) {
	if (n == null) return null;
	let a = n instanceof Date ? n : new Date(n);
	return Number.isNaN(a.getTime()) ? (e() && console.warn(`[UserMessage/AssistantMessage] \`timestamp\` no es interpretable: ${JSON.stringify(n)}. Se espera un \`Date\` o una cadena ISO 8601 (ej. "2026-08-27T14:32:00Z"), no una hora ya formateada. No se pinta ninguna marca de tiempo.`), null) : {
		dateTime: a.toISOString(),
		label: new Intl.DateTimeFormat(r, i).format(a)
	};
}
//#endregion
export { n as t };
