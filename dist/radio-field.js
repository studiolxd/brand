'use client';
import './radio-field.css';
import { n as e } from "./_shared/form-size.js";
import { n as t } from "./_shared/radiogroupcontext.js";
import { Radio as n } from "./radio.js";
import { ErrorText as r } from "./error-text.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { forwardRef as o, useId as s } from "react";
//#region src/stories/molecules/RadioField/RadioField.tsx
var c = o(function({ label: o, id: c, size: l, disabled: u, error: d = !1, errorMessage: f, helperText: p, className: m, ...h }, g) {
	let _ = t(), v = e(l ?? _?.size), y = s(), b = c ?? y, x = f ? `${b}-error` : void 0, S = p ? `${b}-helper` : void 0, C = [x, S].filter(Boolean).join(" ") || void 0, w = d || !!f || (_?.error ?? !1), T = u ?? _?.disabled;
	return /* @__PURE__ */ a("div", {
		className: [
			"radio-field",
			v === "md" ? "" : `radio-field--${v}`,
			T ? "radio-field--disabled" : "",
			m
		].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ a("label", {
				className: "radio-field__control",
				htmlFor: b,
				children: [/* @__PURE__ */ i(n, {
					ref: g,
					...h,
					id: b,
					size: v,
					disabled: T,
					error: w,
					"aria-describedby": C
				}), /* @__PURE__ */ i("span", {
					className: "radio-field__label",
					children: o
				})]
			}),
			f && /* @__PURE__ */ i(r, {
				id: x,
				children: f
			}),
			p && /* @__PURE__ */ i("span", {
				id: S,
				className: "radio-field__helper",
				children: p
			})
		]
	});
});
//#endregion
export { c as RadioField };
