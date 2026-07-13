'use client';
import './alert.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { forwardRef as i, useState as a } from "react";
//#region src/stories/molecules/Alert/Alert.tsx
var o = i(function({ className: e, children: t, ...r }, i) {
	return /* @__PURE__ */ n("p", {
		ref: i,
		className: ["alert__title", e ?? ""].filter(Boolean).join(" "),
		...r,
		children: t
	});
}), s = i(function({ className: e, children: t, ...r }, i) {
	return /* @__PURE__ */ n("div", {
		ref: i,
		className: ["alert__description", e ?? ""].filter(Boolean).join(" "),
		...r,
		children: t
	});
}), c = i(function({ variant: i = "default", title: o, description: s, dismissible: c = !1, onDismiss: l, className: u, children: d, role: f = "alert", ...p }, m) {
	let [h, g] = a(!1);
	if (h) return null;
	let _ = [
		"alert",
		i === "default" ? "" : `alert--${i}`,
		i === "warning" ? "" : "surface-dark",
		c ? "alert--dismissible" : "",
		u ?? ""
	].filter(Boolean).join(" ");
	function v() {
		l ? l() : g(!0);
	}
	return /* @__PURE__ */ r("div", {
		ref: m,
		role: f,
		className: _,
		...p,
		children: [/* @__PURE__ */ r("div", {
			className: "alert__content",
			children: [
				o && /* @__PURE__ */ n("p", {
					className: "alert__title",
					children: o
				}),
				s && /* @__PURE__ */ n("div", {
					className: "alert__description",
					children: s
				}),
				d
			]
		}), c && /* @__PURE__ */ r("button", {
			type: "button",
			className: "alert__close",
			onClick: v,
			children: [/* @__PURE__ */ n(e, {
				name: "close",
				size: "sm"
			}), /* @__PURE__ */ n(t, { children: "Cerrar" })]
		})]
	});
}), l = Object.assign(c, {
	Title: o,
	Description: s
});
//#endregion
export { l as Alert };
