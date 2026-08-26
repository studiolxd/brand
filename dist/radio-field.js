'use client';
import './radio-field.css';
import { n as e } from "./_shared/form-size.js";
import { Radio as t } from "./radio.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/molecules/RadioField/RadioField.tsx
function i({ label: i, checked: a, defaultChecked: o, disabled: s, size: c, id: l, name: u, value: d, onChange: f }) {
	let p = e(c);
	return /* @__PURE__ */ r("label", {
		className: [
			"radio-field",
			p === "md" ? "" : `radio-field--${p}`,
			s ? "radio-field--disabled" : ""
		].filter(Boolean).join(" "),
		children: [/* @__PURE__ */ n(t, {
			checked: a,
			defaultChecked: o,
			disabled: s,
			size: p,
			id: l,
			name: u,
			value: d,
			onChange: f
		}), /* @__PURE__ */ n("span", {
			className: "radio-field__label",
			children: i
		})]
	});
}
//#endregion
export { i as RadioField };
