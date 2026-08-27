'use client';
import './radio-field.css';
import { n as e } from "./_shared/form-size.js";
import { Radio as t } from "./radio.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { forwardRef as i, useId as a } from "react";
//#region src/stories/molecules/RadioField/RadioField.tsx
var o = i(function({ label: i, id: o, size: s, disabled: c, error: l = !1, errorMessage: u, helperText: d, className: f, ...p }, m) {
	let h = e(s), g = a(), _ = o ?? g, v = u ? `${_}-error` : void 0, y = d ? `${_}-helper` : void 0, b = [v, y].filter(Boolean).join(" ") || void 0, x = l || !!u;
	return /* @__PURE__ */ r("div", {
		className: [
			"radio-field",
			h === "md" ? "" : `radio-field--${h}`,
			c ? "radio-field--disabled" : "",
			f
		].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ r("label", {
				className: "radio-field__control",
				htmlFor: _,
				children: [/* @__PURE__ */ n(t, {
					ref: m,
					...p,
					id: _,
					size: h,
					disabled: c,
					error: x,
					"aria-describedby": b
				}), /* @__PURE__ */ n("span", {
					className: "radio-field__label",
					children: i
				})]
			}),
			u && /* @__PURE__ */ n("span", {
				id: v,
				className: "radio-field__error",
				role: "alert",
				children: u
			}),
			d && /* @__PURE__ */ n("span", {
				id: y,
				className: "radio-field__helper",
				children: d
			})
		]
	});
});
//#endregion
export { o as RadioField };
