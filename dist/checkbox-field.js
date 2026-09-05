'use client';
import './checkbox-field.css';
import { VisuallyHidden as e } from "./visually-hidden.js";
import { n as t } from "./_shared/form-size.js";
import { Checkbox as n } from "./checkbox.js";
import { n as r } from "./_shared/field-labels.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { forwardRef as o, useId as s } from "react";
//#region src/stories/molecules/CheckboxField/CheckboxField.tsx
var c = o(function({ label: o, labelHidden: c, checked: l, defaultChecked: u, disabled: d, size: f, id: p, name: m, value: h, error: g = !1, errorMessage: _, helperText: v, className: y, onCheckedChange: b, onBlur: x }, S) {
	let C = r(c), w = t(f), T = s(), E = p ?? T, D = _ ? `${E}-error` : void 0, O = v ? `${E}-helper` : void 0, k = [D, O].filter(Boolean).join(" ") || void 0, A = g || !!_;
	return /* @__PURE__ */ a("div", {
		className: [
			"checkbox-field",
			w === "md" ? "" : `checkbox-field--${w}`,
			d ? "checkbox-field--disabled" : "",
			y
		].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ a("label", {
				className: "checkbox-field__control",
				htmlFor: E,
				children: [/* @__PURE__ */ i(n, {
					ref: S,
					id: E,
					checked: l,
					defaultChecked: u,
					disabled: d,
					size: w,
					name: m,
					value: h,
					error: A,
					"aria-describedby": k,
					onCheckedChange: b,
					onBlur: x
				}), i(C ? e : "span", {
					className: "checkbox-field__label",
					children: o
				})]
			}),
			_ && /* @__PURE__ */ i("span", {
				id: D,
				className: "checkbox-field__error",
				role: "alert",
				children: _
			}),
			v && /* @__PURE__ */ i("span", {
				id: O,
				className: "checkbox-field__helper",
				children: v
			})
		]
	});
});
//#endregion
export { c as CheckboxField };
