'use client';
import './notification-button.css';
import { Icon as e } from "./icon.js";
import { Button as t } from "./button.js";
import { NumberBadge as n } from "./number-badge.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { forwardRef as a } from "react";
//#region src/stories/molecules/NotificationButton/NotificationButton.tsx
var o = a(function({ count: a = 0, max: o = 99, label: s, className: c, ...l }, u) {
	let d = s ?? (a > 0 ? `Notificaciones: ${a} sin leer` : "Notificaciones");
	return /* @__PURE__ */ i(t, {
		ref: u,
		variant: "ghost",
		iconOnly: !0,
		size: "md",
		"aria-label": d,
		className: ["notification-button", c].filter(Boolean).join(" "),
		...l,
		children: [/* @__PURE__ */ r(e, {
			name: "bell",
			size: "md"
		}), a > 0 && /* @__PURE__ */ r(n, {
			count: a,
			max: o,
			variant: "danger",
			"aria-hidden": "true",
			className: "notification-button__badge"
		})]
	});
});
//#endregion
export { o as NotificationButton };
