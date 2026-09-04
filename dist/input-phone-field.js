'use client';
import './input-phone-field.css';
import { n as e } from "./_shared/form-size.js";
import { InputPhone as t } from "./input-phone.js";
import { Label as n } from "./label.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { forwardRef as a, useId as o } from "react";
//#region src/stories/molecules/InputPhoneField/InputPhoneField.tsx
var s = a(function({ id: a, label: s, labelHidden: c = !1, value: l, defaultCountry: u, placeholder: d, disabled: f, readOnly: p, required: m, name: h, autoComplete: g, error: _ = !1, errorMessage: v, helperText: y, size: b, className: x, countryLabel: S, internationalLabel: C, onChange: w, onBlur: T, onFocus: E }, D) {
	let O = e(b), k = o(), A = a ?? k, j = v ? `${A}-error` : void 0, M = y ? `${A}-helper` : void 0, N = [j, M].filter(Boolean).join(" ") || void 0, P = _ || !!v;
	return /* @__PURE__ */ i("div", {
		className: ["input-phone-field", x].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ r(n, {
				htmlFor: A,
				hidden: c,
				size: O,
				children: s
			}),
			/* @__PURE__ */ r(t, {
				ref: D,
				id: A,
				name: h,
				value: l,
				defaultCountry: u,
				placeholder: d,
				disabled: f,
				readOnly: p,
				required: m,
				autoComplete: g,
				countryLabel: S,
				internationalLabel: C,
				error: P,
				size: O,
				"aria-describedby": N,
				onChange: w,
				onBlur: T,
				onFocus: E
			}),
			v && /* @__PURE__ */ r("span", {
				id: j,
				className: "input-phone-field__error",
				role: "alert",
				children: v
			}),
			y && /* @__PURE__ */ r("span", {
				id: M,
				className: "input-phone-field__helper",
				children: y
			})
		]
	});
});
//#endregion
export { s as InputPhoneField };
