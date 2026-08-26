'use client';
import './dropdown-field.css';
import { Icon as e } from "./icon.js";
import { Label as t } from "./label.js";
import { Menu as n } from "./menu.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/molecules/DropdownField/DropdownField.tsx
function a({ id: a, label: o, labelHidden: s = !1, "aria-label": c, items: l, value: u, onValueChange: d, children: f, inline: p = !1, align: m = "start", disabled: h = !1, className: g }) {
	return /* @__PURE__ */ i("div", {
		className: [
			"dropdown-field",
			p ? "dropdown-field--inline" : "",
			g
		].filter(Boolean).join(" "),
		children: [o && /* @__PURE__ */ r(t, {
			htmlFor: a,
			hidden: s,
			children: o
		}), /* @__PURE__ */ r(n, {
			align: m,
			value: u,
			onValueChange: d,
			items: l,
			trigger: /* @__PURE__ */ i("button", {
				type: "button",
				id: a,
				className: "dropdown-field__control",
				"aria-label": o ? void 0 : c,
				disabled: h,
				children: [/* @__PURE__ */ r("span", {
					className: "dropdown-field__value",
					children: f
				}), /* @__PURE__ */ r(e, {
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
export { a as DropdownField };
