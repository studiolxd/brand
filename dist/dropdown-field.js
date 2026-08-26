'use client';
import './dropdown-field.css';
import { Icon as e } from "./icon.js";
import { n as t } from "./_shared/form-size.js";
import { Label as n } from "./label.js";
import { Menu as r } from "./menu.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/stories/molecules/DropdownField/DropdownField.tsx
function o({ id: o, label: s, labelHidden: c = !1, "aria-label": l, items: u, value: d, onValueChange: f, children: p, inline: m = !1, size: h, align: g = "start", disabled: _ = !1, className: v }) {
	let y = t(h);
	return /* @__PURE__ */ a("div", {
		className: [
			"dropdown-field",
			m ? "dropdown-field--inline" : "",
			y === "md" ? "" : `dropdown-field--${y}`,
			v
		].filter(Boolean).join(" "),
		children: [s && /* @__PURE__ */ i(n, {
			htmlFor: o,
			hidden: c,
			size: y,
			children: s
		}), /* @__PURE__ */ i(r, {
			align: g,
			size: y,
			value: d,
			onValueChange: f,
			items: u,
			trigger: /* @__PURE__ */ a("button", {
				type: "button",
				id: o,
				className: "dropdown-field__control",
				"aria-label": s ? void 0 : l,
				disabled: _,
				children: [/* @__PURE__ */ i("span", {
					className: "dropdown-field__value",
					children: p
				}), /* @__PURE__ */ i(e, {
					name: "chevron",
					size: "sm",
					className: "dropdown-field__icon",
					"aria-hidden": "true"
				})]
			})
		})]
	});
}
//#endregion
export { o as DropdownField };
