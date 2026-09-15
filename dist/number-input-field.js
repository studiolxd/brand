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
var l = a(function({ id: a, label: l, labelHidden: u, value: d, defaultValue: f, min: p, max: m, step: h = 1, decimal: g, disabled: _, readOnly: v, size: y, error: b = !1, errorMessage: x, helperText: S, className: C, onChange: w, ...T }, E) {
	let D = i(u), O = e(y), k = o(), A = a ?? k, j = x ? `${A}-error` : void 0, M = S ? `${A}-helper` : void 0, N = [j, M].filter(Boolean).join(" ") || void 0, P = b || !!x;
	return /* @__PURE__ */ c("div", {
		className: ["number-input-field", C].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ s(n, {
				htmlFor: A,
				hidden: D,
				size: O,
				children: l
			}),
			/* @__PURE__ */ s(r, {
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
			x && /* @__PURE__ */ s(t, {
				id: j,
				children: x
			}),
			S && /* @__PURE__ */ s("span", {
				id: M,
				className: "number-input-field__helper",
				children: S
			})
		]
	});
});
//#endregion
export { l as NumberInputField };
