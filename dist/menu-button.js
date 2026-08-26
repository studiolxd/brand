'use client';
import './menu-button.css';
import { Icon as e } from "./icon.js";
import { jsx as t } from "react/jsx-runtime";
import { forwardRef as n } from "react";
//#region src/stories/atoms/MenuButton/MenuButton.tsx
var r = n(function({ isOpen: n = !1, label: r = "Menú", size: i = "md", className: a, ...o }, s) {
	return /* @__PURE__ */ t("button", {
		ref: s,
		type: "button",
		className: [
			"menu-button",
			`menu-button--${i}`,
			a
		].filter(Boolean).join(" "),
		"aria-label": r,
		"aria-expanded": n,
		...o,
		children: /* @__PURE__ */ t(e, {
			name: "menu",
			size: "md",
			className: "menu-button__icon"
		})
	});
});
//#endregion
export { r as MenuButton };
