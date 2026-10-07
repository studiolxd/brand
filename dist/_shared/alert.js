import '../alert.css';
import { n as e } from "./env.js";
import { r as t } from "./brandmessagescontext.js";
import { t as n } from "./closebutton.js";
import { forwardRef as r, useState as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/messages/es/alert.ts
var s = { close: "Cerrar" }, c = {
	default: "status",
	success: "status",
	error: "alert",
	warning: "alert"
}, l = {
	default: " surface-invert",
	warning: " surface-light",
	success: "",
	error: ""
}, u = r(function({ className: e, children: t, ...n }, r) {
	return /* @__PURE__ */ a("p", {
		ref: r,
		className: ["alert__title", e ?? ""].filter(Boolean).join(" "),
		...n,
		children: t
	});
}), d = r(function({ className: e, children: t, ...n }, r) {
	return /* @__PURE__ */ a("div", {
		ref: r,
		className: ["alert__description", e ?? ""].filter(Boolean).join(" "),
		...n,
		children: t
	});
}), f = r(function({ className: e, children: t, ...n }, r) {
	return /* @__PURE__ */ a("div", {
		ref: r,
		className: ["alert__actions", e ?? ""].filter(Boolean).join(" "),
		...n,
		children: t
	});
}), p = r(function({ tone: r, variant: u, title: d, description: f, actions: p, dismissible: m = !1, onDismiss: h, finalFocus: g, closeLabel: _, className: v, children: y, role: b, ...x }, S) {
	let C = t("alert", s);
	u !== void 0 && e("Alert", "variant", "`tone`");
	let w = r ?? u ?? "default", [T, E] = i(!1);
	if (T) return null;
	let D = [
		"alert",
		w === "default" ? "" : `alert--${w}`,
		w === "success" || w === "error" ? "surface-dark" : "",
		m ? "alert--dismissible" : "",
		v ?? ""
	].filter(Boolean).join(" "), O = l[w];
	function k() {
		if (typeof document > "u") return;
		let e = g?.current;
		if (e) {
			e.focus();
			return;
		}
		let t = document.body, n = t.hasAttribute("tabindex");
		n || t.setAttribute("tabindex", "-1"), t.focus(), n || t.removeAttribute("tabindex");
	}
	function A() {
		k(), h ? h() : E(!0);
	}
	return /* @__PURE__ */ o("div", {
		ref: S,
		role: b ?? c[w],
		className: D,
		...x,
		children: [/* @__PURE__ */ o("div", {
			className: `alert__content${O}`,
			children: [
				d && /* @__PURE__ */ a("p", {
					className: "alert__title",
					children: d
				}),
				f && /* @__PURE__ */ a("div", {
					className: "alert__description",
					children: f
				}),
				y,
				p && /* @__PURE__ */ a("div", {
					className: "alert__actions",
					children: p
				})
			]
		}), m && /* @__PURE__ */ a(n, {
			className: `alert__close${O}`,
			label: C("close", _),
			onClick: A
		})]
	});
}), m = Object.assign(p, {
	Title: u,
	Description: d,
	Actions: f
});
//#endregion
export { u as i, f as n, d as r, m as t };
