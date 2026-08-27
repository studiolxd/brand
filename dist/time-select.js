'use client';
import './time-select.css';
import { Select as e } from "./select.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { forwardRef as r, useMemo as i } from "react";
//#region src/stories/atoms/TimeSelect/TimeSelect.tsx
function a(e) {
	return String(e).padStart(2, "0");
}
var o = r(function({ value: r, onChange: o, step: s = 5, size: c = "md", disabled: l, readOnly: u, error: d, id: f, name: p, "aria-labelledby": m, "aria-describedby": h, onBlur: g, className: _, hoursLabel: v = "Horas", minutesLabel: y = "Minutos", hoursPlaceholder: b = "HH", minutesPlaceholder: x = "MM" }, S) {
	let C = i(() => Array.from({ length: 24 }, (e, t) => ({
		value: String(t),
		label: a(t)
	})), []), w = i(() => {
		let e = [];
		for (let t = 0; t < 60; t += s) e.push({
			value: String(t),
			label: a(t)
		});
		return e;
	}, [s]), T = (e) => {
		let t = parseInt(e, 10), n = r?.m ?? 0;
		o?.({
			h: t,
			m: n
		});
	}, E = (e) => {
		let t = r?.h ?? 0;
		o?.({
			h: t,
			m: parseInt(e, 10)
		});
	}, D = ["time-select", _ ?? ""].filter(Boolean).join(" "), O = r == null ? "" : String(r.h), k = r == null ? "" : String(r.m);
	return /* @__PURE__ */ n("div", {
		className: D,
		role: "group",
		"aria-labelledby": m,
		"aria-describedby": h,
		"aria-invalid": d || void 0,
		children: [
			/* @__PURE__ */ t(e, {
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
			/* @__PURE__ */ t("span", {
				className: "time-select__sep",
				"aria-hidden": "true",
				children: ":"
			}),
			/* @__PURE__ */ t(e, {
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
