'use client';
import './toaster.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { n as t } from "./_shared/portal-container.js";
import { Button as n } from "./button.js";
import { CloseButton as r } from "./close-button.js";
import { t as i } from "./_shared/css-properties.js";
import { TOAST_DURATION as a, setToastDefaultDuration as o, syncLiveToasts as s, toastManager as c } from "./toast.js";
import { useEffect as l } from "react";
import { jsx as u, jsxs as d } from "react/jsx-runtime";
import { Toast as f } from "@base-ui/react/toast";
//#region src/stories/molecules/Toast/Toaster.tsx
var p = 8, m = {
	success: "alert--success",
	error: "alert--error",
	warning: "alert--warning"
};
function h(e, t) {
	return [
		"alert",
		m[e ?? ""] ?? "",
		e === "warning" ? "" : "surface-dark",
		t ? "alert--dismissible" : "",
		"toast"
	].filter(Boolean).join(" ");
}
function g({ position: a, containerAriaLabel: o, closeLabel: c, closeButton: p, gap: m, expand: g }) {
	let _ = e("toaster"), { toasts: v } = f.useToastManager(), [y, b] = a.split("-"), x = v.map((e) => e.id).join(",");
	l(() => {
		s(x ? x.split(",") : []);
	}, [x]);
	let S = i({ "--toast-gap": `${m}px` }), C = t(void 0), w = [
		"toaster",
		y === "top" ? "toaster--top" : "",
		b === "right" ? "" : `toaster--${b}`,
		g ? "toaster--expanded" : ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ u(f.Portal, {
		container: C,
		children: /* @__PURE__ */ u(f.Viewport, {
			ref: S,
			className: w,
			"aria-label": _("container", o),
			children: v.map((e) => /* @__PURE__ */ d(f.Root, {
				toast: e,
				className: h(e.type, p),
				children: [/* @__PURE__ */ d("div", {
					className: "alert__content",
					children: [
						/* @__PURE__ */ u(f.Title, { className: "alert__title" }),
						/* @__PURE__ */ u(f.Description, { className: "alert__description" }),
						/* @__PURE__ */ u(f.Action, {
							className: "toast__action",
							render: /* @__PURE__ */ u(n, {
								variant: "ghost",
								size: "sm"
							})
						})
					]
				}), p && /* @__PURE__ */ u(f.Close, {
					className: "alert__close",
					render: /* @__PURE__ */ u(r, { label: _("close", c) })
				})]
			}, e.id))
		})
	});
}
function _({ position: e = "bottom-right", containerAriaLabel: t, closeLabel: n, closeButton: r = !0, duration: i = a, gap: s = p, visibleToasts: d = 3, expand: m = !1 }) {
	let h = Number.isFinite(i) ? i : 0;
	return l(() => o(h), [h]), /* @__PURE__ */ u(f.Provider, {
		toastManager: c,
		timeout: h,
		limit: d,
		children: /* @__PURE__ */ u(g, {
			position: e,
			containerAriaLabel: t,
			closeLabel: n,
			closeButton: r,
			gap: s,
			expand: m
		})
	});
}
//#endregion
export { _ as Toaster };
