'use client';
import './number-input-field.css';
import { n as e } from "./_shared/form-size.js";
import { Label as t } from "./label.js";
import { NumberInput as n } from "./number-input.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { forwardRef as a, useId as o } from "react";
//#region src/stories/molecules/NumberInputField/NumberInputField.tsx
var s = a(function({ id: a, label: s, labelHidden: c = !1, value: l, defaultValue: u, min: d, max: f, step: p = 1, decimal: m, disabled: h, readOnly: g, size: _, error: v = !1, errorMessage: y, helperText: b, className: x, onChange: S, ...C }, w) {
	let T = e(_), E = o(), D = a ?? E, O = y ? `${D}-error` : void 0, k = b ? `${D}-helper` : void 0, A = [O, k].filter(Boolean).join(" ") || void 0, j = v || !!y;
	return /* @__PURE__ */ i("div", {
		className: ["number-input-field", x].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ r(t, {
				htmlFor: D,
				hidden: c,
				size: T,
				children: s
			}),
			/* @__PURE__ */ r(n, {
				ref: w,
				...C,
				id: D,
				value: l,
				defaultValue: u,
				min: d,
				max: f,
				step: p,
				decimal: m,
				disabled: h,
				readOnly: g,
				size: T,
				error: j,
				"aria-describedby": A,
				onChange: S
			}),
			y && /* @__PURE__ */ r("span", {
				id: O,
				className: "number-input-field__error",
				role: "alert",
				children: y
			}),
			b && /* @__PURE__ */ r("span", {
				id: k,
				className: "number-input-field__helper",
				children: b
			})
		]
	});
});
//#endregion
export { s as NumberInputField };
