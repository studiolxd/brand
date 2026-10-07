'use client';
import './multi-select-field.css';
import { n as e } from "./_shared/form-size.js";
import { t } from "./_shared/multiselect.js";
import { n } from "./_shared/field-labels.js";
import { n as r, t as i } from "./_shared/fieldshell.js";
import { forwardRef as a } from "react";
import { jsx as o } from "react/jsx-runtime";
//#region src/stories/molecules/MultiSelectField/MultiSelectField.tsx
var s = a(function({ id: a, label: s, labelHidden: c, options: l, value: u, defaultValue: d, placeholder: f, name: p, disabled: m, readOnly: h, required: g, size: _, error: v = !1, errorMessage: y, helperText: b, className: x, removeLabel: S, onValueChange: C, onBlur: w }, T) {
	let E = n(c), D = e(_), O = r({
		id: a,
		error: v,
		errorMessage: y,
		helperText: b
	}), { id: k } = O;
	return /* @__PURE__ */ o(i, {
		field: O,
		block: "multi-select-field",
		className: x,
		label: s,
		labelHidden: E,
		size: D,
		labelIdentified: !0,
		children: /* @__PURE__ */ o(t, {
			ref: T,
			id: k,
			"aria-labelledby": O.labelId,
			name: p,
			options: l,
			value: u,
			defaultValue: d,
			placeholder: f,
			disabled: m,
			readOnly: h,
			required: g,
			size: D,
			error: O.hasError,
			removeLabel: S,
			"aria-describedby": O.describedBy,
			onValueChange: C,
			onBlur: w
		})
	});
});
//#endregion
export { s as MultiSelectField };
