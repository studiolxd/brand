'use client';
import './select-field.css';
import { n as e } from "./_shared/form-size.js";
import { t, u as n } from "./_shared/select.js";
import { n as r } from "./_shared/field-optional.js";
import { n as i } from "./_shared/field-labels.js";
import { a, n as o } from "./_shared/fieldshell.js";
import { forwardRef as s } from "react";
import { jsx as c } from "react/jsx-runtime";
//#region src/stories/molecules/SelectField/SelectField.tsx
var l = "__empty__";
function u(e, t) {
	return e === "" ? t ? l : void 0 : e;
}
function d(e) {
	return e === l ? "" : e;
}
function f(e) {
	return e.value === "" ? {
		...e,
		value: l
	} : e;
}
var p = s(function({ id: s, label: l, optional: p, optionalLabel: m, labelHidden: h, options: g, value: _, defaultValue: v, placeholder: y, name: b, disabled: x, required: S, size: C, error: w = !1, errorMessage: T, helperText: E, className: D, onValueChange: O, onBlur: k }, A) {
	let j = i(h), M = e(C), N = r(p, S), P = a({
		id: s,
		error: w,
		errorMessage: T,
		helperText: E
	}), { id: F } = P, I = g.some((e) => n(e) ? e.options.some((e) => e.value === "") : e.value === "");
	return /* @__PURE__ */ c(o, {
		field: P,
		block: "select-field",
		className: D,
		label: l,
		optional: N,
		optionalLabel: m,
		labelHidden: j,
		size: M,
		children: /* @__PURE__ */ c(t, {
			ref: A,
			id: F,
			name: b,
			required: S,
			options: I ? g.map((e) => n(e) ? {
				...e,
				options: e.options.map(f)
			} : f(e)) : g,
			value: u(_, I),
			defaultValue: u(v, I),
			placeholder: y,
			disabled: x,
			size: M,
			"aria-describedby": P.describedBy,
			"aria-invalid": P.hasError,
			onValueChange: O ? (e) => O(d(e)) : void 0,
			onBlur: k
		})
	});
});
//#endregion
export { p as SelectField };
