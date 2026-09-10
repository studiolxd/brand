'use client';
import './textarea-field.css';
import { n as e } from "./_shared/form-size.js";
import { ErrorText as t } from "./error-text.js";
import { Label as n } from "./label.js";
import { Textarea as r } from "./textarea.js";
import { n as i } from "./_shared/field-labels.js";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
import { forwardRef as s } from "react";
//#region src/stories/molecules/TextareaField/TextareaField.tsx
var c = s(function({ id: s, label: c, labelHidden: l, name: u, placeholder: d, value: f, defaultValue: p, rows: m, disabled: h, readOnly: g, size: _, error: v = !1, errorMessage: y, helperText: b, onChange: x, onBlur: S, onFocus: C, className: w, ...T }, E) {
	let D = i(l), O = e(_), k = y ? `${s}-error` : void 0, A = b ? `${s}-helper` : void 0, j = [k, A].filter(Boolean).join(" ") || void 0, M = v || !!y;
	return /* @__PURE__ */ o("div", {
		className: ["textarea-field", w].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ a(n, {
				htmlFor: s,
				hidden: D,
				size: O,
				children: c
			}),
			/* @__PURE__ */ a(r, {
				ref: E,
				...T,
				id: s,
				name: u,
				placeholder: d ?? (D ? c : void 0),
				value: f,
				defaultValue: p,
				rows: m,
				disabled: h,
				readOnly: g,
				size: O,
				error: M,
				"aria-describedby": j,
				onChange: x,
				onBlur: S,
				onFocus: C
			}),
			y && /* @__PURE__ */ a(t, {
				id: k,
				children: y
			}),
			b && /* @__PURE__ */ a("span", {
				id: A,
				className: "textarea-field__helper",
				children: b
			})
		]
	});
});
//#endregion
export { c as TextareaField };
