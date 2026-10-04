'use client';
import './autocomplete-field.css';
import { Autocomplete as e } from "./autocomplete.js";
import { n as t } from "./_shared/form-size.js";
import { ErrorText as n } from "./error-text.js";
import { Label as r } from "./label.js";
import { n as i } from "./_shared/field-labels.js";
import { forwardRef as a, useId as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/stories/molecules/AutocompleteField/AutocompleteField.tsx
var l = a(function({ id: a, label: l, labelHidden: u, value: d, defaultValue: f, onValueChange: p, onSelect: m, options: h, onSearch: g, debounceMs: _, minChars: v, placeholder: y, name: b, disabled: x, readOnly: S, size: C, required: w, maxLength: T, error: E = !1, errorMessage: D, helperText: O, className: k, container: A, onBlur: j }, M) {
	let N = i(u), P = t(C), F = o(), I = a ?? F, L = D ? `${I}-error` : void 0, R = O ? `${I}-helper` : void 0, z = [L, R].filter(Boolean).join(" ") || void 0, B = E || !!D;
	return /* @__PURE__ */ c("div", {
		className: ["autocomplete-field", k].filter(Boolean).join(" "),
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
				name: b,
				value: d,
				defaultValue: f,
				onValueChange: p,
				onSelect: m,
				options: h,
				onSearch: g,
				debounceMs: _,
				minChars: v,
				placeholder: y,
				disabled: x,
				readOnly: S,
				size: P,
				required: w,
				maxLength: T,
				error: B,
				container: A,
				"aria-describedby": z,
				onBlur: j
			}),
			D && /* @__PURE__ */ s(n, {
				id: L,
				children: D
			}),
			O && /* @__PURE__ */ s("span", {
				id: R,
				className: "autocomplete-field__helper",
				children: O
			})
		]
	});
});
//#endregion
export { l as AutocompleteField };
