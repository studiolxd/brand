'use client';
import './time-field.css';
import { n as e } from "./_shared/form-size.js";
import { t } from "./_shared/timeselect.js";
import { n } from "./_shared/field-optional.js";
import { n as r } from "./_shared/field-labels.js";
import { a as i, n as a } from "./_shared/fieldshell.js";
import { forwardRef as o } from "react";
import { jsx as s } from "react/jsx-runtime";
//#region src/stories/molecules/TimeField/TimeField.tsx
var c = o(function({ id: o, label: c, optional: l, optionalLabel: u, labelHidden: d, value: f, step: p, name: m, size: h, disabled: g, readOnly: _, required: v, error: y = !1, errorMessage: b, helperText: x, className: S, hoursLabel: C, minutesLabel: w, onChange: T, onBlur: E }, D) {
	let O = r(d), k = e(h), A = n(l, v), j = i({
		id: o,
		error: y,
		errorMessage: b,
		helperText: x
	}), { id: M } = j;
	return /* @__PURE__ */ s(a, {
		field: j,
		block: "time-field",
		className: S,
		label: c,
		optional: A,
		optionalLabel: u,
		labelHidden: O,
		size: k,
		labelIdentified: !0,
		children: /* @__PURE__ */ s(t, {
			ref: D,
			id: M,
			name: m,
			value: f,
			step: p,
			size: k,
			disabled: g,
			readOnly: _,
			required: v,
			error: j.hasError,
			hoursLabel: C,
			minutesLabel: w,
			"aria-labelledby": j.labelId,
			"aria-describedby": j.describedBy,
			onChange: T,
			onBlur: E
		})
	});
});
//#endregion
export { c as TimeField };
