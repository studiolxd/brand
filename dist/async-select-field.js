'use client';
import './async-select-field.css';
import { t as e } from "./_shared/asyncselect.js";
import { n as t } from "./_shared/form-size.js";
import { n } from "./_shared/field-labels.js";
import { n as r, t as i } from "./_shared/fieldshell.js";
import { forwardRef as a } from "react";
import { jsx as o } from "react/jsx-runtime";
//#region src/stories/molecules/AsyncSelectField/AsyncSelectField.tsx
var s = a(function({ id: a, label: s, optional: c, optionalLabel: l, labelHidden: u, onSearch: d, value: f, onValueChange: p, selectedOption: m, placeholder: h, name: g, disabled: _, readOnly: v, size: y, debounceMs: b, required: x, error: S = !1, errorMessage: C, helperText: w, className: T, emptyMessage: E, loadingLabel: D, clearLabel: O, container: k, onBlur: A }, j) {
	let M = n(u), N = t(y), P = r({
		id: a,
		error: S,
		errorMessage: C,
		helperText: w
	}), { id: F } = P;
	return /* @__PURE__ */ o(i, {
		field: P,
		block: "async-select-field",
		className: T,
		label: s,
		optional: c,
		optionalLabel: l,
		labelHidden: M,
		size: N,
		children: /* @__PURE__ */ o(e, {
			ref: j,
			id: F,
			name: g,
			onSearch: d,
			value: f,
			onValueChange: p,
			selectedOption: m,
			placeholder: h,
			disabled: _,
			readOnly: v,
			size: N,
			debounceMs: b,
			required: x,
			error: P.hasError,
			emptyMessage: E,
			loadingLabel: D,
			clearLabel: O,
			container: k,
			"aria-describedby": P.describedBy,
			onBlur: A
		})
	});
});
//#endregion
export { s as AsyncSelectField };
