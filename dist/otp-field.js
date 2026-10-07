'use client';
import './otp-field.css';
import { n as e } from "./_shared/form-size.js";
import { OtpInput as t } from "./otp-input.js";
import { n } from "./_shared/field-labels.js";
import { n as r, t as i } from "./_shared/fieldshell.js";
import { forwardRef as a } from "react";
import { jsx as o } from "react/jsx-runtime";
//#region src/stories/molecules/OtpField/OtpField.tsx
var s = a(function({ id: a, label: s, labelHidden: c, length: l, value: u, defaultValue: d, name: f, disabled: p, readOnly: m, required: h, error: g = !1, errorMessage: _, helperText: v, size: y, className: b, digitLabel: x, onChange: S, onComplete: C, onBlur: w }, T) {
	let E = n(c), D = e(y), O = r({
		id: a,
		error: g,
		errorMessage: _,
		helperText: v
	}), { id: k } = O;
	return /* @__PURE__ */ o(i, {
		field: O,
		block: "otp-field",
		className: b,
		label: s,
		labelHidden: E,
		size: D,
		labelIdentified: !0,
		labelFor: `${k}-0`,
		children: /* @__PURE__ */ o(t, {
			ref: T,
			id: k,
			name: f,
			length: l,
			value: u,
			defaultValue: d,
			disabled: p,
			readOnly: m,
			required: h,
			error: O.hasError,
			size: D,
			digitLabel: x,
			"aria-labelledby": O.labelId,
			"aria-describedby": O.describedBy,
			onChange: S,
			onComplete: C,
			onBlur: w
		})
	});
});
//#endregion
export { s as OtpField };
