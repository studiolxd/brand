'use client';
import './number-input-field.css';
import { Label as e } from "./label.js";
import { NumberInput as t } from "./number-input.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/molecules/NumberInputField/NumberInputField.tsx
function i({ id: i, label: a, labelHidden: o = !0, name: s, value: c, defaultValue: l, min: u, max: d, step: f = 1, disabled: p, readOnly: m, size: h = "md", error: g = !1, errorMessage: _, helperText: v, onChange: y, onBlur: b, onFocus: x }) {
	let S = _ ? `${i}-error` : void 0, C = v ? `${i}-helper` : void 0, w = [S, C].filter(Boolean).join(" ") || void 0;
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
				disabled: p,
				readOnly: m,
				size: h,
				error: g || !!_,
				describedBy: w,
				ariaLabel: o ? a : void 0,
				onChange: y,
				onBlur: b,
				onFocus: x
			}),
			_ && /* @__PURE__ */ n("span", {
				id: S,
				className: "number-input-field__error",
				role: "alert",
				children: _
			}),
			v && /* @__PURE__ */ n("span", {
				id: C,
				className: "number-input-field__helper",
				children: v
			})
		]
	});
}
//#endregion
export { i as NumberInputField };
