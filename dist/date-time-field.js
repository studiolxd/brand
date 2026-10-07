'use client';
import './date-time-field.css';
import { n as e } from "./_shared/form-size.js";
import { TimeSelect as t } from "./time-select.js";
import { n } from "./_shared/field-labels.js";
import { n as r, t as i } from "./_shared/fieldshell.js";
import { t as a } from "./_shared/datepicker.js";
import { forwardRef as o, useCallback as s } from "react";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
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
var f = o(function({ id: o, label: f, labelHidden: p, value: m, placeholder: h, timeStep: g, minDate: _, maxDate: v, disabledDates: y, name: b, size: x, disabled: S, readOnly: C, error: w = !1, errorMessage: T, helperText: E, locale: D = "es-ES", className: O, calendarLabel: k, openCalendarLabel: A, invalidMessage: j, maskLetters: M, previousMonthLabel: N, nextMonthLabel: P, previousYearsLabel: F, nextYearsLabel: I, yearGridLabel: L, gridLabel: R, today: z, hoursLabel: B, minutesLabel: V, onChange: H, onBlur: U }, W) {
	let G = n(p), K = e(x), q = r({
		id: o,
		error: w,
		errorMessage: T,
		helperText: E
	}), { id: J } = q, Y = `${J}-date`, X = s((e) => {
		if (!e) {
			H?.(null);
			return;
		}
		let t = d(m) ?? {
			h: 0,
			m: 0
		};
		H?.(u(e, t));
	}, [m, H]), Z = s((e) => {
		m && H?.(u(m, e));
	}, [m, H]);
	return /* @__PURE__ */ c(i, {
		field: q,
		block: "date-time-field",
		className: O,
		label: f,
		labelHidden: G,
		size: K,
		labelIdentified: !0,
		labelFor: Y,
		children: /* @__PURE__ */ l("div", {
			className: "date-time-field__controls",
			role: "group",
			"aria-labelledby": q.labelId,
			"aria-describedby": q.describedBy,
			children: [/* @__PURE__ */ c(a, {
				ref: W,
				className: "date-time-field__date",
				id: Y,
				name: b,
				value: m ?? null,
				onChange: X,
				onBlur: U,
				placeholder: h,
				minDate: _,
				maxDate: v,
				disabledDates: y,
				size: K,
				disabled: S,
				readOnly: C,
				error: q.hasError,
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
				gridLabel: R,
				today: z
			}), /* @__PURE__ */ c(t, {
				value: d(m),
				onChange: Z,
				onBlur: U,
				step: g,
				size: K,
				disabled: S,
				readOnly: C,
				error: q.hasError,
				hoursLabel: B,
				minutesLabel: V
			})]
		})
	});
});
//#endregion
export { f as DateTimeField };
