'use client';
import './color-picker-field.css';
import { n as e } from "./_shared/form-size.js";
import { n as t } from "./_shared/field-labels.js";
import { n, t as r } from "./_shared/fieldshell.js";
import { t as i } from "./_shared/colorpicker.js";
import { forwardRef as a } from "react";
import { jsx as o } from "react/jsx-runtime";
//#region src/stories/molecules/ColorPickerField/ColorPickerField.tsx
var s = a(function({ id: a, label: s, optional: c, optionalLabel: l, labelHidden: u, errorMessage: d, helperText: f, error: p = !1, size: m, required: h = !1, className: g, ..._ }, v) {
	let y = t(u), b = e(m), x = n({
		id: a,
		error: p,
		errorMessage: d,
		helperText: f
	}), { id: S, labelId: C } = x;
	return /* @__PURE__ */ o(r, {
		field: x,
		block: "color-picker-field",
		className: g,
		label: s,
		optional: c,
		optionalLabel: l,
		labelHidden: y,
		size: b,
		labelIdentified: !0,
		rootProps: h ? {
			role: "group",
			"aria-labelledby": C,
			"aria-required": !0
		} : void 0,
		children: /* @__PURE__ */ o(i, {
			dialogLabel: s,
			..._,
			ref: v,
			id: S,
			size: b,
			required: h,
			error: x.hasError,
			"aria-labelledby": C,
			"aria-describedby": x.describedBy
		})
	});
});
//#endregion
export { s as ColorPickerField };
