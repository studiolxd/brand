'use client';
import './otp-field.css';
import { n as e } from "./_shared/form-size.js";
import { t } from "./_shared/otpinput.js";
import { n } from "./_shared/field-labels.js";
import { n as r, t as i } from "./_shared/fieldshell.js";
import { forwardRef as a } from "react";
import { jsx as o } from "react/jsx-runtime";
//#region src/stories/molecules/OtpField/OtpField.tsx
var s = a(function({ id: a, label: s, optional: c, optionalLabel: l, labelHidden: u, length: d, value: f, defaultValue: p, name: m, disabled: h, readOnly: g, required: _, error: v = !1, errorMessage: y, helperText: b, size: x, className: S, digitLabel: C, onChange: w, onComplete: T, onBlur: E }, D) {
	let O = n(u), k = e(x), A = r({
		id: a,
		error: v,
		errorMessage: y,
		helperText: b
	}), { id: j } = A;
	return /* @__PURE__ */ o(i, {
		field: A,
		block: "otp-field",
		className: S,
		label: s,
		optional: c,
		optionalLabel: l,
		labelHidden: O,
		size: k,
		labelIdentified: !0,
		labelFor: `${j}-0`,
		children: /* @__PURE__ */ o(t, {
			ref: D,
			id: j,
			name: m,
			length: d,
			value: f,
			defaultValue: p,
			disabled: h,
			readOnly: g,
			required: _,
			error: A.hasError,
			size: k,
			digitLabel: C,
			"aria-labelledby": A.labelId,
			"aria-describedby": A.describedBy,
			onChange: w,
			onComplete: T,
			onBlur: E
		})
	});
});
//#endregion
export { s as OtpField };
