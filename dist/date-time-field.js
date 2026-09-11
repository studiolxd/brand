'use client';
import './date-time-field.css';
import { n as e } from "./_shared/form-size.js";
import { ErrorText as t } from "./error-text.js";
import { Label as n } from "./label.js";
import { TimeSelect as r } from "./time-select.js";
import { n as i } from "./_shared/field-labels.js";
import { t as a } from "./_shared/datepicker.js";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
import { forwardRef as c, useCallback as l, useId as u } from "react";
//#region src/stories/molecules/DateTimeField/DateTimeField.tsx
function d(e, t) {
	let n = new Date(e);
	return n.setHours(t.h, t.m, 0, 0), n;
}
function f(e) {
	return e ? {
		h: e.getHours(),
		m: e.getMinutes()
	} : null;
}
var p = c(function({ id: c, label: p, labelHidden: m, value: h, placeholder: g, timeStep: _, minDate: v, maxDate: y, disabledDates: b, name: x, size: S, disabled: C, readOnly: w, error: T = !1, errorMessage: E, helperText: D, locale: O = "es-ES", className: k, calendarLabel: A, openCalendarLabel: j, invalidMessage: M, maskLetters: N, previousMonthLabel: P, nextMonthLabel: F, previousYearsLabel: I, nextYearsLabel: L, yearGridLabel: R, gridLabel: z, hoursLabel: B, minutesLabel: V, onChange: H, onBlur: U }, W) {
	let G = i(m), K = e(S), q = u(), J = c ?? q, Y = `${J}-date`, X = E ? `${J}-error` : void 0, Z = D ? `${J}-helper` : void 0, Q = [X, Z].filter(Boolean).join(" ") || void 0, $ = T || !!E, ee = l((e) => {
		if (!e) {
			H?.(null);
			return;
		}
		let t = f(h) ?? {
			h: 0,
			m: 0
		};
		H?.(d(e, t));
	}, [h, H]), te = l((e) => {
		h && H?.(d(h, e));
	}, [h, H]);
	return /* @__PURE__ */ s("div", {
		className: ["date-time-field", k].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ o(n, {
				id: `${J}-label`,
				htmlFor: Y,
				hidden: G,
				size: K,
				children: p
			}),
			/* @__PURE__ */ s("div", {
				className: "date-time-field__controls",
				role: "group",
				"aria-labelledby": `${J}-label`,
				"aria-describedby": Q,
				children: [/* @__PURE__ */ o(a, {
					ref: W,
					className: "date-time-field__date",
					id: Y,
					name: x,
					value: h ?? null,
					onChange: ee,
					onBlur: U,
					placeholder: g,
					minDate: v,
					maxDate: y,
					disabledDates: b,
					size: K,
					disabled: C,
					readOnly: w,
					error: $,
					locale: O,
					calendarLabel: A ?? p,
					openCalendarLabel: j,
					invalidMessage: M,
					maskLetters: N,
					previousMonthLabel: P,
					nextMonthLabel: F,
					previousYearsLabel: I,
					nextYearsLabel: L,
					yearGridLabel: R,
					gridLabel: z
				}), /* @__PURE__ */ o(r, {
					value: f(h),
					onChange: te,
					onBlur: U,
					step: _,
					size: K,
					disabled: C,
					readOnly: w,
					error: $,
					hoursLabel: B,
					minutesLabel: V
				})]
			}),
			E && /* @__PURE__ */ o(t, {
				id: X,
				children: E
			}),
			D && /* @__PURE__ */ o("span", {
				id: Z,
				className: "date-time-field__helper",
				children: D
			})
		]
	});
});
//#endregion
export { p as DateTimeField };
