'use client';
import './input-field.css';
import { Input as e } from "./input.js";
import { Label as t } from "./label.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/molecules/InputField/InputField.tsx
function i({ id: i, label: a, labelHidden: o = !0, name: s, type: c, placeholder: l, value: u, defaultValue: d, disabled: f, readOnly: p, error: m = !1, errorMessage: h, helperText: g, onChange: _, onBlur: v, onFocus: y }) {
	let b = h ? `${i}-error` : void 0, x = g ? `${i}-helper` : void 0, S = [b, x].filter(Boolean).join(" ") || void 0;
	return /* @__PURE__ */ r("div", {
		className: "input-field",
		children: [
			/* @__PURE__ */ n(t, {
				htmlFor: i,
				hidden: o,
				children: a
			}),
			/* @__PURE__ */ n(e, {
				id: i,
				name: s,
				type: c,
				placeholder: l,
				value: u,
				defaultValue: d,
				disabled: f,
				readOnly: p,
				error: m,
				describedBy: S,
				onChange: _,
				onBlur: v,
				onFocus: y
			}),
			h && /* @__PURE__ */ n("span", {
				id: b,
				className: "input-field__error",
				role: "alert",
				children: h
			}),
			g && /* @__PURE__ */ n("span", {
				id: x,
				className: "input-field__helper",
				children: g
			})
		]
	});
}
//#endregion
export { i as InputField };
