'use client';
import './date-time-field.css';
import { n as e } from "./_shared/form-size.js";
import { t } from "./_shared/timeselect.js";
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
var f = o(function({ id: o, label: f, optional: p, optionalLabel: m, labelHidden: h, value: g, placeholder: _, timeStep: v, minDate: y, maxDate: b, disabledDates: x, name: S, size: C, disabled: w, readOnly: T, required: E, error: D = !1, errorMessage: O, helperText: k, locale: A = "es-ES", className: j, calendarLabel: M, openCalendarLabel: N, invalidMessage: P, maskLetters: ee, previousMonthLabel: F, nextMonthLabel: I, previousYearsLabel: L, nextYearsLabel: R, yearGridLabel: z, gridLabel: B, today: V, hoursLabel: H, minutesLabel: U, onChange: W, onBlur: G }, K) {
	let q = n(h), J = e(C), Y = r({
		id: o,
		error: D,
		errorMessage: O,
		helperText: k
	}), { id: X } = Y, Z = `${X}-date`, Q = s((e) => {
		if (!e) {
			W?.(null);
			return;
		}
		let t = d(g) ?? {
			h: 0,
			m: 0
		};
		W?.(u(e, t));
	}, [g, W]), $ = s((e) => {
		g && W?.(u(g, e));
	}, [g, W]);
	return /* @__PURE__ */ c(i, {
		field: Y,
		block: "date-time-field",
		className: j,
		label: f,
		optional: p,
		optionalLabel: m,
		labelHidden: q,
		size: J,
		labelIdentified: !0,
		labelFor: Z,
		children: /* @__PURE__ */ l("div", {
			className: "date-time-field__controls",
			role: "group",
			"aria-labelledby": Y.labelId,
			"aria-describedby": Y.describedBy,
			children: [/* @__PURE__ */ c(a, {
				ref: K,
				className: "date-time-field__date",
				id: Z,
				name: S,
				value: g ?? null,
				onChange: Q,
				onBlur: G,
				placeholder: _,
				minDate: y,
				maxDate: b,
				disabledDates: x,
				size: J,
				disabled: w,
				readOnly: T,
				required: E,
				error: Y.hasError,
				locale: A,
				calendarLabel: M ?? f,
				openCalendarLabel: N,
				invalidMessage: P,
				maskLetters: ee,
				previousMonthLabel: F,
				nextMonthLabel: I,
				previousYearsLabel: L,
				nextYearsLabel: R,
				yearGridLabel: z,
				gridLabel: B,
				today: V
			}), /* @__PURE__ */ c(t, {
				value: d(g),
				onChange: $,
				onBlur: G,
				step: v,
				size: J,
				disabled: w,
				readOnly: T,
				required: E,
				error: Y.hasError,
				hoursLabel: H,
				minutesLabel: U
			})]
		})
	});
});
//#endregion
export { f as DateTimeField };
