'use client';
import './banner.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { CloseButton as t } from "./close-button.js";
import { forwardRef as n } from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/molecules/Banner/Banner.tsx
var a = {
	info: "status",
	warning: "alert",
	error: "alert"
}, o = n(function({ variant: n = "info", children: o, actions: s, onDismiss: c, dismissLabel: l, className: u, role: d, "aria-live": f, ...p }, m) {
	let h = e("banner"), g = d ?? a[n], _ = [
		"banner",
		`banner--${n}`,
		n === "info" || n === "error" ? "surface-dark" : "",
		c ? "banner--dismissible" : "",
		u ?? ""
	].filter(Boolean).join(" "), v = n === "warning" ? " surface-light" : "";
	return /* @__PURE__ */ i("div", {
		ref: m,
		role: g,
		"aria-live": f ?? (g === "alert" ? "assertive" : "polite"),
		className: _,
		...p,
		children: [
			/* @__PURE__ */ r("div", {
				className: `banner__content${v}`,
				children: o
			}),
			s && /* @__PURE__ */ r("div", {
				className: `banner__actions${v}`,
				children: s
			}),
			c && /* @__PURE__ */ r(t, {
				className: `banner__close${v}`,
				label: h("dismiss", l),
				onClick: c
			})
		]
	});
});
//#endregion
export { o as Banner };
