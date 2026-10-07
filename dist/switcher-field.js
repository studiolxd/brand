'use client';
import './switcher-field.css';
import { n as e } from "./_shared/form-size.js";
import { Switcher as t } from "./switcher.js";
import { n } from "./_shared/field-labels.js";
import { a as r, n as i } from "./_shared/fieldshell.js";
import { forwardRef as a } from "react";
import { jsx as o } from "react/jsx-runtime";
//#region src/stories/molecules/SwitcherField/SwitcherField.tsx
var s = a(function({ label: a, labelHidden: s, id: c, checked: l, defaultChecked: u, disabled: d, required: f, name: p, value: m, size: h, error: g = !1, errorMessage: _, helperText: v, className: y, onCheckedChange: b, onBlur: x }, S) {
	let C = n(s), w = e(h), T = r({
		id: c,
		error: g,
		errorMessage: _,
		helperText: v
	}), { id: E } = T;
	return /* @__PURE__ */ o(i, {
		field: T,
		block: "switcher-field",
		modifiers: [w !== "md" && `switcher-field--${w}`, d && "switcher-field--disabled"],
		className: y,
		layout: "inline",
		label: a,
		labelHidden: C,
		labelIdentified: !0,
		children: /* @__PURE__ */ o(t, {
			ref: S,
			id: E,
			checked: l,
			defaultChecked: u,
			disabled: d,
			size: w,
			name: p,
			value: m,
			required: f,
			error: T.hasError,
			"aria-labelledby": T.labelId,
			"aria-describedby": T.describedBy,
			onCheckedChange: b,
			onBlur: x
		})
	});
});
//#endregion
export { s as SwitcherField };
