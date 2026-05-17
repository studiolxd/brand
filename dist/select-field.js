'use client';
import './select-field.css';
import { Label as e } from "./label.js";
import { Select as t } from "./select.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/molecules/SelectField/SelectField.tsx
var i = "__empty__";
function a(e) {
	return e === "" ? i : e;
}
function o(e) {
	return e === i ? "" : e;
}
function s({ id: s, label: c, labelHidden: l = !1, options: u, value: d, defaultValue: f, placeholder: p, disabled: m, dark: h, size: g = "md", error: _ = !1, errorMessage: v, helperText: y, onValueChange: b }) {
	let x = v ? `${s}-error` : void 0, S = y ? `${s}-helper` : void 0, C = u.map((e) => e.value === "" ? {
		...e,
		value: i
	} : e);
	return /* @__PURE__ */ r("div", {
		className: ["select-field", _ ? "select-field--error" : ""].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ n(e, {
				htmlFor: s,
				hidden: l,
				children: c
			}),
			/* @__PURE__ */ n(t, {
				id: s,
				options: C,
				value: a(d),
				defaultValue: a(f),
				placeholder: p,
				disabled: m,
				dark: h,
				size: g,
				onValueChange: b ? (e) => b(o(e)) : void 0
			}),
			v && /* @__PURE__ */ n("span", {
				id: x,
				className: "select-field__error",
				role: "alert",
				children: v
			}),
			y && /* @__PURE__ */ n("span", {
				id: S,
				className: "select-field__helper",
				children: y
			})
		]
	});
}
//#endregion
export { s as SelectField };
