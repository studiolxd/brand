'use client';
import './input-phone-field.css';
import { n as e } from "./_shared/form-size.js";
import { InputPhone as t } from "./input-phone.js";
import { Label as n } from "./label.js";
import { forwardRef as r, useId as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/molecules/InputPhoneField/InputPhoneField.tsx
var s = r(function({ id: r, label: s, labelHidden: c = !1, value: l, defaultCountry: u, placeholder: d, disabled: f, readOnly: p, required: m, name: h, autoComplete: g, error: _ = !1, errorMessage: v, helperText: y, size: b, className: x, countryLabel: S, internationalLabel: C, onChange: w, onBlur: T, onFocus: E }, D) {
	let O = e(b), k = i(), A = r ?? k, j = v ? `${A}-error` : void 0, M = y ? `${A}-helper` : void 0, N = [j, M].filter(Boolean).join(" ") || void 0, P = _ || !!v;
	return /* @__PURE__ */ o("div", {
		className: ["input-phone-field", x].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ a(n, {
				htmlFor: A,
				hidden: c,
				size: O,
				children: s
			}),
			/* @__PURE__ */ a(t, {
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
			v && /* @__PURE__ */ a("span", {
				id: j,
				className: "input-phone-field__error",
				role: "alert",
				children: v
			}),
			y && /* @__PURE__ */ a("span", {
				id: M,
				className: "input-phone-field__helper",
				children: y
			})
		]
	});
});
//#endregion
export { s as InputPhoneField };
