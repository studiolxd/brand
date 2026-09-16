'use client';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Button as t } from "./button.js";
import { Form as n } from "./form.js";
import { ConnectorAuthShell as r } from "./connector-auth-shell.js";
import { t as i } from "./_shared/untrustedtext.js";
import { ConnectorRequestSummary as a } from "./connector-request-summary.js";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/templates/ConnectorAuth/ConnectorSignInPage.tsx
function c({ clientName: c, productName: l, scope: u, redirectHost: d, signInHref: f, onSignIn: p, action: m, hiddenFields: h, title: g, intro: _, fallbackProductName: v, signInLabel: y, scopeReadLabel: b, scopeWriteLabel: x, expandLabel: S, collapseLabel: C, valueQuotes: w, summaryLabels: T, links: E, header: D, footer: O, preferences: k, preferencesLabel: A, id: j, shell: M }) {
	let N = e("connectorSignIn"), P = m !== void 0, F = f === void 0 ? /* @__PURE__ */ o(t, {
		type: P ? "submit" : "button",
		onClick: p,
		children: N("signIn", y)
	}) : /* @__PURE__ */ o(t, {
		href: f,
		children: N("signIn", y)
	});
	return /* @__PURE__ */ o(r, {
		title: g ?? N("title"),
		description: _({
			client: /* @__PURE__ */ o("strong", { children: /* @__PURE__ */ o(i, {
				value: c,
				quotes: w
			}) }),
			product: l ?? v ?? N("fallbackProduct")
		}),
		header: D,
		footer: O,
		preferences: k,
		preferencesLabel: A,
		id: j,
		shell: M,
		children: /* @__PURE__ */ s(n, {
			size: "lg",
			blockActions: !0,
			method: P ? "post" : void 0,
			action: m,
			links: E,
			actions: F,
			children: [h && Object.entries(h).map(([e, t]) => /* @__PURE__ */ o("input", {
				type: "hidden",
				name: e,
				value: t
			}, e)), /* @__PURE__ */ o(a, {
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
