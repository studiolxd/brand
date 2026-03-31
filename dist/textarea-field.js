'use client';
import './textarea-field.css';
import { Label as e } from "./label.js";
import { Textarea as t } from "./textarea.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/molecules/TextareaField/TextareaField.tsx
function i({ id: i, label: a, labelHidden: o = !0, name: s, placeholder: c, value: l, defaultValue: u, rows: d, disabled: f, readOnly: p, error: m = !1, errorMessage: h, helperText: g, onChange: _, onBlur: v, onFocus: y }) {
	let b = h ? `${i}-error` : void 0, x = g ? `${i}-helper` : void 0, S = [b, x].filter(Boolean).join(" ") || void 0;
	return /* @__PURE__ */ r("div", {
		className: "textarea-field",
		children: [
			/* @__PURE__ */ n(e, {
				htmlFor: i,
				hidden: o,
				children: a
			}),
			/* @__PURE__ */ n(t, {
				id: i,
				name: s,
				placeholder: c,
				value: l,
				defaultValue: u,
				rows: d,
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
				className: "textarea-field__error",
				role: "alert",
				children: h
			}),
			g && /* @__PURE__ */ n("span", {
				id: x,
				className: "textarea-field__helper",
				children: g
			})
		]
	});
}
//#endregion
export { i as TextareaField };
