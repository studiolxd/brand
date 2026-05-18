'use client';
import './date-picker.css';
import { Popover as e } from "./popover.js";
import { Calendar as t } from "./calendar.js";
import { jsx as n } from "react/jsx-runtime";
import { useCallback as r, useState as i } from "react";
//#region src/stories/molecules/DatePicker/DatePicker.tsx
function a(e, t) {
	return new Intl.DateTimeFormat(t, {
		weekday: "short",
		day: "numeric",
		month: "short",
		year: "numeric"
	}).format(e);
}
function o({ value: o, onChange: s, placeholder: c = "Seleccionar fecha…", minDate: l, maxDate: u, disabledDates: d, size: f = "md", disabled: p, readOnly: m, error: h = !1, locale: g = "es-ES", id: _, describedBy: v }) {
	let [y, b] = i(!1), x = r((e) => {
		m && e || b(e);
	}, [m]), S = r((e) => {
		s?.(e), b(!1);
	}, [s]), C = o instanceof Date ? a(o, g) : null;
	return /* @__PURE__ */ n(e, {
		trigger: /* @__PURE__ */ n("button", {
			id: _,
			type: "button",
			className: [
				"date-picker__trigger",
				f === "md" ? "" : `date-picker__trigger--${f}`,
				h ? "date-picker__trigger--error" : "",
				C ? "" : "date-picker__trigger--placeholder"
			].filter(Boolean).join(" "),
			disabled: p,
			"aria-haspopup": "dialog",
			"aria-expanded": y,
			"aria-readonly": m || void 0,
			"aria-describedby": v,
			children: C ?? c
		}),
		open: y,
		onOpenChange: x,
		side: "bottom",
		align: "start",
		sideOffset: -1,
		className: "date-picker__popover",
		children: /* @__PURE__ */ n(t, {
			value: o ?? null,
			onChange: S,
			minDate: l,
			maxDate: u,
			disabledDates: d,
			locale: g,
			size: f
		})
	});
}
//#endregion
export { o as DatePicker };
