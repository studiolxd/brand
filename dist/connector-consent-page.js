'use client';
import { Button as e } from "./button.js";
import { Paragraph as t } from "./paragraph.js";
import { Form as n } from "./form.js";
import { ConnectorAuthShell as r } from "./connector-auth-shell.js";
import { t as i } from "./_shared/untrustedtext.js";
import { ConnectorRequestSummary as a } from "./connector-request-summary.js";
import { Fragment as o, jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/stories/templates/ConnectorAuth/ConnectorConsentPage.tsx
function l({ clientName: l, productName: u, accountEmail: d, scope: f = "read", redirectHost: p, action: m, hiddenFields: h, decisionName: g = "decision", approveValue: _ = "approve", denyValue: v = "deny", onApprove: y, onDeny: b, denyHref: x, initialFocus: S = "none", title: C = "Conectar una herramienta", intro: w = ({ client: e, what: t, email: n }) => /* @__PURE__ */ c(o, { children: [
	e,
	" quiere ",
	t,
	" como ",
	n,
	"."
] }), redirectNotice: T = ({ host: e }) => /* @__PURE__ */ c(o, { children: [
	"El acceso se enviará a ",
	e,
	". Continúa solo si lo reconoces."
] }), approveLabel: E = "Permitir acceso", denyLabel: D = "Denegar", scopeReadLabel: O = "leer los datos de este producto", scopeWriteLabel: k = "leer y modificar los datos de este producto", expandLabel: A, collapseLabel: j, valueQuotes: M, summaryLabels: N, links: P, header: F, footer: I, preferences: L, preferencesLabel: R, id: z, shell: B }) {
	let V = m !== void 0, H = f === "read" ? O : k, U = (e) => /* @__PURE__ */ s(i, {
		value: e,
		quotes: M
	}), W = x === void 0 ? /* @__PURE__ */ s(e, {
		variant: "outline",
		type: V ? "submit" : "button",
		name: V ? g : void 0,
		value: V ? v : void 0,
		onClick: b,
		autoFocus: S === "deny",
		children: D
	}) : /* @__PURE__ */ s(e, {
		variant: "outline",
		href: x,
		children: D
	}), G = /* @__PURE__ */ s(e, {
		type: V ? "submit" : "button",
		name: V ? g : void 0,
		value: V ? _ : void 0,
		onClick: y,
		children: E
	});
	return /* @__PURE__ */ s(r, {
		title: C,
		description: w({
			client: /* @__PURE__ */ s("strong", { children: U(l) }),
			what: H,
			email: /* @__PURE__ */ s("strong", { children: U(d) })
		}),
		header: F,
		footer: I,
		preferences: L,
		preferencesLabel: R,
		id: z,
		shell: B,
		children: /* @__PURE__ */ c(n, {
			size: "lg",
			blockActions: !0,
			method: typeof m == "string" ? "post" : void 0,
			action: m,
			links: P,
			actions: /* @__PURE__ */ c(o, { children: [W, G] }),
			children: [
				h && Object.entries(h).map(([e, t]) => /* @__PURE__ */ s("input", {
					type: "hidden",
					name: e,
					value: t
				}, e)),
				/* @__PURE__ */ s(a, {
					clientName: l,
					productName: u,
					accountEmail: d,
					scope: f,
					redirectHost: p,
					scopeReadLabel: O,
					scopeWriteLabel: k,
					expandLabel: A,
					collapseLabel: j,
					valueQuotes: M,
					...N
				}),
				/* @__PURE__ */ s(t, { children: T({ host: /* @__PURE__ */ s("strong", { children: U(p) }) }) })
			]
		})
	});
}
//#endregion
export { l as ConnectorConsentPage };
