'use client';
import './notification-button.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { Button as n } from "./button.js";
import { NumberBadge as r } from "./number-badge.js";
import { forwardRef as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/molecules/NotificationButton/NotificationButton.tsx
var s = i(function({ count: i = 0, max: s = 99, label: c, countLabel: l, className: u, ...d }, f) {
	let p = e("notificationButton"), m = i > 0 ? p("countLabel", l)(i) : p("label", c);
	return /* @__PURE__ */ o(n, {
		ref: f,
		variant: "ghost",
		iconOnly: !0,
		size: "md",
		"aria-label": m,
		className: ["notification-button", u].filter(Boolean).join(" "),
		...d,
		children: [/* @__PURE__ */ a(t, {
			name: "bell",
			size: "md"
		}), i > 0 && /* @__PURE__ */ a(r, {
			count: i,
			max: s,
			variant: "danger",
			"aria-hidden": "true",
			className: "notification-button__badge"
		})]
	});
});
//#endregion
export { s as NotificationButton };
