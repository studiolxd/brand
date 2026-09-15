'use client';
import './toaster.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Button as t } from "./button.js";
import { CloseButton as n } from "./close-button.js";
import { t as r } from "./_shared/css-properties.js";
import { TOAST_DURATION as i, setToastDefaultDuration as a, syncLiveToasts as o, toastManager as s } from "./toast.js";
import { useEffect as c } from "react";
import { jsx as l, jsxs as u } from "react/jsx-runtime";
import { Toast as d } from "@base-ui/react/toast";
//#region src/stories/molecules/Toast/Toaster.tsx
var f = 8, p = {
	success: "alert--success",
	error: "alert--error",
	warning: "alert--warning"
};
function m(e, t) {
	return [
		"alert",
		p[e ?? ""] ?? "",
		e === "warning" ? "" : "surface-dark",
		t ? "alert--dismissible" : "",
		"toast"
	].filter(Boolean).join(" ");
}
function h({ position: i, containerAriaLabel: a, closeLabel: s, closeButton: f, gap: p, expand: h }) {
	let g = e("toaster"), { toasts: _ } = d.useToastManager(), [v, y] = i.split("-"), b = _.map((e) => e.id).join(",");
	c(() => {
		o(b ? b.split(",") : []);
	}, [b]);
	let x = r({ "--toast-gap": `${p}px` }), S = [
		"toaster",
		v === "top" ? "toaster--top" : "",
		y === "right" ? "" : `toaster--${y}`,
		h ? "toaster--expanded" : ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ l(d.Portal, { children: /* @__PURE__ */ l(d.Viewport, {
		ref: x,
		className: S,
		"aria-label": g("container", a),
		children: _.map((e) => /* @__PURE__ */ u(d.Root, {
			toast: e,
			className: m(e.type, f),
			children: [/* @__PURE__ */ u("div", {
				className: "alert__content",
				children: [
					/* @__PURE__ */ l(d.Title, { className: "alert__title" }),
					/* @__PURE__ */ l(d.Description, { className: "alert__description" }),
					/* @__PURE__ */ l(d.Action, {
						className: "toast__action",
						render: /* @__PURE__ */ l(t, {
							variant: "ghost",
							size: "sm"
						})
					})
				]
			}), f && /* @__PURE__ */ l(d.Close, {
				className: "alert__close",
				render: /* @__PURE__ */ l(n, { label: g("close", s) })
			})]
		}, e.id))
	}) });
}
function g({ position: e = "bottom-right", containerAriaLabel: t, closeLabel: n, closeButton: r = !0, duration: o = i, gap: u = f, visibleToasts: p = 3, expand: m = !1 }) {
	let g = Number.isFinite(o) ? o : 0;
	return c(() => a(g), [g]), /* @__PURE__ */ l(d.Provider, {
		toastManager: s,
		timeout: g,
		limit: p,
		children: /* @__PURE__ */ l(h, {
			position: e,
			containerAriaLabel: t,
			closeLabel: n,
			closeButton: r,
			gap: u,
			expand: m
		})
	});
}
//#endregion
export { g as Toaster };
