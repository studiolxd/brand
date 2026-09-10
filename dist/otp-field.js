'use client';
import './otp-field.css';
import { n as e } from "./_shared/form-size.js";
import { ErrorText as t } from "./error-text.js";
import { OtpInput as n } from "./otp-input.js";
import { Label as r } from "./label.js";
import { n as i } from "./_shared/field-labels.js";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
import { forwardRef as s, useId as c } from "react";
//#region src/stories/molecules/OtpField/OtpField.tsx
var l = s(function({ id: s, label: l, labelHidden: u, length: d, value: f, defaultValue: p, name: m, disabled: h, readOnly: g, error: _ = !1, errorMessage: v, helperText: y, size: b, className: x, digitLabel: S, onChange: C, onComplete: w, onBlur: T }, E) {
	let D = i(u), O = e(b), k = c(), A = s ?? k, j = v ? `${A}-error` : void 0, M = y ? `${A}-helper` : void 0, N = [j, M].filter(Boolean).join(" ") || void 0, P = _ || !!v;
	return /* @__PURE__ */ o("div", {
		className: ["otp-field", x].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ a(r, {
				id: `${A}-label`,
				htmlFor: `${A}-0`,
				hidden: D,
				size: O,
				children: l
			}),
			/* @__PURE__ */ a(n, {
				ref: E,
				id: A,
				name: m,
				length: d,
				value: f,
				defaultValue: p,
				disabled: h,
				readOnly: g,
				error: P,
				size: O,
				digitLabel: S,
				"aria-labelledby": `${A}-label`,
				"aria-describedby": N,
				onChange: C,
				onComplete: w,
				onBlur: T
			}),
			v && /* @__PURE__ */ a(t, {
				id: j,
				children: v
			}),
			y && /* @__PURE__ */ a("span", {
				id: M,
				className: "otp-field__helper",
				children: y
			})
		]
	});
});
//#endregion
export { l as OtpField };
