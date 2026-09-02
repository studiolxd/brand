'use client';
import './async-select-field.css';
import { AsyncSelect as e } from "./async-select.js";
import { n as t } from "./_shared/form-size.js";
import { Label as n } from "./label.js";
import { forwardRef as r, useId as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/molecules/AsyncSelectField/AsyncSelectField.tsx
var s = r(function({ id: r, label: s, labelHidden: c = !1, onSearch: l, value: u, onValueChange: d, selectedOption: f, placeholder: p, name: m, disabled: h, readOnly: g, size: _, debounceMs: v, required: y, error: b = !1, errorMessage: x, helperText: S, className: C, emptyMessage: w, loadingLabel: T, clearLabel: E, container: D, onBlur: O }, k) {
	let A = t(_), j = i(), M = r ?? j, N = x ? `${M}-error` : void 0, P = S ? `${M}-helper` : void 0, F = [N, P].filter(Boolean).join(" ") || void 0, I = b || !!x;
	return /* @__PURE__ */ o("div", {
		className: ["async-select-field", C].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ a(n, {
				htmlFor: M,
				hidden: c,
				size: A,
				children: s
			}),
			/* @__PURE__ */ a(e, {
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
			x && /* @__PURE__ */ a("span", {
				id: N,
				className: "async-select-field__error",
				role: "alert",
				children: x
			}),
			S && /* @__PURE__ */ a("span", {
				id: P,
				className: "async-select-field__helper",
				children: S
			})
		]
	});
});
//#endregion
export { s as AsyncSelectField };
