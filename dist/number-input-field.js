'use client';
import './number-input-field.css';
import { n as e } from "./_shared/form-size.js";
import { Label as t } from "./label.js";
import { NumberInput as n } from "./number-input.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/molecules/NumberInputField/NumberInputField.tsx
function a({ id: a, label: o, labelHidden: s = !0, name: c, value: l, defaultValue: u, min: d, max: f, step: p = 1, decimal: m, disabled: h, readOnly: g, size: _, error: v = !1, errorMessage: y, helperText: b, onChange: x, onBlur: S, onFocus: C }) {
	let w = e(_), T = y ? `${a}-error` : void 0, E = b ? `${a}-helper` : void 0, D = [T, E].filter(Boolean).join(" ") || void 0;
	return /* @__PURE__ */ i("div", {
		className: "number-input-field",
		children: [
			/* @__PURE__ */ r(t, {
				htmlFor: a,
				hidden: s,
				size: w,
				children: o
			}),
			/* @__PURE__ */ r(n, {
				id: a,
				name: c,
				value: l,
				defaultValue: u,
				min: d,
				max: f,
				step: p,
				decimal: m,
				disabled: h,
				readOnly: g,
				size: w,
				error: v || !!y,
				describedBy: D,
				ariaLabel: s ? o : void 0,
				onChange: x,
				onBlur: S,
				onFocus: C
			}),
			y && /* @__PURE__ */ r("span", {
				id: T,
				className: "number-input-field__error",
				role: "alert",
				children: y
			}),
			b && /* @__PURE__ */ r("span", {
				id: E,
				className: "number-input-field__helper",
				children: b
			})
		]
	});
}
//#endregion
export { a as NumberInputField };
