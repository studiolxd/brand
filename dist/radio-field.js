'use client';
import './radio-field.css';
import { n as e } from "./_shared/form-size.js";
import { n as t } from "./_shared/radiogroupcontext.js";
import { Radio as n } from "./radio.js";
import { n as r } from "./_shared/field-labels.js";
import { a as i, n as a } from "./_shared/fieldshell.js";
import { forwardRef as o } from "react";
import { jsx as s } from "react/jsx-runtime";
//#region src/stories/molecules/RadioField/RadioField.tsx
var c = o(function({ label: o, labelHidden: c, id: l, size: u, disabled: d, error: f = !1, errorMessage: p, helperText: m, className: h, "aria-describedby": g, ..._ }, v) {
	let y = t(), b = r(c), x = e(u ?? y?.size), S = i({
		id: l,
		error: f || (y?.error ?? !1),
		errorMessage: p,
		helperText: m,
		describedBy: g
	}), { id: C } = S, w = d ?? y?.disabled;
	return /* @__PURE__ */ s(a, {
		field: S,
		block: "radio-field",
		modifiers: [x !== "md" && `radio-field--${x}`, w && "radio-field--disabled"],
		className: h,
		layout: "inline",
		label: o,
		labelHidden: b,
		children: /* @__PURE__ */ s(n, {
			ref: v,
			..._,
			id: C,
			size: x,
			disabled: w,
			error: S.hasError,
			"aria-describedby": S.describedBy
		})
	});
});
//#endregion
export { c as RadioField };
