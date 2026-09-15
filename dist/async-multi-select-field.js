'use client';
import './async-multi-select-field.css';
import { AsyncMultiSelect as e } from "./async-multi-select.js";
import { n as t } from "./_shared/form-size.js";
import { ErrorText as n } from "./error-text.js";
import { Label as r } from "./label.js";
import { n as i } from "./_shared/field-labels.js";
import { forwardRef as a, useId as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/stories/molecules/AsyncMultiSelectField/AsyncMultiSelectField.tsx
var l = a(function({ id: a, label: l, labelHidden: u, onSearch: d, value: f, defaultValue: p, onValueChange: m, selectedOptions: h, placeholder: g, name: _, disabled: v, readOnly: y, size: b, debounceMs: x, required: S, error: C = !1, errorMessage: w, helperText: T, className: E, emptyMessage: D, removeLabel: O, loadingLabel: k, container: A, onBlur: j }, M) {
	let N = i(u), P = t(b), F = o(), I = a ?? F, L = w ? `${I}-error` : void 0, R = T ? `${I}-helper` : void 0, z = [L, R].filter(Boolean).join(" ") || void 0, B = C || !!w;
	return /* @__PURE__ */ c("div", {
		className: ["async-multi-select-field", E].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ s(r, {
				htmlFor: I,
				hidden: N,
				size: P,
				children: l
			}),
			/* @__PURE__ */ s(e, {
				ref: M,
				id: I,
				name: _,
				onSearch: d,
				value: f,
				defaultValue: p,
				onValueChange: m,
				selectedOptions: h,
				placeholder: g,
				disabled: v,
				readOnly: y,
				size: P,
				debounceMs: x,
				required: S,
				error: B,
				emptyMessage: D,
				removeLabel: O,
				loadingLabel: k,
				container: A,
				"aria-describedby": z,
				onBlur: j
			}),
			w && /* @__PURE__ */ s(n, {
				id: L,
				children: w
			}),
			T && /* @__PURE__ */ s("span", {
				id: R,
				className: "async-multi-select-field__helper",
				children: T
			})
		]
	});
});
//#endregion
export { l as AsyncMultiSelectField };
