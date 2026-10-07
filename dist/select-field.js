'use client';
import './select-field.css';
import { n as e } from "./_shared/form-size.js";
import { Select as t, isSelectOptionGroup as n } from "./select.js";
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
var f = o(function({ id: o, label: c, optional: f, optionalLabel: p, labelHidden: m, options: h, value: g, defaultValue: _, placeholder: v, name: y, disabled: b, required: x, size: S, error: C = !1, errorMessage: w, helperText: T, className: E, onValueChange: D, onBlur: O }, k) {
	let A = r(m), j = e(S), M = i({
		id: o,
		error: C,
		errorMessage: w,
		helperText: T
	}), { id: N } = M, P = h.some((e) => n(e) ? e.options.some((e) => e.value === "") : e.value === "");
	return /* @__PURE__ */ s(a, {
		field: M,
		block: "select-field",
		className: E,
		label: c,
		optional: f,
		optionalLabel: p,
		labelHidden: A,
		size: j,
		children: /* @__PURE__ */ s(t, {
			ref: k,
			id: N,
			name: y,
			required: x,
			options: P ? h.map((e) => n(e) ? {
				...e,
				options: e.options.map(d)
			} : d(e)) : h,
			value: l(g, P),
			defaultValue: l(_, P),
			placeholder: v,
			disabled: b,
			size: j,
			"aria-describedby": M.describedBy,
			"aria-invalid": M.hasError,
			onValueChange: D ? (e) => D(u(e)) : void 0,
			onBlur: O
		})
	});
});
//#endregion
export { f as SelectField };
