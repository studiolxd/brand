'use client';
import './color-picker-field.css';
import { n as e } from "./_shared/form-size.js";
import { n as t } from "./_shared/field-optional.js";
import { n } from "./_shared/field-labels.js";
import { a as r, i, n as a, r as o, t as s } from "./_shared/fieldshell.js";
import { t as c } from "./_shared/colorpicker.js";
import { forwardRef as l } from "react";
import { jsx as u, jsxs as d } from "react/jsx-runtime";
//#region src/stories/molecules/ColorPickerField/ColorPickerField.tsx
var f = l(function({ id: l, label: f, optional: p, optionalLabel: m, labelHidden: h, errorMessage: g, helperText: _, error: v = !1, size: y, required: b = !1, requiredLabel: x, className: S, ...C }, w) {
	let T = n(h), E = e(y), D = t(p, b), O = r({
		id: l,
		error: v,
		errorMessage: g,
		helperText: _
	}), { id: k, labelId: A } = O, j = b ? i(k) : void 0;
	return /* @__PURE__ */ d(a, {
		field: O,
		block: "color-picker-field",
		className: S,
		label: f,
		optional: D,
		optionalLabel: m,
		labelHidden: T,
		size: E,
		labelIdentified: !0,
		children: [/* @__PURE__ */ u(c, {
			dialogLabel: f,
			...C,
			ref: w,
			id: k,
			size: E,
			required: b,
			error: O.hasError,
			"aria-labelledby": A,
			"aria-describedby": o(O.describedBy, j)
		}), j && /* @__PURE__ */ u(s, {
			id: j,
			label: x
		})]
	});
});
//#endregion
export { f as ColorPickerField };
