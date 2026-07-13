'use client';
import './textarea-field.css';
import { Label as e } from "./label.js";
import { Textarea as t } from "./textarea.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/molecules/TextareaField/TextareaField.tsx
function i({ id: i, label: a, labelHidden: o = !0, name: s, placeholder: c, value: l, defaultValue: u, rows: d, disabled: f, readOnly: p, size: m = "md", error: h = !1, errorMessage: g, helperText: _, onChange: v, onBlur: y, onFocus: b }) {
	let x = g ? `${i}-error` : void 0, S = _ ? `${i}-helper` : void 0, C = [x, S].filter(Boolean).join(" ") || void 0;
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
				placeholder: c ?? (o ? a : void 0),
				value: l,
				defaultValue: u,
				rows: d,
				disabled: f,
				readOnly: p,
				size: m,
				error: h,
				"aria-describedby": C,
				onChange: v,
				onBlur: y,
				onFocus: b
			}),
			g && /* @__PURE__ */ n("span", {
				id: x,
				className: "textarea-field__error",
				role: "alert",
				children: g
			}),
			_ && /* @__PURE__ */ n("span", {
				id: S,
				className: "textarea-field__helper",
				children: _
			})
		]
	});
}
//#endregion
export { i as TextareaField };
