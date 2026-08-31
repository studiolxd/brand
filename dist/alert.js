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
}), l = n(function({ variant: n = "default", title: s, description: c, dismissible: l = !1, onDismiss: u, finalFocus: d, closeLabel: f = "Cerrar", className: p, children: m, role: h, ...g }, _) {
	let [v, y] = r(!1);
	if (v) return null;
	let b = [
		"alert",
		n === "default" ? "" : `alert--${n}`,
		n === "warning" ? "" : "surface-dark",
		l ? "alert--dismissible" : "",
		p ?? ""
	].filter(Boolean).join(" ");
	function x() {
		if (typeof document > "u") return;
		let e = d?.current;
		if (e) {
			e.focus();
			return;
		}
		let t = document.body, n = t.hasAttribute("tabindex");
		n || t.setAttribute("tabindex", "-1"), t.focus(), n || t.removeAttribute("tabindex");
	}
	function S() {
		x(), u ? u() : y(!0);
	}
	return /* @__PURE__ */ a("div", {
		ref: _,
		role: h ?? o[n],
		className: b,
		...g,
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
				m
			]
		}), l && /* @__PURE__ */ i(t, {
			variant: "ghost",
			size: "sm",
			iconOnly: !0,
			className: "alert__close",
			"aria-label": f,
			onClick: S,
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
