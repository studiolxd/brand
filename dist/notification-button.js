'use client';
import './notification-button.css';
import { Icon as e } from "./icon.js";
import { Button as t } from "./button.js";
import { NumberBadge as n } from "./number-badge.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { forwardRef as a } from "react";
//#region src/stories/molecules/NotificationButton/NotificationButton.tsx
var o = a(function({ count: a = 0, max: o = 99, label: s = "Notificaciones", countLabel: c = (e) => `Notificaciones: ${e} sin leer`, className: l, ...u }, d) {
	let f = a > 0 ? c(a) : s;
	return /* @__PURE__ */ i(t, {
		ref: d,
		variant: "ghost",
		iconOnly: !0,
		size: "md",
		"aria-label": f,
		className: ["notification-button", l].filter(Boolean).join(" "),
		...u,
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
