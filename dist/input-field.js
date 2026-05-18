'use client';
import './input-field.css';
import { Input as e } from "./input.js";
import { Label as t } from "./label.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/molecules/InputField/InputField.tsx
function i({ id: i, label: a, labelHidden: o = !0, name: s, type: c, placeholder: l, value: u, defaultValue: d, disabled: f, readOnly: p, size: m = "md", error: h = !1, errorMessage: g, helperText: _, onChange: v, onBlur: y, onFocus: b }) {
	let x = g ? `${i}-error` : void 0, S = _ ? `${i}-helper` : void 0, C = [x, S].filter(Boolean).join(" ") || void 0;
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
				placeholder: l ?? (o ? a : void 0),
				value: u,
				defaultValue: d,
				disabled: f,
				readOnly: p,
				size: m,
				error: h,
				describedBy: C,
				onChange: v,
				onBlur: y,
				onFocus: b
			}),
			g && /* @__PURE__ */ n("span", {
				id: x,
				className: "input-field__error",
				role: "alert",
				children: g
			}),
			_ && /* @__PURE__ */ n("span", {
				id: S,
				className: "input-field__helper",
				children: _
			})
		]
	});
}
//#endregion
export { i as InputField };
