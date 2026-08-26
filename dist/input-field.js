'use client';
import './input-field.css';
import { n as e } from "./_shared/form-size.js";
import { Input as t } from "./input.js";
import { Label as n } from "./label.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { forwardRef as a } from "react";
//#region src/stories/molecules/InputField/InputField.tsx
var o = a(function({ id: a, label: o, labelHidden: s = !1, name: c, type: l, placeholder: u, value: d, defaultValue: f, disabled: p, readOnly: m, size: h, error: g = !1, errorMessage: _, helperText: v, onChange: y, onBlur: b, onFocus: x, className: S, ...C }, w) {
	let T = e(h), E = _ ? `${a}-error` : void 0, D = v ? `${a}-helper` : void 0, O = [E, D].filter(Boolean).join(" ") || void 0, k = g || !!_;
	return /* @__PURE__ */ i("div", {
		className: ["input-field", S].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ r(n, {
				htmlFor: a,
				hidden: s,
				size: T,
				children: o
			}),
			/* @__PURE__ */ r(t, {
				ref: w,
				...C,
				id: a,
				name: c,
				type: l,
				placeholder: u ?? (s ? o : void 0),
				value: d,
				defaultValue: f,
				disabled: p,
				readOnly: m,
				size: T,
				error: k,
				"aria-describedby": O,
				onChange: y,
				onBlur: b,
				onFocus: x
			}),
			_ && /* @__PURE__ */ r("span", {
				id: E,
				className: "input-field__error",
				role: "alert",
				children: _
			}),
			v && /* @__PURE__ */ r("span", {
				id: D,
				className: "input-field__helper",
				children: v
			})
		]
	});
});
//#endregion
export { o as InputField };
