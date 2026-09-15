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
import { useCallback as c, useId as l, useRef as u, useState as d } from "react";
import { Fragment as f, jsx as p, jsxs as m } from "react/jsx-runtime";
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
	return /* @__PURE__ */ p("a", {
		...t,
		children: e
	});
}
var v = "button, a[href]", y = "notification-panel__footer-link";
function b({ items: h = [], count: b = 0, max: x, onRead: S, onMarkAllRead: C, allHref: w, preferencesHref: T, renderLink: E = _, label: D, countLabel: O, panelLabel: k = "Notificaciones", unreadLabel: A = "Sin leer", emptyLabel: j = "Estás al día", allLabel: M = "Ver todas las notificaciones", preferencesLabel: N = "Preferencias de notificaciones", markAllReadLabel: P = "Marcar todas como leídas", open: F, defaultOpen: I, onOpenChange: L, className: R }) {
	let z = l(), B = u(null), [V, H] = d([]), U = (e) => e.unread && !V.includes(e.id), W = h.some(U), G = (e) => {
		U(e) && (H((t) => [...t, e.id]), S(e.id));
	}, K = () => {
		H(h.map((e) => e.id)), C?.();
	}, q = c(() => {
		let e = B.current;
		return e ? e.querySelector(".notification-panel__item-action") ?? e.querySelector(v) : null;
	}, []), J = (e, t) => {
		e || H([]), L?.(e, t);
	}, Y = `${z}-title`;
	return /* @__PURE__ */ p(a, {
		trigger: /* @__PURE__ */ p(s, {
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
		children: /* @__PURE__ */ m("div", {
			className: "notification-panel__body",
			ref: B,
			children: [
				/* @__PURE__ */ p(t, { children: /* @__PURE__ */ p(r, {
					level: 2,
					size: 3,
					id: Y,
					children: k
				}) }),
				h.length === 0 ? /* @__PURE__ */ p("div", {
					className: "notification-panel__empty",
					children: /* @__PURE__ */ p(i, {
						size: "small",
						children: j
					})
				}) : /* @__PURE__ */ p("ul", {
					className: "notification-panel__list",
					"aria-labelledby": Y,
					children: h.map((n, r) => {
						let i = U(n), a = `${z}-t-${r}`;
						return /* @__PURE__ */ p("li", {
							className: "notification-panel__item",
							children: /* @__PURE__ */ m("button", {
								type: "button",
								className: "notification-panel__item-action",
								"aria-disabled": i ? void 0 : !0,
								onClick: () => G(n),
								children: [/* @__PURE__ */ p("span", {
									className: "notification-panel__indicator",
									children: i && /* @__PURE__ */ m(f, { children: [/* @__PURE__ */ p(e, {
										name: "dot",
										size: "sm",
										className: "notification-panel__dot"
									}), /* @__PURE__ */ p(t, { children: A })] })
								}), /* @__PURE__ */ m("span", {
									className: "notification-panel__item-text",
									children: [
										/* @__PURE__ */ p(o, {
											id: a,
											tone: i ? "default" : "muted",
											className: "notification-panel__item-title",
											children: n.title
										}),
										n.body && /* @__PURE__ */ p(o, {
											tone: "muted",
											className: "notification-panel__item-body",
											children: n.body
										}),
										/* @__PURE__ */ p(o, {
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
				C && W && /* @__PURE__ */ p("div", {
					className: "notification-panel__mark-all",
					children: /* @__PURE__ */ p(n, {
						variant: "outline",
						size: "sm",
						block: !0,
						onClick: K,
						children: P
					})
				}),
				/* @__PURE__ */ p("div", {
					className: "notification-panel__footer",
					children: /* @__PURE__ */ m("div", {
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
