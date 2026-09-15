'use client';
import './floating-dock.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Button as n } from "./button.js";
import { CloseButton as r } from "./close-button.js";
import { NumberBadge as i } from "./number-badge.js";
import { useState as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
import { Dialog as c } from "@base-ui/react/dialog";
//#region src/stories/sections/FloatingDock/FloatingDock.tsx
function l({ label: l, title: u, titleHidden: d = !1, description: f, children: p, icon: m, position: h = "bottom-end", open: g, defaultOpen: _, onOpenChange: v, closeLabel: y = "Cerrar", badge: b = 0, badgeMax: x = 99, badgeLabel: S = (e) => `${e} mensajes nuevos`, badgeLive: C = !0, dismissOnOutsidePress: w = !1, className: T, ...E }) {
	let [D, O] = a(null);
	return /* @__PURE__ */ o("div", {
		ref: O,
		className: ["floating-dock", T].filter(Boolean).join(" "),
		"data-position": h,
		...E,
		children: /* @__PURE__ */ s(c.Root, {
			open: g,
			defaultOpen: _,
			modal: !1,
			disablePointerDismissal: !w,
			onOpenChange: (e) => v?.(e),
			children: [
				/* @__PURE__ */ o(c.Trigger, { render: /* @__PURE__ */ s(n, {
					variant: "primary",
					size: "lg",
					iconOnly: !0,
					"aria-label": l,
					className: "floating-dock__trigger",
					children: [m ?? /* @__PURE__ */ o(e, {
						name: "message",
						size: "md"
					}), b > 0 && /* @__PURE__ */ o(i, {
						count: b,
						max: x,
						variant: "danger",
						"aria-hidden": "true",
						className: "floating-dock__badge"
					})]
				}) }),
				C && b > 0 && /* @__PURE__ */ o(t, {
					"aria-live": "polite",
					children: S(b)
				}),
				D && /* @__PURE__ */ o(c.Portal, {
					container: D,
					className: "floating-dock__portal",
					children: /* @__PURE__ */ s(c.Popup, {
						className: "floating-dock__panel",
						children: [
							/* @__PURE__ */ s("header", {
								className: "floating-dock__header",
								children: [d ? /* @__PURE__ */ o(c.Title, { render: /* @__PURE__ */ o(t, { children: u }) }) : /* @__PURE__ */ o(c.Title, {
									className: "floating-dock__title",
									children: u
								}), f != null && /* @__PURE__ */ o(c.Description, {
									className: "floating-dock__description",
									children: f
								})]
							}),
							/* @__PURE__ */ o(c.Close, {
								className: "floating-dock__close",
								render: /* @__PURE__ */ o(r, { label: y })
							}),
							/* @__PURE__ */ o("div", {
								className: "floating-dock__body",
								children: p
							})
						]
					})
				})
			]
		})
	});
}
//#endregion
export { l as FloatingDock };
