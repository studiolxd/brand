'use client';
import './date-picker-field.css';
import { n as e } from "./_shared/form-size.js";
import { Label as t } from "./label.js";
import { DatePicker as n } from "./date-picker.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { forwardRef as a, useId as o } from "react";
//#region src/stories/molecules/DatePickerField/DatePickerField.tsx
var s = a(function({ id: a, label: s, labelHidden: c = !1, errorMessage: l, helperText: u, error: d = !1, size: f, className: p, ...m }, h) {
	let g = e(f), _ = o(), v = a ?? _, y = l ? `${v}-error` : void 0, b = u ? `${v}-helper` : void 0, x = [y, b].filter(Boolean).join(" ") || void 0, S = d || !!l;
	return /* @__PURE__ */ i("div", {
		className: ["date-picker-field", p].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ r(t, {
				htmlFor: v,
				hidden: c,
				size: g,
				children: s
			}),
			/* @__PURE__ */ r(n, {
				...m,
				ref: h,
				id: v,
				size: g,
				error: S,
				"aria-describedby": x
			}),
			l && /* @__PURE__ */ r("span", {
				id: y,
				className: "date-picker-field__error",
				role: "alert",
				children: l
			}),
			u && /* @__PURE__ */ r("span", {
				id: b,
				className: "date-picker-field__helper",
				children: u
			})
		]
	});
});
//#endregion
export { s as DatePickerField };
