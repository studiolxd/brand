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
}), l = n(function({ className: e, children: t, ...n }, r) {
	return /* @__PURE__ */ i("div", {
		ref: r,
		className: ["alert__actions", e ?? ""].filter(Boolean).join(" "),
		...n,
		children: t
	});
}), u = n(function({ variant: n = "default", title: s, description: c, actions: l, dismissible: u = !1, onDismiss: d, finalFocus: f, closeLabel: p, className: m, children: h, role: g, ..._ }, v) {
	let y = e("alert"), [b, x] = r(!1);
	if (b) return null;
	let S = [
		"alert",
		n === "default" ? "" : `alert--${n}`,
		n === "success" || n === "error" ? "surface-dark" : "",
		u ? "alert--dismissible" : "",
		m ?? ""
	].filter(Boolean).join(" "), C = n === "default" ? " surface-invert" : "";
	function w() {
		if (typeof document > "u") return;
		let e = f?.current;
		if (e) {
			e.focus();
			return;
		}
		let t = document.body, n = t.hasAttribute("tabindex");
		n || t.setAttribute("tabindex", "-1"), t.focus(), n || t.removeAttribute("tabindex");
	}
	function T() {
		w(), d ? d() : x(!0);
	}
	return /* @__PURE__ */ a("div", {
		ref: v,
		role: g ?? o[n],
		className: S,
		..._,
		children: [/* @__PURE__ */ a("div", {
			className: `alert__content${C}`,
			children: [
				s && /* @__PURE__ */ i("p", {
					className: "alert__title",
					children: s
				}),
				c && /* @__PURE__ */ i("div", {
					className: "alert__description",
					children: c
				}),
				h,
				l && /* @__PURE__ */ i("div", {
					className: "alert__actions",
					children: l
				})
			]
		}), u && /* @__PURE__ */ i(t, {
			className: `alert__close${C}`,
			label: y("close", p),
			onClick: T
		})]
	});
}), d = Object.assign(u, {
	Title: s,
	Description: c,
	Actions: l
});
//#endregion
export { d as Alert, l as AlertActions, c as AlertDescription, s as AlertTitle };
