'use client';
import './radio-field.css';
import { n as e } from "./_shared/form-size.js";
import { n as t } from "./_shared/RadioGroupContext.js";
import { Radio as n } from "./radio.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { forwardRef as a, useId as o } from "react";
//#region src/stories/molecules/RadioField/RadioField.tsx
var s = a(function({ label: a, id: s, size: c, disabled: l, error: u = !1, errorMessage: d, helperText: f, className: p, ...m }, h) {
	let g = t(), _ = e(c ?? g?.size), v = o(), y = s ?? v, b = d ? `${y}-error` : void 0, x = f ? `${y}-helper` : void 0, S = [b, x].filter(Boolean).join(" ") || void 0, C = u || !!d || (g?.error ?? !1), w = l ?? g?.disabled;
	return /* @__PURE__ */ i("div", {
		className: [
			"radio-field",
			_ === "md" ? "" : `radio-field--${_}`,
			w ? "radio-field--disabled" : "",
			p
		].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ i("label", {
				className: "radio-field__control",
				htmlFor: y,
				children: [/* @__PURE__ */ r(n, {
					ref: h,
					...m,
					id: y,
					size: _,
					disabled: w,
					error: C,
					"aria-describedby": S
				}), /* @__PURE__ */ r("span", {
					className: "radio-field__label",
					children: a
				})]
			}),
			d && /* @__PURE__ */ r("span", {
				id: b,
				className: "radio-field__error",
				role: "alert",
				children: d
			}),
			f && /* @__PURE__ */ r("span", {
				id: x,
				className: "radio-field__helper",
				children: f
			})
		]
	});
});
//#endregion
export { s as RadioField };
