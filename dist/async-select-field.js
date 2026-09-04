'use client';
import './async-select-field.css';
import { AsyncSelect as e } from "./async-select.js";
import { n as t } from "./_shared/form-size.js";
import { Label as n } from "./label.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { forwardRef as a, useId as o } from "react";
//#region src/stories/molecules/AsyncSelectField/AsyncSelectField.tsx
var s = a(function({ id: a, label: s, labelHidden: c = !1, onSearch: l, value: u, onValueChange: d, selectedOption: f, placeholder: p, name: m, disabled: h, readOnly: g, size: _, debounceMs: v, required: y, error: b = !1, errorMessage: x, helperText: S, className: C, emptyMessage: w, loadingLabel: T, clearLabel: E, container: D, onBlur: O }, k) {
	let A = t(_), j = o(), M = a ?? j, N = x ? `${M}-error` : void 0, P = S ? `${M}-helper` : void 0, F = [N, P].filter(Boolean).join(" ") || void 0, I = b || !!x;
	return /* @__PURE__ */ i("div", {
		className: ["async-select-field", C].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ r(n, {
				htmlFor: M,
				hidden: c,
				size: A,
				children: s
			}),
			/* @__PURE__ */ r(e, {
				ref: k,
				id: M,
				name: m,
				onSearch: l,
				value: u,
				onValueChange: d,
				selectedOption: f,
				placeholder: p,
				disabled: h,
				readOnly: g,
				size: A,
				debounceMs: v,
				required: y,
				error: I,
				emptyMessage: w,
				loadingLabel: T,
				clearLabel: E,
				container: D,
				"aria-describedby": F,
				onBlur: O
			}),
			x && /* @__PURE__ */ r("span", {
				id: N,
				className: "async-select-field__error",
				role: "alert",
				children: x
			}),
			S && /* @__PURE__ */ r("span", {
				id: P,
				className: "async-select-field__helper",
				children: S
			})
		]
	});
});
//#endregion
export { s as AsyncSelectField };
