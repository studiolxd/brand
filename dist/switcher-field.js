'use client';
import './switcher-field.css';
import { VisuallyHidden as e } from "./visually-hidden.js";
import { n as t } from "./_shared/form-size.js";
import { Switcher as n } from "./switcher.js";
import { n as r } from "./_shared/field-labels.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { forwardRef as o, useId as s } from "react";
//#region src/stories/molecules/SwitcherField/SwitcherField.tsx
var c = o(function({ label: o, labelHidden: c, id: l, checked: u, defaultChecked: d, disabled: f, required: p, name: m, value: h, size: g, error: _ = !1, errorMessage: v, helperText: y, className: b, onCheckedChange: x, onBlur: S }, C) {
	let w = r(c), T = t(g), E = s(), D = l ?? E, O = v ? `${D}-error` : void 0, k = y ? `${D}-helper` : void 0, A = [O, k].filter(Boolean).join(" ") || void 0, j = _ || !!v;
	return /* @__PURE__ */ a("div", {
		className: [
			"switcher-field",
			T === "md" ? "" : `switcher-field--${T}`,
			f ? "switcher-field--disabled" : "",
			b
		].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ a("label", {
				className: "switcher-field__control",
				htmlFor: D,
				children: [/* @__PURE__ */ i(n, {
					ref: C,
					id: D,
					checked: u,
					defaultChecked: d,
					disabled: f,
					size: T,
					name: m,
					value: h,
					required: p,
					error: j,
					"aria-labelledby": `${D}-label`,
					"aria-describedby": A,
					onCheckedChange: x,
					onBlur: S
				}), w ? /* @__PURE__ */ i(e, {
					id: `${D}-label`,
					children: o
				}) : /* @__PURE__ */ i("span", {
					id: `${D}-label`,
					className: "switcher-field__label",
					children: o
				})]
			}),
			v && /* @__PURE__ */ i("span", {
				id: O,
				className: "switcher-field__error",
				role: "alert",
				children: v
			}),
			y && /* @__PURE__ */ i("span", {
				id: k,
				className: "switcher-field__helper",
				children: y
			})
		]
	});
});
//#endregion
export { c as SwitcherField };
