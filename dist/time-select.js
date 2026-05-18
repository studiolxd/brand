'use client';
import './time-select.css';
import { Select as e } from "./select.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { useMemo as r } from "react";
//#region src/stories/atoms/TimeSelect/TimeSelect.tsx
function i(e) {
	return String(e).padStart(2, "0");
}
function a({ value: a, onChange: o, step: s = 5, size: c = "md", disabled: l, readOnly: u, error: d, dark: f, id: p }) {
	let m = r(() => Array.from({ length: 24 }, (e, t) => ({
		value: String(t),
		label: i(t)
	})), []), h = r(() => {
		let e = [];
		for (let t = 0; t < 60; t += s) e.push({
			value: String(t),
			label: i(t)
		});
		return e;
	}, [s]), g = (e) => {
		let t = parseInt(e, 10), n = a?.m ?? 0;
		o?.({
			h: t,
			m: n
		});
	}, _ = (e) => {
		let t = a?.h ?? 0;
		o?.({
			h: t,
			m: parseInt(e, 10)
		});
	}, v = ["time-select", d ? "time-select--error" : ""].filter(Boolean).join(" "), y = a == null ? void 0 : String(a.h), b = a == null ? void 0 : String(a.m);
	return /* @__PURE__ */ n("div", {
		className: v,
		children: [
			/* @__PURE__ */ t(e, {
				id: p,
				options: m,
				value: y,
				placeholder: "HH",
				size: c,
				disabled: l,
				readOnly: u,
				dark: f,
				"aria-label": "Horas",
				onValueChange: g
			}),
			/* @__PURE__ */ t("span", {
				className: "time-select__sep",
				"aria-hidden": "true",
				children: ":"
			}),
			/* @__PURE__ */ t(e, {
				options: h,
				value: b,
				placeholder: "MM",
				size: c,
				disabled: l,
				readOnly: u,
				dark: f,
				"aria-label": "Minutos",
				onValueChange: _
			})
		]
	});
}
//#endregion
export { a as TimeSelect };
