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
function l(e) {
	return `${String(e.getFullYear()).padStart(4, "0")}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
var u = a(function({ value: a, onChange: u, placeholder: d = "Seleccionar fecha…", minDate: f, maxDate: p, disabledDates: m, size: h = "md", disabled: g, readOnly: _, error: v = !1, locale: y = "es-ES", id: b, name: x, describedBy: S, "aria-describedby": C, "aria-label": w, calendarLabel: T = "Calendario", onBlur: E, className: D }, O) {
	let [k, A] = s(!1), j = o((e) => {
		_ && e || A(e);
	}, [_]), M = o((e) => {
		u?.(e), A(!1);
	}, [u]), N = a instanceof Date ? c(a, y) : null, P = /* @__PURE__ */ r("button", {
		ref: O,
		id: b,
		type: "button",
		className: [
			"date-picker__trigger",
			h === "md" ? "" : `date-picker__trigger--${h}`,
			v ? "date-picker__trigger--error" : "",
			N ? "" : "date-picker__trigger--placeholder",
			D ?? ""
		].filter(Boolean).join(" "),
		disabled: g,
		"aria-haspopup": "dialog",
		"aria-expanded": k,
		"aria-readonly": _ || void 0,
		"aria-invalid": v || void 0,
		"aria-label": w,
		"aria-describedby": S ?? C,
		onBlur: E,
		children: N ?? d
	});
	return /* @__PURE__ */ i(n, { children: [x && /* @__PURE__ */ r("input", {
		type: "hidden",
		name: x,
		value: a instanceof Date ? l(a) : ""
	}), /* @__PURE__ */ r(e, {
		trigger: P,
		label: T,
		open: k,
		onOpenChange: j,
		side: "bottom",
		align: "start",
		sideOffset: -1,
		className: "date-picker__popover",
		children: /* @__PURE__ */ r(t, {
			value: a ?? null,
			onChange: M,
			gridLabel: T,
			minDate: f,
			maxDate: p,
			disabledDates: m,
			locale: y,
			size: h
		})
	})] });
});
//#endregion
export { u as DatePicker };
