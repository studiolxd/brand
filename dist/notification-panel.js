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
function h(e) {
	let t = parseFloat(e);
	return Number.isNaN(t) ? 0 : e.endsWith("rem") ? t * parseFloat(getComputedStyle(document.documentElement).fontSize) : t;
}
function g() {
	let e = document.documentElement;
	return h(getComputedStyle(e).getPropertyValue("--notification-panel-offset").trim());
}
function _({ children: e, ...t }) {
	return /* @__PURE__ */ l("a", {
		...t,
		children: e
	});
}
var v = "button, a[href]", y = "notification-panel__footer-link";
function b({ items: h = [], count: b = 0, max: x, onRead: S, onMarkAllRead: C, allHref: w, preferencesHref: T, renderLink: E = _, label: D, countLabel: O, panelLabel: k = "Notificaciones", unreadLabel: A = "Sin leer", emptyLabel: j = "Estás al día", allLabel: M = "Ver todas las notificaciones", preferencesLabel: N = "Preferencias de notificaciones", markAllReadLabel: P = "Marcar todas como leídas", open: F, defaultOpen: I, onOpenChange: L, className: R }) {
	let z = f(), B = p(null), [V, H] = m([]), U = (e) => e.unread && !V.includes(e.id), W = h.some(U), G = (e) => {
		U(e) && (H((t) => [...t, e.id]), S(e.id));
	}, K = () => {
		H(h.map((e) => e.id)), C?.();
	}, q = d(() => {
		let e = B.current;
		return e ? e.querySelector(".notification-panel__item-action") ?? e.querySelector(v) : null;
	}, []), J = (e, t) => {
		e || H([]), L?.(e, t);
	}, Y = `${z}-title`;
	return /* @__PURE__ */ l(a, {
		trigger: /* @__PURE__ */ l(s, {
			count: b,
			max: x,
			label: D,
			countLabel: O
		}),
		label: k,
		align: "end",
		sideOffset: g,
		open: F,
		defaultOpen: I,
		onOpenChange: J,
		initialFocus: q,
		className: ["notification-panel", R].filter(Boolean).join(" "),
		children: /* @__PURE__ */ u("div", {
			className: "notification-panel__body",
			ref: B,
			children: [
				/* @__PURE__ */ l(t, { children: /* @__PURE__ */ l(r, {
					level: 2,
					size: 3,
					id: Y,
					children: k
				}) }),
				h.length === 0 ? /* @__PURE__ */ l("div", {
					className: "notification-panel__empty",
					children: /* @__PURE__ */ l(i, {
						size: "small",
						children: j
					})
				}) : /* @__PURE__ */ l("ul", {
					className: "notification-panel__list",
					"aria-labelledby": Y,
					children: h.map((n, r) => {
						let i = U(n), a = `${z}-t-${r}`;
						return /* @__PURE__ */ l("li", {
							className: "notification-panel__item",
							children: /* @__PURE__ */ u("button", {
								type: "button",
								className: "notification-panel__item-action",
								"aria-disabled": i ? void 0 : !0,
								onClick: () => G(n),
								children: [/* @__PURE__ */ l("span", {
									className: "notification-panel__indicator",
									children: i && /* @__PURE__ */ u(c, { children: [/* @__PURE__ */ l(e, {
										name: "dot",
										size: "sm",
										className: "notification-panel__dot"
									}), /* @__PURE__ */ l(t, { children: A })] })
								}), /* @__PURE__ */ u("span", {
									className: "notification-panel__item-text",
									children: [
										/* @__PURE__ */ l(o, {
											id: a,
											tone: i ? "default" : "muted",
											className: "notification-panel__item-title",
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
				C && W && /* @__PURE__ */ l("div", {
					className: "notification-panel__mark-all",
					children: /* @__PURE__ */ l(n, {
						variant: "outline",
						size: "sm",
						block: !0,
						onClick: K,
						children: P
					})
				}),
				/* @__PURE__ */ l("div", {
					className: "notification-panel__footer",
					children: /* @__PURE__ */ u("div", {
						className: "notification-panel__footer-links",
						children: [E({
							href: w,
							className: y,
							children: M
						}), E({
							href: T,
							className: y,
							children: N
						})]
					})
				})
			]
		})
	});
}
//#endregion
export { b as NotificationPanel };
