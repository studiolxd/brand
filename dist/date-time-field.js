'use client';
import './date-time-field.css';
import { Label as e } from "./label.js";
import { TimeSelect as t } from "./time-select.js";
import { DatePicker as n } from "./date-picker.js";
import { useCallback as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/stories/molecules/DateTimeField/DateTimeField.tsx
function o(e, t) {
	let n = new Date(e);
	return n.setHours(t.h, t.m, 0, 0), n;
}
function s(e) {
	return e ? {
		h: e.getHours(),
		m: e.getMinutes()
	} : null;
}
function c({ id: c, label: l, labelHidden: u = !0, value: d, onChange: f, placeholder: p, timeStep: m, minDate: h, maxDate: g, disabledDates: _, size: v = "md", disabled: y, readOnly: b, error: x = !1, errorMessage: S, helperText: C, locale: w = "es-ES" }) {
	let T = `${c}-date`, E = S ? `${c}-error` : void 0, D = C ? `${c}-helper` : void 0, O = r((e) => {
		let t = s(d) ?? {
			h: 0,
			m: 0
		};
		f?.(o(e, t));
	}, [d, f]), k = r((e) => {
		d && f?.(o(d, e));
	}, [d, f]);
	return /* @__PURE__ */ a("div", {
		className: ["date-time-field", x ? "date-time-field--error" : ""].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ i(e, {
				htmlFor: T,
				hidden: u,
				children: l
			}),
			/* @__PURE__ */ a("div", {
				className: "date-time-field__controls",
				children: [/* @__PURE__ */ i(n, {
					id: T,
					value: d ?? null,
					onChange: O,
					placeholder: p,
					minDate: h,
					maxDate: g,
					disabledDates: _,
					size: v,
					disabled: y,
					readOnly: b,
					error: x,
					locale: w
				}), /* @__PURE__ */ i(t, {
					value: s(d),
					onChange: k,
					step: m,
					size: v,
					disabled: y,
					readOnly: b,
					error: x
				})]
			}),
			S && /* @__PURE__ */ i("span", {
				id: E,
				className: "date-time-field__error",
				role: "alert",
				children: S
			}),
			C && /* @__PURE__ */ i("span", {
				id: D,
				className: "date-time-field__helper",
				children: C
			})
		]
	});
}
//#endregion
export { c as DateTimeField };
