'use client';
import './multi-select-field.css';
import { n as e } from "./_shared/form-size.js";
import { Label as t } from "./label.js";
import { MultiSelect as n } from "./multi-select.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { forwardRef as a, useId as o } from "react";
//#region src/stories/molecules/MultiSelectField/MultiSelectField.tsx
var s = a(function({ id: a, label: s, labelHidden: c = !1, options: l, value: u, defaultValue: d, placeholder: f, name: p, disabled: m, readOnly: h, size: g, error: _ = !1, errorMessage: v, helperText: y, className: b, removeLabel: x, onValueChange: S, onBlur: C }, w) {
	let T = e(g), E = o(), D = a ?? E, O = v ? `${D}-error` : void 0, k = y ? `${D}-helper` : void 0, A = [O, k].filter(Boolean).join(" ") || void 0, j = _ || !!v;
	return /* @__PURE__ */ i("div", {
		className: ["multi-select-field", b].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ r(t, {
				id: `${D}-label`,
				htmlFor: D,
				hidden: c,
				size: T,
				children: s
			}),
			/* @__PURE__ */ r(n, {
				ref: w,
				id: D,
				"aria-labelledby": `${D}-label`,
				name: p,
				options: l,
				value: u,
				defaultValue: d,
				placeholder: f,
				disabled: m,
				readOnly: h,
				size: T,
				error: j,
				removeLabel: x,
				"aria-describedby": A,
				onValueChange: S,
				onBlur: C
			}),
			v && /* @__PURE__ */ r("span", {
				id: O,
				className: "multi-select-field__error",
				role: "alert",
				children: v
			}),
			y && /* @__PURE__ */ r("span", {
				id: k,
				className: "multi-select-field__helper",
				children: y
			})
		]
	});
});
//#endregion
export { s as MultiSelectField };
