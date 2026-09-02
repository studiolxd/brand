'use client';
import './notification-button.css';
import { Icon as e } from "./icon.js";
import { Button as t } from "./button.js";
import { NumberBadge as n } from "./number-badge.js";
import { forwardRef as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/stories/molecules/NotificationButton/NotificationButton.tsx
var o = r(function({ count: r = 0, max: o = 99, label: s = "Notificaciones", countLabel: c = (e) => `Notificaciones: ${e} sin leer`, className: l, ...u }, d) {
	let f = r > 0 ? c(r) : s;
	return /* @__PURE__ */ a(t, {
		ref: d,
		variant: "ghost",
		iconOnly: !0,
		size: "md",
		"aria-label": f,
		className: ["notification-button", l].filter(Boolean).join(" "),
		...u,
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
