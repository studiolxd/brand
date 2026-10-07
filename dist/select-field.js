'use client';
import './select-field.css';
import { n as e } from "./_shared/form-size.js";
import { t, u as n } from "./_shared/select.js";
import { n as r } from "./_shared/field-labels.js";
import { n as i, t as a } from "./_shared/fieldshell.js";
import { forwardRef as o } from "react";
import { jsx as s } from "react/jsx-runtime";
//#region src/stories/molecules/SelectField/SelectField.tsx
var c = "__empty__";
function l(e, t) {
	return e === "" ? t ? c : void 0 : e;
}
function u(e) {
	return e === c ? "" : e;
}
function d(e) {
	return e.value === "" ? {
		...e,
		value: c
	} : e;
}
var f = o(function({ id: o, label: c, labelHidden: f, options: p, value: m, defaultValue: h, placeholder: g, name: _, disabled: v, required: y, size: b, error: x = !1, errorMessage: S, helperText: C, className: w, onValueChange: T, onBlur: E }, D) {
	let O = r(f), k = e(b), A = i({
		id: o,
		error: x,
		errorMessage: S,
		helperText: C
	}), { id: j } = A, M = p.some((e) => n(e) ? e.options.some((e) => e.value === "") : e.value === "");
	return /* @__PURE__ */ s(a, {
		field: A,
		block: "select-field",
		className: w,
		label: c,
		labelHidden: O,
		size: k,
		children: /* @__PURE__ */ s(t, {
			ref: D,
			id: j,
			name: _,
			required: y,
			options: M ? p.map((e) => n(e) ? {
				...e,
				options: e.options.map(d)
			} : d(e)) : p,
			value: l(m, M),
			defaultValue: l(h, M),
			placeholder: g,
			disabled: v,
			size: k,
			"aria-describedby": A.describedBy,
			"aria-invalid": A.hasError,
			onValueChange: T ? (e) => T(u(e)) : void 0,
			onBlur: E
		})
	});
});
//#endregion
export { f as SelectField };
