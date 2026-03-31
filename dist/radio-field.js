'use client';
import './radio-field.css';
import { Radio as e } from "./radio.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/stories/molecules/RadioField/RadioField.tsx
function r({ label: r, checked: i, defaultChecked: a, disabled: o, id: s, name: c, value: l, onChange: u }) {
	return /* @__PURE__ */ n("label", {
		className: ["radio-field", o ? "radio-field--disabled" : ""].filter(Boolean).join(" "),
		children: [/* @__PURE__ */ t(e, {
			checked: i,
			defaultChecked: a,
			disabled: o,
			id: s,
			name: c,
			value: l,
			onChange: u
		}), /* @__PURE__ */ t("span", {
			className: "radio-field__label",
			children: r
		})]
	});
}
//#endregion
export { r as RadioField };
