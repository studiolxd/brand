'use client';
import './checkbox-field.css';
import { n as e } from "./_shared/form-size.js";
import { Checkbox as t } from "./checkbox.js";
import { n } from "./_shared/field-optional.js";
import { n as r } from "./_shared/field-labels.js";
import { a as i, n as a } from "./_shared/fieldshell.js";
import { forwardRef as o } from "react";
import { jsx as s } from "react/jsx-runtime";
//#region src/stories/molecules/CheckboxField/CheckboxField.tsx
var c = o(function({ label: o, optional: c, optionalLabel: l, labelHidden: u, checked: d, defaultChecked: f, disabled: p, required: m, size: h, id: g, name: _, value: v, error: y = !1, errorMessage: b, helperText: x, className: S, onCheckedChange: C, onBlur: w }, T) {
	let E = r(u), D = e(h), O = n(c, m), k = i({
		id: g,
		error: y,
		errorMessage: b,
		helperText: x
	}), { id: A } = k;
	return /* @__PURE__ */ s(a, {
		field: k,
		block: "checkbox-field",
		modifiers: [D !== "md" && `checkbox-field--${D}`, p && "checkbox-field--disabled"],
		className: S,
		layout: "inline",
		label: o,
		optional: O,
		optionalLabel: l,
		labelHidden: E,
		children: /* @__PURE__ */ s(t, {
			ref: T,
			id: A,
			checked: d,
			defaultChecked: f,
			disabled: p,
			required: m,
			size: D,
			name: _,
			value: v,
			error: k.hasError,
			"aria-describedby": k.describedBy,
			onCheckedChange: C,
			onBlur: w
		})
	});
});
//#endregion
export { c as CheckboxField };
