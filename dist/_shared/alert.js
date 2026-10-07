import '../alert.css';
import { n as e } from "./brandmessagescontext.js";
import { t } from "./closebutton.js";
import { forwardRef as n, useState as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/stories/messages/es/alert.ts
var o = { close: "Cerrar" }, s = {
	default: "status",
	success: "status",
	error: "alert",
	warning: "alert"
}, c = {
	default: " surface-invert",
	warning: " surface-light",
	success: "",
	error: ""
}, l = n(function({ className: e, children: t, ...n }, r) {
	return /* @__PURE__ */ i("p", {
		ref: r,
		className: ["alert__title", e ?? ""].filter(Boolean).join(" "),
		...n,
		children: t
	});
}), u = n(function({ className: e, children: t, ...n }, r) {
	return /* @__PURE__ */ i("div", {
		ref: r,
		className: ["alert__description", e ?? ""].filter(Boolean).join(" "),
		...n,
		children: t
	});
}), d = n(function({ className: e, children: t, ...n }, r) {
	return /* @__PURE__ */ i("div", {
		ref: r,
		className: ["alert__actions", e ?? ""].filter(Boolean).join(" "),
		...n,
		children: t
	});
}), f = n(function({ variant: n = "default", title: l, description: u, actions: d, dismissible: f = !1, onDismiss: p, finalFocus: m, closeLabel: h, className: g, children: _, role: v, ...y }, b) {
	let x = e("alert", o), [S, C] = r(!1);
	if (S) return null;
	let w = [
		"alert",
		n === "default" ? "" : `alert--${n}`,
		n === "success" || n === "error" ? "surface-dark" : "",
		f ? "alert--dismissible" : "",
		g ?? ""
	].filter(Boolean).join(" "), T = c[n];
	function E() {
		if (typeof document > "u") return;
		let e = m?.current;
		if (e) {
			e.focus();
			return;
		}
		let t = document.body, n = t.hasAttribute("tabindex");
		n || t.setAttribute("tabindex", "-1"), t.focus(), n || t.removeAttribute("tabindex");
	}
	function D() {
		E(), p ? p() : C(!0);
	}
	return /* @__PURE__ */ a("div", {
		ref: b,
		role: v ?? s[n],
		className: w,
		...y,
		children: [/* @__PURE__ */ a("div", {
			className: `alert__content${T}`,
			children: [
				l && /* @__PURE__ */ i("p", {
					className: "alert__title",
					children: l
				}),
				u && /* @__PURE__ */ i("div", {
					className: "alert__description",
					children: u
				}),
				_,
				d && /* @__PURE__ */ i("div", {
					className: "alert__actions",
					children: d
				})
			]
		}), f && /* @__PURE__ */ i(t, {
			className: `alert__close${T}`,
			label: x("close", h),
			onClick: D
		})]
	});
}), p = Object.assign(f, {
	Title: l,
	Description: u,
	Actions: d
});
//#endregion
export { l as i, d as n, u as r, p as t };
