'use client';
import './time-field.css';
import { n as e } from "./_shared/form-size.js";
import { Label as t } from "./label.js";
import { TimeSelect as n } from "./time-select.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { forwardRef as a, useId as o } from "react";
//#region src/stories/molecules/TimeField/TimeField.tsx
var s = a(function({ id: a, label: s, labelHidden: c = !1, value: l, step: u, name: d, size: f, disabled: p, readOnly: m, required: h, error: g = !1, errorMessage: _, helperText: v, className: y, hoursLabel: b, minutesLabel: x, onChange: S, onBlur: C }, w) {
	let T = e(f), E = o(), D = a ?? E, O = _ ? `${D}-error` : void 0, k = v ? `${D}-helper` : void 0, A = [O, k].filter(Boolean).join(" ") || void 0, j = g || !!_;
	return /* @__PURE__ */ i("div", {
		className: ["time-field", y].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ r(t, {
				id: `${D}-label`,
				htmlFor: D,
				hidden: c,
				size: T,
				children: s
			}),
			/* @__PURE__ */ r(n, {
				ref: w,
				id: D,
				name: d,
				value: l,
				step: u,
				size: T,
				disabled: p,
				readOnly: m,
				required: h,
				error: j,
				hoursLabel: b,
				minutesLabel: x,
				"aria-labelledby": `${D}-label`,
				"aria-describedby": A,
				onChange: S,
				onBlur: C
			}),
			_ && /* @__PURE__ */ r("span", {
				id: O,
				className: "time-field__error",
				role: "alert",
				children: _
			}),
			v && /* @__PURE__ */ r("span", {
				id: k,
				className: "time-field__helper",
				children: v
			})
		]
	});
});
//#endregion
export { s as TimeField };
