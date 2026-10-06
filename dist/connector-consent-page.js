'use client';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Button as t } from "./button.js";
import { Paragraph as n } from "./paragraph.js";
import { Form as r } from "./form.js";
import { ConnectorAuthShell as i } from "./connector-auth-shell.js";
import { t as a } from "./_shared/untrustedtext.js";
import { ConnectorRequestSummary as o } from "./connector-request-summary.js";
import { Fragment as s, jsx as c, jsxs as l } from "react/jsx-runtime";
//#region src/stories/templates/ConnectorAuth/ConnectorConsentPage.tsx
function u({ clientName: u, productName: d, accountEmail: f, scope: p = "read", redirectHost: m, action: h, hiddenFields: g, decisionName: _ = "decision", approveValue: v = "approve", denyValue: y = "deny", onApprove: b, onDeny: x, denyHref: S, initialFocus: C = "none", title: w, intro: T, redirectNotice: E, approveLabel: D, denyLabel: O, scopeReadLabel: k, scopeWriteLabel: A, expandLabel: j, collapseLabel: M, valueQuotes: N, summaryLabels: P, links: F, header: I, footer: L, preferences: R, preferencesLabel: z, id: B, shell: V, className: H }) {
	let U = e("connectorConsent"), W = h !== void 0, G = p === "read" ? k : A, K = (e) => /* @__PURE__ */ c(a, {
		value: e,
		quotes: N
	}), q = S === void 0 ? /* @__PURE__ */ c(t, {
		variant: "outline",
		type: W ? "submit" : "button",
		name: W ? _ : void 0,
		value: W ? y : void 0,
		onClick: x,
		autoFocus: C === "deny",
		children: U("deny", O)
	}) : /* @__PURE__ */ c(t, {
		variant: "outline",
		href: S,
		children: U("deny", O)
	}), J = /* @__PURE__ */ c(t, {
		type: W ? "submit" : "button",
		name: W ? _ : void 0,
		value: W ? v : void 0,
		onClick: b,
		children: D
	});
	return /* @__PURE__ */ c(i, {
		title: w ?? U("title"),
		description: T({
			client: /* @__PURE__ */ c("strong", { children: K(u) }),
			what: G,
			email: /* @__PURE__ */ c("strong", { children: K(f) })
		}),
		header: I,
		footer: L,
		preferences: R,
		preferencesLabel: z,
		id: B,
		shell: V,
		className: H,
		children: /* @__PURE__ */ l(r, {
			size: "lg",
			blockActions: !0,
			method: typeof h == "string" ? "post" : void 0,
			action: h,
			links: F,
			actions: /* @__PURE__ */ l(s, { children: [q, J] }),
			children: [
				g && Object.entries(g).map(([e, t]) => /* @__PURE__ */ c("input", {
					type: "hidden",
					name: e,
					value: t
				}, e)),
				/* @__PURE__ */ c(o, {
					clientName: u,
					productName: d,
					accountEmail: f,
					scope: p,
					redirectHost: m,
					scopeReadLabel: k,
					scopeWriteLabel: A,
					expandLabel: j,
					collapseLabel: M,
					valueQuotes: N,
					...P
				}),
				/* @__PURE__ */ c(n, { children: E({ host: /* @__PURE__ */ c("strong", { children: K(m) }) }) })
			]
		})
	});
}
//#endregion
export { u as ConnectorConsentPage };
