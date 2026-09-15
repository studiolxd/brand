'use client';
import './checkbox-field.css';
import { VisuallyHidden as e } from "./visually-hidden.js";
import { n as t } from "./_shared/form-size.js";
import { Checkbox as n } from "./checkbox.js";
import { ErrorText as r } from "./error-text.js";
import { n as i } from "./_shared/field-labels.js";
import { forwardRef as a, useId as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/stories/molecules/CheckboxField/CheckboxField.tsx
var l = a(function({ label: a, labelHidden: l, checked: u, defaultChecked: d, disabled: f, size: p, id: m, name: h, value: g, error: _ = !1, errorMessage: v, helperText: y, className: b, onCheckedChange: x, onBlur: S }, C) {
	let w = i(l), T = t(p), E = o(), D = m ?? E, O = v ? `${D}-error` : void 0, k = y ? `${D}-helper` : void 0, A = [O, k].filter(Boolean).join(" ") || void 0, j = _ || !!v;
	return /* @__PURE__ */ c("div", {
		className: [
			"checkbox-field",
			T === "md" ? "" : `checkbox-field--${T}`,
			f ? "checkbox-field--disabled" : "",
			b
		].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ c("label", {
				className: "checkbox-field__control",
				htmlFor: D,
				children: [/* @__PURE__ */ s(n, {
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
				}), s(w ? e : "span", {
					className: "checkbox-field__label",
					children: a
				})]
			}),
			v && /* @__PURE__ */ s(r, {
				id: O,
				children: v
			}),
			y && /* @__PURE__ */ s("span", {
				id: k,
				className: "checkbox-field__helper",
				children: y
			})
		]
	});
});
//#endregion
export { l as CheckboxField };
