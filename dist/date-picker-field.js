'use client';
import './date-picker-field.css';
import { n as e } from "./_shared/form-size.js";
import { ErrorText as t } from "./error-text.js";
import { Label as n } from "./label.js";
import { n as r } from "./_shared/field-labels.js";
import { t as i } from "./_shared/datepicker.js";
import { forwardRef as a, useId as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/stories/molecules/DatePickerField/DatePickerField.tsx
var l = a(function({ id: a, label: l, labelHidden: u, errorMessage: d, helperText: f, error: p = !1, size: m, className: h, ...g }, _) {
	let v = r(u), y = e(m), b = o(), x = a ?? b, S = d ? `${x}-error` : void 0, C = f ? `${x}-helper` : void 0, w = [S, C].filter(Boolean).join(" ") || void 0, T = p || !!d;
	return /* @__PURE__ */ c("div", {
		className: ["date-picker-field", h].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ s(n, {
				htmlFor: x,
				hidden: v,
				size: y,
				children: l
			}),
			/* @__PURE__ */ s(i, {
				calendarLabel: l,
				...g,
				ref: _,
				id: x,
				size: y,
				error: T,
				"aria-describedby": w
			}),
			d && /* @__PURE__ */ s(t, {
				id: S,
				children: d
			}),
			f && /* @__PURE__ */ s("span", {
				id: C,
				className: "date-picker-field__helper",
				children: f
			})
		]
	});
});
//#endregion
export { l as DatePickerField };
