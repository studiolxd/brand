'use client';
import './time-field.css';
import { n as e } from "./_shared/form-size.js";
import { ErrorText as t } from "./error-text.js";
import { Label as n } from "./label.js";
import { TimeSelect as r } from "./time-select.js";
import { n as i } from "./_shared/field-labels.js";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
import { forwardRef as s, useId as c } from "react";
//#region src/stories/molecules/TimeField/TimeField.tsx
var l = s(function({ id: s, label: l, labelHidden: u, value: d, step: f, name: p, size: m, disabled: h, readOnly: g, required: _, error: v = !1, errorMessage: y, helperText: b, className: x, hoursLabel: S, minutesLabel: C, onChange: w, onBlur: T }, E) {
	let D = i(u), O = e(m), k = c(), A = s ?? k, j = y ? `${A}-error` : void 0, M = b ? `${A}-helper` : void 0, N = [j, M].filter(Boolean).join(" ") || void 0, P = v || !!y;
	return /* @__PURE__ */ o("div", {
		className: ["time-field", x].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ a(n, {
				id: `${A}-label`,
				htmlFor: A,
				hidden: D,
				size: O,
				children: l
			}),
			/* @__PURE__ */ a(r, {
				ref: E,
				id: A,
				name: p,
				value: d,
				step: f,
				size: O,
				disabled: h,
				readOnly: g,
				required: _,
				error: P,
				hoursLabel: S,
				minutesLabel: C,
				"aria-labelledby": `${A}-label`,
				"aria-describedby": N,
				onChange: w,
				onBlur: T
			}),
			y && /* @__PURE__ */ a(t, {
				id: j,
				children: y
			}),
			b && /* @__PURE__ */ a("span", {
				id: M,
				className: "time-field__helper",
				children: b
			})
		]
	});
});
//#endregion
export { l as TimeField };
