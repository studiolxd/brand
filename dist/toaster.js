'use client';
import './toaster.css';
import { Button as e } from "./button.js";
import { CloseButton as t } from "./close-button.js";
import { TOAST_DURATION as n, setToastDefaultDuration as r, syncLiveToasts as i, toastManager as a } from "./toast.js";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
import { useEffect as c } from "react";
import { Toast as l } from "@base-ui/react/toast";
//#region src/stories/molecules/Toast/Toaster.tsx
var u = 8, d = {
	success: "alert--success",
	error: "alert--error",
	warning: "alert--warning"
};
function f(e, t) {
	return [
		"alert",
		d[e ?? ""] ?? "",
		"surface-dark",
		t ? "alert--dismissible" : "",
		"toast"
	].filter(Boolean).join(" ");
}
function p({ position: n, containerAriaLabel: r, closeLabel: a, closeButton: u, gap: d, expand: p }) {
	let { toasts: m } = l.useToastManager(), [h, g] = n.split("-"), _ = m.map((e) => e.id).join(",");
	c(() => {
		i(_ ? _.split(",") : []);
	}, [_]);
	let v = [
		"toaster",
		h === "top" ? "toaster--top" : "",
		g === "right" ? "" : `toaster--${g}`,
		p ? "toaster--expanded" : ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ o(l.Portal, { children: /* @__PURE__ */ o(l.Viewport, {
		className: v,
		"aria-label": r,
		style: { "--toast-gap": `${d}px` },
		children: m.map((n) => /* @__PURE__ */ s(l.Root, {
			toast: n,
			className: f(n.type, u),
			children: [/* @__PURE__ */ s("div", {
				className: "alert__content",
				children: [
					/* @__PURE__ */ o(l.Title, { className: "alert__title" }),
					/* @__PURE__ */ o(l.Description, { className: "alert__description" }),
					/* @__PURE__ */ o(l.Action, {
						className: "toast__action",
						render: /* @__PURE__ */ o(e, {
							variant: "ghost",
							size: "sm"
						})
					})
				]
			}), u && /* @__PURE__ */ o(l.Close, {
				className: "alert__close",
				render: /* @__PURE__ */ o(t, { label: a })
			})]
		}, n.id))
	}) });
}
function m({ position: e = "bottom-right", containerAriaLabel: t = "Notificaciones", closeLabel: i = "Cerrar", closeButton: s = !0, duration: d = n, gap: f = u, visibleToasts: m = 3, expand: h = !1 }) {
	let g = Number.isFinite(d) ? d : 0;
	return c(() => r(g), [g]), /* @__PURE__ */ o(l.Provider, {
		toastManager: a,
		timeout: g,
		limit: m,
		children: /* @__PURE__ */ o(p, {
			position: e,
			containerAriaLabel: t,
			closeLabel: i,
			closeButton: s,
			gap: f,
			expand: h
		})
	});
}
//#endregion
export { m as Toaster };
