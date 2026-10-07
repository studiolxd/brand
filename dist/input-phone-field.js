'use client';
import './input-phone-field.css';
import { n as e } from "./_shared/form-size.js";
import { t } from "./_shared/inputphone.js";
import { n } from "./_shared/field-labels.js";
import { n as r, t as i } from "./_shared/fieldshell.js";
import { forwardRef as a } from "react";
import { jsx as o } from "react/jsx-runtime";
//#region src/stories/molecules/InputPhoneField/InputPhoneField.tsx
var s = a(function({ id: a, label: s, labelHidden: c, value: l, defaultCountry: u, placeholder: d, disabled: f, readOnly: p, required: m, name: h, autoComplete: g, error: _ = !1, errorMessage: v, helperText: y, size: b, className: x, countryLabel: S, internationalLabel: C, onChange: w, onBlur: T, onFocus: E }, D) {
	let O = n(c), k = e(b), A = r({
		id: a,
		error: _,
		errorMessage: v,
		helperText: y
	}), { id: j } = A;
	return /* @__PURE__ */ o(i, {
		field: A,
		block: "input-phone-field",
		className: x,
		label: s,
		labelHidden: O,
		size: k,
		children: /* @__PURE__ */ o(t, {
			ref: D,
			id: j,
			name: h,
			value: l,
			defaultCountry: u,
			placeholder: d,
			disabled: f,
			readOnly: p,
			required: m,
			autoComplete: g,
			countryLabel: S,
			internationalLabel: C,
			error: A.hasError,
			size: k,
			"aria-describedby": A.describedBy,
			onChange: w,
			onBlur: T,
			onFocus: E
		})
	});
});
//#endregion
export { s as InputPhoneField };
