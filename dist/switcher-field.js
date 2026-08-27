'use client';
import './switcher-field.css';
import { n as e } from "./_shared/form-size.js";
import { Switcher as t } from "./switcher.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { forwardRef as i, useId as a } from "react";
//#region src/stories/molecules/SwitcherField/SwitcherField.tsx
var o = i(function({ label: i, id: o, checked: s, defaultChecked: c, disabled: l, required: u, name: d, value: f, size: p, error: m = !1, errorMessage: h, helperText: g, className: _, onCheckedChange: v, onBlur: y }, b) {
	let x = e(p), S = a(), C = o ?? S, w = h ? `${C}-error` : void 0, T = g ? `${C}-helper` : void 0, E = [w, T].filter(Boolean).join(" ") || void 0, D = m || !!h;
	return /* @__PURE__ */ r("div", {
		className: [
			"switcher-field",
			x === "md" ? "" : `switcher-field--${x}`,
			l ? "switcher-field--disabled" : "",
			_
		].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ r("label", {
				className: "switcher-field__control",
				htmlFor: C,
				children: [/* @__PURE__ */ n(t, {
					ref: b,
					id: C,
					checked: s,
					defaultChecked: c,
					disabled: l,
					size: x,
					name: d,
					value: f,
					required: u,
					error: D,
					"aria-labelledby": `${C}-label`,
					"aria-describedby": E,
					onCheckedChange: v,
					onBlur: y
				}), /* @__PURE__ */ n("span", {
					id: `${C}-label`,
					className: "switcher-field__label",
					children: i
				})]
			}),
			h && /* @__PURE__ */ n("span", {
				id: w,
				className: "switcher-field__error",
				role: "alert",
				children: h
			}),
			g && /* @__PURE__ */ n("span", {
				id: T,
				className: "switcher-field__helper",
				children: g
			})
		]
	});
});
//#endregion
export { o as SwitcherField };
