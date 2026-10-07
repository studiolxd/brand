'use client';
import './input-phone-field.css';
import { n as e } from "./_shared/form-size.js";
import { t } from "./_shared/inputphone.js";
import { n } from "./_shared/field-optional.js";
import { n as r } from "./_shared/field-labels.js";
import { a as i, n as a } from "./_shared/fieldshell.js";
import { forwardRef as o } from "react";
import { jsx as s } from "react/jsx-runtime";
//#region src/stories/molecules/InputPhoneField/InputPhoneField.tsx
var c = o(function({ id: o, label: c, optional: l, optionalLabel: u, labelHidden: d, value: f, defaultCountry: p, placeholder: m, disabled: h, readOnly: g, required: _, name: v, autoComplete: y, error: b = !1, errorMessage: x, helperText: S, size: C, className: w, countryLabel: T, internationalLabel: E, onChange: D, onBlur: O, onFocus: k }, A) {
	let j = r(d), M = e(C), N = n(l, _), P = i({
		id: o,
		error: b,
		errorMessage: x,
		helperText: S
	}), { id: F } = P;
	return /* @__PURE__ */ s(a, {
		field: P,
		block: "input-phone-field",
		className: w,
		label: c,
		optional: N,
		optionalLabel: u,
		labelHidden: j,
		size: M,
		children: /* @__PURE__ */ s(t, {
			ref: A,
			id: F,
			name: v,
			value: f,
			defaultCountry: p,
			placeholder: m,
			disabled: h,
			readOnly: g,
			required: _,
			autoComplete: y,
			countryLabel: T,
			internationalLabel: E,
			error: P.hasError,
			size: M,
			"aria-describedby": P.describedBy,
			onChange: D,
			onBlur: O,
			onFocus: k
		})
	});
});
//#endregion
export { c as InputPhoneField };
