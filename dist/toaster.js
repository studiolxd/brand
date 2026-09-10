'use client';
import './toaster.css';
import { Button as e } from "./button.js";
import { CloseButton as t } from "./close-button.js";
import { t as n } from "./_shared/css-properties.js";
import { TOAST_DURATION as r, setToastDefaultDuration as i, syncLiveToasts as a, toastManager as o } from "./toast.js";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
import { useEffect as l } from "react";
import { Toast as u } from "@base-ui/react/toast";
//#region src/stories/molecules/Toast/Toaster.tsx
var d = 8, f = {
	success: "alert--success",
	error: "alert--error",
	warning: "alert--warning"
};
function p(e, t) {
	return [
		"alert",
		f[e ?? ""] ?? "",
		e === "warning" ? "" : "surface-dark",
		t ? "alert--dismissible" : "",
		"toast"
	].filter(Boolean).join(" ");
}
function m({ position: r, containerAriaLabel: i, closeLabel: o, closeButton: d, gap: f, expand: m }) {
	let { toasts: h } = u.useToastManager(), [g, _] = r.split("-"), v = h.map((e) => e.id).join(",");
	l(() => {
		a(v ? v.split(",") : []);
	}, [v]);
	let y = n({ "--toast-gap": `${f}px` }), b = [
		"toaster",
		g === "top" ? "toaster--top" : "",
		_ === "right" ? "" : `toaster--${_}`,
		m ? "toaster--expanded" : ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ s(u.Portal, { children: /* @__PURE__ */ s(u.Viewport, {
		ref: y,
		className: b,
		"aria-label": i,
		children: h.map((n) => /* @__PURE__ */ c(u.Root, {
			toast: n,
			className: p(n.type, d),
			children: [/* @__PURE__ */ c("div", {
				className: "alert__content",
				children: [
					/* @__PURE__ */ s(u.Title, { className: "alert__title" }),
					/* @__PURE__ */ s(u.Description, { className: "alert__description" }),
					/* @__PURE__ */ s(u.Action, {
						className: "toast__action",
						render: /* @__PURE__ */ s(e, {
							variant: "ghost",
							size: "sm"
						})
					})
				]
			}), d && /* @__PURE__ */ s(u.Close, {
				className: "alert__close",
				render: /* @__PURE__ */ s(t, { label: o })
			})]
		}, n.id))
	}) });
}
function h({ position: e = "bottom-right", containerAriaLabel: t = "Notificaciones", closeLabel: n = "Cerrar", closeButton: a = !0, duration: c = r, gap: f = d, visibleToasts: p = 3, expand: h = !1 }) {
	let g = Number.isFinite(c) ? c : 0;
	return l(() => i(g), [g]), /* @__PURE__ */ s(u.Provider, {
		toastManager: o,
		timeout: g,
		limit: p,
		children: /* @__PURE__ */ s(m, {
			position: e,
			containerAriaLabel: t,
			closeLabel: n,
			closeButton: a,
			gap: f,
			expand: h
		})
	});
}
//#endregion
export { h as Toaster };
