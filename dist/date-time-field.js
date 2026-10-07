'use client';
import './date-time-field.css';
import { n as e } from "./_shared/form-size.js";
import { t } from "./_shared/timeselect.js";
import { n } from "./_shared/field-optional.js";
import { n as r } from "./_shared/field-labels.js";
import { a as i, n as a } from "./_shared/fieldshell.js";
import { t as o } from "./_shared/datepicker.js";
import { forwardRef as s, useCallback as c } from "react";
import { jsx as l, jsxs as u } from "react/jsx-runtime";
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
var p = s(function({ id: s, label: p, optional: m, optionalLabel: h, labelHidden: g, value: _, placeholder: v, timeStep: y, minDate: b, maxDate: x, disabledDates: S, name: C, size: w, disabled: T, readOnly: E, required: D, error: O = !1, errorMessage: k, helperText: A, locale: j = "es-ES", className: M, calendarLabel: N, openCalendarLabel: P, invalidMessage: ee, maskLetters: F, previousMonthLabel: I, nextMonthLabel: L, previousYearsLabel: R, nextYearsLabel: z, yearGridLabel: B, gridLabel: V, today: H, hoursLabel: U, minutesLabel: W, onChange: G, onBlur: K }, q) {
	let J = r(g), Y = e(w), X = n(m, D), Z = i({
		id: s,
		error: O,
		errorMessage: k,
		helperText: A
	}), { id: Q } = Z, $ = `${Q}-date`, te = c((e) => {
		if (!e) {
			G?.(null);
			return;
		}
		let t = f(_) ?? {
			h: 0,
			m: 0
		};
		G?.(d(e, t));
	}, [_, G]), ne = c((e) => {
		_ && G?.(d(_, e));
	}, [_, G]);
	return /* @__PURE__ */ l(a, {
		field: Z,
		block: "date-time-field",
		className: M,
		label: p,
		optional: X,
		optionalLabel: h,
		labelHidden: J,
		size: Y,
		labelIdentified: !0,
		labelFor: $,
		children: /* @__PURE__ */ u("div", {
			className: "date-time-field__controls",
			role: "group",
			"aria-labelledby": Z.labelId,
			"aria-describedby": Z.describedBy,
			children: [/* @__PURE__ */ l(o, {
				ref: q,
				className: "date-time-field__date",
				id: $,
				name: C,
				value: _ ?? null,
				onChange: te,
				onBlur: K,
				placeholder: v,
				minDate: b,
				maxDate: x,
				disabledDates: S,
				size: Y,
				disabled: T,
				readOnly: E,
				required: D,
				error: Z.hasError,
				locale: j,
				calendarLabel: N ?? p,
				openCalendarLabel: P,
				invalidMessage: ee,
				maskLetters: F,
				previousMonthLabel: I,
				nextMonthLabel: L,
				previousYearsLabel: R,
				nextYearsLabel: z,
				yearGridLabel: B,
				gridLabel: V,
				today: H
			}), /* @__PURE__ */ l(t, {
				value: f(_),
				onChange: ne,
				onBlur: K,
				step: y,
				size: Y,
				disabled: T,
				readOnly: E,
				required: D,
				error: Z.hasError,
				hoursLabel: U,
				minutesLabel: W
			})]
		})
	});
});
//#endregion
export { p as DateTimeField };
