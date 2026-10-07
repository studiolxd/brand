'use client';
import './textarea-field.css';
import { n as e } from "./_shared/form-size.js";
import { Textarea as t } from "./textarea.js";
import { n } from "./_shared/field-optional.js";
import { n as r } from "./_shared/field-labels.js";
import { a as i, n as a } from "./_shared/fieldshell.js";
import { forwardRef as o } from "react";
import { jsx as s } from "react/jsx-runtime";
//#region src/stories/molecules/TextareaField/TextareaField.tsx
var c = o(function({ id: o, label: c, optional: l, optionalLabel: u, labelHidden: d, name: f, placeholder: p, value: m, defaultValue: h, rows: g, disabled: _, readOnly: v, size: y, error: b = !1, errorMessage: x, helperText: S, onChange: C, onBlur: w, onFocus: T, className: E, "aria-describedby": D, ...O }, k) {
	let A = r(d), j = e(y), M = n(l, O.required), N = i({
		id: o,
		error: b,
		errorMessage: x,
		helperText: S,
		describedBy: D
	});
	return /* @__PURE__ */ s(a, {
		field: N,
		block: "textarea-field",
		className: E,
		label: c,
		optional: M,
		optionalLabel: u,
		labelHidden: A,
		size: j,
		children: /* @__PURE__ */ s(t, {
			ref: k,
			...O,
			id: o,
			name: f,
			placeholder: p ?? (A ? c : void 0),
			value: m,
			defaultValue: h,
			rows: g,
			disabled: _,
			readOnly: v,
			size: j,
			error: N.hasError,
			"aria-describedby": N.describedBy,
			onChange: C,
			onBlur: w,
			onFocus: T
		})
	});
});
//#endregion
export { c as TextareaField };
