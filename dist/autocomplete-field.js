'use client';
import './autocomplete-field.css';
import { Autocomplete as e } from "./autocomplete.js";
import { n as t } from "./_shared/form-size.js";
import { n } from "./_shared/field-labels.js";
import { n as r, t as i } from "./_shared/fieldshell.js";
import { forwardRef as a } from "react";
import { jsx as o } from "react/jsx-runtime";
//#region src/stories/molecules/AutocompleteField/AutocompleteField.tsx
var s = a(function({ id: a, label: s, optional: c, optionalLabel: l, labelHidden: u, value: d, defaultValue: f, onValueChange: p, onSelect: m, options: h, onSearch: g, debounceMs: _, minChars: v, placeholder: y, name: b, disabled: x, readOnly: S, size: C, required: w, maxLength: T, error: E = !1, errorMessage: D, helperText: O, className: k, container: A, onBlur: j }, M) {
	let N = n(u), P = t(C), F = r({
		id: a,
		error: E,
		errorMessage: D,
		helperText: O
	}), { id: I } = F;
	return /* @__PURE__ */ o(i, {
		field: F,
		block: "autocomplete-field",
		className: k,
		label: s,
		optional: c,
		optionalLabel: l,
		labelHidden: N,
		size: P,
		children: /* @__PURE__ */ o(e, {
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
			error: F.hasError,
			container: A,
			"aria-describedby": F.describedBy,
			onBlur: j
		})
	});
});
//#endregion
export { s as AutocompleteField };
