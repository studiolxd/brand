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
		e === "success" || e === "error" ? "surface-dark" : "",
		t ? "alert--dismissible" : "",
		"toast"
	].filter(Boolean).join(" ");
}
function g(e) {
	return e === "success" || e === "error" ? "" : e === "warning" ? " surface-light" : " surface-invert";
}
function _({ position: a, containerAriaLabel: o, closeLabel: c, closeButton: p, gap: m, expand: _ }) {
	let v = e("toaster"), { toasts: y } = f.useToastManager(), [b, x] = a.split("-"), S = y.map((e) => e.id).join(",");
	l(() => {
		s(S ? S.split(",") : []);
	}, [S]);
	let C = i({ "--toast-gap": `${m}px` }), w = t(void 0), T = [
		"toaster",
		b === "top" ? "toaster--top" : "",
		x === "right" ? "" : `toaster--${x}`,
		_ ? "toaster--expanded" : ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ u(f.Portal, {
		container: w,
		children: /* @__PURE__ */ u(f.Viewport, {
			ref: C,
			className: T,
			"aria-label": v("container", o),
			children: y.map((e) => /* @__PURE__ */ d(f.Root, {
				toast: e,
				className: h(e.type, p),
				children: [/* @__PURE__ */ d("div", {
					className: `alert__content${g(e.type)}`,
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
					className: `alert__close${g(e.type)}`,
					render: /* @__PURE__ */ u(r, { label: v("close", c) })
				})]
			}, e.id))
		})
	});
}
function v({ position: e = "bottom-right", containerAriaLabel: t, closeLabel: n, closeButton: r = !0, duration: i = a, gap: s = p, visibleToasts: d = 3, expand: m = !1 }) {
	let h = Number.isFinite(i) ? i : 0;
	return l(() => o(h), [h]), /* @__PURE__ */ u(f.Provider, {
		toastManager: c,
		timeout: h,
		limit: d,
		children: /* @__PURE__ */ u(_, {
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
export { v as Toaster };
