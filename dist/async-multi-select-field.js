'use client';
import './async-multi-select-field.css';
import { t as e } from "./_shared/asyncmultiselect.js";
import { n as t } from "./_shared/form-size.js";
import { n } from "./_shared/field-optional.js";
import { n as r } from "./_shared/field-labels.js";
import { a as i, n as a } from "./_shared/fieldshell.js";
import { forwardRef as o } from "react";
import { jsx as s } from "react/jsx-runtime";
//#region src/stories/molecules/AsyncMultiSelectField/AsyncMultiSelectField.tsx
var c = o(function({ id: o, label: c, optional: l, optionalLabel: u, labelHidden: d, onSearch: f, value: p, defaultValue: m, onValueChange: h, selectedOptions: g, placeholder: _, name: v, disabled: y, readOnly: b, size: x, debounceMs: S, required: C, error: w = !1, errorMessage: T, helperText: E, className: D, emptyMessage: O, removeLabel: k, loadingLabel: A, container: j, onBlur: M }, N) {
	let P = r(d), F = t(x), I = n(l, C), L = i({
		id: o,
		error: w,
		errorMessage: T,
		helperText: E
	}), { id: R } = L;
	return /* @__PURE__ */ s(a, {
		field: L,
		block: "async-multi-select-field",
		className: D,
		label: c,
		optional: I,
		optionalLabel: u,
		labelHidden: P,
		size: F,
		children: /* @__PURE__ */ s(e, {
			ref: N,
			id: R,
			name: v,
			onSearch: f,
			value: p,
			defaultValue: m,
			onValueChange: h,
			selectedOptions: g,
			placeholder: _,
			disabled: y,
			readOnly: b,
			size: F,
			debounceMs: S,
			required: C,
			error: L.hasError,
			emptyMessage: O,
			removeLabel: k,
			loadingLabel: A,
			container: j,
			"aria-describedby": L.describedBy,
			onBlur: M
		})
	});
});
//#endregion
export { c as AsyncMultiSelectField };
