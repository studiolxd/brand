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
var g = "button, a[href]";
function _({ items: _ = [], count: v = 0, max: y, onRead: b, onMarkAllRead: x, allHref: S, preferencesHref: C, renderLink: w = h, label: T, countLabel: E, panelLabel: D = "Notificaciones", unreadLabel: O = "Sin leer", viewLabel: k = "Ver", emptyLabel: A = "Estás al día", allLabel: j = "Ver todas las notificaciones", preferencesLabel: M = "Preferencias de notificaciones", markAllReadLabel: N = "Marcar todas como leídas", open: P, defaultOpen: F, onOpenChange: I, className: L }) {
	let R = f(), z = p(null), [B, V] = m([]), H = (e) => e.unread && !B.includes(e.id), U = (e) => {
		H(e) && (V((t) => [...t, e.id]), b(e.id));
	}, W = () => {
		V(_.map((e) => e.id)), x?.();
	}, G = d(() => z.current?.querySelector(g) ?? null, []), K = (e, t) => {
		e || V([]), I?.(e, t);
	}, q = `${R}-title`;
	return /* @__PURE__ */ l(a, {
		trigger: /* @__PURE__ */ l(s, {
			count: v,
			max: y,
			label: T,
			countLabel: E
		}),
		label: D,
		align: "end",
		open: P,
		defaultOpen: F,
		onOpenChange: K,
		initialFocus: G,
		className: ["notification-panel", L].filter(Boolean).join(" "),
		children: /* @__PURE__ */ u("div", {
			className: "notification-panel__body",
			ref: z,
			children: [
				/* @__PURE__ */ l("div", {
					className: "notification-panel__header",
					children: /* @__PURE__ */ l(r, {
						level: 2,
						size: 3,
						id: q,
						className: "notification-panel__title",
						children: D
					})
				}),
				_.length === 0 ? /* @__PURE__ */ l("div", {
					className: "notification-panel__empty",
					children: /* @__PURE__ */ l(i, {
						size: "small",
						children: A
					})
				}) : /* @__PURE__ */ l("ul", {
					className: "notification-panel__list",
					"aria-labelledby": q,
					children: _.map((n, r) => {
						let i = H(n), a = `${R}-t-${r}`, s = `${R}-v-${r}`;
						return /* @__PURE__ */ u("li", {
							className: "notification-panel__item",
							children: [/* @__PURE__ */ u("button", {
								type: "button",
								className: "notification-panel__item-action",
								"aria-disabled": i ? void 0 : !0,
								onClick: () => U(n),
								children: [/* @__PURE__ */ l("span", {
									className: "notification-panel__indicator",
									children: i && /* @__PURE__ */ u(c, { children: [/* @__PURE__ */ l(e, {
										name: "dot",
										size: "sm",
										className: "notification-panel__dot"
									}), /* @__PURE__ */ l(t, { children: O })] })
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
							}), n.link !== void 0 && w({
								href: n.link,
								id: s,
								className: "notification-panel__view",
								"aria-labelledby": `${s} ${a}`,
								onClick: () => U(n),
								children: k
							})]
						}, n.id);
					})
				}),
				/* @__PURE__ */ u("div", {
					className: "notification-panel__footer",
					children: [x && /* @__PURE__ */ l(n, {
						variant: "text",
						size: "sm",
						className: "notification-panel__mark-all",
						onClick: W,
						children: N
					}), /* @__PURE__ */ u("div", {
						className: "notification-panel__footer-links",
						children: [w({
							href: S,
							className: "notification-panel__footer-link",
							children: j
						}), w({
							href: C,
							className: "notification-panel__footer-link",
							children: M
						})]
					})]
				})
			]
		})
	});
}
//#endregion
export { _ as NotificationPanel };
