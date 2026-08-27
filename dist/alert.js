'use client';
import './alert.css';
import { Icon as e } from "./icon.js";
import { Button as t } from "./button.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { forwardRef as i, useState as a } from "react";
//#region src/stories/molecules/Alert/Alert.tsx
var o = {
	default: "status",
	success: "status",
	error: "alert",
	warning: "alert"
}, s = i(function({ className: e, children: t, ...r }, i) {
	return /* @__PURE__ */ n("p", {
		ref: i,
		className: ["alert__title", e ?? ""].filter(Boolean).join(" "),
		...r,
		children: t
	});
}), c = i(function({ className: e, children: t, ...r }, i) {
	return /* @__PURE__ */ n("div", {
		ref: i,
		className: ["alert__description", e ?? ""].filter(Boolean).join(" "),
		...r,
		children: t
	});
}), l = i(function({ variant: i = "default", title: s, description: c, dismissible: l = !1, onDismiss: u, closeLabel: d = "Cerrar", className: f, children: p, role: m, ...h }, g) {
	let [_, v] = a(!1);
	if (_) return null;
	let y = [
		"alert",
		i === "default" ? "" : `alert--${i}`,
		i === "warning" ? "" : "surface-dark",
		l ? "alert--dismissible" : "",
		f ?? ""
	].filter(Boolean).join(" ");
	function b() {
		u ? u() : v(!0);
	}
	return /* @__PURE__ */ r("div", {
		ref: g,
		role: m ?? o[i],
		className: y,
		...h,
		children: [/* @__PURE__ */ r("div", {
			className: "alert__content",
			children: [
				s && /* @__PURE__ */ n("p", {
					className: "alert__title",
					children: s
				}),
				c && /* @__PURE__ */ n("div", {
					className: "alert__description",
					children: c
				}),
				p
			]
		}), l && /* @__PURE__ */ n(t, {
			variant: "ghost",
			size: "sm",
			iconOnly: !0,
			className: "alert__close",
			"aria-label": d,
			onClick: b,
			children: /* @__PURE__ */ n(e, {
				name: "close",
				size: "sm"
			})
		})]
	});
}), u = Object.assign(l, {
	Title: s,
	Description: c
});
//#endregion
export { u as Alert, c as AlertDescription, s as AlertTitle };
