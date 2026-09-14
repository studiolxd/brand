'use client';
import { Button as e } from "./button.js";
import { Stack as t } from "./stack.js";
import { Code as n } from "./code.js";
import { Paragraph as r } from "./paragraph.js";
import { ConnectorAuthShell as i } from "./connector-auth-shell.js";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/templates/ConnectorAuth/ConnectorRejectionPage.tsx
var s = {
	"invalid-client": {
		title: "Esta herramienta no está registrada",
		description: "La aplicación que pide acceso no consta en este producto. No se ha concedido nada.",
		hint: "Vuelve a la herramienta y conéctala otra vez desde el principio. Si el error se repite, quien la mantiene tiene que registrarla de nuevo.",
		retryLabel: "Volver a la herramienta"
	},
	"invalid-redirect-uri": {
		title: "La dirección de retorno no está permitida",
		description: "La herramienta ha pedido que el acceso se envíe a una dirección distinta de la que tiene registrada. No se ha enviado nada a ninguna parte.",
		hint: "Es la comprobación que impide que un acceso legítimo acabe en manos de otro. Si la herramienta es tuya, revisa la dirección de retorno que tiene configurada; si no la reconoces, no vuelvas a intentarlo.",
		retryLabel: "Volver a la herramienta"
	},
	"invalid-request": {
		title: "La petición está incompleta",
		description: "Falta algo en lo que ha pedido la herramienta, o ha llegado alterado por el camino. No se ha concedido ningún acceso.",
		hint: "Vuelve a la herramienta y empieza la conexión de nuevo. Un enlace copiado a mano o reutilizado de otra vez suele acabar así.",
		retryLabel: "Volver a la herramienta"
	},
	"access-denied": {
		title: "No se ha dado acceso",
		description: "La conexión se ha cancelado. La herramienta no ha recibido ningún permiso sobre tus datos.",
		hint: "Puedes cerrar esta pantalla. Si ha sido sin querer, vuelve a la herramienta y pide la conexión otra vez.",
		retryLabel: "Volver a intentarlo"
	},
	"session-expired": {
		title: "La sesión ha caducado",
		description: "Ha pasado demasiado tiempo desde que se abrió esta pantalla, así que la decisión ya no vale.",
		hint: "Inicia sesión otra vez y repite la conexión desde la herramienta. Nada de lo anterior se ha concedido.",
		retryLabel: "Iniciar sesión"
	}
};
function c({ reason: c, title: l, description: u, hint: d, code: f, codeLabel: p = "Código", retryHref: m, onRetry: h, retryLabel: g, retryAction: _, aside: v, header: y, footer: b, preferences: x, preferencesLabel: S, id: C, shell: w }) {
	let T = s[c], E = g ?? T.retryLabel, D = _ ?? (m === void 0 ? h ? /* @__PURE__ */ a(e, {
		onClick: h,
		children: E
	}) : null : /* @__PURE__ */ a(e, {
		href: m,
		children: E
	}));
	return /* @__PURE__ */ a(i, {
		title: l ?? T.title,
		description: u ?? T.description,
		intro: f === void 0 ? void 0 : /* @__PURE__ */ o(r, {
			size: "small",
			children: [
				p,
				": ",
				/* @__PURE__ */ a(n, { children: f })
			]
		}),
		aside: v,
		header: y,
		footer: b,
		preferences: x,
		preferencesLabel: S,
		id: C,
		shell: w,
		children: /* @__PURE__ */ o(t, {
			align: "stretch",
			children: [/* @__PURE__ */ a(r, {
				size: "large",
				children: d ?? T.hint
			}), D]
		})
	});
}
//#endregion
export { c as ConnectorRejectionPage };
