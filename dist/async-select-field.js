'use client';
import './async-select-field.css';
import { t as e } from "./_shared/asyncselect.js";
import { n as t } from "./_shared/form-size.js";
import { n } from "./_shared/field-optional.js";
import { n as r } from "./_shared/field-labels.js";
import { a as i, n as a } from "./_shared/fieldshell.js";
import { forwardRef as o } from "react";
import { jsx as s } from "react/jsx-runtime";
//#region src/stories/molecules/AsyncSelectField/AsyncSelectField.tsx
var c = o(function({ id: o, label: c, optional: l, optionalLabel: u, labelHidden: d, onSearch: f, value: p, onValueChange: m, selectedOption: h, placeholder: g, name: _, disabled: v, readOnly: y, size: b, debounceMs: x, required: S, error: C = !1, errorMessage: w, helperText: T, className: E, emptyMessage: D, loadingLabel: O, clearLabel: k, container: A, onBlur: j }, M) {
	let N = r(d), P = t(b), F = n(l, S), I = i({
		id: o,
		error: C,
		errorMessage: w,
		helperText: T
	}), { id: L } = I;
	return /* @__PURE__ */ s(a, {
		field: I,
		block: "async-select-field",
		className: E,
		label: c,
		optional: F,
		optionalLabel: u,
		labelHidden: N,
		size: P,
		children: /* @__PURE__ */ s(e, {
			ref: M,
			id: L,
			name: _,
			onSearch: f,
			value: p,
			onValueChange: m,
			selectedOption: h,
			placeholder: g,
			disabled: v,
			readOnly: y,
			size: P,
			debounceMs: x,
			required: S,
			error: I.hasError,
			emptyMessage: D,
			loadingLabel: O,
			clearLabel: k,
			container: A,
			"aria-describedby": I.describedBy,
			onBlur: j
		})
	});
});
//#endregion
export { c as AsyncSelectField };
