import '../untrustedtext.css';
import { jsx as e, jsxs as t } from "react/jsx-runtime";
//#region src/stories/templates/ConnectorAuth/UntrustedText.tsx
var n = /[\u061C\u200B\u200E\u200F\u202A-\u202E\u2060-\u2064\u2066-\u2069\uFEFF]/g, r = 80;
function i(e) {
	return e.replace(n, (e) => `[U+${e.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")}]`);
}
function a({ value: n, expandable: a = !1, expandLabel: o = "Ver el valor completo", collapseLabel: s = "Ver menos", quotes: c = ["«", "»"], className: l }) {
	let u = (...e) => [...e, l].filter(Boolean).join(" ");
	if (typeof n != "string") return /* @__PURE__ */ e("span", {
		className: u("connector-untrusted"),
		children: n
	});
	let d = i(n), f = Array.from(d).length > r, [p, m] = c, h = /* @__PURE__ */ t("span", {
		className: f ? "connector-untrusted__value connector-untrusted__value--clamped" : "connector-untrusted__value",
		children: [
			p,
			/* @__PURE__ */ e("bdi", { children: d }),
			m
		]
	});
	return !f || !a ? /* @__PURE__ */ e("span", {
		className: u("connector-untrusted"),
		children: h
	}) : /* @__PURE__ */ e("details", {
		className: u("connector-untrusted", "connector-untrusted--expandable"),
		children: /* @__PURE__ */ t("summary", {
			className: "connector-untrusted__summary",
			children: [h, /* @__PURE__ */ t("span", {
				className: "link connector-untrusted__toggle",
				children: [/* @__PURE__ */ e("span", {
					className: "connector-untrusted__more",
					children: o
				}), /* @__PURE__ */ e("span", {
					className: "connector-untrusted__less",
					children: s
				})]
			})]
		})
	});
}
//#endregion
export { a as t };
