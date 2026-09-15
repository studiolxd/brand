'use client';
import './time-select.css';
import { Select as e } from "./select.js";
import { forwardRef as t, useMemo as n } from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/atoms/TimeSelect/TimeSelect.tsx
function a(e) {
	return String(e).padStart(2, "0");
}
var o = t(function({ value: t, onChange: o, step: s = 5, size: c = "md", disabled: l, readOnly: u, error: d, id: f, name: p, required: m, "aria-labelledby": h, "aria-describedby": g, onBlur: _, className: v, hoursLabel: y = "Horas", minutesLabel: b = "Minutos", hoursPlaceholder: x = "HH", minutesPlaceholder: S = "MM" }, C) {
	let w = n(() => Array.from({ length: 24 }, (e, t) => ({
		value: String(t),
		label: a(t)
	})), []), T = n(() => {
		let e = [];
		for (let t = 0; t < 60; t += s) e.push({
			value: String(t),
			label: a(t)
		});
		return e;
	}, [s]), E = (e) => {
		let n = parseInt(e, 10), r = t?.m ?? 0;
		o?.({
			h: n,
			m: r
		});
	}, D = (e) => {
		let n = t?.h ?? 0;
		o?.({
			h: n,
			m: parseInt(e, 10)
		});
	}, O = ["time-select", v ?? ""].filter(Boolean).join(" "), k = t == null ? "" : String(t.h), A = t == null ? "" : String(t.m);
	return /* @__PURE__ */ i("div", {
		className: O,
		role: "group",
		"aria-labelledby": h,
		"aria-describedby": g,
		"aria-invalid": d || void 0,
		"aria-required": m || void 0,
		children: [
			/* @__PURE__ */ r(e, {
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
			/* @__PURE__ */ r("span", {
				className: "time-select__sep",
				"aria-hidden": "true",
				children: ":"
			}),
			/* @__PURE__ */ r(e, {
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
			p && /* @__PURE__ */ r("input", {
				type: "hidden",
				name: p,
				value: t == null ? "" : `${a(t.h)}:${a(t.m)}`
			})
		]
	});
});
//#endregion
export { o as TimeSelect };
