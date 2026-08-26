'use client';
import './async-select-field.css';
import { AsyncSelect as e } from "./async-select.js";
import { n as t } from "./_shared/form-size.js";
import { Label as n } from "./label.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/molecules/AsyncSelectField/AsyncSelectField.tsx
function a({ id: a, label: o, labelHidden: s = !1, onSearch: c, value: l, onValueChange: u, selectedOption: d, placeholder: f, disabled: p, readOnly: m, size: h, error: g = !1, errorMessage: _, helperText: v }) {
	let y = t(h), b = _ ? `${a}-error` : void 0, x = v ? `${a}-helper` : void 0;
	return /* @__PURE__ */ i("div", {
		className: ["async-select-field", g ? "async-select-field--error" : ""].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ r(n, {
				htmlFor: a,
				hidden: s,
				size: y,
				children: o
			}),
			/* @__PURE__ */ r(e, {
				id: a,
				onSearch: c,
				value: l,
				onValueChange: u,
				selectedOption: d,
				placeholder: f,
				disabled: p,
				readOnly: m,
				size: y,
				"aria-describedby": [b, x].filter(Boolean).join(" ") || void 0
			}),
			_ && /* @__PURE__ */ r("span", {
				id: b,
				className: "async-select-field__error",
				role: "alert",
				children: _
			}),
			v && /* @__PURE__ */ r("span", {
				id: x,
				className: "async-select-field__helper",
				children: v
			})
		]
	});
}
//#endregion
export { a as AsyncSelectField };
