'use client';
import './input-phone-field.css';
import { n as e } from "./_shared/form-size.js";
import { ErrorText as t } from "./error-text.js";
import { InputPhone as n } from "./input-phone.js";
import { Label as r } from "./label.js";
import { n as i } from "./_shared/field-labels.js";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
import { forwardRef as s, useId as c } from "react";
//#region src/stories/molecules/InputPhoneField/InputPhoneField.tsx
var l = s(function({ id: s, label: l, labelHidden: u, value: d, defaultCountry: f, placeholder: p, disabled: m, readOnly: h, required: g, name: _, autoComplete: v, error: y = !1, errorMessage: b, helperText: x, size: S, className: C, countryLabel: w, internationalLabel: T, onChange: E, onBlur: D, onFocus: O }, k) {
	let A = i(u), j = e(S), M = c(), N = s ?? M, P = b ? `${N}-error` : void 0, F = x ? `${N}-helper` : void 0, I = [P, F].filter(Boolean).join(" ") || void 0, L = y || !!b;
	return /* @__PURE__ */ o("div", {
		className: ["input-phone-field", C].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ a(r, {
				htmlFor: N,
				hidden: A,
				size: j,
				children: l
			}),
			/* @__PURE__ */ a(n, {
				ref: k,
				id: N,
				name: _,
				value: d,
				defaultCountry: f,
				placeholder: p,
				disabled: m,
				readOnly: h,
				required: g,
				autoComplete: v,
				countryLabel: w,
				internationalLabel: T,
				error: L,
				size: j,
				"aria-describedby": I,
				onChange: E,
				onBlur: D,
				onFocus: O
			}),
			b && /* @__PURE__ */ a(t, {
				id: P,
				children: b
			}),
			x && /* @__PURE__ */ a("span", {
				id: F,
				className: "input-phone-field__helper",
				children: x
			})
		]
	});
});
//#endregion
export { l as InputPhoneField };
