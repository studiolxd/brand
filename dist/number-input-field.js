'use client';
import './number-input-field.css';
import { n as e } from "./_shared/form-size.js";
import { ErrorText as t } from "./error-text.js";
import { Label as n } from "./label.js";
import { NumberInput as r } from "./number-input.js";
import { n as i } from "./_shared/field-labels.js";
import { forwardRef as a, useId as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/stories/molecules/NumberInputField/NumberInputField.tsx
var l = a(function({ id: a, label: l, labelHidden: u, value: d, defaultValue: f, min: p, max: m, step: h = 1, decimal: g, disabled: _, readOnly: v, size: y, error: b = !1, errorMessage: x, helperText: S, className: C, onChange: w, onEmpty: T, ...E }, D) {
	let O = i(u), k = e(y), A = o(), j = a ?? A, M = x ? `${j}-error` : void 0, N = S ? `${j}-helper` : void 0, P = [M, N].filter(Boolean).join(" ") || void 0, F = b || !!x;
	return /* @__PURE__ */ c("div", {
		className: ["number-input-field", C].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ s(n, {
				htmlFor: j,
				hidden: O,
				size: k,
				children: l
			}),
			/* @__PURE__ */ s(r, {
				ref: D,
				...E,
				id: j,
				value: d,
				defaultValue: f,
				min: p,
				max: m,
				step: h,
				decimal: g,
				disabled: _,
				readOnly: v,
				size: k,
				error: F,
				"aria-describedby": P,
				onChange: w,
				onEmpty: T
			}),
			x && /* @__PURE__ */ s(t, {
				id: M,
				children: x
			}),
			S && /* @__PURE__ */ s("span", {
				id: N,
				className: "number-input-field__helper",
				children: S
			})
		]
	});
});
//#endregion
export { l as NumberInputField };
