'use client';
import './switcher-field.css';
import { VisuallyHidden as e } from "./visually-hidden.js";
import { n as t } from "./_shared/form-size.js";
import { ErrorText as n } from "./error-text.js";
import { Switcher as r } from "./switcher.js";
import { n as i } from "./_shared/field-labels.js";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
import { forwardRef as s, useId as c } from "react";
//#region src/stories/molecules/SwitcherField/SwitcherField.tsx
var l = s(function({ label: s, labelHidden: l, id: u, checked: d, defaultChecked: f, disabled: p, required: m, name: h, value: g, size: _, error: v = !1, errorMessage: y, helperText: b, className: x, onCheckedChange: S, onBlur: C }, w) {
	let T = i(l), E = t(_), D = c(), O = u ?? D, k = y ? `${O}-error` : void 0, A = b ? `${O}-helper` : void 0, j = [k, A].filter(Boolean).join(" ") || void 0, M = v || !!y;
	return /* @__PURE__ */ o("div", {
		className: [
			"switcher-field",
			E === "md" ? "" : `switcher-field--${E}`,
			p ? "switcher-field--disabled" : "",
			x
		].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ o("label", {
				className: "switcher-field__control",
				htmlFor: O,
				children: [/* @__PURE__ */ a(r, {
					ref: w,
					id: O,
					checked: d,
					defaultChecked: f,
					disabled: p,
					size: E,
					name: h,
					value: g,
					required: m,
					error: M,
					"aria-labelledby": `${O}-label`,
					"aria-describedby": j,
					onCheckedChange: S,
					onBlur: C
				}), T ? /* @__PURE__ */ a(e, {
					id: `${O}-label`,
					children: s
				}) : /* @__PURE__ */ a("span", {
					id: `${O}-label`,
					className: "switcher-field__label",
					children: s
				})]
			}),
			y && /* @__PURE__ */ a(n, {
				id: k,
				children: y
			}),
			b && /* @__PURE__ */ a("span", {
				id: A,
				className: "switcher-field__helper",
				children: b
			})
		]
	});
});
//#endregion
export { l as SwitcherField };
