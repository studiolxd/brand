'use client';
import './color-picker-field.css';
import { n as e } from "./_shared/form-size.js";
import { n as t } from "./_shared/field-labels.js";
import { n, t as r } from "./_shared/fieldshell.js";
import { t as i } from "./_shared/colorpicker.js";
import { forwardRef as a } from "react";
import { jsx as o } from "react/jsx-runtime";
//#region src/stories/molecules/ColorPickerField/ColorPickerField.tsx
var s = a(function({ id: a, label: s, labelHidden: c, errorMessage: l, helperText: u, error: d = !1, size: f, className: p, ...m }, h) {
	let g = t(c), _ = e(f), v = n({
		id: a,
		error: d,
		errorMessage: l,
		helperText: u
	}), { id: y, labelId: b } = v;
	return /* @__PURE__ */ o(r, {
		field: v,
		block: "color-picker-field",
		className: p,
		label: s,
		labelHidden: g,
		size: _,
		labelIdentified: !0,
		children: /* @__PURE__ */ o(i, {
			dialogLabel: s,
			...m,
			ref: h,
			id: y,
			size: _,
			error: v.hasError,
			"aria-labelledby": b,
			"aria-describedby": v.describedBy
		})
	});
});
//#endregion
export { s as ColorPickerField };
