import '../connectorrequestsummary.css';
import { r as e } from "./brandmessagescontext.js";
import { DescriptionDetails as t, DescriptionList as n, DescriptionTerm as r } from "../description-list.js";
import { t as i } from "./untrustedtext.js";
import { Fragment as a, jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/messages/es/connectorRequestSummary.ts
var c = {
	client: "Herramienta",
	product: "Producto",
	account: "Cuenta",
	scope: "Permiso",
	redirect: "Destino"
};
//#endregion
//#region src/stories/templates/ConnectorAuth/ConnectorRequestSummary.tsx
function l({ clientName: l, productName: u, accountEmail: d, scope: f, redirectHost: p, clientLabel: m, productLabel: h, accountLabel: g, scopeLabel: _, redirectLabel: v, scopeReadLabel: y, scopeWriteLabel: b, expandLabel: x, collapseLabel: S, valueQuotes: C, className: w }) {
	let T = e("connectorRequestSummary", c), E = (e) => /* @__PURE__ */ o(i, {
		value: e,
		expandable: !0,
		expandLabel: x,
		collapseLabel: S,
		quotes: C
	});
	return /* @__PURE__ */ s(n, {
		className: ["connector-request-summary", w].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ o(r, { children: T("client", m) }),
			/* @__PURE__ */ o(t, {
				className: "connector-request-summary__untrusted",
				children: E(l)
			}),
			u !== void 0 && /* @__PURE__ */ s(a, { children: [/* @__PURE__ */ o(r, { children: T("product", h) }), /* @__PURE__ */ o(t, { children: u })] }),
			d !== void 0 && /* @__PURE__ */ s(a, { children: [/* @__PURE__ */ o(r, { children: T("account", g) }), /* @__PURE__ */ o(t, {
				className: "connector-request-summary__untrusted",
				children: E(d)
			})] }),
			f !== void 0 && /* @__PURE__ */ s(a, { children: [/* @__PURE__ */ o(r, { children: T("scope", _) }), /* @__PURE__ */ o(t, { children: f === "read" ? y : b })] }),
			p !== void 0 && /* @__PURE__ */ s(a, { children: [/* @__PURE__ */ o(r, { children: T("redirect", v) }), /* @__PURE__ */ o(t, {
				className: "connector-request-summary__untrusted",
				children: E(p)
			})] })
		]
	});
}
//#endregion
export { l as t };
