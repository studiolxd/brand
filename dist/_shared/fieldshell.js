import { r as e } from "./brandmessagescontext.js";
import { VisuallyHidden as t } from "../visually-hidden.js";
import { ErrorText as n } from "../error-text.js";
import { Label as r } from "../label.js";
import { useId as i } from "react";
import { Fragment as a, jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/messages/es/field.ts
var c = {
	optional: "(opcional)",
	required: "obligatorio"
};
//#endregion
//#region src/stories/molecules/_shared/FieldShell.tsx
function l(e) {
	return `${e}-required`;
}
function u({ id: n, label: r }) {
	return /* @__PURE__ */ o(t, {
		id: n,
		children: e("field", c)("required", r)
	});
}
function d(...e) {
	return e.filter(Boolean).join(" ") || void 0;
}
function f({ id: e, error: t = !1, errorMessage: n, helperText: r, describedBy: a }) {
	let o = i(), s = e ?? o, c = n ? `${s}-error` : void 0, l = r ? `${s}-helper` : void 0;
	return {
		id: s,
		labelId: `${s}-label`,
		errorId: c,
		helperId: l,
		describedBy: d(c, l, a),
		hasError: t || !!n,
		errorMessage: n,
		helperText: r
	};
}
function p({ field: i, block: l, modifiers: u = [], className: d, size: f = "md", label: p, optional: m = !1, optionalLabel: h, labelHidden: g = !1, layout: _ = "stack", labelFor: v, labelIdentified: y = !1, rootProps: b, children: x, footer: S }) {
	let C = v ?? i.id, w = y ? i.labelId : void 0, T = e("field", c), E = m && p ? /* @__PURE__ */ s(a, { children: [
		p,
		" ",
		/* @__PURE__ */ o("span", {
			className: "label__optional",
			children: T("optional", h)
		})
	] }) : p;
	return /* @__PURE__ */ s("div", {
		...b,
		className: [
			l,
			...u,
			d
		].filter(Boolean).join(" "),
		children: [
			_ === "inline" ? /* @__PURE__ */ s("label", {
				className: `${l}__control`,
				htmlFor: C,
				children: [x, o(g ? t : "span", {
					id: w,
					className: `${l}__label`,
					children: E
				})]
			}) : /* @__PURE__ */ s(a, { children: [p ? /* @__PURE__ */ o(r, {
				id: w,
				htmlFor: C,
				hidden: g,
				size: f,
				children: E
			}) : null, x] }),
			i.errorMessage && /* @__PURE__ */ o(n, {
				id: i.errorId,
				children: i.errorMessage
			}),
			i.helperText && /* @__PURE__ */ o("span", {
				id: i.helperId,
				className: `${l}__helper`,
				children: i.helperText
			}),
			S
		]
	});
}
//#endregion
export { f as a, l as i, p as n, d as r, u as t };
