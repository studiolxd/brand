'use client';
import './alert.css';
import { Icon as e } from "./icon.js";
import { Button as t } from "./button.js";
import { forwardRef as n, useState as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/stories/molecules/Alert/Alert.tsx
var o = {
	default: "status",
	success: "status",
	error: "alert",
	warning: "alert"
}, s = n(function({ className: e, children: t, ...n }, r) {
	return /* @__PURE__ */ i("p", {
		ref: r,
		className: ["alert__title", e ?? ""].filter(Boolean).join(" "),
		...n,
		children: t
	});
}), c = n(function({ className: e, children: t, ...n }, r) {
	return /* @__PURE__ */ i("div", {
		ref: r,
		className: ["alert__description", e ?? ""].filter(Boolean).join(" "),
		...n,
		children: t
	});
}), l = n(function({ variant: n = "default", title: s, description: c, dismissible: l = !1, onDismiss: u, closeLabel: d = "Cerrar", className: f, children: p, role: m, ...h }, g) {
	let [_, v] = r(!1);
	if (_) return null;
	let y = [
		"alert",
		n === "default" ? "" : `alert--${n}`,
		n === "warning" ? "" : "surface-dark",
		l ? "alert--dismissible" : "",
		f ?? ""
	].filter(Boolean).join(" ");
	function b() {
		u ? u() : v(!0);
	}
	return /* @__PURE__ */ a("div", {
		ref: g,
		role: m ?? o[n],
		className: y,
		...h,
		children: [/* @__PURE__ */ a("div", {
			className: "alert__content",
			children: [
				s && /* @__PURE__ */ i("p", {
					className: "alert__title",
					children: s
				}),
				c && /* @__PURE__ */ i("div", {
					className: "alert__description",
					children: c
				}),
				p
			]
		}), l && /* @__PURE__ */ i(t, {
			variant: "ghost",
			size: "sm",
			iconOnly: !0,
			className: "alert__close",
			"aria-label": d,
			onClick: b,
			children: /* @__PURE__ */ i(e, {
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
