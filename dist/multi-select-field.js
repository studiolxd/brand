'use client';
import './multi-select-field.css';
import { n as e } from "./_shared/form-size.js";
import { Label as t } from "./label.js";
import { MultiSelect as n } from "./multi-select.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/molecules/MultiSelectField/MultiSelectField.tsx
function a({ id: a, label: o, labelHidden: s = !1, options: c, value: l, defaultValue: u, placeholder: d, disabled: f, readOnly: p, size: m, error: h = !1, errorMessage: g, helperText: _, onValueChange: v }) {
	let y = e(m), b = g ? `${a}-error` : void 0, x = _ ? `${a}-helper` : void 0;
	return /* @__PURE__ */ i("div", {
		className: ["multi-select-field", h || g ? "multi-select-field--error" : ""].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ r(t, {
				htmlFor: a,
				hidden: s,
				size: y,
				children: o
			}),
			/* @__PURE__ */ r(n, {
				id: a,
				options: c,
				value: l,
				defaultValue: u,
				placeholder: d,
				disabled: f,
				readOnly: p,
				size: y,
				onValueChange: v
			}),
			g && /* @__PURE__ */ r("span", {
				id: b,
				className: "multi-select-field__error",
				role: "alert",
				children: g
			}),
			_ && /* @__PURE__ */ r("span", {
				id: x,
				className: "multi-select-field__helper",
				children: _
			})
		]
	});
}
//#endregion
export { a as MultiSelectField };
