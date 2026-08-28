'use client';
import './toaster.css';
import { Icon as e } from "./icon.js";
import { Button as t } from "./button.js";
import { TOAST_DURATION as n, setToastDefaultDuration as r, syncLiveToasts as i, toastManager as a } from "./toast.js";
import { useEffect as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
import { Toast as l } from "@base-ui-components/react/toast";
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
		e === "warning" ? "" : "surface-dark",
		t ? "alert--dismissible" : "",
		"toast"
	].filter(Boolean).join(" ");
}
function p({ position: n, containerAriaLabel: r, closeLabel: a, closeButton: u, gap: d, expand: p }) {
	let { toasts: m } = l.useToastManager(), [h, g] = n.split("-"), _ = m.map((e) => e.id).join(",");
	o(() => {
		i(_ ? _.split(",") : []);
	}, [_]);
	let v = [
		"toaster",
		h === "top" ? "toaster--top" : "",
		g === "right" ? "" : `toaster--${g}`,
		p ? "toaster--expanded" : ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ s(l.Portal, { children: /* @__PURE__ */ s(l.Viewport, {
		className: v,
		"aria-label": r,
		style: { "--toast-gap": `${d}px` },
		children: m.map((n) => /* @__PURE__ */ c(l.Root, {
			toast: n,
			className: f(n.type, u),
			children: [/* @__PURE__ */ c("div", {
				className: "alert__content",
				children: [
					/* @__PURE__ */ s(l.Title, { className: "alert__title" }),
					/* @__PURE__ */ s(l.Description, { className: "alert__description" }),
					/* @__PURE__ */ s(l.Action, {
						className: "toast__action",
						render: /* @__PURE__ */ s(t, {
							variant: "ghost",
							size: "sm"
						})
					})
				]
			}), u && /* @__PURE__ */ s(l.Close, {
				className: "alert__close",
				"aria-label": a,
				render: /* @__PURE__ */ s(t, {
					variant: "ghost",
					size: "sm",
					iconOnly: !0
				}),
				children: /* @__PURE__ */ s(e, {
					name: "close",
					size: "sm"
				})
			})]
		}, n.id))
	}) });
}
function m({ position: e = "bottom-right", containerAriaLabel: t = "Notificaciones", closeLabel: i = "Cerrar", closeButton: c = !0, duration: d = n, gap: f = u, visibleToasts: m = 3, expand: h = !1 }) {
	let g = Number.isFinite(d) ? d : 0;
	return o(() => r(g), [g]), /* @__PURE__ */ s(l.Provider, {
		toastManager: a,
		timeout: g,
		limit: m,
		children: /* @__PURE__ */ s(p, {
			position: e,
			containerAriaLabel: t,
			closeLabel: i,
			closeButton: c,
			gap: f,
			expand: h
		})
	});
}
//#endregion
export { m as Toaster };
