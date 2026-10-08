import '../timeselect.css';
import { r as e } from "./brandmessagescontext.js";
import { Select as t } from "../select.js";
import { forwardRef as n, useMemo as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/stories/messages/es/timeSelect.ts
var o = {
	hours: "Horas",
	minutes: "Minutos",
	maskHours: "HH",
	maskMinutes: "MM"
};
//#endregion
//#region src/stories/atoms/TimeSelect/TimeSelect.tsx
function s(e) {
	return String(e).padStart(2, "0");
}
var c = n(function({ value: n, onChange: c, step: l = 5, size: u = "md", disabled: d, readOnly: f, error: p, id: m, name: h, required: g, "aria-labelledby": _, "aria-describedby": v, onBlur: y, className: b, hoursLabel: x, minutesLabel: S, hoursPlaceholder: C, minutesPlaceholder: w }, T) {
	let E = e("timeSelect", o), D = r(() => Array.from({ length: 24 }, (e, t) => ({
		value: String(t),
		label: s(t)
	})), []), O = r(() => {
		let e = [];
		for (let t = 0; t < 60; t += l) e.push({
			value: String(t),
			label: s(t)
		});
		return e;
	}, [l]), k = (e) => {
		let t = parseInt(e, 10), r = n?.m ?? 0;
		c?.({
			h: t,
			m: r
		});
	}, A = (e) => {
		let t = n?.h ?? 0;
		c?.({
			h: t,
			m: parseInt(e, 10)
		});
	}, j = ["time-select", b ?? ""].filter(Boolean).join(" "), M = n == null ? "" : String(n.h), N = n == null ? "" : String(n.m);
	return /* @__PURE__ */ a("div", {
		className: j,
		role: "group",
		"aria-labelledby": _,
		"aria-describedby": v,
		"aria-invalid": p || void 0,
		children: [
			/* @__PURE__ */ i(t, {
				ref: T,
				id: m,
				options: D,
				value: M,
				placeholder: M === "" ? E("maskHours", C) : void 0,
				size: u,
				disabled: d,
				readOnly: f,
				required: g,
				"aria-label": E("hours", x),
				"aria-invalid": p,
				onValueChange: k,
				onBlur: y
			}),
			/* @__PURE__ */ i("span", {
				className: "time-select__sep",
				"aria-hidden": "true",
				children: ":"
			}),
			/* @__PURE__ */ i(t, {
				options: O,
				value: N,
				placeholder: N === "" ? E("maskMinutes", w) : void 0,
				size: u,
				disabled: d,
				readOnly: f,
				required: g,
				"aria-label": E("minutes", S),
				"aria-invalid": p,
				onValueChange: A,
				onBlur: y
			}),
			h && /* @__PURE__ */ i("input", {
				type: "hidden",
				name: h,
				value: n == null ? "" : `${s(n.h)}:${s(n.m)}`
			})
		]
	});
});
//#endregion
export { c as t };
