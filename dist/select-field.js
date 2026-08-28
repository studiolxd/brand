'use client';
import './select-field.css';
import { n as e } from "./_shared/form-size.js";
import { Label as t } from "./label.js";
import { Select as n } from "./select.js";
import { forwardRef as r, useId as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/molecules/SelectField/SelectField.tsx
var s = "__empty__";
function c(e) {
	return e === "" ? s : e;
}
function l(e) {
	return e === s ? "" : e;
}
var u = r(function({ id: r, label: u, labelHidden: d = !1, options: f, value: p, defaultValue: m, placeholder: h, name: g, disabled: _, required: v, size: y, error: b = !1, errorMessage: x, helperText: S, className: C, onValueChange: w, onBlur: T }, E) {
	let D = e(y), O = i(), k = r ?? O, A = x ? `${k}-error` : void 0, j = S ? `${k}-helper` : void 0, M = [A, j].filter(Boolean).join(" ") || void 0, N = b || !!x, P = f.map((e) => e.value === "" ? {
		...e,
		value: s
	} : e);
	return /* @__PURE__ */ o("div", {
		className: ["select-field", C].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ a(t, {
				htmlFor: k,
				hidden: d,
				size: D,
				children: u
			}),
			/* @__PURE__ */ a(n, {
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
			x && /* @__PURE__ */ a("span", {
				id: A,
				className: "select-field__error",
				role: "alert",
				children: x
			}),
			S && /* @__PURE__ */ a("span", {
				id: j,
				className: "select-field__helper",
				children: S
			})
		]
	});
});
//#endregion
export { u as SelectField };
