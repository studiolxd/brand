'use client';
import './checkbox-field.css';
import { n as e } from "./_shared/form-size.js";
import { Checkbox as t } from "./checkbox.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { forwardRef as i, useId as a } from "react";
//#region src/stories/molecules/CheckboxField/CheckboxField.tsx
var o = i(function({ label: i, checked: o, defaultChecked: s, disabled: c, size: l, id: u, name: d, value: f, error: p = !1, errorMessage: m, helperText: h, className: g, onCheckedChange: _, onBlur: v }, y) {
	let b = e(l), x = a(), S = u ?? x, C = m ? `${S}-error` : void 0, w = h ? `${S}-helper` : void 0, T = [C, w].filter(Boolean).join(" ") || void 0, E = p || !!m;
	return /* @__PURE__ */ r("div", {
		className: [
			"checkbox-field",
			b === "md" ? "" : `checkbox-field--${b}`,
			c ? "checkbox-field--disabled" : "",
			g
		].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ r("label", {
				className: "checkbox-field__control",
				htmlFor: S,
				children: [/* @__PURE__ */ n(t, {
					ref: y,
					id: S,
					checked: o,
					defaultChecked: s,
					disabled: c,
					size: b,
					name: d,
					value: f,
					error: E,
					"aria-describedby": T,
					onCheckedChange: _,
					onBlur: v
				}), /* @__PURE__ */ n("span", {
					className: "checkbox-field__label",
					children: i
				})]
			}),
			m && /* @__PURE__ */ n("span", {
				id: C,
				className: "checkbox-field__error",
				role: "alert",
				children: m
			}),
			h && /* @__PURE__ */ n("span", {
				id: w,
				className: "checkbox-field__helper",
				children: h
			})
		]
	});
});
//#endregion
export { o as CheckboxField };
