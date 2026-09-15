'use client';
import './radio-field.css';
import { n as e } from "./_shared/form-size.js";
import { n as t } from "./_shared/radiogroupcontext.js";
import { Radio as n } from "./radio.js";
import { ErrorText as r } from "./error-text.js";
import { forwardRef as i, useId as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/molecules/RadioField/RadioField.tsx
var c = i(function({ label: i, id: c, size: l, disabled: u, error: d = !1, errorMessage: f, helperText: p, className: m, ...h }, g) {
	let _ = t(), v = e(l ?? _?.size), y = a(), b = c ?? y, x = f ? `${b}-error` : void 0, S = p ? `${b}-helper` : void 0, C = [x, S].filter(Boolean).join(" ") || void 0, w = d || !!f || (_?.error ?? !1), T = u ?? _?.disabled;
	return /* @__PURE__ */ s("div", {
		className: [
			"radio-field",
			v === "md" ? "" : `radio-field--${v}`,
			T ? "radio-field--disabled" : "",
			m
		].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ s("label", {
				className: "radio-field__control",
				htmlFor: b,
				children: [/* @__PURE__ */ o(n, {
					ref: g,
					...h,
					id: b,
					size: v,
					disabled: T,
					error: w,
					"aria-describedby": C
				}), /* @__PURE__ */ o("span", {
					className: "radio-field__label",
					children: i
				})]
			}),
			f && /* @__PURE__ */ o(r, {
				id: x,
				children: f
			}),
			p && /* @__PURE__ */ o("span", {
				id: S,
				className: "radio-field__helper",
				children: p
			})
		]
	});
});
//#endregion
export { c as RadioField };
