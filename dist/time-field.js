'use client';
import './time-field.css';
import { n as e } from "./_shared/form-size.js";
import { t } from "./_shared/timeselect.js";
import { n } from "./_shared/field-labels.js";
import { n as r, t as i } from "./_shared/fieldshell.js";
import { forwardRef as a } from "react";
import { jsx as o } from "react/jsx-runtime";
//#region src/stories/molecules/TimeField/TimeField.tsx
var s = a(function({ id: a, label: s, labelHidden: c, value: l, step: u, name: d, size: f, disabled: p, readOnly: m, required: h, error: g = !1, errorMessage: _, helperText: v, className: y, hoursLabel: b, minutesLabel: x, onChange: S, onBlur: C }, w) {
	let T = n(c), E = e(f), D = r({
		id: a,
		error: g,
		errorMessage: _,
		helperText: v
	}), { id: O } = D;
	return /* @__PURE__ */ o(i, {
		field: D,
		block: "time-field",
		className: y,
		label: s,
		labelHidden: T,
		size: E,
		labelIdentified: !0,
		children: /* @__PURE__ */ o(t, {
			ref: w,
			id: O,
			name: d,
			value: l,
			step: u,
			size: E,
			disabled: p,
			readOnly: m,
			required: h,
			error: D.hasError,
			hoursLabel: b,
			minutesLabel: x,
			"aria-labelledby": D.labelId,
			"aria-describedby": D.describedBy,
			onChange: S,
			onBlur: C
		})
	});
});
//#endregion
export { s as TimeField };
