'use client';
import './async-select-field.css';
import { AsyncSelect as e } from "./async-select.js";
import { Label as t } from "./label.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/molecules/AsyncSelectField/AsyncSelectField.tsx
function i({ id: i, label: a, labelHidden: o = !1, onSearch: s, value: c, onValueChange: l, selectedOption: u, placeholder: d, disabled: f, readOnly: p, dark: m, size: h = "md", error: g = !1, errorMessage: _, helperText: v }) {
	let y = _ ? `${i}-error` : void 0, b = v ? `${i}-helper` : void 0;
	return /* @__PURE__ */ r("div", {
		className: ["async-select-field", g ? "async-select-field--error" : ""].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ n(t, {
				htmlFor: i,
				hidden: o,
				children: a
			}),
			/* @__PURE__ */ n(e, {
				id: i,
				onSearch: s,
				value: c,
				onValueChange: l,
				selectedOption: u,
				placeholder: d,
				disabled: f,
				readOnly: p,
				dark: m,
				size: h,
				"aria-describedby": [y, b].filter(Boolean).join(" ") || void 0
			}),
			_ && /* @__PURE__ */ n("span", {
				id: y,
				className: "async-select-field__error",
				role: "alert",
				children: _
			}),
			v && /* @__PURE__ */ n("span", {
				id: b,
				className: "async-select-field__helper",
				children: v
			})
		]
	});
}
//#endregion
export { i as AsyncSelectField };
