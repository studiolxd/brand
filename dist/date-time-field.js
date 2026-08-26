'use client';
import './date-time-field.css';
import { n as e } from "./_shared/form-size.js";
import { Label as t } from "./label.js";
import { TimeSelect as n } from "./time-select.js";
import { DatePicker as r } from "./date-picker.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { useCallback as o } from "react";
//#region src/stories/molecules/DateTimeField/DateTimeField.tsx
function s(e, t) {
	let n = new Date(e);
	return n.setHours(t.h, t.m, 0, 0), n;
}
function c(e) {
	return e ? {
		h: e.getHours(),
		m: e.getMinutes()
	} : null;
}
function l({ id: l, label: u, labelHidden: d = !0, value: f, onChange: p, placeholder: m, timeStep: h, minDate: g, maxDate: _, disabledDates: v, size: y, disabled: b, readOnly: x, error: S = !1, errorMessage: C, helperText: w, locale: T = "es-ES" }) {
	let E = e(y), D = `${l}-date`, O = C ? `${l}-error` : void 0, k = w ? `${l}-helper` : void 0, A = o((e) => {
		let t = c(f) ?? {
			h: 0,
			m: 0
		};
		p?.(s(e, t));
	}, [f, p]), j = o((e) => {
		f && p?.(s(f, e));
	}, [f, p]);
	return /* @__PURE__ */ a("div", {
		className: ["date-time-field", S ? "date-time-field--error" : ""].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ i(t, {
				htmlFor: D,
				hidden: d,
				size: E,
				children: u
			}),
			/* @__PURE__ */ a("div", {
				className: "date-time-field__controls",
				children: [/* @__PURE__ */ i(r, {
					id: D,
					value: f ?? null,
					onChange: A,
					placeholder: m,
					minDate: g,
					maxDate: _,
					disabledDates: v,
					size: E,
					disabled: b,
					readOnly: x,
					error: S,
					locale: T
				}), /* @__PURE__ */ i(n, {
					value: c(f),
					onChange: j,
					step: h,
					size: E,
					disabled: b,
					readOnly: x,
					error: S
				})]
			}),
			C && /* @__PURE__ */ i("span", {
				id: O,
				className: "date-time-field__error",
				role: "alert",
				children: C
			}),
			w && /* @__PURE__ */ i("span", {
				id: k,
				className: "date-time-field__helper",
				children: w
			})
		]
	});
}
//#endregion
export { l as DateTimeField };
