'use client';
import './select-field.css';
import { n as e } from "./_shared/form-size.js";
import { Label as t } from "./label.js";
import { Select as n } from "./select.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/molecules/SelectField/SelectField.tsx
var a = "__empty__";
function o(e) {
	return e === "" ? a : e;
}
function s(e) {
	return e === a ? "" : e;
}
function c({ id: c, label: l, labelHidden: u = !1, options: d, value: f, defaultValue: p, placeholder: m, disabled: h, size: g, error: _ = !1, errorMessage: v, helperText: y, onValueChange: b }) {
	let x = e(g), S = v ? `${c}-error` : void 0, C = y ? `${c}-helper` : void 0, w = d.map((e) => e.value === "" ? {
		...e,
		value: a
	} : e);
	return /* @__PURE__ */ i("div", {
		className: ["select-field", _ || v ? "select-field--error" : ""].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ r(t, {
				htmlFor: c,
				hidden: u,
				size: x,
				children: l
			}),
			/* @__PURE__ */ r(n, {
				id: c,
				options: w,
				value: o(f),
				defaultValue: o(p),
				placeholder: m,
				disabled: h,
				size: x,
				"aria-describedby": [S, C].filter(Boolean).join(" ") || void 0,
				"aria-invalid": _ || !!v,
				onValueChange: b ? (e) => b(s(e)) : void 0
			}),
			v && /* @__PURE__ */ r("span", {
				id: S,
				className: "select-field__error",
				role: "alert",
				children: v
			}),
			y && /* @__PURE__ */ r("span", {
				id: C,
				className: "select-field__helper",
				children: y
			})
		]
	});
}
//#endregion
export { c as SelectField };
