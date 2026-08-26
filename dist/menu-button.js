'use client';
import './menu-button.css';
import { Icon as e } from "./icon.js";
import { jsx as t } from "react/jsx-runtime";
import { forwardRef as n } from "react";
//#region src/stories/atoms/MenuButton/MenuButton.tsx
var r = n(function({ isOpen: n = !1, label: r = "Menú", closeLabel: i, size: a = "md", className: o, ...s }, c) {
	return /* @__PURE__ */ t("button", {
		ref: c,
		type: "button",
		className: [
			"menu-button",
			`menu-button--${a}`,
			o
		].filter(Boolean).join(" "),
		"aria-label": n && i ? i : r,
		"aria-expanded": n,
		...s,
		children: /* @__PURE__ */ t(e, {
			name: "menu",
			size: "md",
			className: "menu-button__icon"
		})
	});
});
//#endregion
export { r as MenuButton };
