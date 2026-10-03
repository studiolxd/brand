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
var l = a(function({ id: a, label: l, labelHidden: u, value: d, defaultValue: f, min: p, max: m, step: h = 1, decimal: g, disabled: _, readOnly: v, size: y, compact: b, commitMode: x, error: S = !1, errorMessage: C, helperText: w, className: T, onChange: E, onEmpty: D, ...O }, k) {
	let A = i(u), j = e(y), M = o(), N = a ?? M, P = C ? `${N}-error` : void 0, F = w ? `${N}-helper` : void 0, I = [P, F].filter(Boolean).join(" ") || void 0, L = S || !!C;
	return /* @__PURE__ */ c("div", {
		className: ["number-input-field", T].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ s(n, {
				htmlFor: N,
				hidden: A,
				size: j,
				children: l
			}),
			/* @__PURE__ */ s(r, {
				ref: k,
				...O,
				id: N,
				value: d,
				defaultValue: f,
				min: p,
				max: m,
				step: h,
				decimal: g,
				disabled: _,
				readOnly: v,
				size: j,
				compact: b,
				commitMode: x,
				error: L,
				"aria-describedby": I,
				onChange: E,
				onEmpty: D
			}),
			C && /* @__PURE__ */ s(t, {
				id: P,
				children: C
			}),
			w && /* @__PURE__ */ s("span", {
				id: F,
				className: "number-input-field__helper",
				children: w
			})
		]
	});
});
//#endregion
export { l as NumberInputField };
