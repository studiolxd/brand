'use client';
import './alert.css';
import { CloseButton as e } from "./close-button.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { forwardRef as r, useState as i } from "react";
//#region src/stories/molecules/Alert/Alert.tsx
var a = {
	default: "status",
	success: "status",
	error: "alert",
	warning: "alert"
}, o = r(function({ className: e, children: n, ...r }, i) {
	return /* @__PURE__ */ t("p", {
		ref: i,
		className: ["alert__title", e ?? ""].filter(Boolean).join(" "),
		...r,
		children: n
	});
}), s = r(function({ className: e, children: n, ...r }, i) {
	return /* @__PURE__ */ t("div", {
		ref: i,
		className: ["alert__description", e ?? ""].filter(Boolean).join(" "),
		...r,
		children: n
	});
}), c = r(function({ className: e, children: n, ...r }, i) {
	return /* @__PURE__ */ t("div", {
		ref: i,
		className: ["alert__actions", e ?? ""].filter(Boolean).join(" "),
		...r,
		children: n
	});
}), l = r(function({ variant: r = "default", title: o, description: s, actions: c, dismissible: l = !1, onDismiss: u, finalFocus: d, closeLabel: f = "Cerrar", className: p, children: m, role: h, ...g }, _) {
	let [v, y] = i(!1);
	if (v) return null;
	let b = [
		"alert",
		r === "default" ? "" : `alert--${r}`,
		r === "success" || r === "error" ? "surface-dark" : "",
		l ? "alert--dismissible" : "",
		p ?? ""
	].filter(Boolean).join(" "), x = r === "default" ? " surface-invert" : "";
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
	return /* @__PURE__ */ n("div", {
		ref: _,
		role: h ?? a[r],
		className: b,
		...g,
		children: [/* @__PURE__ */ n("div", {
			className: `alert__content${x}`,
			children: [
				o && /* @__PURE__ */ t("p", {
					className: "alert__title",
					children: o
				}),
				s && /* @__PURE__ */ t("div", {
					className: "alert__description",
					children: s
				}),
				m,
				c && /* @__PURE__ */ t("div", {
					className: "alert__actions",
					children: c
				})
			]
		}), l && /* @__PURE__ */ t(e, {
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
