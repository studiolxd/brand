'use client';
import './multi-select-field.css';
import { n as e } from "./_shared/form-size.js";
import { ErrorText as t } from "./error-text.js";
import { Label as n } from "./label.js";
import { MultiSelect as r } from "./multi-select.js";
import { n as i } from "./_shared/field-labels.js";
import { forwardRef as a, useId as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/stories/molecules/MultiSelectField/MultiSelectField.tsx
var l = a(function({ id: a, label: l, labelHidden: u, options: d, value: f, defaultValue: p, placeholder: m, name: h, disabled: g, readOnly: _, size: v, error: y = !1, errorMessage: b, helperText: x, className: S, removeLabel: C, onValueChange: w, onBlur: T }, E) {
	let D = i(u), O = e(v), k = o(), A = a ?? k, j = b ? `${A}-error` : void 0, M = x ? `${A}-helper` : void 0, N = [j, M].filter(Boolean).join(" ") || void 0, P = y || !!b;
	return /* @__PURE__ */ c("div", {
		className: ["multi-select-field", S].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ s(n, {
				id: `${A}-label`,
				htmlFor: A,
				hidden: D,
				size: O,
				children: l
			}),
			/* @__PURE__ */ s(r, {
				ref: E,
				id: A,
				"aria-labelledby": `${A}-label`,
				name: h,
				options: d,
				value: f,
				defaultValue: p,
				placeholder: m,
				disabled: g,
				readOnly: _,
				size: O,
				error: P,
				removeLabel: C,
				"aria-describedby": N,
				onValueChange: w,
				onBlur: T
			}),
			b && /* @__PURE__ */ s(t, {
				id: j,
				children: b
			}),
			x && /* @__PURE__ */ s("span", {
				id: M,
				className: "multi-select-field__helper",
				children: x
			})
		]
	});
});
//#endregion
export { l as MultiSelectField };
