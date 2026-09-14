'use client';
import { Button as e } from "./button.js";
import { Form as t } from "./form.js";
import { ConnectorAuthShell as n } from "./connector-auth-shell.js";
import { ConnectorRequestSummary as r } from "./connector-request-summary.js";
import { Fragment as i, jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/templates/ConnectorAuth/ConnectorSignInPage.tsx
function s({ clientName: s, productName: c, scope: l, redirectHost: u, signInHref: d, onSignIn: f, action: p, hiddenFields: m, title: h = "Inicia sesión para continuar", intro: g = ({ client: e, product: t }) => /* @__PURE__ */ o(i, { children: [
	e,
	" quiere conectarse a ",
	t,
	". Identifícate para decidir si le das acceso."
] }), fallbackProductName: _ = "este producto", signInLabel: v = "Iniciar sesión", scopeReadLabel: y, scopeWriteLabel: b, summaryLabels: x, links: S, header: C, footer: w, preferences: T, preferencesLabel: E, id: D, shell: O }) {
	let k = p !== void 0, A = d === void 0 ? /* @__PURE__ */ a(e, {
		type: k ? "submit" : "button",
		onClick: f,
		children: v
	}) : /* @__PURE__ */ a(e, {
		href: d,
		children: v
	});
	return /* @__PURE__ */ a(n, {
		title: h,
		description: g({
			client: /* @__PURE__ */ a("strong", { children: s }),
			product: c ?? _
		}),
		header: C,
		footer: w,
		preferences: T,
		preferencesLabel: E,
		id: D,
		shell: O,
		children: /* @__PURE__ */ o(t, {
			size: "lg",
			blockActions: !0,
			method: k ? "post" : void 0,
			action: p,
			links: S,
			actions: A,
			children: [m && Object.entries(m).map(([e, t]) => /* @__PURE__ */ a("input", {
				type: "hidden",
				name: e,
				value: t
			}, e)), /* @__PURE__ */ a(r, {
				clientName: s,
				productName: c,
				scope: l,
				redirectHost: u,
				scopeReadLabel: y,
				scopeWriteLabel: b,
				...x
			})]
		})
	});
}
//#endregion
export { s as ConnectorSignInPage };
