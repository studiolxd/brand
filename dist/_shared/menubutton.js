import '../menubutton.css';
import { r as e } from "./brandmessagescontext.js";
import { Icon as t } from "../icon.js";
import { forwardRef as n } from "react";
import { jsx as r } from "react/jsx-runtime";
//#region src/stories/messages/es/menuButton.ts
var i = {
	open: "Menú de navegación",
	close: "Cerrar menú"
}, a = n(function({ isOpen: n = !1, label: a, closeLabel: o, size: s = "md", className: c, ...l }, u) {
	let d = e("menuButton", i);
	return /* @__PURE__ */ r("button", {
		ref: u,
		type: "button",
		className: [
			"menu-button",
			`menu-button--${s}`,
			c
		].filter(Boolean).join(" "),
		"aria-label": n ? d("close", o) : d("open", a),
		"aria-expanded": n,
		...l,
		children: /* @__PURE__ */ r(t, {
			name: "menu",
			size: s === "lg" ? "lg" : "md",
			className: "menu-button__icon"
		})
	});
});
//#endregion
export { a as t };
