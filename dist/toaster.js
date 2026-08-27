'use client';
import './toaster.css';
import { Icon as e } from "./icon.js";
import { jsx as t } from "react/jsx-runtime";
import { Toaster as n } from "sonner";
//#region src/stories/molecules/Toast/Toaster.tsx
var r = 5e3, i = 8;
function a({ position: a = "bottom-right", theme: o, containerAriaLabel: s = "Notificaciones", closeLabel: c = "Cerrar", closeButton: l = !0, duration: u = r, gap: d = i, visibleToasts: f, expand: p }) {
	return /* @__PURE__ */ t(n, {
		closeButton: l,
		position: a,
		theme: o,
		containerAriaLabel: s,
		duration: u,
		gap: d,
		visibleToasts: f,
		expand: p,
		className: "toaster",
		icons: { close: /* @__PURE__ */ t(e, {
			name: "close",
			size: "sm"
		}) },
		toastOptions: {
			unstyled: !0,
			closeButtonAriaLabel: c,
			classNames: {
				toast: [
					"alert",
					l ? "alert--dismissible" : "",
					"toast"
				].filter(Boolean).join(" "),
				title: "alert__title",
				description: "alert__description",
				closeButton: "toast__close",
				icon: "toast__icon",
				success: "alert--success",
				error: "alert--error",
				warning: "alert--warning"
			}
		}
	});
}
//#endregion
export { a as Toaster };
