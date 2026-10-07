'use client';
import './multi-select-field.css';
import { n as e } from "./_shared/form-size.js";
import { t } from "./_shared/multiselect.js";
import { n } from "./_shared/field-optional.js";
import { n as r } from "./_shared/field-labels.js";
import { a as i, n as a } from "./_shared/fieldshell.js";
import { forwardRef as o } from "react";
import { jsx as s } from "react/jsx-runtime";
//#region src/stories/molecules/MultiSelectField/MultiSelectField.tsx
var c = o(function({ id: o, label: c, optional: l, optionalLabel: u, labelHidden: d, options: f, value: p, defaultValue: m, placeholder: h, name: g, disabled: _, readOnly: v, required: y, size: b, error: x = !1, errorMessage: S, helperText: C, className: w, removeLabel: T, onValueChange: E, onBlur: D }, O) {
	let k = r(d), A = e(b), j = n(l, y), M = i({
		id: o,
		error: x,
		errorMessage: S,
		helperText: C
	}), { id: N } = M;
	return /* @__PURE__ */ s(a, {
		field: M,
		block: "multi-select-field",
		className: w,
		label: c,
		optional: j,
		optionalLabel: u,
		labelHidden: k,
		size: A,
		labelIdentified: !0,
		children: /* @__PURE__ */ s(t, {
			ref: O,
			id: N,
			"aria-labelledby": M.labelId,
			name: g,
			options: f,
			value: p,
			defaultValue: m,
			placeholder: h,
			disabled: _,
			readOnly: v,
			required: y,
			size: A,
			error: M.hasError,
			removeLabel: T,
			"aria-describedby": M.describedBy,
			onValueChange: E,
			onBlur: D
		})
	});
});
//#endregion
export { c as MultiSelectField };
