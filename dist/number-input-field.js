'use client';
import './number-input-field.css';
import { n as e } from "./_shared/form-size.js";
import { t } from "./_shared/numberinput.js";
import { n } from "./_shared/field-labels.js";
import { n as r, t as i } from "./_shared/fieldshell.js";
import { forwardRef as a } from "react";
import { jsx as o } from "react/jsx-runtime";
//#region src/stories/molecules/NumberInputField/NumberInputField.tsx
var s = a(function({ id: a, label: s, labelHidden: c, value: l, defaultValue: u, min: d, max: f, step: p = 1, decimal: m, disabled: h, readOnly: g, size: _, compact: v, commitMode: y, error: b = !1, errorMessage: x, helperText: S, className: C, onChange: w, onEmpty: T, "aria-describedby": E, ...D }, O) {
	let k = n(c), A = e(_), j = r({
		id: a,
		error: b,
		errorMessage: x,
		helperText: S,
		describedBy: E
	}), { id: M } = j;
	return /* @__PURE__ */ o(i, {
		field: j,
		block: "number-input-field",
		className: C,
		label: s,
		labelHidden: k,
		size: A,
		children: /* @__PURE__ */ o(t, {
			ref: O,
			...D,
			id: M,
			value: l,
			defaultValue: u,
			min: d,
			max: f,
			step: p,
			decimal: m,
			disabled: h,
			readOnly: g,
			size: A,
			compact: v,
			commitMode: y,
			error: j.hasError,
			"aria-describedby": j.describedBy,
			onChange: w,
			onEmpty: T
		})
	});
});
//#endregion
export { s as NumberInputField };
