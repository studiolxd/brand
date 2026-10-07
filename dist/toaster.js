'use client';
import './toaster.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { n as t } from "./_shared/portal-container.js";
import { Button as n } from "./button.js";
import { t as r } from "./_shared/closebutton.js";
import { t as i } from "./_shared/css-properties.js";
import { TOAST_DURATION as a, setToastDefaultDuration as o, syncLiveToasts as s, toastManager as c } from "./toast.js";
import { useEffect as l } from "react";
import { jsx as u, jsxs as d } from "react/jsx-runtime";
import { Toast as f } from "@base-ui/react/toast";
//#region src/stories/messages/es/toaster.ts
var p = {
	container: "Notificaciones",
	close: "Cerrar"
}, m = 8, h = {
	success: "alert--success",
	error: "alert--error",
	warning: "alert--warning"
};
function g(e, t) {
	return [
		"alert",
		h[e ?? ""] ?? "",
		e === "success" || e === "error" ? "surface-dark" : "",
		t ? "alert--dismissible" : "",
		"toast"
	].filter(Boolean).join(" ");
}
function _(e) {
	return e === "success" || e === "error" ? "" : e === "warning" ? " surface-light" : " surface-invert";
}
function v({ position: a, containerAriaLabel: o, closeLabel: c, closeButton: m, gap: h, expand: v }) {
	let y = e("toaster", p), { toasts: b } = f.useToastManager(), [x, S] = a.split("-"), C = b.map((e) => e.id).join(",");
	l(() => {
		s(C ? C.split(",") : []);
	}, [C]);
	let w = i({ "--toast-gap": `${h}px` }), T = t(void 0), E = [
		"toaster",
		x === "top" ? "toaster--top" : "",
		S === "right" ? "" : `toaster--${S}`,
		v ? "toaster--expanded" : ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ u(f.Portal, {
		container: T,
		children: /* @__PURE__ */ u(f.Viewport, {
			ref: w,
			className: E,
			"aria-label": y("container", o),
			children: b.map((e) => /* @__PURE__ */ d(f.Root, {
				toast: e,
				className: g(e.type, m),
				children: [/* @__PURE__ */ d("div", {
					className: `alert__content${_(e.type)}`,
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
				}), m && /* @__PURE__ */ u(f.Close, {
					className: `alert__close${_(e.type)}`,
					render: /* @__PURE__ */ u(r, { label: y("close", c) })
				})]
			}, e.id))
		})
	});
}
function y({ position: e = "bottom-right", containerAriaLabel: t, closeLabel: n, closeButton: r = !0, duration: i = a, gap: s = m, visibleToasts: d = 3, expand: p = !1 }) {
	let h = Number.isFinite(i) ? i : 0;
	return l(() => o(h), [h]), /* @__PURE__ */ u(f.Provider, {
		toastManager: c,
		timeout: h,
		limit: d,
		children: /* @__PURE__ */ u(v, {
			position: e,
			containerAriaLabel: t,
			closeLabel: n,
			closeButton: r,
			gap: s,
			expand: p
		})
	});
}
//#endregion
export { y as Toaster };
