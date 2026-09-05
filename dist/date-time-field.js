'use client';
import './date-time-field.css';
import { n as e } from "./_shared/form-size.js";
import { Label as t } from "./label.js";
import { TimeSelect as n } from "./time-select.js";
import { n as r } from "./_shared/field-labels.js";
import { t as i } from "./_shared/DatePicker.js";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
import { forwardRef as s, useCallback as c, useId as l } from "react";
//#region src/stories/molecules/DateTimeField/DateTimeField.tsx
function u(e, t) {
	let n = new Date(e);
	return n.setHours(t.h, t.m, 0, 0), n;
}
function d(e) {
	return e ? {
		h: e.getHours(),
		m: e.getMinutes()
	} : null;
}
var f = s(function({ id: s, label: f, labelHidden: p, value: m, placeholder: h, timeStep: g, minDate: _, maxDate: v, disabledDates: y, name: b, size: x, disabled: S, readOnly: C, error: w = !1, errorMessage: T, helperText: E, locale: D = "es-ES", className: O, hoursLabel: k, minutesLabel: A, onChange: j, onBlur: M }, N) {
	let P = r(p), F = e(x), I = l(), L = s ?? I, R = `${L}-date`, z = T ? `${L}-error` : void 0, B = E ? `${L}-helper` : void 0, V = [z, B].filter(Boolean).join(" ") || void 0, H = w || !!T, U = c((e) => {
		if (!e) {
			j?.(null);
			return;
		}
		let t = d(m) ?? {
			h: 0,
			m: 0
		};
		j?.(u(e, t));
	}, [m, j]), W = c((e) => {
		m && j?.(u(m, e));
	}, [m, j]);
	return /* @__PURE__ */ o("div", {
		className: ["date-time-field", O].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ a(t, {
				id: `${L}-label`,
				htmlFor: R,
				hidden: P,
				size: F,
				children: f
			}),
			/* @__PURE__ */ o("div", {
				className: "date-time-field__controls",
				role: "group",
				"aria-labelledby": `${L}-label`,
				"aria-describedby": V,
				children: [/* @__PURE__ */ a(i, {
					ref: N,
					className: "date-time-field__date",
					id: R,
					name: b,
					value: m ?? null,
					onChange: U,
					onBlur: M,
					placeholder: h,
					minDate: _,
					maxDate: v,
					disabledDates: y,
					size: F,
					disabled: S,
					readOnly: C,
					error: H,
					locale: D
				}), /* @__PURE__ */ a(n, {
					value: d(m),
					onChange: W,
					onBlur: M,
					step: g,
					size: F,
					disabled: S,
					readOnly: C,
					error: H,
					hoursLabel: k,
					minutesLabel: A
				})]
			}),
			T && /* @__PURE__ */ a("span", {
				id: z,
				className: "date-time-field__error",
				role: "alert",
				children: T
			}),
			E && /* @__PURE__ */ a("span", {
				id: B,
				className: "date-time-field__helper",
				children: E
			})
		]
	});
});
//#endregion
export { f as DateTimeField };
