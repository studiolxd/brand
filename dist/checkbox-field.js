'use client';
import './checkbox-field.css';
import { n as e } from "./_shared/form-size.js";
import { Checkbox as t } from "./checkbox.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/molecules/CheckboxField/CheckboxField.tsx
function i({ label: i, checked: a, defaultChecked: o, disabled: s, size: c, id: l, name: u, value: d, onCheckedChange: f }) {
	let p = e(c);
	return /* @__PURE__ */ r("label", {
		className: [
			"checkbox-field",
			p === "md" ? "" : `checkbox-field--${p}`,
			s ? "checkbox-field--disabled" : ""
		].filter(Boolean).join(" "),
		children: [/* @__PURE__ */ n(t, {
			checked: a,
			defaultChecked: o,
			disabled: s,
			size: p,
			id: l,
			name: u,
			value: d,
			onCheckedChange: f
		}), /* @__PURE__ */ n("span", {
			className: "checkbox-field__label",
			children: i
		})]
	});
}
//#endregion
export { i as CheckboxField };
