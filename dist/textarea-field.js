'use client';
import './textarea-field.css';
import { n as e } from "./_shared/form-size.js";
import { Label as t } from "./label.js";
import { Textarea as n } from "./textarea.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/molecules/TextareaField/TextareaField.tsx
function a({ id: a, label: o, labelHidden: s = !1, name: c, placeholder: l, value: u, defaultValue: d, rows: f, disabled: p, readOnly: m, size: h, error: g = !1, errorMessage: _, helperText: v, onChange: y, onBlur: b, onFocus: x }) {
	let S = e(h), C = _ ? `${a}-error` : void 0, w = v ? `${a}-helper` : void 0, T = [C, w].filter(Boolean).join(" ") || void 0;
	return /* @__PURE__ */ i("div", {
		className: "textarea-field",
		children: [
			/* @__PURE__ */ r(t, {
				htmlFor: a,
				hidden: s,
				size: S,
				children: o
			}),
			/* @__PURE__ */ r(n, {
				id: a,
				name: c,
				placeholder: l ?? (s ? o : void 0),
				value: u,
				defaultValue: d,
				rows: f,
				disabled: p,
				readOnly: m,
				size: S,
				error: g || !!_,
				"aria-describedby": T,
				onChange: y,
				onBlur: b,
				onFocus: x
			}),
			_ && /* @__PURE__ */ r("span", {
				id: C,
				className: "textarea-field__error",
				role: "alert",
				children: _
			}),
			v && /* @__PURE__ */ r("span", {
				id: w,
				className: "textarea-field__helper",
				children: v
			})
		]
	});
}
//#endregion
export { a as TextareaField };
