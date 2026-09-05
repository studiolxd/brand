'use client';
import './multi-select-field.css';
import { n as e } from "./_shared/form-size.js";
import { Label as t } from "./label.js";
import { MultiSelect as n } from "./multi-select.js";
import { n as r } from "./_shared/field-labels.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { forwardRef as o, useId as s } from "react";
//#region src/stories/molecules/MultiSelectField/MultiSelectField.tsx
var c = o(function({ id: o, label: c, labelHidden: l, options: u, value: d, defaultValue: f, placeholder: p, name: m, disabled: h, readOnly: g, size: _, error: v = !1, errorMessage: y, helperText: b, className: x, removeLabel: S, onValueChange: C, onBlur: w }, T) {
	let E = r(l), D = e(_), O = s(), k = o ?? O, A = y ? `${k}-error` : void 0, j = b ? `${k}-helper` : void 0, M = [A, j].filter(Boolean).join(" ") || void 0, N = v || !!y;
	return /* @__PURE__ */ a("div", {
		className: ["multi-select-field", x].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ i(t, {
				id: `${k}-label`,
				htmlFor: k,
				hidden: E,
				size: D,
				children: c
			}),
			/* @__PURE__ */ i(n, {
				ref: T,
				id: k,
				"aria-labelledby": `${k}-label`,
				name: m,
				options: u,
				value: d,
				defaultValue: f,
				placeholder: p,
				disabled: h,
				readOnly: g,
				size: D,
				error: N,
				removeLabel: S,
				"aria-describedby": M,
				onValueChange: C,
				onBlur: w
			}),
			y && /* @__PURE__ */ i("span", {
				id: A,
				className: "multi-select-field__error",
				role: "alert",
				children: y
			}),
			b && /* @__PURE__ */ i("span", {
				id: j,
				className: "multi-select-field__helper",
				children: b
			})
		]
	});
});
//#endregion
export { c as MultiSelectField };
