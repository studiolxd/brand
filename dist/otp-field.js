'use client';
import './otp-field.css';
import { n as e } from "./_shared/form-size.js";
import { OtpInput as t } from "./otp-input.js";
import { Label as n } from "./label.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { forwardRef as a, useId as o } from "react";
//#region src/stories/molecules/OtpField/OtpField.tsx
var s = a(function({ id: a, label: s, labelHidden: c = !1, length: l, value: u, defaultValue: d, name: f, disabled: p, readOnly: m, error: h = !1, errorMessage: g, helperText: _, size: v, className: y, digitLabel: b, onChange: x, onComplete: S, onBlur: C }, w) {
	let T = e(v), E = o(), D = a ?? E, O = g ? `${D}-error` : void 0, k = _ ? `${D}-helper` : void 0, A = [O, k].filter(Boolean).join(" ") || void 0, j = h || !!g;
	return /* @__PURE__ */ i("div", {
		className: ["otp-field", y].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ r(n, {
				id: `${D}-label`,
				htmlFor: `${D}-0`,
				hidden: c,
				size: T,
				children: s
			}),
			/* @__PURE__ */ r(t, {
				ref: w,
				id: D,
				name: f,
				length: l,
				value: u,
				defaultValue: d,
				disabled: p,
				readOnly: m,
				error: j,
				size: T,
				digitLabel: b,
				"aria-labelledby": `${D}-label`,
				"aria-describedby": A,
				onChange: x,
				onComplete: S,
				onBlur: C
			}),
			g && /* @__PURE__ */ r("span", {
				id: O,
				className: "otp-field__error",
				role: "alert",
				children: g
			}),
			_ && /* @__PURE__ */ r("span", {
				id: k,
				className: "otp-field__helper",
				children: _
			})
		]
	});
});
//#endregion
export { s as OtpField };
