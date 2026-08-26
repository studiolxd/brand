'use client';
import './select-field.css';
import { t as e } from "./_shared/Select.js";
import { Label as t } from "./label.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/molecules/SelectField/SelectField.tsx
var i = "__empty__";
function a(e) {
	return e === "" ? i : e;
}
function o(e) {
	return e === i ? "" : e;
}
function s({ id: s, label: c, labelHidden: l = !1, options: u, value: d, defaultValue: f, placeholder: p, disabled: m, size: h = "md", error: g = !1, errorMessage: _, helperText: v, onValueChange: y }) {
	let b = _ ? `${s}-error` : void 0, x = v ? `${s}-helper` : void 0, S = u.map((e) => e.value === "" ? {
		...e,
		value: i
	} : e);
	return /* @__PURE__ */ r("div", {
		className: ["select-field", g || _ ? "select-field--error" : ""].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ n(t, {
				htmlFor: s,
				hidden: l,
				children: c
			}),
			/* @__PURE__ */ n(e, {
				id: s,
				options: S,
				value: a(d),
				defaultValue: a(f),
				placeholder: p,
				disabled: m,
				size: h,
				"aria-describedby": [b, x].filter(Boolean).join(" ") || void 0,
				"aria-invalid": g || !!_,
				onValueChange: y ? (e) => y(o(e)) : void 0
			}),
			_ && /* @__PURE__ */ n("span", {
				id: b,
				className: "select-field__error",
				role: "alert",
				children: _
			}),
			v && /* @__PURE__ */ n("span", {
				id: x,
				className: "select-field__helper",
				children: v
			})
		]
	});
}
//#endregion
export { s as SelectField };
