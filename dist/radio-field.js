'use client';
import './radio-field.css';
import { n as e } from "./_shared/form-size.js";
import { n as t } from "./_shared/RadioGroupContext.js";
import { Radio as n } from "./radio.js";
import { forwardRef as r, useId as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/molecules/RadioField/RadioField.tsx
var s = r(function({ label: r, id: s, size: c, disabled: l, error: u = !1, errorMessage: d, helperText: f, className: p, ...m }, h) {
	let g = t(), _ = e(c ?? g?.size), v = i(), y = s ?? v, b = d ? `${y}-error` : void 0, x = f ? `${y}-helper` : void 0, S = [b, x].filter(Boolean).join(" ") || void 0, C = u || !!d || (g?.error ?? !1), w = l ?? g?.disabled;
	return /* @__PURE__ */ o("div", {
		className: [
			"radio-field",
			_ === "md" ? "" : `radio-field--${_}`,
			w ? "radio-field--disabled" : "",
			p
		].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ o("label", {
				className: "radio-field__control",
				htmlFor: y,
				children: [/* @__PURE__ */ a(n, {
					ref: h,
					...m,
					id: y,
					size: _,
					disabled: w,
					error: C,
					"aria-describedby": S
				}), /* @__PURE__ */ a("span", {
					className: "radio-field__label",
					children: r
				})]
			}),
			d && /* @__PURE__ */ a("span", {
				id: b,
				className: "radio-field__error",
				role: "alert",
				children: d
			}),
			f && /* @__PURE__ */ a("span", {
				id: x,
				className: "radio-field__helper",
				children: f
			})
		]
	});
});
//#endregion
export { s as RadioField };
