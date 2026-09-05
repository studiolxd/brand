'use client';
import './number-input-field.css';
import { n as e } from "./_shared/form-size.js";
import { Label as t } from "./label.js";
import { NumberInput as n } from "./number-input.js";
import { n as r } from "./_shared/field-labels.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { forwardRef as o, useId as s } from "react";
//#region src/stories/molecules/NumberInputField/NumberInputField.tsx
var c = o(function({ id: o, label: c, labelHidden: l, value: u, defaultValue: d, min: f, max: p, step: m = 1, decimal: h, disabled: g, readOnly: _, size: v, error: y = !1, errorMessage: b, helperText: x, className: S, onChange: C, ...w }, T) {
	let E = r(l), D = e(v), O = s(), k = o ?? O, A = b ? `${k}-error` : void 0, j = x ? `${k}-helper` : void 0, M = [A, j].filter(Boolean).join(" ") || void 0, N = y || !!b;
	return /* @__PURE__ */ a("div", {
		className: ["number-input-field", S].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ i(t, {
				htmlFor: k,
				hidden: E,
				size: D,
				children: c
			}),
			/* @__PURE__ */ i(n, {
				ref: T,
				...w,
				id: k,
				value: u,
				defaultValue: d,
				min: f,
				max: p,
				step: m,
				decimal: h,
				disabled: g,
				readOnly: _,
				size: D,
				error: N,
				"aria-describedby": M,
				onChange: C
			}),
			b && /* @__PURE__ */ i("span", {
				id: A,
				className: "number-input-field__error",
				role: "alert",
				children: b
			}),
			x && /* @__PURE__ */ i("span", {
				id: j,
				className: "number-input-field__helper",
				children: x
			})
		]
	});
});
//#endregion
export { c as NumberInputField };
