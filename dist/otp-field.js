'use client';
import './otp-field.css';
import { n as e } from "./_shared/form-size.js";
import { t } from "./_shared/otpinput.js";
import { n } from "./_shared/field-optional.js";
import { n as r } from "./_shared/field-labels.js";
import { a as i, n as a } from "./_shared/fieldshell.js";
import { forwardRef as o } from "react";
import { jsx as s } from "react/jsx-runtime";
//#region src/stories/molecules/OtpField/OtpField.tsx
var c = o(function({ id: o, label: c, optional: l, optionalLabel: u, labelHidden: d, length: f, value: p, defaultValue: m, name: h, disabled: g, readOnly: _, required: v, error: y = !1, errorMessage: b, helperText: x, size: S, className: C, digitLabel: w, onChange: T, onComplete: E, onBlur: D }, O) {
	let k = r(d), A = e(S), j = n(l, v), M = i({
		id: o,
		error: y,
		errorMessage: b,
		helperText: x
	}), { id: N } = M;
	return /* @__PURE__ */ s(a, {
		field: M,
		block: "otp-field",
		className: C,
		label: c,
		optional: j,
		optionalLabel: u,
		labelHidden: k,
		size: A,
		labelIdentified: !0,
		labelFor: `${N}-0`,
		children: /* @__PURE__ */ s(t, {
			ref: O,
			id: N,
			name: h,
			length: f,
			value: p,
			defaultValue: m,
			disabled: g,
			readOnly: _,
			required: v,
			error: M.hasError,
			size: A,
			digitLabel: w,
			"aria-labelledby": M.labelId,
			"aria-describedby": M.describedBy,
			onChange: T,
			onComplete: E,
			onBlur: D
		})
	});
});
//#endregion
export { c as OtpField };
