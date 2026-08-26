'use client';
import './menu-button.css';
import { Icon as e } from "./icon.js";
import { forwardRef as t } from "react";
import { jsx as n } from "react/jsx-runtime";
//#region src/stories/atoms/MenuButton/MenuButton.tsx
var r = t(function({ isOpen: t = !1, label: r = "Menú", size: i = "md", className: a, ...o }, s) {
	return /* @__PURE__ */ n("button", {
		ref: s,
		type: "button",
		className: [
			"menu-button",
			`menu-button--${i}`,
			a
		].filter(Boolean).join(" "),
		"aria-label": r,
		"aria-expanded": t,
		...o,
		children: /* @__PURE__ */ n(e, {
			name: "menu",
			size: "md",
			className: "menu-button__icon"
		})
	});
});
//#endregion
export { r as MenuButton };
