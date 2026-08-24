'use client';
import './toaster.css';
import { Icon as e } from "./icon.js";
import { jsx as t } from "react/jsx-runtime";
import { Toaster as n } from "sonner";
//#region src/stories/molecules/Toast/Toaster.tsx
function r({ position: r = "bottom-right", theme: i, containerAriaLabel: a }) {
	return /* @__PURE__ */ t(n, {
		closeButton: !0,
		position: r,
		theme: i,
		containerAriaLabel: a,
		gap: 8,
		className: "toaster",
		icons: { close: /* @__PURE__ */ t(e, {
			name: "close",
			size: "sm"
		}) },
		toastOptions: {
			unstyled: !0,
			classNames: {
				toast: "toast",
				title: "toast__title",
				description: "toast__description",
				closeButton: "toast__close",
				icon: "toast__icon",
				success: "toast--success",
				error: "toast--error",
				warning: "toast--warning",
				info: "toast--info"
			}
		}
	});
}
//#endregion
export { r as Toaster };
