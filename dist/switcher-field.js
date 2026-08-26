'use client';
import './switcher-field.css';
import { n as e } from "./_shared/form-size.js";
import { Switcher as t } from "./switcher.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/molecules/SwitcherField/SwitcherField.tsx
function i({ label: i, checked: a, defaultChecked: o, disabled: s, size: c, id: l, name: u, value: d, required: f, onCheckedChange: p }) {
	let m = e(c), h = l ?? `switcher-field-${String(i).toLowerCase().replace(/\s+/g, "-")}`;
	return /* @__PURE__ */ r("label", {
		className: [
			"switcher-field",
			m === "md" ? "" : `switcher-field--${m}`,
			s ? "switcher-field--disabled" : ""
		].filter(Boolean).join(" "),
		htmlFor: h,
		children: [/* @__PURE__ */ n(t, {
			id: h,
			checked: a,
			defaultChecked: o,
			disabled: s,
			size: m,
			name: u,
			value: d,
			required: f,
			"aria-labelledby": `${h}-label`,
			onCheckedChange: p
		}), /* @__PURE__ */ n("span", {
			id: `${h}-label`,
			className: "switcher-field__label",
			children: i
		})]
	});
}
//#endregion
export { i as SwitcherField };
