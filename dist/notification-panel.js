'use client';
import './notification-panel.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Button as n } from "./button.js";
import { Heading as r } from "./heading.js";
import { Paragraph as i } from "./paragraph.js";
import { Popover as a } from "./popover.js";
import { Text as o } from "./text.js";
import { NotificationButton as s } from "./notification-button.js";
import { Fragment as c, jsx as l, jsxs as u } from "react/jsx-runtime";
import { useCallback as d, useId as f, useRef as p, useState as m } from "react";
//#region src/stories/molecules/NotificationPanel/NotificationPanel.tsx
function h({ children: e, ...t }) {
	return /* @__PURE__ */ l("a", {
		...t,
		children: e
	});
}
var g = "button, a[href]", _ = "link--ink notification-panel__footer-link";
function v({ items: v = [], count: y = 0, max: b, onRead: x, onMarkAllRead: S, allHref: C, preferencesHref: w, renderLink: T = h, label: E, countLabel: D, panelLabel: O = "Notificaciones", unreadLabel: k = "Sin leer", emptyLabel: A = "Estás al día", allLabel: j = "Ver todas las notificaciones", preferencesLabel: M = "Preferencias de notificaciones", markAllReadLabel: N = "Marcar todas como leídas", open: P, defaultOpen: F, onOpenChange: I, className: L }) {
	let R = f(), z = p(null), [B, V] = m([]), H = (e) => e.unread && !B.includes(e.id), U = v.some(H), W = (e) => {
		H(e) && (V((t) => [...t, e.id]), x(e.id));
	}, G = () => {
		V(v.map((e) => e.id)), S?.();
	}, K = d(() => {
		let e = z.current;
		return e ? e.querySelector(".notification-panel__item-action") ?? e.querySelector(g) : null;
	}, []), q = (e, t) => {
		e || V([]), I?.(e, t);
	}, J = `${R}-title`;
	return /* @__PURE__ */ l(a, {
		trigger: /* @__PURE__ */ l(s, {
			count: y,
			max: b,
			label: E,
			countLabel: D
		}),
		label: O,
		align: "end",
		open: P,
		defaultOpen: F,
		onOpenChange: q,
		initialFocus: K,
		className: ["notification-panel", L].filter(Boolean).join(" "),
		children: /* @__PURE__ */ u("div", {
			className: "notification-panel__body",
			ref: z,
			children: [
				/* @__PURE__ */ l(t, { children: /* @__PURE__ */ l(r, {
					level: 2,
					size: 3,
					id: J,
					children: O
				}) }),
				v.length === 0 ? /* @__PURE__ */ l("div", {
					className: "notification-panel__empty",
					children: /* @__PURE__ */ l(i, {
						size: "small",
						children: A
					})
				}) : /* @__PURE__ */ l("ul", {
					className: "notification-panel__list",
					"aria-labelledby": J,
					children: v.map((n, r) => {
						let i = H(n), a = `${R}-t-${r}`;
						return /* @__PURE__ */ l("li", {
							className: "notification-panel__item",
							children: /* @__PURE__ */ u("button", {
								type: "button",
								className: "notification-panel__item-action",
								"aria-disabled": i ? void 0 : !0,
								onClick: () => W(n),
								children: [/* @__PURE__ */ l("span", {
									className: "notification-panel__indicator",
									children: i && /* @__PURE__ */ u(c, { children: [/* @__PURE__ */ l(e, {
										name: "dot",
										size: "sm",
										className: "notification-panel__dot"
									}), /* @__PURE__ */ l(t, { children: k })] })
								}), /* @__PURE__ */ u("span", {
									className: "notification-panel__item-text",
									children: [
										/* @__PURE__ */ l(o, {
											id: a,
											tone: i ? "default" : "muted",
											className: ["notification-panel__item-title", i ? "notification-panel__item-title--unread" : ""].filter(Boolean).join(" "),
											children: n.title
										}),
										n.body && /* @__PURE__ */ l(o, {
											tone: "muted",
											className: "notification-panel__item-body",
											children: n.body
										}),
										/* @__PURE__ */ l(o, {
											tone: "muted",
											className: "notification-panel__item-time",
											children: n.time
										})
									]
								})]
							})
						}, n.id);
					})
				}),
				S && U && /* @__PURE__ */ l("div", {
					className: "notification-panel__mark-all",
					children: /* @__PURE__ */ l(n, {
						variant: "outline",
						size: "sm",
						block: !0,
						onClick: G,
						children: N
					})
				}),
				/* @__PURE__ */ l("div", {
					className: "notification-panel__footer",
					children: /* @__PURE__ */ u("div", {
						className: "notification-panel__footer-links",
						children: [T({
							href: C,
							className: _,
							children: j
						}), T({
							href: w,
							className: _,
							children: M
						})]
					})
				})
			]
		})
	});
}
//#endregion
export { v as NotificationPanel };
