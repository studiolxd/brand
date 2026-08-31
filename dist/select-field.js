'use client';
import './select-field.css';
import { n as e } from "./_shared/form-size.js";
import { Label as t } from "./label.js";
import { Select as n, isSelectOptionGroup as r } from "./select.js";
import { forwardRef as i, useId as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/molecules/SelectField/SelectField.tsx
var c = "__empty__";
function l(e, t) {
	return e === "" ? t ? c : void 0 : e;
}
function u(e) {
	return e === c ? "" : e;
}
function d(e) {
	return e.value === "" ? {
		...e,
		value: c
	} : e;
}
var f = i(function({ id: i, label: c, labelHidden: f = !1, options: p, value: m, defaultValue: h, placeholder: g, name: _, disabled: v, required: y, size: b, error: x = !1, errorMessage: S, helperText: C, className: w, onValueChange: T, onBlur: E }, D) {
	let O = e(b), k = a(), A = i ?? k, j = S ? `${A}-error` : void 0, M = C ? `${A}-helper` : void 0, N = [j, M].filter(Boolean).join(" ") || void 0, P = x || !!S, F = p.some((e) => r(e) ? e.options.some((e) => e.value === "") : e.value === ""), I = F ? p.map((e) => r(e) ? {
		...e,
		options: e.options.map(d)
	} : d(e)) : p;
	return /* @__PURE__ */ s("div", {
		className: ["select-field", w].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ o(t, {
				htmlFor: A,
				hidden: f,
				size: O,
				children: c
			}),
			/* @__PURE__ */ o(n, {
				ref: D,
				id: A,
				name: _,
				required: y,
				options: I,
				value: l(m, F),
				defaultValue: l(h, F),
				placeholder: g,
				disabled: v,
				size: O,
				"aria-describedby": N,
				"aria-invalid": P,
				onValueChange: T ? (e) => T(u(e)) : void 0,
				onBlur: E
			}),
			S && /* @__PURE__ */ o("span", {
				id: j,
				className: "select-field__error",
				role: "alert",
				children: S
			}),
			C && /* @__PURE__ */ o("span", {
				id: M,
				className: "select-field__helper",
				children: C
			})
		]
	});
});
//#endregion
export { f as SelectField };
