'use client';
import './date-picker-field.css';
import { n as e } from "./_shared/form-size.js";
import { n as t } from "./_shared/field-labels.js";
import { n, t as r } from "./_shared/fieldshell.js";
import { t as i } from "./_shared/datepicker.js";
import { forwardRef as a } from "react";
import { jsx as o } from "react/jsx-runtime";
//#region src/stories/molecules/DatePickerField/DatePickerField.tsx
var s = a(function({ id: a, label: s, labelHidden: c, errorMessage: l, helperText: u, error: d = !1, size: f, className: p, ...m }, h) {
	let g = t(c), _ = e(f), v = n({
		id: a,
		error: d,
		errorMessage: l,
		helperText: u
	}), { id: y } = v;
	return /* @__PURE__ */ o(r, {
		field: v,
		block: "date-picker-field",
		className: p,
		label: s,
		labelHidden: g,
		size: _,
		children: /* @__PURE__ */ o(i, {
			calendarLabel: s,
			...m,
			ref: h,
			id: y,
			size: _,
			error: v.hasError,
			"aria-describedby": v.describedBy
		})
	});
});
//#endregion
export { s as DatePickerField };
