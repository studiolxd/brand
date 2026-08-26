'use client';
import './alert.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { forwardRef as n, useState as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/stories/molecules/Alert/Alert.tsx
var o = n(function({ className: e, children: t, ...n }, r) {
	return /* @__PURE__ */ i("p", {
		ref: r,
		className: ["alert__title", e ?? ""].filter(Boolean).join(" "),
		...n,
		children: t
	});
}), s = n(function({ className: e, children: t, ...n }, r) {
	return /* @__PURE__ */ i("div", {
		ref: r,
		className: ["alert__description", e ?? ""].filter(Boolean).join(" "),
		...n,
		children: t
	});
}), c = n(function({ variant: n = "default", title: o, description: s, dismissible: c = !1, onDismiss: l, className: u, children: d, role: f = "alert", ...p }, m) {
	let [h, g] = r(!1);
	if (h) return null;
	let _ = [
		"alert",
		n === "default" ? "" : `alert--${n}`,
		n === "warning" ? "" : "surface-dark",
		c ? "alert--dismissible" : "",
		u ?? ""
	].filter(Boolean).join(" ");
	function v() {
		l ? l() : g(!0);
	}
	return /* @__PURE__ */ a("div", {
		ref: m,
		role: f,
		className: _,
		...p,
		children: [/* @__PURE__ */ a("div", {
			className: "alert__content",
			children: [
				o && /* @__PURE__ */ i("p", {
					className: "alert__title",
					children: o
				}),
				s && /* @__PURE__ */ i("div", {
					className: "alert__description",
					children: s
				}),
				d
			]
		}), c && /* @__PURE__ */ a("button", {
			type: "button",
			className: "alert__close",
			onClick: v,
			children: [/* @__PURE__ */ i(e, {
				name: "close",
				size: "sm"
			}), /* @__PURE__ */ i(t, { children: "Cerrar" })]
		})]
	});
}), l = Object.assign(c, {
	Title: o,
	Description: s
});
//#endregion
export { l as Alert, s as AlertDescription, o as AlertTitle };
