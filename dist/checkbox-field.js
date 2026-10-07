'use client';
import './checkbox-field.css';
import { n as e } from "./_shared/form-size.js";
import { Checkbox as t } from "./checkbox.js";
import { n } from "./_shared/field-labels.js";
import { n as r, t as i } from "./_shared/fieldshell.js";
import { forwardRef as a } from "react";
import { jsx as o } from "react/jsx-runtime";
//#region src/stories/molecules/CheckboxField/CheckboxField.tsx
var s = a(function({ label: a, optional: s, optionalLabel: c, labelHidden: l, checked: u, defaultChecked: d, disabled: f, required: p, size: m, id: h, name: g, value: _, error: v = !1, errorMessage: y, helperText: b, className: x, onCheckedChange: S, onBlur: C }, w) {
	let T = n(l), E = e(m), D = r({
		id: h,
		error: v,
		errorMessage: y,
		helperText: b
	}), { id: O } = D;
	return /* @__PURE__ */ o(i, {
		field: D,
		block: "checkbox-field",
		modifiers: [E !== "md" && `checkbox-field--${E}`, f && "checkbox-field--disabled"],
		className: x,
		layout: "inline",
		label: a,
		optional: s,
		optionalLabel: c,
		labelHidden: T,
		children: /* @__PURE__ */ o(t, {
			ref: w,
			id: O,
			checked: u,
			defaultChecked: d,
			disabled: f,
			required: p,
			size: E,
			name: g,
			value: _,
			error: D.hasError,
			"aria-describedby": D.describedBy,
			onCheckedChange: S,
			onBlur: C
		})
	});
});
//#endregion
export { s as CheckboxField };
