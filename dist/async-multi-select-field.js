'use client';
import './async-multi-select-field.css';
import { AsyncMultiSelect as e } from "./async-multi-select.js";
import { n as t } from "./_shared/form-size.js";
import { n } from "./_shared/field-labels.js";
import { n as r, t as i } from "./_shared/fieldshell.js";
import { forwardRef as a } from "react";
import { jsx as o } from "react/jsx-runtime";
//#region src/stories/molecules/AsyncMultiSelectField/AsyncMultiSelectField.tsx
var s = a(function({ id: a, label: s, labelHidden: c, onSearch: l, value: u, defaultValue: d, onValueChange: f, selectedOptions: p, placeholder: m, name: h, disabled: g, readOnly: _, size: v, debounceMs: y, required: b, error: x = !1, errorMessage: S, helperText: C, className: w, emptyMessage: T, removeLabel: E, loadingLabel: D, container: O, onBlur: k }, A) {
	let j = n(c), M = t(v), N = r({
		id: a,
		error: x,
		errorMessage: S,
		helperText: C
	}), { id: P } = N;
	return /* @__PURE__ */ o(i, {
		field: N,
		block: "async-multi-select-field",
		className: w,
		label: s,
		labelHidden: j,
		size: M,
		children: /* @__PURE__ */ o(e, {
			ref: A,
			id: P,
			name: h,
			onSearch: l,
			value: u,
			defaultValue: d,
			onValueChange: f,
			selectedOptions: p,
			placeholder: m,
			disabled: g,
			readOnly: _,
			size: M,
			debounceMs: y,
			required: b,
			error: N.hasError,
			emptyMessage: T,
			removeLabel: E,
			loadingLabel: D,
			container: O,
			"aria-describedby": N.describedBy,
			onBlur: k
		})
	});
});
//#endregion
export { s as AsyncMultiSelectField };
