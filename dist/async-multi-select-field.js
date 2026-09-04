'use client';
import './async-multi-select-field.css';
import { AsyncMultiSelect as e } from "./async-multi-select.js";
import { n as t } from "./_shared/form-size.js";
import { Label as n } from "./label.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { forwardRef as a, useId as o } from "react";
//#region src/stories/molecules/AsyncMultiSelectField/AsyncMultiSelectField.tsx
var s = a(function({ id: a, label: s, labelHidden: c = !1, onSearch: l, value: u, defaultValue: d, onValueChange: f, selectedOptions: p, placeholder: m, name: h, disabled: g, readOnly: _, size: v, debounceMs: y, required: b, error: x = !1, errorMessage: S, helperText: C, className: w, emptyMessage: T, removeLabel: E, loadingLabel: D, container: O, onBlur: k }, A) {
	let j = t(v), M = o(), N = a ?? M, P = S ? `${N}-error` : void 0, F = C ? `${N}-helper` : void 0, I = [P, F].filter(Boolean).join(" ") || void 0, L = x || !!S;
	return /* @__PURE__ */ i("div", {
		className: ["async-multi-select-field", w].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ r(n, {
				htmlFor: N,
				hidden: c,
				size: j,
				children: s
			}),
			/* @__PURE__ */ r(e, {
				ref: A,
				id: N,
				name: h,
				onSearch: l,
				value: u,
				defaultValue: d,
				onValueChange: f,
				selectedOptions: p,
				placeholder: m,
				disabled: g,
				readOnly: _,
				size: j,
				debounceMs: y,
				required: b,
				error: L,
				emptyMessage: T,
				removeLabel: E,
				loadingLabel: D,
				container: O,
				"aria-describedby": I,
				onBlur: k
			}),
			S && /* @__PURE__ */ r("span", {
				id: P,
				className: "async-multi-select-field__error",
				role: "alert",
				children: S
			}),
			C && /* @__PURE__ */ r("span", {
				id: F,
				className: "async-multi-select-field__helper",
				children: C
			})
		]
	});
});
//#endregion
export { s as AsyncMultiSelectField };
