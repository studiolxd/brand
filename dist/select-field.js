'use client';
import './select-field.css';
import { n as e } from "./_shared/form-size.js";
import { Label as t } from "./label.js";
import { Select as n } from "./select.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { forwardRef as a, useId as o } from "react";
//#region src/stories/molecules/SelectField/SelectField.tsx
var s = "__empty__";
function c(e) {
	return e === "" ? s : e;
}
function l(e) {
	return e === s ? "" : e;
}
var u = a(function({ id: a, label: u, labelHidden: d = !1, options: f, value: p, defaultValue: m, placeholder: h, name: g, disabled: _, required: v, size: y, error: b = !1, errorMessage: x, helperText: S, className: C, onValueChange: w, onBlur: T }, E) {
	let D = e(y), O = o(), k = a ?? O, A = x ? `${k}-error` : void 0, j = S ? `${k}-helper` : void 0, M = [A, j].filter(Boolean).join(" ") || void 0, N = b || !!x, P = f.map((e) => e.value === "" ? {
		...e,
		value: s
	} : e);
	return /* @__PURE__ */ i("div", {
		className: ["select-field", C].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ r(t, {
				htmlFor: k,
				hidden: d,
				size: D,
				children: u
			}),
			/* @__PURE__ */ r(n, {
				ref: E,
				id: k,
				name: g,
				required: v,
				options: P,
				value: c(p),
				defaultValue: c(m),
				placeholder: h,
				disabled: _,
				size: D,
				"aria-describedby": M,
				"aria-invalid": N,
				onValueChange: w ? (e) => w(l(e)) : void 0,
				onBlur: T
			}),
			x && /* @__PURE__ */ r("span", {
				id: A,
				className: "select-field__error",
				role: "alert",
				children: x
			}),
			S && /* @__PURE__ */ r("span", {
				id: j,
				className: "select-field__helper",
				children: S
			})
		]
	});
});
//#endregion
export { u as SelectField };
