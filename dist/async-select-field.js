'use client';
import './async-select-field.css';
import { AsyncSelect as e } from "./async-select.js";
import { n as t } from "./_shared/form-size.js";
import { Label as n } from "./label.js";
import { n as r } from "./_shared/field-labels.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { forwardRef as o, useId as s } from "react";
//#region src/stories/molecules/AsyncSelectField/AsyncSelectField.tsx
var c = o(function({ id: o, label: c, labelHidden: l, onSearch: u, value: d, onValueChange: f, selectedOption: p, placeholder: m, name: h, disabled: g, readOnly: _, size: v, debounceMs: y, required: b, error: x = !1, errorMessage: S, helperText: C, className: w, emptyMessage: T, loadingLabel: E, clearLabel: D, container: O, onBlur: k }, A) {
	let j = r(l), M = t(v), N = s(), P = o ?? N, F = S ? `${P}-error` : void 0, I = C ? `${P}-helper` : void 0, L = [F, I].filter(Boolean).join(" ") || void 0, R = x || !!S;
	return /* @__PURE__ */ a("div", {
		className: ["async-select-field", w].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ i(n, {
				htmlFor: P,
				hidden: j,
				size: M,
				children: c
			}),
			/* @__PURE__ */ i(e, {
				ref: A,
				id: P,
				name: h,
				onSearch: u,
				value: d,
				onValueChange: f,
				selectedOption: p,
				placeholder: m,
				disabled: g,
				readOnly: _,
				size: M,
				debounceMs: y,
				required: b,
				error: R,
				emptyMessage: T,
				loadingLabel: E,
				clearLabel: D,
				container: O,
				"aria-describedby": L,
				onBlur: k
			}),
			S && /* @__PURE__ */ i("span", {
				id: F,
				className: "async-select-field__error",
				role: "alert",
				children: S
			}),
			C && /* @__PURE__ */ i("span", {
				id: I,
				className: "async-select-field__helper",
				children: C
			})
		]
	});
});
//#endregion
export { c as AsyncSelectField };
