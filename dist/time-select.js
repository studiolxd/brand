'use client';
import './time-select.css';
import { t as e } from "./_shared/Select.js";
import { useMemo as t } from "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/atoms/TimeSelect/TimeSelect.tsx
function i(e) {
	return String(e).padStart(2, "0");
}
function a({ value: a, onChange: o, step: s = 5, size: c = "md", disabled: l, readOnly: u, error: d, id: f, hoursLabel: p = "Horas", minutesLabel: m = "Minutos", hoursPlaceholder: h = "HH", minutesPlaceholder: g = "MM" }) {
	let _ = t(() => Array.from({ length: 24 }, (e, t) => ({
		value: String(t),
		label: i(t)
	})), []), v = t(() => {
		let e = [];
		for (let t = 0; t < 60; t += s) e.push({
			value: String(t),
			label: i(t)
		});
		return e;
	}, [s]), y = (e) => {
		let t = parseInt(e, 10), n = a?.m ?? 0;
		o?.({
			h: t,
			m: n
		});
	}, b = (e) => {
		let t = a?.h ?? 0;
		o?.({
			h: t,
			m: parseInt(e, 10)
		});
	}, x = ["time-select", d ? "time-select--error" : ""].filter(Boolean).join(" "), S = a == null ? void 0 : String(a.h), C = a == null ? void 0 : String(a.m);
	return /* @__PURE__ */ r("div", {
		className: x,
		children: [
			/* @__PURE__ */ n(e, {
				id: f,
				options: _,
				value: S,
				placeholder: h,
				size: c,
				disabled: l,
				readOnly: u,
				"aria-label": p,
				onValueChange: y
			}),
			/* @__PURE__ */ n("span", {
				className: "time-select__sep",
				"aria-hidden": "true",
				children: ":"
			}),
			/* @__PURE__ */ n(e, {
				options: v,
				value: C,
				placeholder: g,
				size: c,
				disabled: l,
				readOnly: u,
				"aria-label": m,
				onValueChange: b
			})
		]
	});
}
//#endregion
export { a as TimeSelect };
