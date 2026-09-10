'use client';
import './number-input-field.css';
import { n as e } from "./_shared/form-size.js";
import { ErrorText as t } from "./error-text.js";
import { Label as n } from "./label.js";
import { NumberInput as r } from "./number-input.js";
import { n as i } from "./_shared/field-labels.js";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
import { forwardRef as s, useId as c } from "react";
//#region src/stories/molecules/NumberInputField/NumberInputField.tsx
var l = s(function({ id: s, label: l, labelHidden: u, value: d, defaultValue: f, min: p, max: m, step: h = 1, decimal: g, disabled: _, readOnly: v, size: y, error: b = !1, errorMessage: x, helperText: S, className: C, onChange: w, ...T }, E) {
	let D = i(u), O = e(y), k = c(), A = s ?? k, j = x ? `${A}-error` : void 0, M = S ? `${A}-helper` : void 0, N = [j, M].filter(Boolean).join(" ") || void 0, P = b || !!x;
	return /* @__PURE__ */ o("div", {
		className: ["number-input-field", C].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ a(n, {
				htmlFor: A,
				hidden: D,
				size: O,
				children: l
			}),
			/* @__PURE__ */ a(r, {
				ref: E,
				...T,
				id: A,
				value: d,
				defaultValue: f,
				min: p,
				max: m,
				step: h,
				decimal: g,
				disabled: _,
				readOnly: v,
				size: O,
				error: P,
				"aria-describedby": N,
				onChange: w
			}),
			x && /* @__PURE__ */ a(t, {
				id: j,
				children: x
			}),
			S && /* @__PURE__ */ a("span", {
				id: M,
				className: "number-input-field__helper",
				children: S
			})
		]
	});
});
//#endregion
export { l as NumberInputField };
