'use client';
import './input-phone-field.css';
import { n as e } from "./_shared/form-size.js";
import { InputPhone as t } from "./input-phone.js";
import { Label as n } from "./label.js";
import { n as r } from "./_shared/field-labels.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { forwardRef as o, useId as s } from "react";
//#region src/stories/molecules/InputPhoneField/InputPhoneField.tsx
var c = o(function({ id: o, label: c, labelHidden: l, value: u, defaultCountry: d, placeholder: f, disabled: p, readOnly: m, required: h, name: g, autoComplete: _, error: v = !1, errorMessage: y, helperText: b, size: x, className: S, countryLabel: C, internationalLabel: w, onChange: T, onBlur: E, onFocus: D }, O) {
	let k = r(l), A = e(x), j = s(), M = o ?? j, N = y ? `${M}-error` : void 0, P = b ? `${M}-helper` : void 0, F = [N, P].filter(Boolean).join(" ") || void 0, I = v || !!y;
	return /* @__PURE__ */ a("div", {
		className: ["input-phone-field", S].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ i(n, {
				htmlFor: M,
				hidden: k,
				size: A,
				children: c
			}),
			/* @__PURE__ */ i(t, {
				ref: O,
				id: M,
				name: g,
				value: u,
				defaultCountry: d,
				placeholder: f,
				disabled: p,
				readOnly: m,
				required: h,
				autoComplete: _,
				countryLabel: C,
				internationalLabel: w,
				error: I,
				size: A,
				"aria-describedby": F,
				onChange: T,
				onBlur: E,
				onFocus: D
			}),
			y && /* @__PURE__ */ i("span", {
				id: N,
				className: "input-phone-field__error",
				role: "alert",
				children: y
			}),
			b && /* @__PURE__ */ i("span", {
				id: P,
				className: "input-phone-field__helper",
				children: b
			})
		]
	});
});
//#endregion
export { c as InputPhoneField };
