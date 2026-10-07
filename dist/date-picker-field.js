'use client';
import './date-picker-field.css';
import { n as e } from "./_shared/form-size.js";
import { n as t } from "./_shared/field-labels.js";
import { n, t as r } from "./_shared/fieldshell.js";
import { t as i } from "./_shared/datepicker.js";
import { forwardRef as a } from "react";
import { jsx as o } from "react/jsx-runtime";
//#region src/stories/molecules/DatePickerField/DatePickerField.tsx
var s = a(function({ id: a, label: s, optional: c, optionalLabel: l, labelHidden: u, errorMessage: d, helperText: f, error: p = !1, size: m, className: h, ...g }, _) {
	let v = t(u), y = e(m), b = n({
		id: a,
		error: p,
		errorMessage: d,
		helperText: f
	}), { id: x } = b;
	return /* @__PURE__ */ o(r, {
		field: b,
		block: "date-picker-field",
		className: h,
		label: s,
		optional: c,
		optionalLabel: l,
		labelHidden: v,
		size: y,
		children: /* @__PURE__ */ o(i, {
			calendarLabel: s,
			...g,
			ref: _,
			id: x,
			size: y,
			error: b.hasError,
			"aria-describedby": b.describedBy
		})
	});
});
//#endregion
export { s as DatePickerField };
