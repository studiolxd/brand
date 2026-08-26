'use client';
import './date-picker.css';
import { Popover as e } from "./popover.js";
import { Calendar as t } from "./calendar.js";
import { useCallback as n, useState as r } from "react";
import { jsx as i } from "react/jsx-runtime";
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
	let [y, b] = r(!1), x = n((e) => {
		m && e || b(e);
	}, [m]), S = n((e) => {
		s?.(e), b(!1);
	}, [s]), C = o instanceof Date ? a(o, g) : null;
	return /* @__PURE__ */ i(e, {
		trigger: /* @__PURE__ */ i("button", {
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
		children: /* @__PURE__ */ i(t, {
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
