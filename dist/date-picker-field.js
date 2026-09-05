'use client';
import './date-picker-field.css';
import { n as e } from "./_shared/form-size.js";
import { Label as t } from "./label.js";
import { n } from "./_shared/field-labels.js";
import { t as r } from "./_shared/DatePicker.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { forwardRef as o, useId as s } from "react";
//#region src/stories/molecules/DatePickerField/DatePickerField.tsx
var c = o(function({ id: o, label: c, labelHidden: l, errorMessage: u, helperText: d, error: f = !1, size: p, className: m, ...h }, g) {
	let _ = n(l), v = e(p), y = s(), b = o ?? y, x = u ? `${b}-error` : void 0, S = d ? `${b}-helper` : void 0, C = [x, S].filter(Boolean).join(" ") || void 0, w = f || !!u;
	return /* @__PURE__ */ a("div", {
		className: ["date-picker-field", m].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ i(t, {
				htmlFor: b,
				hidden: _,
				size: v,
				children: c
			}),
			/* @__PURE__ */ i(r, {
				calendarLabel: c,
				...h,
				ref: g,
				id: b,
				size: v,
				error: w,
				"aria-describedby": C
			}),
			u && /* @__PURE__ */ i("span", {
				id: x,
				className: "date-picker-field__error",
				role: "alert",
				children: u
			}),
			d && /* @__PURE__ */ i("span", {
				id: S,
				className: "date-picker-field__helper",
				children: d
			})
		]
	});
});
//#endregion
export { c as DatePickerField };
