'use client';
import './checkbox-field.css';
import { Checkbox as e } from "./checkbox.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/stories/molecules/CheckboxField/CheckboxField.tsx
function r({ label: r, checked: i, defaultChecked: a, disabled: o, size: s = "md", id: c, name: l, value: u, onCheckedChange: d }) {
	return /* @__PURE__ */ n("label", {
		className: [
			"checkbox-field",
			s === "md" ? "" : `checkbox-field--${s}`,
			o ? "checkbox-field--disabled" : ""
		].filter(Boolean).join(" "),
		children: [/* @__PURE__ */ t(e, {
			checked: i,
			defaultChecked: a,
			disabled: o,
			size: s,
			id: c,
			name: l,
			value: u,
			onCheckedChange: d
		}), /* @__PURE__ */ t("span", {
			className: "checkbox-field__label",
			children: r
		})]
	});
}
//#endregion
export { r as CheckboxField };
