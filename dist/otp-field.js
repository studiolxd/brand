'use client';
import './otp-field.css';
import { OtpInput as e } from "./otp-input.js";
import { Label as t } from "./label.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/molecules/OtpField/OtpField.tsx
function i({ id: i, label: a, labelHidden: o = !1, length: s, value: c, defaultValue: l, onChange: u, onComplete: d, disabled: f, readOnly: p, error: m = !1, errorMessage: h, helperText: g, size: _ = "md" }) {
	let v = h ? `${i}-error` : void 0, y = g ? `${i}-helper` : void 0, b = [v, y].filter(Boolean).join(" ") || void 0;
	return /* @__PURE__ */ r("div", {
		className: "otp-field",
		"data-size": _,
		children: [
			/* @__PURE__ */ n(t, {
				htmlFor: `${i}-0`,
				hidden: o,
				children: a
			}),
			/* @__PURE__ */ n(e, {
				id: i,
				length: s,
				value: c,
				defaultValue: l,
				onChange: u,
				onComplete: d,
				disabled: f,
				readOnly: p,
				error: m || !!h,
				size: _,
				describedBy: b
			}),
			h && /* @__PURE__ */ n("span", {
				id: v,
				className: "otp-field__error",
				role: "alert",
				children: h
			}),
			g && /* @__PURE__ */ n("span", {
				id: y,
				className: "otp-field__helper",
				children: g
			})
		]
	});
}
//#endregion
export { i as OtpField };
