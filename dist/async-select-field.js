'use client';
import './async-select-field.css';
import { AsyncSelect as e } from "./async-select.js";
import { n as t } from "./_shared/form-size.js";
import { ErrorText as n } from "./error-text.js";
import { Label as r } from "./label.js";
import { n as i } from "./_shared/field-labels.js";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
import { forwardRef as s, useId as c } from "react";
//#region src/stories/molecules/AsyncSelectField/AsyncSelectField.tsx
var l = s(function({ id: s, label: l, labelHidden: u, onSearch: d, value: f, onValueChange: p, selectedOption: m, placeholder: h, name: g, disabled: _, readOnly: v, size: y, debounceMs: b, required: x, error: S = !1, errorMessage: C, helperText: w, className: T, emptyMessage: E, loadingLabel: D, clearLabel: O, container: k, onBlur: A }, j) {
	let M = i(u), N = t(y), P = c(), F = s ?? P, I = C ? `${F}-error` : void 0, L = w ? `${F}-helper` : void 0, R = [I, L].filter(Boolean).join(" ") || void 0, z = S || !!C;
	return /* @__PURE__ */ o("div", {
		className: ["async-select-field", T].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ a(r, {
				htmlFor: F,
				hidden: M,
				size: N,
				children: l
			}),
			/* @__PURE__ */ a(e, {
				ref: j,
				id: F,
				name: g,
				onSearch: d,
				value: f,
				onValueChange: p,
				selectedOption: m,
				placeholder: h,
				disabled: _,
				readOnly: v,
				size: N,
				debounceMs: b,
				required: x,
				error: z,
				emptyMessage: E,
				loadingLabel: D,
				clearLabel: O,
				container: k,
				"aria-describedby": R,
				onBlur: A
			}),
			C && /* @__PURE__ */ a(n, {
				id: I,
				children: C
			}),
			w && /* @__PURE__ */ a("span", {
				id: L,
				className: "async-select-field__helper",
				children: w
			})
		]
	});
});
//#endregion
export { l as AsyncSelectField };
