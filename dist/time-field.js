'use client';
import './time-field.css';
import { n as e } from "./_shared/form-size.js";
import { Label as t } from "./label.js";
import { TimeSelect as n } from "./time-select.js";
import { n as r } from "./_shared/field-labels.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { forwardRef as o, useId as s } from "react";
//#region src/stories/molecules/TimeField/TimeField.tsx
var c = o(function({ id: o, label: c, labelHidden: l, value: u, step: d, name: f, size: p, disabled: m, readOnly: h, required: g, error: _ = !1, errorMessage: v, helperText: y, className: b, hoursLabel: x, minutesLabel: S, onChange: C, onBlur: w }, T) {
	let E = r(l), D = e(p), O = s(), k = o ?? O, A = v ? `${k}-error` : void 0, j = y ? `${k}-helper` : void 0, M = [A, j].filter(Boolean).join(" ") || void 0, N = _ || !!v;
	return /* @__PURE__ */ a("div", {
		className: ["time-field", b].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ i(t, {
				id: `${k}-label`,
				htmlFor: k,
				hidden: E,
				size: D,
				children: c
			}),
			/* @__PURE__ */ i(n, {
				ref: T,
				id: k,
				name: f,
				value: u,
				step: d,
				size: D,
				disabled: m,
				readOnly: h,
				required: g,
				error: N,
				hoursLabel: x,
				minutesLabel: S,
				"aria-labelledby": `${k}-label`,
				"aria-describedby": M,
				onChange: C,
				onBlur: w
			}),
			v && /* @__PURE__ */ i("span", {
				id: A,
				className: "time-field__error",
				role: "alert",
				children: v
			}),
			y && /* @__PURE__ */ i("span", {
				id: j,
				className: "time-field__helper",
				children: y
			})
		]
	});
});
//#endregion
export { c as TimeField };
