'use client';
import './switcher-field.css';
import { Switcher as e } from "./switcher.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/stories/molecules/SwitcherField/SwitcherField.tsx
function r({ label: r, checked: i, defaultChecked: a, disabled: o, size: s = "md", id: c, name: l, value: u, required: d, onCheckedChange: f }) {
	let p = c ?? `switcher-field-${String(r).toLowerCase().replace(/\s+/g, "-")}`;
	return /* @__PURE__ */ n("label", {
		className: [
			"switcher-field",
			s === "md" ? "" : `switcher-field--${s}`,
			o ? "switcher-field--disabled" : ""
		].filter(Boolean).join(" "),
		htmlFor: p,
		children: [/* @__PURE__ */ t(e, {
			id: p,
			checked: i,
			defaultChecked: a,
			disabled: o,
			size: s,
			name: l,
			value: u,
			required: d,
			"aria-labelledby": `${p}-label`,
			onCheckedChange: f
		}), /* @__PURE__ */ t("span", {
			id: `${p}-label`,
			className: "switcher-field__label",
			children: r
		})]
	});
}
//#endregion
export { r as SwitcherField };
