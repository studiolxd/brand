'use client';
import './menu-button.css';
import { Icon as e } from "./icon.js";
import { forwardRef as t } from "react";
import { jsx as n } from "react/jsx-runtime";
//#region src/stories/atoms/MenuButton/MenuButton.tsx
var r = t(function({ isOpen: t = !1, label: r = "Menú", closeLabel: i, size: a = "md", className: o, ...s }, c) {
	return /* @__PURE__ */ n("button", {
		ref: c,
		type: "button",
		className: [
			"menu-button",
			`menu-button--${a}`,
			o
		].filter(Boolean).join(" "),
		"aria-label": t && i ? i : r,
		"aria-expanded": t,
		...s,
		children: /* @__PURE__ */ n(e, {
			name: "menu",
			size: a === "lg" ? "lg" : "md",
			className: "menu-button__icon"
		})
	});
});
//#endregion
export { r as MenuButton };
