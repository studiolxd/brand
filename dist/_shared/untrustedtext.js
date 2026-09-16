import '../untrustedtext.css';
import { n as e } from "./brandmessagescontext.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/stories/templates/ConnectorAuth/UntrustedText.tsx
var r = /[\u061C\u200B\u200E\u200F\u202A-\u202E\u2060-\u2064\u2066-\u2069\uFEFF]/g, i = 80;
function a(e) {
	return e.replace(r, (e) => `[U+${e.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")}]`);
}
function o({ value: r, expandable: o = !1, expandLabel: s, collapseLabel: c, quotes: l, className: u }) {
	let d = e("untrustedText"), f = (...e) => [...e, u].filter(Boolean).join(" ");
	if (typeof r != "string") return /* @__PURE__ */ t("span", {
		className: f("connector-untrusted"),
		children: r
	});
	let p = a(r), m = Array.from(p).length > i, [h, g] = d("quotes", l), _ = /* @__PURE__ */ n("span", {
		className: m ? "connector-untrusted__value connector-untrusted__value--clamped" : "connector-untrusted__value",
		children: [
			h,
			/* @__PURE__ */ t("bdi", { children: p }),
			g
		]
	});
	return !m || !o ? /* @__PURE__ */ t("span", {
		className: f("connector-untrusted"),
		children: _
	}) : /* @__PURE__ */ t("details", {
		className: f("connector-untrusted", "connector-untrusted--expandable"),
		children: /* @__PURE__ */ n("summary", {
			className: "connector-untrusted__summary",
			children: [_, /* @__PURE__ */ n("span", {
				className: "link connector-untrusted__toggle",
				children: [/* @__PURE__ */ t("span", {
					className: "connector-untrusted__more",
					children: d("expand", s)
				}), /* @__PURE__ */ t("span", {
					className: "connector-untrusted__less",
					children: d("collapse", c)
				})]
			})]
		})
	});
}
//#endregion
export { o as t };
