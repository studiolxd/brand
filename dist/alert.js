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
}), c = r(function({ variant: r = "default", title: o, description: s, dismissible: c = !1, onDismiss: l, finalFocus: u, closeLabel: d = "Cerrar", className: f, children: p, role: m, ...h }, g) {
	let [_, v] = i(!1);
	if (_) return null;
	let y = [
		"alert",
		r === "default" ? "" : `alert--${r}`,
		r === "warning" ? "" : "surface-dark",
		c ? "alert--dismissible" : "",
		f ?? ""
	].filter(Boolean).join(" ");
	function b() {
		if (typeof document > "u") return;
		let e = u?.current;
		if (e) {
			e.focus();
			return;
		}
		let t = document.body, n = t.hasAttribute("tabindex");
		n || t.setAttribute("tabindex", "-1"), t.focus(), n || t.removeAttribute("tabindex");
	}
	function x() {
		b(), l ? l() : v(!0);
	}
	return /* @__PURE__ */ n("div", {
		ref: g,
		role: m ?? a[r],
		className: y,
		...h,
		children: [/* @__PURE__ */ n("div", {
			className: "alert__content",
			children: [
				o && /* @__PURE__ */ t("p", {
					className: "alert__title",
					children: o
				}),
				s && /* @__PURE__ */ t("div", {
					className: "alert__description",
					children: s
				}),
				p
			]
		}), c && /* @__PURE__ */ t(e, {
			className: "alert__close",
			label: d,
			onClick: x
		})]
	});
}), l = Object.assign(c, {
	Title: o,
	Description: s
});
//#endregion
export { l as Alert, s as AlertDescription, o as AlertTitle };
