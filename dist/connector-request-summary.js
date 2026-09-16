'use client';
import './connector-request-summary.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { DescriptionDetails as t, DescriptionList as n, DescriptionTerm as r } from "./description-list.js";
import { t as i } from "./_shared/untrustedtext.js";
import { Fragment as a, jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/templates/ConnectorAuth/ConnectorRequestSummary.tsx
function c({ clientName: c, productName: l, accountEmail: u, scope: d, redirectHost: f, clientLabel: p, productLabel: m, accountLabel: h, scopeLabel: g, redirectLabel: _, scopeReadLabel: v, scopeWriteLabel: y, expandLabel: b, collapseLabel: x, valueQuotes: S, className: C }) {
	let w = e("connectorRequestSummary"), T = (e) => /* @__PURE__ */ o(i, {
		value: e,
		expandable: !0,
		expandLabel: b,
		collapseLabel: x,
		quotes: S
	});
	return /* @__PURE__ */ s(n, {
		className: ["connector-request-summary", C].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ o(r, { children: w("client", p) }),
			/* @__PURE__ */ o(t, {
				className: "connector-request-summary__untrusted",
				children: T(c)
			}),
			l !== void 0 && /* @__PURE__ */ s(a, { children: [/* @__PURE__ */ o(r, { children: w("product", m) }), /* @__PURE__ */ o(t, { children: l })] }),
			u !== void 0 && /* @__PURE__ */ s(a, { children: [/* @__PURE__ */ o(r, { children: w("account", h) }), /* @__PURE__ */ o(t, {
				className: "connector-request-summary__untrusted",
				children: T(u)
			})] }),
			d !== void 0 && /* @__PURE__ */ s(a, { children: [/* @__PURE__ */ o(r, { children: w("scope", g) }), /* @__PURE__ */ o(t, { children: d === "read" ? v : y })] }),
			f !== void 0 && /* @__PURE__ */ s(a, { children: [/* @__PURE__ */ o(r, { children: w("redirect", _) }), /* @__PURE__ */ o(t, {
				className: "connector-request-summary__untrusted",
				children: T(f)
			})] })
		]
	});
}
//#endregion
export { c as ConnectorRequestSummary };
