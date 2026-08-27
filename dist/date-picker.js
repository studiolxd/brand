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
var l = a(function({ value: a, onChange: l, placeholder: u = "Seleccionar fecha…", minDate: d, maxDate: f, disabledDates: p, size: m = "md", disabled: h, readOnly: g, error: _ = !1, locale: v = "es-ES", id: y, name: b, describedBy: x, "aria-describedby": S, "aria-label": C, onBlur: w, className: T }, E) {
	let [D, O] = s(!1), k = o((e) => {
		g && e || O(e);
	}, [g]), A = o((e) => {
		l?.(e), O(!1);
	}, [l]), j = a instanceof Date ? c(a, v) : null, M = /* @__PURE__ */ r("button", {
		ref: E,
		id: y,
		type: "button",
		className: [
			"date-picker__trigger",
			m === "md" ? "" : `date-picker__trigger--${m}`,
			_ ? "date-picker__trigger--error" : "",
			j ? "" : "date-picker__trigger--placeholder",
			T ?? ""
		].filter(Boolean).join(" "),
		disabled: h,
		"aria-haspopup": "dialog",
		"aria-expanded": D,
		"aria-readonly": g || void 0,
		"aria-invalid": _ || void 0,
		"aria-label": C,
		"aria-describedby": x ?? S,
		onBlur: w,
		children: j ?? u
	});
	return /* @__PURE__ */ i(n, { children: [b && /* @__PURE__ */ r("input", {
		type: "hidden",
		name: b,
		value: a instanceof Date ? a.toISOString().slice(0, 10) : ""
	}), /* @__PURE__ */ r(e, {
		trigger: M,
		open: D,
		onOpenChange: k,
		side: "bottom",
		align: "start",
		sideOffset: -1,
		className: "date-picker__popover",
		children: /* @__PURE__ */ r(t, {
			value: a ?? null,
			onChange: A,
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
