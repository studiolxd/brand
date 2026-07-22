'use client';
import './time-field.css';
import { Label as e } from "./label.js";
import { TimeSelect as t } from "./time-select.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/molecules/TimeField/TimeField.tsx
function i({ id: i, label: a, labelHidden: o = !0, value: s, onChange: c, step: l, size: u, disabled: d, readOnly: f, error: p = !1, errorMessage: m, helperText: h }) {
	let g = m ? `${i}-error` : void 0, _ = h ? `${i}-helper` : void 0;
	return /* @__PURE__ */ r("div", {
		className: ["time-field", p ? "time-field--error" : ""].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ n(e, {
				htmlFor: i,
				hidden: o,
				children: a
			}),
			/* @__PURE__ */ n(t, {
				id: i,
				value: s,
				onChange: c,
				step: l,
				size: u,
				disabled: d,
				readOnly: f,
				error: p
			}),
			m && /* @__PURE__ */ n("span", {
				id: g,
				className: "time-field__error",
				role: "alert",
				children: m
			}),
			h && /* @__PURE__ */ n("span", {
				id: _,
				className: "time-field__helper",
				children: h
			})
		]
	});
}
//#endregion
export { i as TimeField };
