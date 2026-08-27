'use client';
import './date-time-field.css';
import { n as e } from "./_shared/form-size.js";
import { Label as t } from "./label.js";
import { TimeSelect as n } from "./time-select.js";
import { DatePicker as r } from "./date-picker.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { forwardRef as o, useCallback as s, useId as c } from "react";
//#region src/stories/molecules/DateTimeField/DateTimeField.tsx
function l(e, t) {
	let n = new Date(e);
	return n.setHours(t.h, t.m, 0, 0), n;
}
function u(e) {
	return e ? {
		h: e.getHours(),
		m: e.getMinutes()
	} : null;
}
var d = o(function({ id: o, label: d, labelHidden: f = !1, value: p, placeholder: m, timeStep: h, minDate: g, maxDate: _, disabledDates: v, name: y, size: b, disabled: x, readOnly: S, error: C = !1, errorMessage: w, helperText: T, locale: E = "es-ES", className: D, hoursLabel: O, minutesLabel: k, onChange: A, onBlur: j }, M) {
	let N = e(b), P = c(), F = o ?? P, I = `${F}-date`, L = w ? `${F}-error` : void 0, R = T ? `${F}-helper` : void 0, z = [L, R].filter(Boolean).join(" ") || void 0, B = C || !!w, V = s((e) => {
		let t = u(p) ?? {
			h: 0,
			m: 0
		};
		A?.(l(e, t));
	}, [p, A]), H = s((e) => {
		p && A?.(l(p, e));
	}, [p, A]);
	return /* @__PURE__ */ a("div", {
		className: ["date-time-field", D].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ i(t, {
				id: `${F}-label`,
				htmlFor: I,
				hidden: f,
				size: N,
				children: d
			}),
			/* @__PURE__ */ a("div", {
				className: "date-time-field__controls",
				role: "group",
				"aria-labelledby": `${F}-label`,
				"aria-describedby": z,
				"aria-invalid": B || void 0,
				children: [/* @__PURE__ */ i(r, {
					ref: M,
					id: I,
					name: y,
					value: p ?? null,
					onChange: V,
					onBlur: j,
					placeholder: m,
					minDate: g,
					maxDate: _,
					disabledDates: v,
					size: N,
					disabled: x,
					readOnly: S,
					error: B,
					locale: E
				}), /* @__PURE__ */ i(n, {
					value: u(p),
					onChange: H,
					onBlur: j,
					step: h,
					size: N,
					disabled: x,
					readOnly: S,
					error: B,
					hoursLabel: O,
					minutesLabel: k
				})]
			}),
			w && /* @__PURE__ */ i("span", {
				id: L,
				className: "date-time-field__error",
				role: "alert",
				children: w
			}),
			T && /* @__PURE__ */ i("span", {
				id: R,
				className: "date-time-field__helper",
				children: T
			})
		]
	});
});
//#endregion
export { d as DateTimeField };
