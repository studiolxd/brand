'use client';
import './menu-button.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { forwardRef as n } from "react";
import { jsx as r } from "react/jsx-runtime";
//#region src/stories/atoms/MenuButton/MenuButton.tsx
var i = n(function({ isOpen: n = !1, label: i, closeLabel: a, size: o = "md", className: s, ...c }, l) {
	let u = e("menuButton");
	return /* @__PURE__ */ r("button", {
		ref: l,
		type: "button",
		className: [
			"menu-button",
			`menu-button--${o}`,
			s
		].filter(Boolean).join(" "),
		"aria-label": n ? u("close", a) : u("open", i),
		"aria-expanded": n,
		...c,
		children: /* @__PURE__ */ r(t, {
			name: "menu",
			size: o === "lg" ? "lg" : "md",
			className: "menu-button__icon"
		})
	});
});
//#endregion
export { i as MenuButton };
