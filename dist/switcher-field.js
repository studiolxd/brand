'use client';
import './switcher-field.css';
import { VisuallyHidden as e } from "./visually-hidden.js";
import { n as t } from "./_shared/form-size.js";
import { Switcher as n } from "./switcher.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { forwardRef as a, useId as o } from "react";
//#region src/stories/molecules/SwitcherField/SwitcherField.tsx
var s = a(function({ label: a, labelHidden: s = !1, id: c, checked: l, defaultChecked: u, disabled: d, required: f, name: p, value: m, size: h, error: g = !1, errorMessage: _, helperText: v, className: y, onCheckedChange: b, onBlur: x }, S) {
	let C = t(h), w = o(), T = c ?? w, E = _ ? `${T}-error` : void 0, D = v ? `${T}-helper` : void 0, O = [E, D].filter(Boolean).join(" ") || void 0, k = g || !!_;
	return /* @__PURE__ */ i("div", {
		className: [
			"switcher-field",
			C === "md" ? "" : `switcher-field--${C}`,
			d ? "switcher-field--disabled" : "",
			y
		].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ i("label", {
				className: "switcher-field__control",
				htmlFor: T,
				children: [/* @__PURE__ */ r(n, {
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
				}), s ? /* @__PURE__ */ r(e, {
					id: `${T}-label`,
					children: a
				}) : /* @__PURE__ */ r("span", {
					id: `${T}-label`,
					className: "switcher-field__label",
					children: a
				})]
			}),
			_ && /* @__PURE__ */ r("span", {
				id: E,
				className: "switcher-field__error",
				role: "alert",
				children: _
			}),
			v && /* @__PURE__ */ r("span", {
				id: D,
				className: "switcher-field__helper",
				children: v
			})
		]
	});
});
//#endregion
export { s as SwitcherField };
