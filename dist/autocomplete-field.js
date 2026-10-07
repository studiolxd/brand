'use client';
import './autocomplete-field.css';
import { Autocomplete as e } from "./autocomplete.js";
import { n as t } from "./_shared/form-size.js";
import { n } from "./_shared/field-optional.js";
import { n as r } from "./_shared/field-labels.js";
import { a as i, n as a } from "./_shared/fieldshell.js";
import { forwardRef as o } from "react";
import { jsx as s } from "react/jsx-runtime";
//#region src/stories/molecules/AutocompleteField/AutocompleteField.tsx
var c = o(function({ id: o, label: c, optional: l, optionalLabel: u, labelHidden: d, value: f, defaultValue: p, onValueChange: m, onSelect: h, options: g, onSearch: _, debounceMs: v, minChars: y, placeholder: b, name: x, disabled: S, readOnly: C, size: w, required: T, maxLength: E, error: D = !1, errorMessage: O, helperText: k, className: A, container: j, onBlur: M }, N) {
	let P = r(d), F = t(w), I = n(l, T), L = i({
		id: o,
		error: D,
		errorMessage: O,
		helperText: k
	}), { id: R } = L;
	return /* @__PURE__ */ s(a, {
		field: L,
		block: "autocomplete-field",
		className: A,
		label: c,
		optional: I,
		optionalLabel: u,
		labelHidden: P,
		size: F,
		children: /* @__PURE__ */ s(e, {
			ref: N,
			id: R,
			name: x,
			value: f,
			defaultValue: p,
			onValueChange: m,
			onSelect: h,
			options: g,
			onSearch: _,
			debounceMs: v,
			minChars: y,
			placeholder: b,
			disabled: S,
			readOnly: C,
			size: F,
			required: T,
			maxLength: E,
			error: L.hasError,
			container: j,
			"aria-describedby": L.describedBy,
			onBlur: M
		})
	});
});
//#endregion
export { c as AutocompleteField };
