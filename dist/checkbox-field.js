'use client';
import './checkbox-field.css';
import { VisuallyHidden as e } from "./visually-hidden.js";
import { n as t } from "./_shared/form-size.js";
import { Checkbox as n } from "./checkbox.js";
import { ErrorText as r } from "./error-text.js";
import { n as i } from "./_shared/field-labels.js";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
import { forwardRef as s, useId as c } from "react";
//#region src/stories/molecules/CheckboxField/CheckboxField.tsx
var l = s(function({ label: s, labelHidden: l, checked: u, defaultChecked: d, disabled: f, size: p, id: m, name: h, value: g, error: _ = !1, errorMessage: v, helperText: y, className: b, onCheckedChange: x, onBlur: S }, C) {
	let w = i(l), T = t(p), E = c(), D = m ?? E, O = v ? `${D}-error` : void 0, k = y ? `${D}-helper` : void 0, A = [O, k].filter(Boolean).join(" ") || void 0, j = _ || !!v;
	return /* @__PURE__ */ o("div", {
		className: [
			"checkbox-field",
			T === "md" ? "" : `checkbox-field--${T}`,
			f ? "checkbox-field--disabled" : "",
			b
		].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ o("label", {
				className: "checkbox-field__control",
				htmlFor: D,
				children: [/* @__PURE__ */ a(n, {
					ref: C,
					id: D,
					checked: u,
					defaultChecked: d,
					disabled: f,
					size: T,
					name: h,
					value: g,
					error: j,
					"aria-describedby": A,
					onCheckedChange: x,
					onBlur: S
				}), a(w ? e : "span", {
					className: "checkbox-field__label",
					children: s
				})]
			}),
			v && /* @__PURE__ */ a(r, {
				id: O,
				children: v
			}),
			y && /* @__PURE__ */ a("span", {
				id: k,
				className: "checkbox-field__helper",
				children: y
			})
		]
	});
});
//#endregion
export { l as CheckboxField };
