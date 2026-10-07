import '../notificationbutton.css';
import { n as e } from "./brandmessagescontext.js";
import { Icon as t } from "../icon.js";
import { Button as n } from "../button.js";
import { NumberBadge as r } from "../number-badge.js";
import { forwardRef as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/messages/es/notificationButton.ts
var s = {
	label: "Notificaciones",
	countLabel: (e) => `Notificaciones: ${e} sin leer`
}, c = i(function({ count: i = 0, max: c = 99, label: l, countLabel: u, className: d, ...f }, p) {
	let m = e("notificationButton", s), h = i > 0 ? m("countLabel", u)(i) : m("label", l);
	return /* @__PURE__ */ o(n, {
		ref: p,
		variant: "ghost",
		iconOnly: !0,
		size: "md",
		"aria-label": h,
		className: ["notification-button", d].filter(Boolean).join(" "),
		...f,
		children: [/* @__PURE__ */ a(t, {
			name: "bell",
			size: "md"
		}), i > 0 && /* @__PURE__ */ a(r, {
			count: i,
			max: c,
			tone: "error",
			"aria-hidden": "true",
			className: "notification-button__badge"
		})]
	});
});
//#endregion
export { c as t };
