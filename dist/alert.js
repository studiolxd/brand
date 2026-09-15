'use client';
import './alert.css';
import { CloseButton as e } from "./close-button.js";
import { forwardRef as t, useState as n } from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/molecules/Alert/Alert.tsx
var a = {
	default: "status",
	success: "status",
	error: "alert",
	warning: "alert"
}, o = t(function({ className: e, children: t, ...n }, i) {
	return /* @__PURE__ */ r("p", {
		ref: i,
		className: ["alert__title", e ?? ""].filter(Boolean).join(" "),
		...n,
		children: t
	});
}), s = t(function({ className: e, children: t, ...n }, i) {
	return /* @__PURE__ */ r("div", {
		ref: i,
		className: ["alert__description", e ?? ""].filter(Boolean).join(" "),
		...n,
		children: t
	});
}), c = t(function({ className: e, children: t, ...n }, i) {
	return /* @__PURE__ */ r("div", {
		ref: i,
		className: ["alert__actions", e ?? ""].filter(Boolean).join(" "),
		...n,
		children: t
	});
}), l = t(function({ variant: t = "default", title: o, description: s, actions: c, dismissible: l = !1, onDismiss: u, finalFocus: d, closeLabel: f = "Cerrar", className: p, children: m, role: h, ...g }, _) {
	let [v, y] = n(!1);
	if (v) return null;
	let b = [
		"alert",
		t === "default" ? "" : `alert--${t}`,
		t === "success" || t === "error" ? "surface-dark" : "",
		l ? "alert--dismissible" : "",
		p ?? ""
	].filter(Boolean).join(" "), x = t === "default" ? " surface-invert" : "";
	function S() {
		if (typeof document > "u") return;
		let e = d?.current;
		if (e) {
			e.focus();
			return;
		}
		let t = document.body, n = t.hasAttribute("tabindex");
		n || t.setAttribute("tabindex", "-1"), t.focus(), n || t.removeAttribute("tabindex");
	}
	function C() {
		S(), u ? u() : y(!0);
	}
	return /* @__PURE__ */ i("div", {
		ref: _,
		role: h ?? a[t],
		className: b,
		...g,
		children: [/* @__PURE__ */ i("div", {
			className: `alert__content${x}`,
			children: [
				o && /* @__PURE__ */ r("p", {
					className: "alert__title",
					children: o
				}),
				s && /* @__PURE__ */ r("div", {
					className: "alert__description",
					children: s
				}),
				m,
				c && /* @__PURE__ */ r("div", {
					className: "alert__actions",
					children: c
				})
			]
		}), l && /* @__PURE__ */ r(e, {
			className: `alert__close${x}`,
			label: f,
			onClick: C
		})]
	});
}), u = Object.assign(l, {
	Title: o,
	Description: s,
	Actions: c
});
//#endregion
export { u as Alert, c as AlertActions, s as AlertDescription, o as AlertTitle };
