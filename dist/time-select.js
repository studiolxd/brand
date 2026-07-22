'use client';
import './time-select.css';
import { Select as e } from "./select.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { useMemo as r } from "react";
//#region src/stories/atoms/TimeSelect/TimeSelect.tsx
function i(e) {
	return String(e).padStart(2, "0");
}
function a({ value: a, onChange: o, step: s = 5, size: c = "md", disabled: l, readOnly: u, error: d, id: f }) {
	let p = r(() => Array.from({ length: 24 }, (e, t) => ({
		value: String(t),
		label: i(t)
	})), []), m = r(() => {
		let e = [];
		for (let t = 0; t < 60; t += s) e.push({
			value: String(t),
			label: i(t)
		});
		return e;
	}, [s]), h = (e) => {
		let t = parseInt(e, 10), n = a?.m ?? 0;
		o?.({
			h: t,
			m: n
		});
	}, g = (e) => {
		let t = a?.h ?? 0;
		o?.({
			h: t,
			m: parseInt(e, 10)
		});
	}, _ = ["time-select", d ? "time-select--error" : ""].filter(Boolean).join(" "), v = a == null ? void 0 : String(a.h), y = a == null ? void 0 : String(a.m);
	return /* @__PURE__ */ n("div", {
		className: _,
		children: [
			/* @__PURE__ */ t(e, {
				id: f,
				options: p,
				value: v,
				placeholder: "HH",
				size: c,
				disabled: l,
				readOnly: u,
				"aria-label": "Horas",
				onValueChange: h
			}),
			/* @__PURE__ */ t("span", {
				className: "time-select__sep",
				"aria-hidden": "true",
				children: ":"
			}),
			/* @__PURE__ */ t(e, {
				options: m,
				value: y,
				placeholder: "MM",
				size: c,
				disabled: l,
				readOnly: u,
				"aria-label": "Minutos",
				onValueChange: g
			})
		]
	});
}
//#endregion
export { a as TimeSelect };
