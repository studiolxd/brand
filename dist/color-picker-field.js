'use client';
import './color-picker-field.css';
import { n as e } from "./_shared/form-size.js";
import { ErrorText as t } from "./error-text.js";
import { Label as n } from "./label.js";
import { n as r } from "./_shared/field-labels.js";
import { t as i } from "./_shared/colorpicker.js";
import { forwardRef as a, useId as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/stories/molecules/ColorPickerField/ColorPickerField.tsx
var l = a(function({ id: a, label: l, labelHidden: u, errorMessage: d, helperText: f, error: p = !1, size: m, className: h, ...g }, _) {
	let v = r(u), y = e(m), b = o(), x = a ?? b, S = `${x}-label`, C = d ? `${x}-error` : void 0, w = f ? `${x}-helper` : void 0, T = [C, w].filter(Boolean).join(" ") || void 0, E = p || !!d;
	return /* @__PURE__ */ c("div", {
		className: ["color-picker-field", h].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ s(n, {
				id: S,
				htmlFor: x,
				hidden: v,
				size: y,
				children: l
			}),
			/* @__PURE__ */ s(i, {
				dialogLabel: l,
				...g,
				ref: _,
				id: x,
				size: y,
				error: E,
				"aria-labelledby": S,
				"aria-describedby": T
			}),
			d && /* @__PURE__ */ s(t, {
				id: C,
				children: d
			}),
			f && /* @__PURE__ */ s("span", {
				id: w,
				className: "color-picker-field__helper",
				children: f
			})
		]
	});
});
//#endregion
export { l as ColorPickerField };
