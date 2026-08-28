'use client';
import './notification-button.css';
import { Icon as e } from "./icon.js";
import { Button as t } from "./button.js";
import { NumberBadge as n } from "./number-badge.js";
import { forwardRef as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/stories/molecules/NotificationButton/NotificationButton.tsx
var o = r(function({ count: r = 0, max: o = 99, label: s, className: c, ...l }, u) {
	let d = s ?? (r > 0 ? `Notificaciones: ${r} sin leer` : "Notificaciones");
	return /* @__PURE__ */ a(t, {
		ref: u,
		variant: "ghost",
		iconOnly: !0,
		size: "md",
		"aria-label": d,
		className: ["notification-button", c].filter(Boolean).join(" "),
		...l,
		children: [/* @__PURE__ */ i(e, {
			name: "bell",
			size: "md"
		}), r > 0 && /* @__PURE__ */ i(n, {
			count: r,
			max: o,
			variant: "danger",
			"aria-hidden": "true",
			className: "notification-button__badge"
		})]
	});
});
//#endregion
export { o as NotificationButton };
