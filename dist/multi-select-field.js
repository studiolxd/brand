'use client';
import './multi-select-field.css';
import { Label as e } from "./label.js";
import { MultiSelect as t } from "./multi-select.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/molecules/MultiSelectField/MultiSelectField.tsx
function i({ id: i, label: a, labelHidden: o = !1, options: s, value: c, defaultValue: l, placeholder: u, disabled: d, readOnly: f, dark: p, size: m = "md", error: h = !1, errorMessage: g, helperText: _, onValueChange: v }) {
	let y = g ? `${i}-error` : void 0, b = _ ? `${i}-helper` : void 0;
	return /* @__PURE__ */ r("div", {
		className: ["multi-select-field", h ? "multi-select-field--error" : ""].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ n(e, {
				htmlFor: i,
				hidden: o,
				children: a
			}),
			/* @__PURE__ */ n(t, {
				id: i,
				options: s,
				value: c,
				defaultValue: l,
				placeholder: u,
				disabled: d,
				readOnly: f,
				dark: p,
				size: m,
				onValueChange: v
			}),
			g && /* @__PURE__ */ n("span", {
				id: y,
				className: "multi-select-field__error",
				role: "alert",
				children: g
			}),
			_ && /* @__PURE__ */ n("span", {
				id: b,
				className: "multi-select-field__helper",
				children: _
			})
		]
	});
}
//#endregion
export { i as MultiSelectField };
