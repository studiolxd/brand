'use client';
import './time-select.css';
import { Select as e } from "./select.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { forwardRef as r, useMemo as i } from "react";
//#region src/stories/atoms/TimeSelect/TimeSelect.tsx
function a(e) {
	return String(e).padStart(2, "0");
}
var o = r(function({ value: r, onChange: o, step: s = 5, size: c = "md", disabled: l, readOnly: u, error: d, id: f, name: p, required: m, "aria-labelledby": h, "aria-describedby": g, onBlur: _, className: v, hoursLabel: y = "Horas", minutesLabel: b = "Minutos", hoursPlaceholder: x = "HH", minutesPlaceholder: S = "MM" }, C) {
	let w = i(() => Array.from({ length: 24 }, (e, t) => ({
		value: String(t),
		label: a(t)
	})), []), T = i(() => {
		let e = [];
		for (let t = 0; t < 60; t += s) e.push({
			value: String(t),
			label: a(t)
		});
		return e;
	}, [s]), E = (e) => {
		let t = parseInt(e, 10), n = r?.m ?? 0;
		o?.({
			h: t,
			m: n
		});
	}, D = (e) => {
		let t = r?.h ?? 0;
		o?.({
			h: t,
			m: parseInt(e, 10)
		});
	}, O = ["time-select", v ?? ""].filter(Boolean).join(" "), k = r == null ? "" : String(r.h), A = r == null ? "" : String(r.m);
	return /* @__PURE__ */ n("div", {
		className: O,
		role: "group",
		"aria-labelledby": h,
		"aria-describedby": g,
		"aria-invalid": d || void 0,
		"aria-required": m || void 0,
		children: [
			/* @__PURE__ */ t(e, {
				ref: C,
				id: f,
				options: w,
				value: k,
				placeholder: x,
				size: c,
				disabled: l,
				readOnly: u,
				required: m,
				"aria-label": y,
				"aria-invalid": d,
				onValueChange: E,
				onBlur: _
			}),
			/* @__PURE__ */ t("span", {
				className: "time-select__sep",
				"aria-hidden": "true",
				children: ":"
			}),
			/* @__PURE__ */ t(e, {
				options: T,
				value: A,
				placeholder: S,
				size: c,
				disabled: l,
				readOnly: u,
				required: m,
				"aria-label": b,
				"aria-invalid": d,
				onValueChange: D,
				onBlur: _
			}),
			p && /* @__PURE__ */ t("input", {
				type: "hidden",
				name: p,
				value: r == null ? "" : `${a(r.h)}:${a(r.m)}`
			})
		]
	});
});
//#endregion
export { o as TimeSelect };
