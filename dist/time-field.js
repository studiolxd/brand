'use client';
import './time-field.css';
import { n as e } from "./_shared/form-size.js";
import { Label as t } from "./label.js";
import { TimeSelect as n } from "./time-select.js";
import { forwardRef as r, useId as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/molecules/TimeField/TimeField.tsx
var s = r(function({ id: r, label: s, labelHidden: c = !1, value: l, step: u, name: d, size: f, disabled: p, readOnly: m, error: h = !1, errorMessage: g, helperText: _, className: v, hoursLabel: y, minutesLabel: b, onChange: x, onBlur: S }, C) {
	let w = e(f), T = i(), E = r ?? T, D = g ? `${E}-error` : void 0, O = _ ? `${E}-helper` : void 0, k = [D, O].filter(Boolean).join(" ") || void 0, A = h || !!g;
	return /* @__PURE__ */ o("div", {
		className: ["time-field", v].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ a(t, {
				id: `${E}-label`,
				htmlFor: E,
				hidden: c,
				size: w,
				children: s
			}),
			/* @__PURE__ */ a(n, {
				ref: C,
				id: E,
				name: d,
				value: l,
				step: u,
				size: w,
				disabled: p,
				readOnly: m,
				error: A,
				hoursLabel: y,
				minutesLabel: b,
				"aria-labelledby": `${E}-label`,
				"aria-describedby": k,
				onChange: x,
				onBlur: S
			}),
			g && /* @__PURE__ */ a("span", {
				id: D,
				className: "time-field__error",
				role: "alert",
				children: g
			}),
			_ && /* @__PURE__ */ a("span", {
				id: O,
				className: "time-field__helper",
				children: _
			})
		]
	});
});
//#endregion
export { s as TimeField };
