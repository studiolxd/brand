'use client';
import './input-phone-field.css';
import { n as e } from "./_shared/form-size.js";
import { t } from "./_shared/inputphone.js";
import { n } from "./_shared/field-labels.js";
import { n as r, t as i } from "./_shared/fieldshell.js";
import { forwardRef as a } from "react";
import { jsx as o } from "react/jsx-runtime";
//#region src/stories/molecules/InputPhoneField/InputPhoneField.tsx
var s = a(function({ id: a, label: s, optional: c, optionalLabel: l, labelHidden: u, value: d, defaultCountry: f, placeholder: p, disabled: m, readOnly: h, required: g, name: _, autoComplete: v, error: y = !1, errorMessage: b, helperText: x, size: S, className: C, countryLabel: w, internationalLabel: T, onChange: E, onBlur: D, onFocus: O }, k) {
	let A = n(u), j = e(S), M = r({
		id: a,
		error: y,
		errorMessage: b,
		helperText: x
	}), { id: N } = M;
	return /* @__PURE__ */ o(i, {
		field: M,
		block: "input-phone-field",
		className: C,
		label: s,
		optional: c,
		optionalLabel: l,
		labelHidden: A,
		size: j,
		children: /* @__PURE__ */ o(t, {
			ref: k,
			id: N,
			name: _,
			value: d,
			defaultCountry: f,
			placeholder: p,
			disabled: m,
			readOnly: h,
			required: g,
			autoComplete: v,
			countryLabel: w,
			internationalLabel: T,
			error: M.hasError,
			size: j,
			"aria-describedby": M.describedBy,
			onChange: E,
			onBlur: D,
			onFocus: O
		})
	});
});
//#endregion
export { s as InputPhoneField };
