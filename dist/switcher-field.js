'use client';
import './switcher-field.css';
import { VisuallyHidden as e } from "./visually-hidden.js";
import { n as t } from "./_shared/form-size.js";
import { Switcher as n } from "./switcher.js";
import { forwardRef as r, useId as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/molecules/SwitcherField/SwitcherField.tsx
var s = r(function({ label: r, labelHidden: s = !1, id: c, checked: l, defaultChecked: u, disabled: d, required: f, name: p, value: m, size: h, error: g = !1, errorMessage: _, helperText: v, className: y, onCheckedChange: b, onBlur: x }, S) {
	let C = t(h), w = i(), T = c ?? w, E = _ ? `${T}-error` : void 0, D = v ? `${T}-helper` : void 0, O = [E, D].filter(Boolean).join(" ") || void 0, k = g || !!_;
	return /* @__PURE__ */ o("div", {
		className: [
			"switcher-field",
			C === "md" ? "" : `switcher-field--${C}`,
			d ? "switcher-field--disabled" : "",
			y
		].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ o("label", {
				className: "switcher-field__control",
				htmlFor: T,
				children: [/* @__PURE__ */ a(n, {
					ref: S,
					id: T,
					checked: l,
					defaultChecked: u,
					disabled: d,
					size: C,
					name: p,
					value: m,
					required: f,
					error: k,
					"aria-labelledby": `${T}-label`,
					"aria-describedby": O,
					onCheckedChange: b,
					onBlur: x
				}), s ? /* @__PURE__ */ a(e, {
					id: `${T}-label`,
					children: r
				}) : /* @__PURE__ */ a("span", {
					id: `${T}-label`,
					className: "switcher-field__label",
					children: r
				})]
			}),
			_ && /* @__PURE__ */ a("span", {
				id: E,
				className: "switcher-field__error",
				role: "alert",
				children: _
			}),
			v && /* @__PURE__ */ a("span", {
				id: D,
				className: "switcher-field__helper",
				children: v
			})
		]
	});
});
//#endregion
export { s as SwitcherField };
