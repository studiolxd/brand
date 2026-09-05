'use client';
import './otp-field.css';
import { n as e } from "./_shared/form-size.js";
import { OtpInput as t } from "./otp-input.js";
import { Label as n } from "./label.js";
import { n as r } from "./_shared/field-labels.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { forwardRef as o, useId as s } from "react";
//#region src/stories/molecules/OtpField/OtpField.tsx
var c = o(function({ id: o, label: c, labelHidden: l, length: u, value: d, defaultValue: f, name: p, disabled: m, readOnly: h, error: g = !1, errorMessage: _, helperText: v, size: y, className: b, digitLabel: x, onChange: S, onComplete: C, onBlur: w }, T) {
	let E = r(l), D = e(y), O = s(), k = o ?? O, A = _ ? `${k}-error` : void 0, j = v ? `${k}-helper` : void 0, M = [A, j].filter(Boolean).join(" ") || void 0, N = g || !!_;
	return /* @__PURE__ */ a("div", {
		className: ["otp-field", b].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ i(n, {
				id: `${k}-label`,
				htmlFor: `${k}-0`,
				hidden: E,
				size: D,
				children: c
			}),
			/* @__PURE__ */ i(t, {
				ref: T,
				id: k,
				name: p,
				length: u,
				value: d,
				defaultValue: f,
				disabled: m,
				readOnly: h,
				error: N,
				size: D,
				digitLabel: x,
				"aria-labelledby": `${k}-label`,
				"aria-describedby": M,
				onChange: S,
				onComplete: C,
				onBlur: w
			}),
			_ && /* @__PURE__ */ i("span", {
				id: A,
				className: "otp-field__error",
				role: "alert",
				children: _
			}),
			v && /* @__PURE__ */ i("span", {
				id: j,
				className: "otp-field__helper",
				children: v
			})
		]
	});
});
//#endregion
export { c as OtpField };
