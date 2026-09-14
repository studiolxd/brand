import './connector-request-summary.css';
import { DescriptionDetails as e, DescriptionList as t, DescriptionTerm as n } from "./description-list.js";
import { Fragment as r, jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/stories/templates/ConnectorAuth/ConnectorRequestSummary.tsx
function o({ clientName: o, productName: s, accountEmail: c, scope: l, redirectHost: u, clientLabel: d = "Herramienta", productLabel: f = "Producto", accountLabel: p = "Cuenta", scopeLabel: m = "Permiso", redirectLabel: h = "Destino", scopeReadLabel: g = "leer los datos de este producto", scopeWriteLabel: _ = "leer y modificar los datos de este producto", className: v }) {
	return /* @__PURE__ */ a(t, {
		className: ["connector-request-summary", v].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ i(n, { children: d }),
			/* @__PURE__ */ i(e, {
				className: "connector-request-summary__untrusted",
				children: o
			}),
			s !== void 0 && /* @__PURE__ */ a(r, { children: [/* @__PURE__ */ i(n, { children: f }), /* @__PURE__ */ i(e, { children: s })] }),
			c !== void 0 && /* @__PURE__ */ a(r, { children: [/* @__PURE__ */ i(n, { children: p }), /* @__PURE__ */ i(e, {
				className: "connector-request-summary__untrusted",
				children: c
			})] }),
			l !== void 0 && /* @__PURE__ */ a(r, { children: [/* @__PURE__ */ i(n, { children: m }), /* @__PURE__ */ i(e, { children: l === "read" ? g : _ })] }),
			u !== void 0 && /* @__PURE__ */ a(r, { children: [/* @__PURE__ */ i(n, { children: h }), /* @__PURE__ */ i(e, {
				className: "connector-request-summary__untrusted",
				children: u
			})] })
		]
	});
}
//#endregion
export { o as ConnectorRequestSummary };
