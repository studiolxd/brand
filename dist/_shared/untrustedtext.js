import '../untrustedtext.css';
import { n as e } from "./brandmessagescontext.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/stories/messages/es/untrustedText.ts
var r = {
	expand: "Ver el valor completo",
	collapse: "Ver menos",
	quotes: ["«", "»"]
}, i = /[\u061C\u200B\u200E\u200F\u202A-\u202E\u2060-\u2064\u2066-\u2069\uFEFF]/g, a = 80;
function o(e) {
	return e.replace(i, (e) => `[U+${e.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")}]`);
}
function s({ value: i, expandable: s = !1, expandLabel: c, collapseLabel: l, quotes: u, className: d }) {
	let f = e("untrustedText", r), p = (...e) => [...e, d].filter(Boolean).join(" ");
	if (typeof i != "string") return /* @__PURE__ */ t("span", {
		className: p("connector-untrusted"),
		children: i
	});
	let m = o(i), h = Array.from(m).length > a, [g, _] = f("quotes", u), v = /* @__PURE__ */ n("span", {
		className: h ? "connector-untrusted__value connector-untrusted__value--clamped" : "connector-untrusted__value",
		children: [
			g,
			/* @__PURE__ */ t("bdi", { children: m }),
			_
		]
	});
	return !h || !s ? /* @__PURE__ */ t("span", {
		className: p("connector-untrusted"),
		children: v
	}) : /* @__PURE__ */ t("details", {
		className: p("connector-untrusted", "connector-untrusted--expandable"),
		children: /* @__PURE__ */ n("summary", {
			className: "connector-untrusted__summary",
			children: [v, /* @__PURE__ */ n("span", {
				className: "link connector-untrusted__toggle",
				children: [/* @__PURE__ */ t("span", {
					className: "connector-untrusted__more",
					children: f("expand", c)
				}), /* @__PURE__ */ t("span", {
					className: "connector-untrusted__less",
					children: f("collapse", l)
				})]
			})]
		})
	});
}
//#endregion
export { s as t };
