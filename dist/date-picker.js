'use client';
import './date-picker.css';
import { Popover as e } from "./popover.js";
import { Calendar as t } from "./calendar.js";
import { Fragment as n, jsx as r, jsxs as i } from "react/jsx-runtime";
import { forwardRef as a, useCallback as o, useState as s } from "react";
//#region src/stories/molecules/DatePicker/DatePicker.tsx
function c(e, t) {
	return new Intl.DateTimeFormat(t, {
		weekday: "short",
		day: "numeric",
		month: "short",
		year: "numeric"
	}).format(e);
}
var l = a(function({ value: a, onChange: l, placeholder: u = "Seleccionar fecha…", minDate: d, maxDate: f, disabledDates: p, size: m = "md", disabled: h, readOnly: g, error: _ = !1, locale: v = "es-ES", id: y, name: b, describedBy: x, "aria-describedby": S, "aria-label": C, calendarLabel: w = "Calendario", onBlur: T, className: E }, D) {
	let [O, k] = s(!1), A = o((e) => {
		g && e || k(e);
	}, [g]), j = o((e) => {
		l?.(e), k(!1);
	}, [l]), M = a instanceof Date ? c(a, v) : null, N = /* @__PURE__ */ r("button", {
		ref: D,
		id: y,
		type: "button",
		className: [
			"date-picker__trigger",
			m === "md" ? "" : `date-picker__trigger--${m}`,
			_ ? "date-picker__trigger--error" : "",
			M ? "" : "date-picker__trigger--placeholder",
			E ?? ""
		].filter(Boolean).join(" "),
		disabled: h,
		"aria-haspopup": "dialog",
		"aria-expanded": O,
		"aria-readonly": g || void 0,
		"aria-invalid": _ || void 0,
		"aria-label": C,
		"aria-describedby": x ?? S,
		onBlur: T,
		children: M ?? u
	});
	return /* @__PURE__ */ i(n, { children: [b && /* @__PURE__ */ r("input", {
		type: "hidden",
		name: b,
		value: a instanceof Date ? a.toISOString().slice(0, 10) : ""
	}), /* @__PURE__ */ r(e, {
		trigger: N,
		label: w,
		open: O,
		onOpenChange: A,
		side: "bottom",
		align: "start",
		sideOffset: -1,
		className: "date-picker__popover",
		children: /* @__PURE__ */ r(t, {
			value: a ?? null,
			onChange: j,
			minDate: d,
			maxDate: f,
			disabledDates: p,
			locale: v,
			size: m
		})
	})] });
});
//#endregion
export { l as DatePicker };
