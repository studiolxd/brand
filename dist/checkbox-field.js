'use client';
import './checkbox-field.css';
import { n as e } from "./_shared/form-size.js";
import { Checkbox as t } from "./checkbox.js";
import { n } from "./_shared/field-labels.js";
import { n as r, t as i } from "./_shared/fieldshell.js";
import { forwardRef as a } from "react";
import { jsx as o } from "react/jsx-runtime";
//#region src/stories/molecules/CheckboxField/CheckboxField.tsx
var s = a(function({ label: a, labelHidden: s, checked: c, defaultChecked: l, disabled: u, required: d, size: f, id: p, name: m, value: h, error: g = !1, errorMessage: _, helperText: v, className: y, onCheckedChange: b, onBlur: x }, S) {
	let C = n(s), w = e(f), T = r({
		id: p,
		error: g,
		errorMessage: _,
		helperText: v
	}), { id: E } = T;
	return /* @__PURE__ */ o(i, {
		field: T,
		block: "checkbox-field",
		modifiers: [w !== "md" && `checkbox-field--${w}`, u && "checkbox-field--disabled"],
		className: y,
		layout: "inline",
		label: a,
		labelHidden: C,
		children: /* @__PURE__ */ o(t, {
			ref: S,
			id: E,
			checked: c,
			defaultChecked: l,
			disabled: u,
			required: d,
			size: w,
			name: m,
			value: h,
			error: T.hasError,
			"aria-describedby": T.describedBy,
			onCheckedChange: b,
			onBlur: x
		})
	});
});
//#endregion
export { s as CheckboxField };
