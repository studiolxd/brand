'use client';
import './alert.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { CloseButton as t } from "./close-button.js";
import { forwardRef as n, useState as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/stories/molecules/Alert/Alert.tsx
var o = {
	default: "status",
	success: "status",
	error: "alert",
	warning: "alert"
}, s = {
	default: " surface-invert",
	warning: " surface-light",
	success: "",
	error: ""
}, c = n(function({ className: e, children: t, ...n }, r) {
	return /* @__PURE__ */ i("p", {
		ref: r,
		className: ["alert__title", e ?? ""].filter(Boolean).join(" "),
		...n,
		children: t
	});
}), l = n(function({ className: e, children: t, ...n }, r) {
	return /* @__PURE__ */ i("div", {
		ref: r,
		className: ["alert__description", e ?? ""].filter(Boolean).join(" "),
		...n,
		children: t
	});
}), u = n(function({ className: e, children: t, ...n }, r) {
	return /* @__PURE__ */ i("div", {
		ref: r,
		className: ["alert__actions", e ?? ""].filter(Boolean).join(" "),
		...n,
		children: t
	});
}), d = n(function({ variant: n = "default", title: c, description: l, actions: u, dismissible: d = !1, onDismiss: f, finalFocus: p, closeLabel: m, className: h, children: g, role: _, ...v }, y) {
	let b = e("alert"), [x, S] = r(!1);
	if (x) return null;
	let C = [
		"alert",
		n === "default" ? "" : `alert--${n}`,
		n === "success" || n === "error" ? "surface-dark" : "",
		d ? "alert--dismissible" : "",
		h ?? ""
	].filter(Boolean).join(" "), w = s[n];
	function T() {
		if (typeof document > "u") return;
		let e = p?.current;
		if (e) {
			e.focus();
			return;
		}
		let t = document.body, n = t.hasAttribute("tabindex");
		n || t.setAttribute("tabindex", "-1"), t.focus(), n || t.removeAttribute("tabindex");
	}
	function E() {
		T(), f ? f() : S(!0);
	}
	return /* @__PURE__ */ a("div", {
		ref: y,
		role: _ ?? o[n],
		className: C,
		...v,
		children: [/* @__PURE__ */ a("div", {
			className: `alert__content${w}`,
			children: [
				c && /* @__PURE__ */ i("p", {
					className: "alert__title",
					children: c
				}),
				l && /* @__PURE__ */ i("div", {
					className: "alert__description",
					children: l
				}),
				g,
				u && /* @__PURE__ */ i("div", {
					className: "alert__actions",
					children: u
				})
			]
		}), d && /* @__PURE__ */ i(t, {
			className: `alert__close${w}`,
			label: b("close", m),
			onClick: E
		})]
	});
}), f = Object.assign(d, {
	Title: c,
	Description: l,
	Actions: u
});
//#endregion
export { f as Alert, u as AlertActions, l as AlertDescription, c as AlertTitle };
