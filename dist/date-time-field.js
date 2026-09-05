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
var f = s(function({ id: s, label: f, labelHidden: p, value: m, placeholder: h, timeStep: g, minDate: _, maxDate: v, disabledDates: y, name: b, size: x, disabled: S, readOnly: C, error: w = !1, errorMessage: T, helperText: E, locale: D = "es-ES", className: O, calendarLabel: k, openCalendarLabel: A, invalidMessage: j, maskLetters: M, previousMonthLabel: N, nextMonthLabel: P, previousYearsLabel: F, nextYearsLabel: I, yearGridLabel: L, gridLabel: R, hoursLabel: z, minutesLabel: B, onChange: V, onBlur: H }, U) {
	let W = r(p), G = e(x), K = l(), q = s ?? K, J = `${q}-date`, Y = T ? `${q}-error` : void 0, X = E ? `${q}-helper` : void 0, Z = [Y, X].filter(Boolean).join(" ") || void 0, Q = w || !!T, $ = c((e) => {
		if (!e) {
			V?.(null);
			return;
		}
		let t = d(m) ?? {
			h: 0,
			m: 0
		};
		V?.(u(e, t));
	}, [m, V]), ee = c((e) => {
		m && V?.(u(m, e));
	}, [m, V]);
	return /* @__PURE__ */ o("div", {
		className: ["date-time-field", O].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ a(t, {
				id: `${q}-label`,
				htmlFor: J,
				hidden: W,
				size: G,
				children: f
			}),
			/* @__PURE__ */ o("div", {
				className: "date-time-field__controls",
				role: "group",
				"aria-labelledby": `${q}-label`,
				"aria-describedby": Z,
				children: [/* @__PURE__ */ a(i, {
					ref: U,
					className: "date-time-field__date",
					id: J,
					name: b,
					value: m ?? null,
					onChange: $,
					onBlur: H,
					placeholder: h,
					minDate: _,
					maxDate: v,
					disabledDates: y,
					size: G,
					disabled: S,
					readOnly: C,
					error: Q,
					locale: D,
					calendarLabel: k ?? f,
					openCalendarLabel: A,
					invalidMessage: j,
					maskLetters: M,
					previousMonthLabel: N,
					nextMonthLabel: P,
					previousYearsLabel: F,
					nextYearsLabel: I,
					yearGridLabel: L,
					gridLabel: R
				}), /* @__PURE__ */ a(n, {
					value: d(m),
					onChange: ee,
					onBlur: H,
					step: g,
					size: G,
					disabled: S,
					readOnly: C,
					error: Q,
					hoursLabel: z,
					minutesLabel: B
				})]
			}),
			T && /* @__PURE__ */ a("span", {
				id: Y,
				className: "date-time-field__error",
				role: "alert",
				children: T
			}),
			E && /* @__PURE__ */ a("span", {
				id: X,
				className: "date-time-field__helper",
				children: E
			})
		]
	});
});
//#endregion
export { f as DateTimeField };
