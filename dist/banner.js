'use client';
import './banner.css';
import { n as e } from "./_shared/env.js";
import { r as t } from "./_shared/brandmessagescontext.js";
import { t as n } from "./_shared/closebutton.js";
import { forwardRef as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/stories/messages/es/banner.ts
var o = { dismiss: "Descartar aviso" }, s = {
	info: "status",
	warning: "alert",
	error: "alert"
}, c = r(function({ tone: r, variant: c, children: l, actions: u, onDismiss: d, dismissLabel: f, className: p, role: m, "aria-live": h, ...g }, _) {
	let v = t("banner", o);
	c !== void 0 && e("Banner", "variant", "`tone`");
	let y = r ?? c ?? "info", b = m ?? s[y], x = [
		"banner",
		`banner--${y}`,
		y === "info" || y === "error" ? "surface-dark" : "",
		d ? "banner--dismissible" : "",
		p ?? ""
	].filter(Boolean).join(" "), S = y === "warning" ? " surface-light" : "";
	return /* @__PURE__ */ a("div", {
		ref: _,
		role: b,
		"aria-live": h ?? (b === "alert" ? "assertive" : "polite"),
		className: x,
		...g,
		children: [
			/* @__PURE__ */ i("div", {
				className: `banner__content${S}`,
				children: l
			}),
			u && /* @__PURE__ */ i("div", {
				className: `banner__actions${S}`,
				children: u
			}),
			d && /* @__PURE__ */ i(n, {
				className: `banner__close${S}`,
				label: v("dismiss", f),
				onClick: d
			})
		]
	});
});
//#endregion
export { c as Banner };
