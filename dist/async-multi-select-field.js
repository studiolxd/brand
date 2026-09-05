'use client';
import './async-multi-select-field.css';
import { AsyncMultiSelect as e } from "./async-multi-select.js";
import { n as t } from "./_shared/form-size.js";
import { Label as n } from "./label.js";
import { n as r } from "./_shared/field-labels.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { forwardRef as o, useId as s } from "react";
//#region src/stories/molecules/AsyncMultiSelectField/AsyncMultiSelectField.tsx
var c = o(function({ id: o, label: c, labelHidden: l, onSearch: u, value: d, defaultValue: f, onValueChange: p, selectedOptions: m, placeholder: h, name: g, disabled: _, readOnly: v, size: y, debounceMs: b, required: x, error: S = !1, errorMessage: C, helperText: w, className: T, emptyMessage: E, removeLabel: D, loadingLabel: O, container: k, onBlur: A }, j) {
	let M = r(l), N = t(y), P = s(), F = o ?? P, I = C ? `${F}-error` : void 0, L = w ? `${F}-helper` : void 0, R = [I, L].filter(Boolean).join(" ") || void 0, z = S || !!C;
	return /* @__PURE__ */ a("div", {
		className: ["async-multi-select-field", T].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ i(n, {
				htmlFor: F,
				hidden: M,
				size: N,
				children: c
			}),
			/* @__PURE__ */ i(e, {
				ref: j,
				id: F,
				name: g,
				onSearch: u,
				value: d,
				defaultValue: f,
				onValueChange: p,
				selectedOptions: m,
				placeholder: h,
				disabled: _,
				readOnly: v,
				size: N,
				debounceMs: b,
				required: x,
				error: z,
				emptyMessage: E,
				removeLabel: D,
				loadingLabel: O,
				container: k,
				"aria-describedby": R,
				onBlur: A
			}),
			C && /* @__PURE__ */ i("span", {
				id: I,
				className: "async-multi-select-field__error",
				role: "alert",
				children: C
			}),
			w && /* @__PURE__ */ i("span", {
				id: L,
				className: "async-multi-select-field__helper",
				children: w
			})
		]
	});
});
//#endregion
export { c as AsyncMultiSelectField };
