'use client';
import './floating-dock.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { VisuallyHidden as n } from "./visually-hidden.js";
import { Button as r } from "./button.js";
import { t as i } from "./_shared/closebutton.js";
import { NumberBadge as a } from "./number-badge.js";
import { useState as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
import { Dialog as l } from "@base-ui/react/dialog";
//#region src/stories/messages/es/floatingDock.ts
var u = {
	close: "Cerrar",
	badge: (e) => `${e} mensajes nuevos`
};
//#endregion
//#region src/stories/sections/FloatingDock/FloatingDock.tsx
function d({ label: d, title: f, titleHidden: p = !1, description: m, children: h, icon: g, position: _ = "bottom-end", open: v, defaultOpen: y, onOpenChange: b, closeLabel: x, badge: S = 0, badgeMax: C = 99, badgeLabel: w, badgeLive: T = !0, dismissOnOutsidePress: E = !1, className: D, ...O }) {
	let k = e("floatingDock", u), [A, j] = o(null);
	return /* @__PURE__ */ s("div", {
		ref: j,
		className: ["floating-dock", D].filter(Boolean).join(" "),
		"data-position": _,
		...O,
		children: /* @__PURE__ */ c(l.Root, {
			open: v,
			defaultOpen: y,
			modal: !1,
			disablePointerDismissal: !E,
			onOpenChange: (e) => b?.(e),
			children: [
				/* @__PURE__ */ s(l.Trigger, { render: /* @__PURE__ */ c(r, {
					variant: "primary",
					size: "lg",
					iconOnly: !0,
					"aria-label": d,
					className: "floating-dock__trigger",
					children: [g ?? /* @__PURE__ */ s(t, {
						name: "message",
						size: "md"
					}), S > 0 && /* @__PURE__ */ s(a, {
						count: S,
						max: C,
						variant: "danger",
						"aria-hidden": "true",
						className: "floating-dock__badge"
					})]
				}) }),
				T && S > 0 && /* @__PURE__ */ s(n, {
					"aria-live": "polite",
					children: k("badge", w)(S)
				}),
				A && /* @__PURE__ */ s(l.Portal, {
					container: A,
					className: "floating-dock__portal",
					children: /* @__PURE__ */ c(l.Popup, {
						className: "floating-dock__panel",
						children: [
							/* @__PURE__ */ c("header", {
								className: "floating-dock__header",
								children: [p ? /* @__PURE__ */ s(l.Title, { render: /* @__PURE__ */ s(n, { children: f }) }) : /* @__PURE__ */ s(l.Title, {
									className: "floating-dock__title",
									children: f
								}), m != null && /* @__PURE__ */ s(l.Description, {
									className: "floating-dock__description",
									children: m
								})]
							}),
							/* @__PURE__ */ s(l.Close, {
								className: "floating-dock__close",
								render: /* @__PURE__ */ s(i, { label: k("close", x) })
							}),
							/* @__PURE__ */ s("div", {
								className: "floating-dock__body",
								children: h
							})
						]
					})
				})
			]
		})
	});
}
//#endregion
export { d as FloatingDock };
