'use client';
import './select-field.css';
import { n as e } from "./_shared/form-size.js";
import { ErrorText as t } from "./error-text.js";
import { Label as n } from "./label.js";
import { Select as r, isSelectOptionGroup as i } from "./select.js";
import { n as a } from "./_shared/field-labels.js";
import { forwardRef as o, useId as s } from "react";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
//#region src/stories/molecules/SelectField/SelectField.tsx
var u = "__empty__";
function d(e, t) {
	return e === "" ? t ? u : void 0 : e;
}
function f(e) {
	return e === u ? "" : e;
}
function p(e) {
	return e.value === "" ? {
		...e,
		value: u
	} : e;
}
var m = o(function({ id: o, label: u, labelHidden: m, options: h, value: g, defaultValue: _, placeholder: v, name: y, disabled: b, required: x, size: S, error: C = !1, errorMessage: w, helperText: T, className: E, onValueChange: D, onBlur: O }, k) {
	let A = a(m), j = e(S), M = s(), N = o ?? M, P = w ? `${N}-error` : void 0, F = T ? `${N}-helper` : void 0, I = [P, F].filter(Boolean).join(" ") || void 0, L = C || !!w, R = h.some((e) => i(e) ? e.options.some((e) => e.value === "") : e.value === ""), z = R ? h.map((e) => i(e) ? {
		...e,
		options: e.options.map(p)
	} : p(e)) : h;
	return /* @__PURE__ */ l("div", {
		className: ["select-field", E].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ c(n, {
				htmlFor: N,
				hidden: A,
				size: j,
				children: u
			}),
			/* @__PURE__ */ c(r, {
				ref: k,
				id: N,
				name: y,
				required: x,
				options: z,
				value: d(g, R),
				defaultValue: d(_, R),
				placeholder: v,
				disabled: b,
				size: j,
				"aria-describedby": I,
				"aria-invalid": L,
				onValueChange: D ? (e) => D(f(e)) : void 0,
				onBlur: O
			}),
			w && /* @__PURE__ */ c(t, {
				id: P,
				children: w
			}),
			T && /* @__PURE__ */ c("span", {
				id: F,
				className: "select-field__helper",
				children: T
			})
		]
	});
});
//#endregion
export { m as SelectField };
