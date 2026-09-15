'use client';
import './floating-dock.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { VisuallyHidden as n } from "./visually-hidden.js";
import { Button as r } from "./button.js";
import { CloseButton as i } from "./close-button.js";
import { NumberBadge as a } from "./number-badge.js";
import { useState as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
import { Dialog as l } from "@base-ui/react/dialog";
//#region src/stories/sections/FloatingDock/FloatingDock.tsx
function u({ label: u, title: d, titleHidden: f = !1, description: p, children: m, icon: h, position: g = "bottom-end", open: _, defaultOpen: v, onOpenChange: y, closeLabel: b, badge: x = 0, badgeMax: S = 99, badgeLabel: C, badgeLive: w = !0, dismissOnOutsidePress: T = !1, className: E, ...D }) {
	let O = e("floatingDock"), [k, A] = o(null);
	return /* @__PURE__ */ s("div", {
		ref: A,
		className: ["floating-dock", E].filter(Boolean).join(" "),
		"data-position": g,
		...D,
		children: /* @__PURE__ */ c(l.Root, {
			open: _,
			defaultOpen: v,
			modal: !1,
			disablePointerDismissal: !T,
			onOpenChange: (e) => y?.(e),
			children: [
				/* @__PURE__ */ s(l.Trigger, { render: /* @__PURE__ */ c(r, {
					variant: "primary",
					size: "lg",
					iconOnly: !0,
					"aria-label": u,
					className: "floating-dock__trigger",
					children: [h ?? /* @__PURE__ */ s(t, {
						name: "message",
						size: "md"
					}), x > 0 && /* @__PURE__ */ s(a, {
						count: x,
						max: S,
						variant: "danger",
						"aria-hidden": "true",
						className: "floating-dock__badge"
					})]
				}) }),
				w && x > 0 && /* @__PURE__ */ s(n, {
					"aria-live": "polite",
					children: O("badge", C)(x)
				}),
				k && /* @__PURE__ */ s(l.Portal, {
					container: k,
					className: "floating-dock__portal",
					children: /* @__PURE__ */ c(l.Popup, {
						className: "floating-dock__panel",
						children: [
							/* @__PURE__ */ c("header", {
								className: "floating-dock__header",
								children: [f ? /* @__PURE__ */ s(l.Title, { render: /* @__PURE__ */ s(n, { children: d }) }) : /* @__PURE__ */ s(l.Title, {
									className: "floating-dock__title",
									children: d
								}), p != null && /* @__PURE__ */ s(l.Description, {
									className: "floating-dock__description",
									children: p
								})]
							}),
							/* @__PURE__ */ s(l.Close, {
								className: "floating-dock__close",
								render: /* @__PURE__ */ s(i, { label: O("close", b) })
							}),
							/* @__PURE__ */ s("div", {
								className: "floating-dock__body",
								children: m
							})
						]
					})
				})
			]
		})
	});
}
//#endregion
export { u as FloatingDock };
