'use client';
import './date-time-field.css';
import { n as e } from "./_shared/form-size.js";
import { Label as t } from "./label.js";
import { TimeSelect as n } from "./time-select.js";
import { DatePicker as r } from "./date-picker.js";
import { forwardRef as i, useCallback as a, useId as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
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
var d = i(function({ id: i, label: d, labelHidden: f = !1, value: p, placeholder: m, timeStep: h, minDate: g, maxDate: _, disabledDates: v, name: y, size: b, disabled: x, readOnly: S, error: C = !1, errorMessage: w, helperText: T, locale: E = "es-ES", className: D, hoursLabel: O, minutesLabel: k, onChange: A, onBlur: j }, M) {
	let N = e(b), P = o(), F = i ?? P, I = `${F}-date`, L = w ? `${F}-error` : void 0, R = T ? `${F}-helper` : void 0, z = [L, R].filter(Boolean).join(" ") || void 0, B = C || !!w, V = a((e) => {
		let t = u(p) ?? {
			h: 0,
			m: 0
		};
		A?.(l(e, t));
	}, [p, A]), H = a((e) => {
		p && A?.(l(p, e));
	}, [p, A]);
	return /* @__PURE__ */ c("div", {
		className: ["date-time-field", D].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ s(t, {
				id: `${F}-label`,
				htmlFor: I,
				hidden: f,
				size: N,
				children: d
			}),
			/* @__PURE__ */ c("div", {
				className: "date-time-field__controls",
				role: "group",
				"aria-labelledby": `${F}-label`,
				"aria-describedby": z,
				"aria-invalid": B || void 0,
				children: [/* @__PURE__ */ s(r, {
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
				}), /* @__PURE__ */ s(n, {
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
			w && /* @__PURE__ */ s("span", {
				id: L,
				className: "date-time-field__error",
				role: "alert",
				children: w
			}),
			T && /* @__PURE__ */ s("span", {
				id: R,
				className: "date-time-field__helper",
				children: T
			})
		]
	});
});
//#endregion
export { d as DateTimeField };
