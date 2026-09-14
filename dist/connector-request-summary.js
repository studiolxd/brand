import './connector-request-summary.css';
import { DescriptionDetails as e, DescriptionList as t, DescriptionTerm as n } from "./description-list.js";
import { t as r } from "./_shared/untrustedtext.js";
import { Fragment as i, jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/templates/ConnectorAuth/ConnectorRequestSummary.tsx
function s({ clientName: s, productName: c, accountEmail: l, scope: u, redirectHost: d, clientLabel: f = "Herramienta", productLabel: p = "Producto", accountLabel: m = "Cuenta", scopeLabel: h = "Permiso", redirectLabel: g = "Destino", scopeReadLabel: _ = "leer los datos de este producto", scopeWriteLabel: v = "leer y modificar los datos de este producto", expandLabel: y, collapseLabel: b, valueQuotes: x, className: S }) {
	let C = (e) => /* @__PURE__ */ a(r, {
		value: e,
		expandable: !0,
		expandLabel: y,
		collapseLabel: b,
		quotes: x
	});
	return /* @__PURE__ */ o(t, {
		className: ["connector-request-summary", S].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ a(n, { children: f }),
			/* @__PURE__ */ a(e, {
				className: "connector-request-summary__untrusted",
				children: C(s)
			}),
			c !== void 0 && /* @__PURE__ */ o(i, { children: [/* @__PURE__ */ a(n, { children: p }), /* @__PURE__ */ a(e, { children: c })] }),
			l !== void 0 && /* @__PURE__ */ o(i, { children: [/* @__PURE__ */ a(n, { children: m }), /* @__PURE__ */ a(e, {
				className: "connector-request-summary__untrusted",
				children: C(l)
			})] }),
			u !== void 0 && /* @__PURE__ */ o(i, { children: [/* @__PURE__ */ a(n, { children: h }), /* @__PURE__ */ a(e, { children: u === "read" ? _ : v })] }),
			d !== void 0 && /* @__PURE__ */ o(i, { children: [/* @__PURE__ */ a(n, { children: g }), /* @__PURE__ */ a(e, {
				className: "connector-request-summary__untrusted",
				children: C(d)
			})] })
		]
	});
}
//#endregion
export { s as ConnectorRequestSummary };
