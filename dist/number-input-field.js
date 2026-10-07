'use client';
import './number-input-field.css';
import { n as e } from "./_shared/form-size.js";
import { t } from "./_shared/numberinput.js";
import { n } from "./_shared/field-labels.js";
import { n as r, t as i } from "./_shared/fieldshell.js";
import { forwardRef as a } from "react";
import { jsx as o } from "react/jsx-runtime";
//#region src/stories/molecules/NumberInputField/NumberInputField.tsx
var s = a(function({ id: a, label: s, optional: c, optionalLabel: l, labelHidden: u, value: d, defaultValue: f, min: p, max: m, step: h = 1, decimal: g, disabled: _, readOnly: v, size: y, compact: b, commitMode: x, error: S = !1, errorMessage: C, helperText: w, className: T, onChange: E, onEmpty: D, "aria-describedby": O, ...k }, A) {
	let j = n(u), M = e(y), N = r({
		id: a,
		error: S,
		errorMessage: C,
		helperText: w,
		describedBy: O
	}), { id: P } = N;
	return /* @__PURE__ */ o(i, {
		field: N,
		block: "number-input-field",
		className: T,
		label: s,
		optional: c,
		optionalLabel: l,
		labelHidden: j,
		size: M,
		children: /* @__PURE__ */ o(t, {
			ref: A,
			...k,
			id: P,
			value: d,
			defaultValue: f,
			min: p,
			max: m,
			step: h,
			decimal: g,
			disabled: _,
			readOnly: v,
			size: M,
			compact: b,
			commitMode: x,
			error: N.hasError,
			"aria-describedby": N.describedBy,
			onChange: E,
			onEmpty: D
		})
	});
});
//#endregion
export { s as NumberInputField };
