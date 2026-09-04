'use client';
import './checkbox-field.css';
import { VisuallyHidden as e } from "./visually-hidden.js";
import { n as t } from "./_shared/form-size.js";
import { Checkbox as n } from "./checkbox.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { forwardRef as a, useId as o } from "react";
//#region src/stories/molecules/CheckboxField/CheckboxField.tsx
var s = a(function({ label: a, labelHidden: s = !1, checked: c, defaultChecked: l, disabled: u, size: d, id: f, name: p, value: m, error: h = !1, errorMessage: g, helperText: _, className: v, onCheckedChange: y, onBlur: b }, x) {
	let S = t(d), C = o(), w = f ?? C, T = g ? `${w}-error` : void 0, E = _ ? `${w}-helper` : void 0, D = [T, E].filter(Boolean).join(" ") || void 0, O = h || !!g;
	return /* @__PURE__ */ i("div", {
		className: [
			"checkbox-field",
			S === "md" ? "" : `checkbox-field--${S}`,
			u ? "checkbox-field--disabled" : "",
			v
		].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ i("label", {
				className: "checkbox-field__control",
				htmlFor: w,
				children: [/* @__PURE__ */ r(n, {
					ref: x,
					id: w,
					checked: c,
					defaultChecked: l,
					disabled: u,
					size: S,
					name: p,
					value: m,
					error: O,
					"aria-describedby": D,
					onCheckedChange: y,
					onBlur: b
				}), r(s ? e : "span", {
					className: "checkbox-field__label",
					children: a
				})]
			}),
			g && /* @__PURE__ */ r("span", {
				id: T,
				className: "checkbox-field__error",
				role: "alert",
				children: g
			}),
			_ && /* @__PURE__ */ r("span", {
				id: E,
				className: "checkbox-field__helper",
				children: _
			})
		]
	});
});
//#endregion
export { s as CheckboxField };
