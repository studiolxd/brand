'use client';
import './time-select.css';
import { Select as e } from "./select.js";
import { forwardRef as t, useMemo as n } from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/atoms/TimeSelect/TimeSelect.tsx
function a(e) {
	return String(e).padStart(2, "0");
}
var o = t(function({ value: t, onChange: o, step: s = 5, size: c = "md", disabled: l, readOnly: u, error: d, id: f, name: p, "aria-labelledby": m, "aria-describedby": h, onBlur: g, className: _, hoursLabel: v = "Horas", minutesLabel: y = "Minutos", hoursPlaceholder: b = "HH", minutesPlaceholder: x = "MM" }, S) {
	let C = n(() => Array.from({ length: 24 }, (e, t) => ({
		value: String(t),
		label: a(t)
	})), []), w = n(() => {
		let e = [];
		for (let t = 0; t < 60; t += s) e.push({
			value: String(t),
			label: a(t)
		});
		return e;
	}, [s]), T = (e) => {
		let n = parseInt(e, 10), r = t?.m ?? 0;
		o?.({
			h: n,
			m: r
		});
	}, E = (e) => {
		let n = t?.h ?? 0;
		o?.({
			h: n,
			m: parseInt(e, 10)
		});
	}, D = ["time-select", _ ?? ""].filter(Boolean).join(" "), O = t == null ? "" : String(t.h), k = t == null ? "" : String(t.m);
	return /* @__PURE__ */ i("div", {
		className: D,
		role: "group",
		"aria-labelledby": m,
		"aria-describedby": h,
		"aria-invalid": d || void 0,
		children: [
			/* @__PURE__ */ r(e, {
				ref: S,
				id: f,
				options: C,
				value: O,
				placeholder: b,
				size: c,
				disabled: l,
				readOnly: u,
				"aria-label": v,
				"aria-invalid": d,
				onValueChange: T,
				onBlur: g
			}),
			/* @__PURE__ */ r("span", {
				className: "time-select__sep",
				"aria-hidden": "true",
				children: ":"
			}),
			/* @__PURE__ */ r(e, {
				options: w,
				value: k,
				placeholder: x,
				size: c,
				disabled: l,
				readOnly: u,
				"aria-label": y,
				"aria-invalid": d,
				onValueChange: E,
				onBlur: g
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
