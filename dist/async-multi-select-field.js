'use client';
import './async-multi-select-field.css';
import { AsyncMultiSelect as e } from "./async-multi-select.js";
import { n as t } from "./_shared/form-size.js";
import { Label as n } from "./label.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/molecules/AsyncMultiSelectField/AsyncMultiSelectField.tsx
function a({ id: a, label: o, labelHidden: s = !1, onSearch: c, value: l, defaultValue: u, onValueChange: d, selectedOptions: f, placeholder: p, disabled: m, readOnly: h, size: g, error: _ = !1, errorMessage: v, helperText: y }) {
	let b = t(g), x = v ? `${a}-error` : void 0, S = y ? `${a}-helper` : void 0;
	return /* @__PURE__ */ i("div", {
		className: ["async-multi-select-field", _ ? "async-multi-select-field--error" : ""].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ r(n, {
				htmlFor: a,
				hidden: s,
				size: b,
				children: o
			}),
			/* @__PURE__ */ r(e, {
				id: a,
				onSearch: c,
				value: l,
				defaultValue: u,
				onValueChange: d,
				selectedOptions: f,
				placeholder: p,
				disabled: m,
				readOnly: h,
				size: b,
				"aria-describedby": [x, S].filter(Boolean).join(" ") || void 0
			}),
			v && /* @__PURE__ */ r("span", {
				id: x,
				className: "async-multi-select-field__error",
				role: "alert",
				children: v
			}),
			y && /* @__PURE__ */ r("span", {
				id: S,
				className: "async-multi-select-field__helper",
				children: y
			})
		]
	});
}
//#endregion
export { a as AsyncMultiSelectField };
