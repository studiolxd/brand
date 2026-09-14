'use client';
import { Button as e } from "./button.js";
import { Paragraph as t } from "./paragraph.js";
import { Form as n } from "./form.js";
import { ConnectorAuthShell as r } from "./connector-auth-shell.js";
import { ConnectorRequestSummary as i } from "./connector-request-summary.js";
import { Fragment as a, jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/templates/ConnectorAuth/ConnectorConsentPage.tsx
function c({ clientName: c, productName: l, accountEmail: u, scope: d = "read", redirectHost: f, action: p, hiddenFields: m, decisionName: h = "decision", approveValue: g = "approve", denyValue: _ = "deny", onApprove: v, onDeny: y, denyHref: b, initialFocus: x = "none", title: S = "Conectar una herramienta", intro: C = ({ client: e, what: t, email: n }) => /* @__PURE__ */ s(a, { children: [
	e,
	" quiere ",
	t,
	" como ",
	n,
	"."
] }), redirectNotice: w = ({ host: e }) => /* @__PURE__ */ s(a, { children: [
	"El acceso se enviará a ",
	e,
	". Continúa solo si lo reconoces."
] }), approveLabel: T = "Permitir acceso", denyLabel: E = "Denegar", scopeReadLabel: D = "leer los datos de este producto", scopeWriteLabel: O = "leer y modificar los datos de este producto", summaryLabels: k, links: A, header: j, footer: M, preferences: N, preferencesLabel: P, id: F, shell: I }) {
	let L = p !== void 0, R = d === "read" ? D : O, z = b === void 0 ? /* @__PURE__ */ o(e, {
		variant: "outline",
		type: L ? "submit" : "button",
		name: L ? h : void 0,
		value: L ? _ : void 0,
		onClick: y,
		autoFocus: x === "deny",
		children: E
	}) : /* @__PURE__ */ o(e, {
		variant: "outline",
		href: b,
		children: E
	}), B = /* @__PURE__ */ o(e, {
		type: L ? "submit" : "button",
		name: L ? h : void 0,
		value: L ? g : void 0,
		onClick: v,
		children: T
	});
	return /* @__PURE__ */ o(r, {
		title: S,
		description: C({
			client: /* @__PURE__ */ o("strong", { children: c }),
			what: R,
			email: /* @__PURE__ */ o("strong", { children: u })
		}),
		header: j,
		footer: M,
		preferences: N,
		preferencesLabel: P,
		id: F,
		shell: I,
		children: /* @__PURE__ */ s(n, {
			size: "lg",
			blockActions: !0,
			method: L ? "post" : void 0,
			action: p,
			links: A,
			actions: /* @__PURE__ */ s(a, { children: [z, B] }),
			children: [
				m && Object.entries(m).map(([e, t]) => /* @__PURE__ */ o("input", {
					type: "hidden",
					name: e,
					value: t
				}, e)),
				/* @__PURE__ */ o(i, {
					clientName: c,
					productName: l,
					accountEmail: u,
					scope: d,
					redirectHost: f,
					scopeReadLabel: D,
					scopeWriteLabel: O,
					...k
				}),
				/* @__PURE__ */ o(t, { children: w({ host: /* @__PURE__ */ o("strong", { children: f }) }) })
			]
		})
	});
}
//#endregion
export { c as ConnectorConsentPage };
