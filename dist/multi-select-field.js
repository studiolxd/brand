'use client';
import './multi-select-field.css';
import { n as e } from "./_shared/form-size.js";
import { t } from "./_shared/multiselect.js";
import { n } from "./_shared/field-labels.js";
import { n as r, t as i } from "./_shared/fieldshell.js";
import { forwardRef as a } from "react";
import { jsx as o } from "react/jsx-runtime";
//#region src/stories/molecules/MultiSelectField/MultiSelectField.tsx
var s = a(function({ id: a, label: s, optional: c, optionalLabel: l, labelHidden: u, options: d, value: f, defaultValue: p, placeholder: m, name: h, disabled: g, readOnly: _, required: v, size: y, error: b = !1, errorMessage: x, helperText: S, className: C, removeLabel: w, onValueChange: T, onBlur: E }, D) {
	let O = n(u), k = e(y), A = r({
		id: a,
		error: b,
		errorMessage: x,
		helperText: S
	}), { id: j } = A;
	return /* @__PURE__ */ o(i, {
		field: A,
		block: "multi-select-field",
		className: C,
		label: s,
		optional: c,
		optionalLabel: l,
		labelHidden: O,
		size: k,
		labelIdentified: !0,
		children: /* @__PURE__ */ o(t, {
			ref: D,
			id: j,
			"aria-labelledby": A.labelId,
			name: h,
			options: d,
			value: f,
			defaultValue: p,
			placeholder: m,
			disabled: g,
			readOnly: _,
			required: v,
			size: k,
			error: A.hasError,
			removeLabel: w,
			"aria-describedby": A.describedBy,
			onValueChange: T,
			onBlur: E
		})
	});
});
//#endregion
export { s as MultiSelectField };
