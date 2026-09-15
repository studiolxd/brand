'use client';
import './input-phone-field.css';
import { n as e } from "./_shared/form-size.js";
import { ErrorText as t } from "./error-text.js";
import { InputPhone as n } from "./input-phone.js";
import { Label as r } from "./label.js";
import { n as i } from "./_shared/field-labels.js";
import { forwardRef as a, useId as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/stories/molecules/InputPhoneField/InputPhoneField.tsx
var l = a(function({ id: a, label: l, labelHidden: u, value: d, defaultCountry: f, placeholder: p, disabled: m, readOnly: h, required: g, name: _, autoComplete: v, error: y = !1, errorMessage: b, helperText: x, size: S, className: C, countryLabel: w, internationalLabel: T, onChange: E, onBlur: D, onFocus: O }, k) {
	let A = i(u), j = e(S), M = o(), N = a ?? M, P = b ? `${N}-error` : void 0, F = x ? `${N}-helper` : void 0, I = [P, F].filter(Boolean).join(" ") || void 0, L = y || !!b;
	return /* @__PURE__ */ c("div", {
		className: ["input-phone-field", C].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ s(r, {
				htmlFor: N,
				hidden: A,
				size: j,
				children: l
			}),
			/* @__PURE__ */ s(n, {
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
			b && /* @__PURE__ */ s(t, {
				id: P,
				children: b
			}),
			x && /* @__PURE__ */ s("span", {
				id: F,
				className: "input-phone-field__helper",
				children: x
			})
		]
	});
});
//#endregion
export { l as InputPhoneField };
