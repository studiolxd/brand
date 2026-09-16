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
function u({ clientName: u, productName: d, accountEmail: f, scope: p = "read", redirectHost: m, action: h, hiddenFields: g, decisionName: _ = "decision", approveValue: v = "approve", denyValue: y = "deny", onApprove: b, onDeny: x, denyHref: S, initialFocus: C = "none", title: w, intro: T, redirectNotice: E, approveLabel: D, denyLabel: O, scopeReadLabel: k, scopeWriteLabel: A, expandLabel: j, collapseLabel: M, valueQuotes: N, summaryLabels: P, links: F, header: I, footer: L, preferences: R, preferencesLabel: z, id: B, shell: V }) {
	let H = e("connectorConsent"), U = h !== void 0, W = p === "read" ? k : A, G = (e) => /* @__PURE__ */ c(a, {
		value: e,
		quotes: N
	}), K = S === void 0 ? /* @__PURE__ */ c(t, {
		variant: "outline",
		type: U ? "submit" : "button",
		name: U ? _ : void 0,
		value: U ? y : void 0,
		onClick: x,
		autoFocus: C === "deny",
		children: H("deny", O)
	}) : /* @__PURE__ */ c(t, {
		variant: "outline",
		href: S,
		children: H("deny", O)
	}), q = /* @__PURE__ */ c(t, {
		type: U ? "submit" : "button",
		name: U ? _ : void 0,
		value: U ? v : void 0,
		onClick: b,
		children: D
	});
	return /* @__PURE__ */ c(i, {
		title: w ?? H("title"),
		description: T({
			client: /* @__PURE__ */ c("strong", { children: G(u) }),
			what: W,
			email: /* @__PURE__ */ c("strong", { children: G(f) })
		}),
		header: I,
		footer: L,
		preferences: R,
		preferencesLabel: z,
		id: B,
		shell: V,
		children: /* @__PURE__ */ l(r, {
			size: "lg",
			blockActions: !0,
			method: typeof h == "string" ? "post" : void 0,
			action: h,
			links: F,
			actions: /* @__PURE__ */ l(s, { children: [K, q] }),
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
				/* @__PURE__ */ c(n, { children: E({ host: /* @__PURE__ */ c("strong", { children: G(m) }) }) })
			]
		})
	});
}
//#endregion
export { u as ConnectorConsentPage };
