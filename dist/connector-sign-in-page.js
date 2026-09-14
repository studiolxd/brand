'use client';
import { Button as e } from "./button.js";
import { Form as t } from "./form.js";
import { ConnectorAuthShell as n } from "./connector-auth-shell.js";
import { t as r } from "./_shared/untrustedtext.js";
import { ConnectorRequestSummary as i } from "./connector-request-summary.js";
import { Fragment as a, jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/templates/ConnectorAuth/ConnectorSignInPage.tsx
function c({ clientName: c, productName: l, scope: u, redirectHost: d, signInHref: f, onSignIn: p, action: m, hiddenFields: h, title: g = "Inicia sesión para continuar", intro: _ = ({ client: e, product: t }) => /* @__PURE__ */ s(a, { children: [
	e,
	" quiere conectarse a ",
	t,
	". Identifícate para decidir si le das acceso."
] }), fallbackProductName: v = "este producto", signInLabel: y = "Iniciar sesión", scopeReadLabel: b, scopeWriteLabel: x, expandLabel: S, collapseLabel: C, valueQuotes: w, summaryLabels: T, links: E, header: D, footer: O, preferences: k, preferencesLabel: A, id: j, shell: M }) {
	let N = m !== void 0, P = f === void 0 ? /* @__PURE__ */ o(e, {
		type: N ? "submit" : "button",
		onClick: p,
		children: y
	}) : /* @__PURE__ */ o(e, {
		href: f,
		children: y
	});
	return /* @__PURE__ */ o(n, {
		title: g,
		description: _({
			client: /* @__PURE__ */ o("strong", { children: /* @__PURE__ */ o(r, {
				value: c,
				quotes: w
			}) }),
			product: l ?? v
		}),
		header: D,
		footer: O,
		preferences: k,
		preferencesLabel: A,
		id: j,
		shell: M,
		children: /* @__PURE__ */ s(t, {
			size: "lg",
			blockActions: !0,
			method: N ? "post" : void 0,
			action: m,
			links: E,
			actions: P,
			children: [h && Object.entries(h).map(([e, t]) => /* @__PURE__ */ o("input", {
				type: "hidden",
				name: e,
				value: t
			}, e)), /* @__PURE__ */ o(i, {
				clientName: c,
				productName: l,
				scope: u,
				redirectHost: d,
				scopeReadLabel: b,
				scopeWriteLabel: x,
				expandLabel: S,
				collapseLabel: C,
				valueQuotes: w,
				...T
			})]
		})
	});
}
//#endregion
export { c as ConnectorSignInPage };
