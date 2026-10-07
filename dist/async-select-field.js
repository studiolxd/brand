'use client';
import './async-select-field.css';
import { AsyncSelect as e } from "./async-select.js";
import { n as t } from "./_shared/form-size.js";
import { n } from "./_shared/field-labels.js";
import { n as r, t as i } from "./_shared/fieldshell.js";
import { forwardRef as a } from "react";
import { jsx as o } from "react/jsx-runtime";
//#region src/stories/molecules/AsyncSelectField/AsyncSelectField.tsx
var s = a(function({ id: a, label: s, labelHidden: c, onSearch: l, value: u, onValueChange: d, selectedOption: f, placeholder: p, name: m, disabled: h, readOnly: g, size: _, debounceMs: v, required: y, error: b = !1, errorMessage: x, helperText: S, className: C, emptyMessage: w, loadingLabel: T, clearLabel: E, container: D, onBlur: O }, k) {
	let A = n(c), j = t(_), M = r({
		id: a,
		error: b,
		errorMessage: x,
		helperText: S
	}), { id: N } = M;
	return /* @__PURE__ */ o(i, {
		field: M,
		block: "async-select-field",
		className: C,
		label: s,
		labelHidden: A,
		size: j,
		children: /* @__PURE__ */ o(e, {
			ref: k,
			id: N,
			name: m,
			onSearch: l,
			value: u,
			onValueChange: d,
			selectedOption: f,
			placeholder: p,
			disabled: h,
			readOnly: g,
			size: j,
			debounceMs: v,
			required: y,
			error: M.hasError,
			emptyMessage: w,
			loadingLabel: T,
			clearLabel: E,
			container: D,
			"aria-describedby": M.describedBy,
			onBlur: O
		})
	});
});
//#endregion
export { s as AsyncSelectField };
