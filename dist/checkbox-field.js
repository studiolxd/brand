'use client';
import './checkbox-field.css';
import { VisuallyHidden as e } from "./visually-hidden.js";
import { n as t } from "./_shared/form-size.js";
import { Checkbox as n } from "./checkbox.js";
import { forwardRef as r, useId as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/molecules/CheckboxField/CheckboxField.tsx
var s = r(function({ label: r, labelHidden: s = !1, checked: c, defaultChecked: l, disabled: u, size: d, id: f, name: p, value: m, error: h = !1, errorMessage: g, helperText: _, className: v, onCheckedChange: y, onBlur: b }, x) {
	let S = t(d), C = i(), w = f ?? C, T = g ? `${w}-error` : void 0, E = _ ? `${w}-helper` : void 0, D = [T, E].filter(Boolean).join(" ") || void 0, O = h || !!g;
	return /* @__PURE__ */ o("div", {
		className: [
			"checkbox-field",
			S === "md" ? "" : `checkbox-field--${S}`,
			u ? "checkbox-field--disabled" : "",
			v
		].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ o("label", {
				className: "checkbox-field__control",
				htmlFor: w,
				children: [/* @__PURE__ */ a(n, {
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
				}), a(s ? e : "span", {
					className: "checkbox-field__label",
					children: r
				})]
			}),
			g && /* @__PURE__ */ a("span", {
				id: T,
				className: "checkbox-field__error",
				role: "alert",
				children: g
			}),
			_ && /* @__PURE__ */ a("span", {
				id: E,
				className: "checkbox-field__helper",
				children: _
			})
		]
	});
});
//#endregion
export { s as CheckboxField };
