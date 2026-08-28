'use client';
import './input-phone-field.css';
import { n as e } from "./_shared/form-size.js";
import { InputPhone as t } from "./input-phone.js";
import { Label as n } from "./label.js";
import { forwardRef as r, useId as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/molecules/InputPhoneField/InputPhoneField.tsx
var s = r(function({ id: r, label: s, labelHidden: c = !1, value: l, defaultCountry: u, placeholder: d, disabled: f, readOnly: p, required: m, name: h, autoComplete: g, error: _ = !1, errorMessage: v, helperText: y, size: b, className: x, countryLabel: S, onChange: C, onBlur: w, onFocus: T }, E) {
	let D = e(b), O = i(), k = r ?? O, A = v ? `${k}-error` : void 0, j = y ? `${k}-helper` : void 0, M = [A, j].filter(Boolean).join(" ") || void 0, N = _ || !!v;
	return /* @__PURE__ */ o("div", {
		className: ["input-phone-field", x].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ a(n, {
				htmlFor: k,
				hidden: c,
				size: D,
				children: s
			}),
			/* @__PURE__ */ a(t, {
				ref: E,
				id: k,
				name: h,
				value: l,
				defaultCountry: u,
				placeholder: d,
				disabled: f,
				readOnly: p,
				required: m,
				autoComplete: g,
				countryLabel: S,
				error: N,
				size: D,
				"aria-describedby": M,
				onChange: C,
				onBlur: w,
				onFocus: T
			}),
			v && /* @__PURE__ */ a("span", {
				id: A,
				className: "input-phone-field__error",
				role: "alert",
				children: v
			}),
			y && /* @__PURE__ */ a("span", {
				id: j,
				className: "input-phone-field__helper",
				children: y
			})
		]
	});
});
//#endregion
export { s as InputPhoneField };
