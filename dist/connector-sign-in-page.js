'use client';
import { r as e } from "./_shared/brandmessagescontext.js";
import { Button as t } from "./button.js";
import { Form as n } from "./form.js";
import { ConnectorAuthShell as r } from "./connector-auth-shell.js";
import { t as i } from "./_shared/untrustedtext.js";
import { t as a } from "./_shared/connectorrequestsummary.js";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/messages/es/connectorSignIn.ts
var c = {
	title: "Inicia sesión para continuar",
	signIn: "Iniciar sesión",
	fallbackProduct: "este producto"
};
//#endregion
//#region src/stories/templates/ConnectorAuth/ConnectorSignInPage.tsx
function l({ clientName: l, productName: u, scope: d, redirectHost: f, signInHref: p, onSignIn: m, action: h, hiddenFields: g, title: _, intro: v, fallbackProductName: y, signInLabel: b, scopeReadLabel: x, scopeWriteLabel: S, expandLabel: C, collapseLabel: w, valueQuotes: T, summaryLabels: E, links: D, header: O, footer: k, preferences: A, preferencesLabel: j, id: M, shell: N, className: P }) {
	let F = e("connectorSignIn", c), I = h !== void 0, L = p === void 0 ? /* @__PURE__ */ o(t, {
		type: I ? "submit" : "button",
		onClick: m,
		children: F("signIn", b)
	}) : /* @__PURE__ */ o(t, {
		href: p,
		children: F("signIn", b)
	});
	return /* @__PURE__ */ o(r, {
		title: _ ?? F("title"),
		description: v({
			client: /* @__PURE__ */ o("strong", { children: /* @__PURE__ */ o(i, {
				value: l,
				quotes: T
			}) }),
			product: u ?? y ?? F("fallbackProduct")
		}),
		header: O,
		footer: k,
		preferences: A,
		preferencesLabel: j,
		id: M,
		shell: N,
		className: P,
		children: /* @__PURE__ */ s(n, {
			size: "lg",
			blockActions: !0,
			method: I ? "post" : void 0,
			action: h,
			links: D,
			actions: L,
			children: [g && Object.entries(g).map(([e, t]) => /* @__PURE__ */ o("input", {
				type: "hidden",
				name: e,
				value: t
			}, e)), /* @__PURE__ */ o(a, {
				clientName: l,
				productName: u,
				scope: d,
				redirectHost: f,
				scopeReadLabel: x,
				scopeWriteLabel: S,
				expandLabel: C,
				collapseLabel: w,
				valueQuotes: T,
				...E
			})]
		})
	});
}
//#endregion
export { l as ConnectorSignInPage };
