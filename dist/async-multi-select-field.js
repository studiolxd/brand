'use client';
import './async-multi-select-field.css';
import { t as e } from "./_shared/asyncmultiselect.js";
import { n as t } from "./_shared/form-size.js";
import { n } from "./_shared/field-labels.js";
import { n as r, t as i } from "./_shared/fieldshell.js";
import { forwardRef as a } from "react";
import { jsx as o } from "react/jsx-runtime";
//#region src/stories/molecules/AsyncMultiSelectField/AsyncMultiSelectField.tsx
var s = a(function({ id: a, label: s, optional: c, optionalLabel: l, labelHidden: u, onSearch: d, value: f, defaultValue: p, onValueChange: m, selectedOptions: h, placeholder: g, name: _, disabled: v, readOnly: y, size: b, debounceMs: x, required: S, error: C = !1, errorMessage: w, helperText: T, className: E, emptyMessage: D, removeLabel: O, loadingLabel: k, container: A, onBlur: j }, M) {
	let N = n(u), P = t(b), F = r({
		id: a,
		error: C,
		errorMessage: w,
		helperText: T
	}), { id: I } = F;
	return /* @__PURE__ */ o(i, {
		field: F,
		block: "async-multi-select-field",
		className: E,
		label: s,
		optional: c,
		optionalLabel: l,
		labelHidden: N,
		size: P,
		children: /* @__PURE__ */ o(e, {
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
			error: F.hasError,
			emptyMessage: D,
			removeLabel: O,
			loadingLabel: k,
			container: A,
			"aria-describedby": F.describedBy,
			onBlur: j
		})
	});
});
//#endregion
export { s as AsyncMultiSelectField };
