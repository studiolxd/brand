'use client';
import './textarea-field.css';
import { n as e } from "./_shared/form-size.js";
import { Textarea as t } from "./textarea.js";
import { n } from "./_shared/field-labels.js";
import { n as r, t as i } from "./_shared/fieldshell.js";
import { forwardRef as a } from "react";
import { jsx as o } from "react/jsx-runtime";
//#region src/stories/molecules/TextareaField/TextareaField.tsx
var s = a(function({ id: a, label: s, labelHidden: c, name: l, placeholder: u, value: d, defaultValue: f, rows: p, disabled: m, readOnly: h, size: g, error: _ = !1, errorMessage: v, helperText: y, onChange: b, onBlur: x, onFocus: S, className: C, "aria-describedby": w, ...T }, E) {
	let D = n(c), O = e(g), k = r({
		id: a,
		error: _,
		errorMessage: v,
		helperText: y,
		describedBy: w
	});
	return /* @__PURE__ */ o(i, {
		field: k,
		block: "textarea-field",
		className: C,
		label: s,
		labelHidden: D,
		size: O,
		children: /* @__PURE__ */ o(t, {
			ref: E,
			...T,
			id: a,
			name: l,
			placeholder: u ?? (D ? s : void 0),
			value: d,
			defaultValue: f,
			rows: p,
			disabled: m,
			readOnly: h,
			size: O,
			error: k.hasError,
			"aria-describedby": k.describedBy,
			onChange: b,
			onBlur: x,
			onFocus: S
		})
	});
});
//#endregion
export { s as TextareaField };
