'use client';
import './number-input-field.css';
import { Label as e } from "./label.js";
import { NumberInput as t } from "./number-input.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/molecules/NumberInputField/NumberInputField.tsx
function i({ id: i, label: a, labelHidden: o = !0, name: s, value: c, defaultValue: l, min: u, max: d, step: f = 1, decimal: p, disabled: m, readOnly: h, size: g = "md", error: _ = !1, errorMessage: v, helperText: y, onChange: b, onBlur: x, onFocus: S }) {
	let C = v ? `${i}-error` : void 0, w = y ? `${i}-helper` : void 0, T = [C, w].filter(Boolean).join(" ") || void 0;
	return /* @__PURE__ */ r("div", {
		className: "number-input-field",
		children: [
			/* @__PURE__ */ n(e, {
				htmlFor: i,
				hidden: o,
				children: a
			}),
			/* @__PURE__ */ n(t, {
				id: i,
				name: s,
				value: c,
				defaultValue: l,
				min: u,
				max: d,
				step: f,
				decimal: p,
				disabled: m,
				readOnly: h,
				size: g,
				error: _ || !!v,
				describedBy: T,
				ariaLabel: o ? a : void 0,
				onChange: b,
				onBlur: x,
				onFocus: S
			}),
			v && /* @__PURE__ */ n("span", {
				id: C,
				className: "number-input-field__error",
				role: "alert",
				children: v
			}),
			y && /* @__PURE__ */ n("span", {
				id: w,
				className: "number-input-field__helper",
				children: y
			})
		]
	});
}
//#endregion
export { i as NumberInputField };
