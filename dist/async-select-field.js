'use client';
import './async-select-field.css';
import { AsyncSelect as e } from "./async-select.js";
import { Label as t } from "./label.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/molecules/AsyncSelectField/AsyncSelectField.tsx
function i({ id: i, label: a, labelHidden: o = !1, onSearch: s, value: c, onValueChange: l, selectedOption: u, placeholder: d, disabled: f, readOnly: p, size: m = "md", error: h = !1, errorMessage: g, helperText: _ }) {
	let v = g ? `${i}-error` : void 0, y = _ ? `${i}-helper` : void 0;
	return /* @__PURE__ */ r("div", {
		className: ["async-select-field", h ? "async-select-field--error" : ""].filter(Boolean).join(" "),
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
				size: m,
				"aria-describedby": [v, y].filter(Boolean).join(" ") || void 0
			}),
			g && /* @__PURE__ */ n("span", {
				id: v,
				className: "async-select-field__error",
				role: "alert",
				children: g
			}),
			_ && /* @__PURE__ */ n("span", {
				id: y,
				className: "async-select-field__helper",
				children: _
			})
		]
	});
}
//#endregion
export { i as AsyncSelectField };
