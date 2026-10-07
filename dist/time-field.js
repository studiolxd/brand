'use client';
import './time-field.css';
import { n as e } from "./_shared/form-size.js";
import { t } from "./_shared/timeselect.js";
import { n } from "./_shared/field-labels.js";
import { n as r, t as i } from "./_shared/fieldshell.js";
import { forwardRef as a } from "react";
import { jsx as o } from "react/jsx-runtime";
//#region src/stories/molecules/TimeField/TimeField.tsx
var s = a(function({ id: a, label: s, optional: c, optionalLabel: l, labelHidden: u, value: d, step: f, name: p, size: m, disabled: h, readOnly: g, required: _, error: v = !1, errorMessage: y, helperText: b, className: x, hoursLabel: S, minutesLabel: C, onChange: w, onBlur: T }, E) {
	let D = n(u), O = e(m), k = r({
		id: a,
		error: v,
		errorMessage: y,
		helperText: b
	}), { id: A } = k;
	return /* @__PURE__ */ o(i, {
		field: k,
		block: "time-field",
		className: x,
		label: s,
		optional: c,
		optionalLabel: l,
		labelHidden: D,
		size: O,
		labelIdentified: !0,
		children: /* @__PURE__ */ o(t, {
			ref: E,
			id: A,
			name: p,
			value: d,
			step: f,
			size: O,
			disabled: h,
			readOnly: g,
			required: _,
			error: k.hasError,
			hoursLabel: S,
			minutesLabel: C,
			"aria-labelledby": k.labelId,
			"aria-describedby": k.describedBy,
			onChange: w,
			onBlur: T
		})
	});
});
//#endregion
export { s as TimeField };
