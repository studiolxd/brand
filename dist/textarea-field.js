'use client';
import './textarea-field.css';
import { n as e } from "./_shared/form-size.js";
import { Label as t } from "./label.js";
import { Textarea as n } from "./textarea.js";
import { n as r } from "./_shared/field-labels.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { forwardRef as o } from "react";
//#region src/stories/molecules/TextareaField/TextareaField.tsx
var s = o(function({ id: o, label: s, labelHidden: c, name: l, placeholder: u, value: d, defaultValue: f, rows: p, disabled: m, readOnly: h, size: g, error: _ = !1, errorMessage: v, helperText: y, onChange: b, onBlur: x, onFocus: S, className: C, ...w }, T) {
	let E = r(c), D = e(g), O = v ? `${o}-error` : void 0, k = y ? `${o}-helper` : void 0, A = [O, k].filter(Boolean).join(" ") || void 0, j = _ || !!v;
	return /* @__PURE__ */ a("div", {
		className: ["textarea-field", C].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ i(t, {
				htmlFor: o,
				hidden: E,
				size: D,
				children: s
			}),
			/* @__PURE__ */ i(n, {
				ref: T,
				...w,
				id: o,
				name: l,
				placeholder: u ?? (E ? s : void 0),
				value: d,
				defaultValue: f,
				rows: p,
				disabled: m,
				readOnly: h,
				size: D,
				error: j,
				"aria-describedby": A,
				onChange: b,
				onBlur: x,
				onFocus: S
			}),
			v && /* @__PURE__ */ i("span", {
				id: O,
				className: "textarea-field__error",
				role: "alert",
				children: v
			}),
			y && /* @__PURE__ */ i("span", {
				id: k,
				className: "textarea-field__helper",
				children: y
			})
		]
	});
});
//#endregion
export { s as TextareaField };
