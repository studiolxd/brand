'use client';
import './time-select.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Select as t } from "./select.js";
import { forwardRef as n, useMemo as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/stories/atoms/TimeSelect/TimeSelect.tsx
function o(e) {
	return String(e).padStart(2, "0");
}
var s = n(function({ value: n, onChange: s, step: c = 5, size: l = "md", disabled: u, readOnly: d, error: f, id: p, name: m, required: h, "aria-labelledby": g, "aria-describedby": _, onBlur: v, className: y, hoursLabel: b, minutesLabel: x, hoursPlaceholder: S, minutesPlaceholder: C }, w) {
	let T = e("timeSelect"), E = r(() => Array.from({ length: 24 }, (e, t) => ({
		value: String(t),
		label: o(t)
	})), []), D = r(() => {
		let e = [];
		for (let t = 0; t < 60; t += c) e.push({
			value: String(t),
			label: o(t)
		});
		return e;
	}, [c]), O = (e) => {
		let t = parseInt(e, 10), r = n?.m ?? 0;
		s?.({
			h: t,
			m: r
		});
	}, k = (e) => {
		let t = n?.h ?? 0;
		s?.({
			h: t,
			m: parseInt(e, 10)
		});
	}, A = ["time-select", y ?? ""].filter(Boolean).join(" "), j = n == null ? "" : String(n.h), M = n == null ? "" : String(n.m);
	return /* @__PURE__ */ a("div", {
		className: A,
		role: "group",
		"aria-labelledby": g,
		"aria-describedby": _,
		"aria-invalid": f || void 0,
		"aria-required": h || void 0,
		children: [
			/* @__PURE__ */ i(t, {
				ref: w,
				id: p,
				options: E,
				value: j,
				placeholder: j === "" ? T("maskHours", S) : void 0,
				size: l,
				disabled: u,
				readOnly: d,
				required: h,
				"aria-label": T("hours", b),
				"aria-invalid": f,
				onValueChange: O,
				onBlur: v
			}),
			/* @__PURE__ */ i("span", {
				className: "time-select__sep",
				"aria-hidden": "true",
				children: ":"
			}),
			/* @__PURE__ */ i(t, {
				options: D,
				value: M,
				placeholder: M === "" ? T("maskMinutes", C) : void 0,
				size: l,
				disabled: u,
				readOnly: d,
				required: h,
				"aria-label": T("minutes", x),
				"aria-invalid": f,
				onValueChange: k,
				onBlur: v
			}),
			m && /* @__PURE__ */ i("input", {
				type: "hidden",
				name: m,
				value: n == null ? "" : `${o(n.h)}:${o(n.m)}`
			})
		]
	});
});
//#endregion
export { s as TimeSelect };
