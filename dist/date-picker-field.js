'use client';
import './date-picker-field.css';
import { Label as e } from "./label.js";
import { DatePicker as t } from "./date-picker.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/molecules/DatePickerField/DatePickerField.tsx
function i({ id: i, label: a, labelHidden: o = !0, errorMessage: s, helperText: c, error: l = !1, ...u }) {
	let d = s ? `${i}-error` : void 0, f = c ? `${i}-helper` : void 0, p = [d, f].filter(Boolean).join(" ") || void 0;
	return /* @__PURE__ */ r("div", {
		className: ["date-picker-field", l ? "date-picker-field--error" : ""].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ n(e, {
				htmlFor: i,
				hidden: o,
				children: a
			}),
			/* @__PURE__ */ n(t, {
				...u,
				id: i,
				error: l,
				describedBy: p
			}),
			s && /* @__PURE__ */ n("span", {
				id: d,
				className: "date-picker-field__error",
				role: "alert",
				children: s
			}),
			c && /* @__PURE__ */ n("span", {
				id: f,
				className: "date-picker-field__helper",
				children: c
			})
		]
	});
}
//#endregion
export { i as DatePickerField };
