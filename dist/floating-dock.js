'use client';
import './floating-dock.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Button as n } from "./button.js";
import { NumberBadge as r } from "./number-badge.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { useState as o } from "react";
import { Dialog as s } from "@base-ui/react/dialog";
//#region src/stories/sections/FloatingDock/FloatingDock.tsx
function c({ label: c, title: l, titleHidden: u = !1, description: d, children: f, icon: p, position: m = "bottom-end", open: h, defaultOpen: g, onOpenChange: _, closeLabel: v = "Cerrar", badge: y = 0, badgeMax: b = 99, badgeLabel: x = (e) => `${e} mensajes nuevos`, badgeLive: S = !0, dismissOnOutsidePress: C = !1, className: w, ...T }) {
	let [E, D] = o(null);
	return /* @__PURE__ */ i("div", {
		ref: D,
		className: ["floating-dock", w].filter(Boolean).join(" "),
		"data-position": m,
		...T,
		children: /* @__PURE__ */ a(s.Root, {
			open: h,
			defaultOpen: g,
			modal: !1,
			disablePointerDismissal: !C,
			onOpenChange: (e) => _?.(e),
			children: [
				/* @__PURE__ */ i(s.Trigger, { render: /* @__PURE__ */ a(n, {
					variant: "primary",
					size: "lg",
					iconOnly: !0,
					"aria-label": c,
					className: "floating-dock__trigger",
					children: [p ?? /* @__PURE__ */ i(e, {
						name: "message",
						size: "md"
					}), y > 0 && /* @__PURE__ */ i(r, {
						count: y,
						max: b,
						variant: "danger",
						"aria-hidden": "true",
						className: "floating-dock__badge"
					})]
				}) }),
				S && y > 0 && /* @__PURE__ */ i(t, {
					"aria-live": "polite",
					children: x(y)
				}),
				E && /* @__PURE__ */ i(s.Portal, {
					container: E,
					className: "floating-dock__portal",
					children: /* @__PURE__ */ a(s.Popup, {
						className: "floating-dock__panel",
						children: [
							/* @__PURE__ */ a("header", {
								className: "floating-dock__header",
								children: [u ? /* @__PURE__ */ i(s.Title, { render: /* @__PURE__ */ i(t, { children: l }) }) : /* @__PURE__ */ i(s.Title, {
									className: "floating-dock__title",
									children: l
								}), d != null && /* @__PURE__ */ i(s.Description, {
									className: "floating-dock__description",
									children: d
								})]
							}),
							/* @__PURE__ */ i(s.Close, {
								className: "floating-dock__close",
								"aria-label": v,
								children: /* @__PURE__ */ i(e, {
									name: "close",
									size: "md"
								})
							}),
							/* @__PURE__ */ i("div", {
								className: "floating-dock__body",
								children: f
							})
						]
					})
				})
			]
		})
	});
}
//#endregion
export { c as FloatingDock };
