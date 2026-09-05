'use client';
import './select-field.css';
import { n as e } from "./_shared/form-size.js";
import { Label as t } from "./label.js";
import { Select as n, isSelectOptionGroup as r } from "./select.js";
import { n as i } from "./_shared/field-labels.js";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
import { forwardRef as s, useId as c } from "react";
//#region src/stories/molecules/SelectField/SelectField.tsx
var l = "__empty__";
function u(e, t) {
	return e === "" ? t ? l : void 0 : e;
}
function d(e) {
	return e === l ? "" : e;
}
function f(e) {
	return e.value === "" ? {
		...e,
		value: l
	} : e;
}
var p = s(function({ id: s, label: l, labelHidden: p, options: m, value: h, defaultValue: g, placeholder: _, name: v, disabled: y, required: b, size: x, error: S = !1, errorMessage: C, helperText: w, className: T, onValueChange: E, onBlur: D }, O) {
	let k = i(p), A = e(x), j = c(), M = s ?? j, N = C ? `${M}-error` : void 0, P = w ? `${M}-helper` : void 0, F = [N, P].filter(Boolean).join(" ") || void 0, I = S || !!C, L = m.some((e) => r(e) ? e.options.some((e) => e.value === "") : e.value === ""), R = L ? m.map((e) => r(e) ? {
		...e,
		options: e.options.map(f)
	} : f(e)) : m;
	return /* @__PURE__ */ o("div", {
		className: ["select-field", T].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ a(t, {
				htmlFor: M,
				hidden: k,
				size: A,
				children: l
			}),
			/* @__PURE__ */ a(n, {
				ref: O,
				id: M,
				name: v,
				required: b,
				options: R,
				value: u(h, L),
				defaultValue: u(g, L),
				placeholder: _,
				disabled: y,
				size: A,
				"aria-describedby": F,
				"aria-invalid": I,
				onValueChange: E ? (e) => E(d(e)) : void 0,
				onBlur: D
			}),
			C && /* @__PURE__ */ a("span", {
				id: N,
				className: "select-field__error",
				role: "alert",
				children: C
			}),
			w && /* @__PURE__ */ a("span", {
				id: P,
				className: "select-field__helper",
				children: w
			})
		]
	});
});
//#endregion
export { p as SelectField };
