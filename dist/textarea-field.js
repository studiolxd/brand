'use client';
import './textarea-field.css';
import { n as e } from "./_shared/form-size.js";
import { Textarea as t } from "./textarea.js";
import { n } from "./_shared/field-labels.js";
import { n as r, t as i } from "./_shared/fieldshell.js";
import { forwardRef as a } from "react";
import { jsx as o } from "react/jsx-runtime";
//#region src/stories/molecules/TextareaField/TextareaField.tsx
var s = a(function({ id: a, label: s, optional: c, optionalLabel: l, labelHidden: u, name: d, placeholder: f, value: p, defaultValue: m, rows: h, disabled: g, readOnly: _, size: v, error: y = !1, errorMessage: b, helperText: x, onChange: S, onBlur: C, onFocus: w, className: T, "aria-describedby": E, ...D }, O) {
	let k = n(u), A = e(v), j = r({
		id: a,
		error: y,
		errorMessage: b,
		helperText: x,
		describedBy: E
	});
	return /* @__PURE__ */ o(i, {
		field: j,
		block: "textarea-field",
		className: T,
		label: s,
		optional: c,
		optionalLabel: l,
		labelHidden: k,
		size: A,
		children: /* @__PURE__ */ o(t, {
			ref: O,
			...D,
			id: a,
			name: d,
			placeholder: f ?? (k ? s : void 0),
			value: p,
			defaultValue: m,
			rows: h,
			disabled: g,
			readOnly: _,
			size: A,
			error: j.hasError,
			"aria-describedby": j.describedBy,
			onChange: S,
			onBlur: C,
			onFocus: w
		})
	});
});
//#endregion
export { s as TextareaField };
