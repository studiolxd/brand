'use client';
import './textarea-field.css';
import { n as e } from "./_shared/form-size.js";
import { ErrorText as t } from "./error-text.js";
import { Label as n } from "./label.js";
import { Textarea as r } from "./textarea.js";
import { n as i } from "./_shared/field-labels.js";
import { forwardRef as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/molecules/TextareaField/TextareaField.tsx
var c = a(function({ id: a, label: c, labelHidden: l, name: u, placeholder: d, value: f, defaultValue: p, rows: m, disabled: h, readOnly: g, size: _, error: v = !1, errorMessage: y, helperText: b, onChange: x, onBlur: S, onFocus: C, className: w, ...T }, E) {
	let D = i(l), O = e(_), k = y ? `${a}-error` : void 0, A = b ? `${a}-helper` : void 0, j = [k, A].filter(Boolean).join(" ") || void 0, M = v || !!y;
	return /* @__PURE__ */ s("div", {
		className: ["textarea-field", w].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ o(n, {
				htmlFor: a,
				hidden: D,
				size: O,
				children: c
			}),
			/* @__PURE__ */ o(r, {
				ref: E,
				...T,
				id: a,
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
			y && /* @__PURE__ */ o(t, {
				id: k,
				children: y
			}),
			b && /* @__PURE__ */ o("span", {
				id: A,
				className: "textarea-field__helper",
				children: b
			})
		]
	});
});
//#endregion
export { c as TextareaField };
