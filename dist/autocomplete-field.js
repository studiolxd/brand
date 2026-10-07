'use client';
import './autocomplete-field.css';
import { Autocomplete as e } from "./autocomplete.js";
import { n as t } from "./_shared/form-size.js";
import { n } from "./_shared/field-labels.js";
import { n as r, t as i } from "./_shared/fieldshell.js";
import { forwardRef as a } from "react";
import { jsx as o } from "react/jsx-runtime";
//#region src/stories/molecules/AutocompleteField/AutocompleteField.tsx
var s = a(function({ id: a, label: s, labelHidden: c, value: l, defaultValue: u, onValueChange: d, onSelect: f, options: p, onSearch: m, debounceMs: h, minChars: g, placeholder: _, name: v, disabled: y, readOnly: b, size: x, required: S, maxLength: C, error: w = !1, errorMessage: T, helperText: E, className: D, container: O, onBlur: k }, A) {
	let j = n(c), M = t(x), N = r({
		id: a,
		error: w,
		errorMessage: T,
		helperText: E
	}), { id: P } = N;
	return /* @__PURE__ */ o(i, {
		field: N,
		block: "autocomplete-field",
		className: D,
		label: s,
		labelHidden: j,
		size: M,
		children: /* @__PURE__ */ o(e, {
			ref: A,
			id: P,
			name: v,
			value: l,
			defaultValue: u,
			onValueChange: d,
			onSelect: f,
			options: p,
			onSearch: m,
			debounceMs: h,
			minChars: g,
			placeholder: _,
			disabled: y,
			readOnly: b,
			size: M,
			required: S,
			maxLength: C,
			error: N.hasError,
			container: O,
			"aria-describedby": N.describedBy,
			onBlur: k
		})
	});
});
//#endregion
export { s as AutocompleteField };
