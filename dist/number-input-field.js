'use client';
import './number-input-field.css';
import { n as e } from "./_shared/form-size.js";
import { t } from "./_shared/numberinput.js";
import { n } from "./_shared/field-optional.js";
import { n as r } from "./_shared/field-labels.js";
import { a as i, n as a } from "./_shared/fieldshell.js";
import { forwardRef as o } from "react";
import { jsx as s } from "react/jsx-runtime";
//#region src/stories/molecules/NumberInputField/NumberInputField.tsx
var c = o(function({ id: o, label: c, optional: l, optionalLabel: u, labelHidden: d, value: f, defaultValue: p, min: m, max: h, step: g = 1, decimal: _, disabled: v, readOnly: y, size: b, compact: x, commitMode: S, error: C = !1, errorMessage: w, helperText: T, className: E, onChange: D, onEmpty: O, "aria-describedby": k, ...A }, j) {
	let M = r(d), N = e(b), P = n(l, A.required), F = i({
		id: o,
		error: C,
		errorMessage: w,
		helperText: T,
		describedBy: k
	}), { id: I } = F;
	return /* @__PURE__ */ s(a, {
		field: F,
		block: "number-input-field",
		className: E,
		label: c,
		optional: P,
		optionalLabel: u,
		labelHidden: M,
		size: N,
		children: /* @__PURE__ */ s(t, {
			ref: j,
			...A,
			id: I,
			value: f,
			defaultValue: p,
			min: m,
			max: h,
			step: g,
			decimal: _,
			disabled: v,
			readOnly: y,
			size: N,
			compact: x,
			commitMode: S,
			error: F.hasError,
			"aria-describedby": F.describedBy,
			onChange: D,
			onEmpty: O
		})
	});
});
//#endregion
export { c as NumberInputField };
