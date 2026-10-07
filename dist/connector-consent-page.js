'use client';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Button as t } from "./button.js";
import { Paragraph as n } from "./paragraph.js";
import { Form as r } from "./form.js";
import { ConnectorAuthShell as i } from "./connector-auth-shell.js";
import { t as a } from "./_shared/untrustedtext.js";
import { t as o } from "./_shared/connectorrequestsummary.js";
import { Fragment as s, jsx as c, jsxs as l } from "react/jsx-runtime";
//#region src/stories/messages/es/connectorConsent.ts
var u = {
	title: "Conectar una herramienta",
	deny: "Denegar"
};
//#endregion
//#region src/stories/templates/ConnectorAuth/ConnectorConsentPage.tsx
function d({ clientName: d, productName: f, accountEmail: p, scope: m = "read", redirectHost: h, action: g, hiddenFields: _, decisionName: v = "decision", approveValue: y = "approve", denyValue: b = "deny", onApprove: x, onDeny: S, denyHref: C, initialFocus: w = "none", title: T, intro: E, redirectNotice: D, approveLabel: O, denyLabel: k, scopeReadLabel: A, scopeWriteLabel: j, expandLabel: M, collapseLabel: N, valueQuotes: P, summaryLabels: F, links: I, header: L, footer: R, preferences: z, preferencesLabel: B, id: V, shell: H, className: U }) {
	let W = e("connectorConsent", u), G = g !== void 0, K = m === "read" ? A : j, q = (e) => /* @__PURE__ */ c(a, {
		value: e,
		quotes: P
	}), J = C === void 0 ? /* @__PURE__ */ c(t, {
		variant: "outline",
		type: G ? "submit" : "button",
		name: G ? v : void 0,
		value: G ? b : void 0,
		onClick: S,
		autoFocus: w === "deny",
		children: W("deny", k)
	}) : /* @__PURE__ */ c(t, {
		variant: "outline",
		href: C,
		children: W("deny", k)
	}), Y = /* @__PURE__ */ c(t, {
		type: G ? "submit" : "button",
		name: G ? v : void 0,
		value: G ? y : void 0,
		onClick: x,
		children: O
	});
	return /* @__PURE__ */ c(i, {
		title: T ?? W("title"),
		description: E({
			client: /* @__PURE__ */ c("strong", { children: q(d) }),
			what: K,
			email: /* @__PURE__ */ c("strong", { children: q(p) })
		}),
		header: L,
		footer: R,
		preferences: z,
		preferencesLabel: B,
		id: V,
		shell: H,
		className: U,
		children: /* @__PURE__ */ l(r, {
			size: "lg",
			blockActions: !0,
			method: typeof g == "string" ? "post" : void 0,
			action: g,
			links: I,
			actions: /* @__PURE__ */ l(s, { children: [J, Y] }),
			children: [
				_ && Object.entries(_).map(([e, t]) => /* @__PURE__ */ c("input", {
					type: "hidden",
					name: e,
					value: t
				}, e)),
				/* @__PURE__ */ c(o, {
					clientName: d,
					productName: f,
					accountEmail: p,
					scope: m,
					redirectHost: h,
					scopeReadLabel: A,
					scopeWriteLabel: j,
					expandLabel: M,
					collapseLabel: N,
					valueQuotes: P,
					...F
				}),
				/* @__PURE__ */ c(n, { children: D({ host: /* @__PURE__ */ c("strong", { children: q(h) }) }) })
			]
		})
	});
}
//#endregion
export { d as ConnectorConsentPage };
