'use client';
import './date-picker-field.css';
import { n as e } from "./_shared/form-size.js";
import { n as t } from "./_shared/field-optional.js";
import { n } from "./_shared/field-labels.js";
import { a as r, n as i } from "./_shared/fieldshell.js";
import { t as a } from "./_shared/datepicker.js";
import { forwardRef as o } from "react";
import { jsx as s } from "react/jsx-runtime";
//#region src/stories/molecules/DatePickerField/DatePickerField.tsx
var c = o(function({ id: o, label: c, optional: l, optionalLabel: u, labelHidden: d, errorMessage: f, helperText: p, error: m = !1, size: h, className: g, ..._ }, v) {
	let y = n(d), b = e(h), x = t(l, _.required), S = r({
		id: o,
		error: m,
		errorMessage: f,
		helperText: p
	}), { id: C } = S;
	return /* @__PURE__ */ s(i, {
		field: S,
		block: "date-picker-field",
		className: g,
		label: c,
		optional: x,
		optionalLabel: u,
		labelHidden: y,
		size: b,
		children: /* @__PURE__ */ s(a, {
			calendarLabel: c,
			..._,
			ref: v,
			id: C,
			size: b,
			error: S.hasError,
			"aria-describedby": S.describedBy
		})
	});
});
//#endregion
export { c as DatePickerField };
