'use client';
import './banner.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { t } from "./_shared/closebutton.js";
import { forwardRef as n } from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/messages/es/banner.ts
var a = { dismiss: "Descartar aviso" }, o = {
	info: "status",
	warning: "alert",
	error: "alert"
}, s = n(function({ variant: n = "info", children: s, actions: c, onDismiss: l, dismissLabel: u, className: d, role: f, "aria-live": p, ...m }, h) {
	let g = e("banner", a), _ = f ?? o[n], v = [
		"banner",
		`banner--${n}`,
		n === "info" || n === "error" ? "surface-dark" : "",
		l ? "banner--dismissible" : "",
		d ?? ""
	].filter(Boolean).join(" "), y = n === "warning" ? " surface-light" : "";
	return /* @__PURE__ */ i("div", {
		ref: h,
		role: _,
		"aria-live": p ?? (_ === "alert" ? "assertive" : "polite"),
		className: v,
		...m,
		children: [
			/* @__PURE__ */ r("div", {
				className: `banner__content${y}`,
				children: s
			}),
			c && /* @__PURE__ */ r("div", {
				className: `banner__actions${y}`,
				children: c
			}),
			l && /* @__PURE__ */ r(t, {
				className: `banner__close${y}`,
				label: g("dismiss", u),
				onClick: l
			})
		]
	});
});
//#endregion
export { s as Banner };
