'use client';
import './textarea-field.css';
import { n as e } from "./_shared/form-size.js";
import { Label as t } from "./label.js";
import { Textarea as n } from "./textarea.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { forwardRef as a } from "react";
//#region src/stories/molecules/TextareaField/TextareaField.tsx
var o = a(function({ id: a, label: o, labelHidden: s = !1, name: c, placeholder: l, value: u, defaultValue: d, rows: f, disabled: p, readOnly: m, size: h, error: g = !1, errorMessage: _, helperText: v, onChange: y, onBlur: b, onFocus: x, className: S, ...C }, w) {
	let T = e(h), E = _ ? `${a}-error` : void 0, D = v ? `${a}-helper` : void 0, O = [E, D].filter(Boolean).join(" ") || void 0, k = g || !!_;
	return /* @__PURE__ */ i("div", {
		className: ["textarea-field", S].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ r(t, {
				htmlFor: a,
				hidden: s,
				size: T,
				children: o
			}),
			/* @__PURE__ */ r(n, {
				ref: w,
				...C,
				id: a,
				name: c,
				placeholder: l ?? (s ? o : void 0),
				value: u,
				defaultValue: d,
				rows: f,
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
				className: "textarea-field__error",
				role: "alert",
				children: _
			}),
			v && /* @__PURE__ */ r("span", {
				id: D,
				className: "textarea-field__helper",
				children: v
			})
		]
	});
});
//#endregion
export { o as TextareaField };
