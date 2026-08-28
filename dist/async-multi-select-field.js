'use client';
import './async-multi-select-field.css';
import { AsyncMultiSelect as e } from "./async-multi-select.js";
import { n as t } from "./_shared/form-size.js";
import { Label as n } from "./label.js";
import { forwardRef as r, useId as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/molecules/AsyncMultiSelectField/AsyncMultiSelectField.tsx
var s = r(function({ id: r, label: s, labelHidden: c = !1, onSearch: l, value: u, defaultValue: d, onValueChange: f, selectedOptions: p, placeholder: m, name: h, disabled: g, readOnly: _, size: v, error: y = !1, errorMessage: b, helperText: x, className: S, emptyMessage: C, removeLabel: w, onBlur: T }, E) {
	let D = t(v), O = i(), k = r ?? O, A = b ? `${k}-error` : void 0, j = x ? `${k}-helper` : void 0, M = [A, j].filter(Boolean).join(" ") || void 0, N = y || !!b;
	return /* @__PURE__ */ o("div", {
		className: ["async-multi-select-field", S].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ a(n, {
				htmlFor: k,
				hidden: c,
				size: D,
				children: s
			}),
			/* @__PURE__ */ a(e, {
				ref: E,
				id: k,
				name: h,
				onSearch: l,
				value: u,
				defaultValue: d,
				onValueChange: f,
				selectedOptions: p,
				placeholder: m,
				disabled: g,
				readOnly: _,
				size: D,
				error: N,
				emptyMessage: C,
				removeLabel: w,
				"aria-describedby": M,
				onBlur: T
			}),
			b && /* @__PURE__ */ a("span", {
				id: A,
				className: "async-multi-select-field__error",
				role: "alert",
				children: b
			}),
			x && /* @__PURE__ */ a("span", {
				id: j,
				className: "async-multi-select-field__helper",
				children: x
			})
		]
	});
});
//#endregion
export { s as AsyncMultiSelectField };
