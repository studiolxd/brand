'use client';
import './otp-field.css';
import { n as e } from "./_shared/form-size.js";
import { OtpInput as t } from "./otp-input.js";
import { Label as n } from "./label.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/molecules/OtpField/OtpField.tsx
function a({ id: a, label: o, labelHidden: s = !1, length: c, value: l, defaultValue: u, onChange: d, onComplete: f, disabled: p, readOnly: m, error: h = !1, errorMessage: g, helperText: _, size: v }) {
	let y = e(v), b = g ? `${a}-error` : void 0, x = _ ? `${a}-helper` : void 0, S = [b, x].filter(Boolean).join(" ") || void 0;
	return /* @__PURE__ */ i("div", {
		className: "otp-field",
		"data-size": y,
		children: [
			/* @__PURE__ */ r(n, {
				htmlFor: `${a}-0`,
				hidden: s,
				size: y,
				children: o
			}),
			/* @__PURE__ */ r(t, {
				id: a,
				length: c,
				value: l,
				defaultValue: u,
				onChange: d,
				onComplete: f,
				disabled: p,
				readOnly: m,
				error: h || !!g,
				size: y,
				describedBy: S
			}),
			g && /* @__PURE__ */ r("span", {
				id: b,
				className: "otp-field__error",
				role: "alert",
				children: g
			}),
			_ && /* @__PURE__ */ r("span", {
				id: x,
				className: "otp-field__helper",
				children: _
			})
		]
	});
}
//#endregion
export { a as OtpField };
