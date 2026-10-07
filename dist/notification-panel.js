'use client';
import './notification-panel.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { VisuallyHidden as n } from "./visually-hidden.js";
import { Button as r } from "./button.js";
import { Heading as i } from "./heading.js";
import { Paragraph as a } from "./paragraph.js";
import { t as o } from "./_shared/side-offset.js";
import { Popover as s } from "./popover.js";
import { Text as c } from "./text.js";
import { t as l } from "./_shared/default-render-link.js";
import { t as u } from "./_shared/notificationbutton.js";
import { useCallback as d, useId as f, useRef as p, useState as m } from "react";
import { Fragment as h, jsx as g, jsxs as _ } from "react/jsx-runtime";
//#region src/stories/messages/es/notificationPanel.ts
var v = {
	panel: "Notificaciones",
	unread: "Sin leer",
	empty: "Estás al día",
	all: "Ver todas las notificaciones",
	preferences: "Preferencias de notificaciones",
	markAllRead: "Marcar todas como leídas"
}, y = o("--notification-panel-offset"), b = "button, a[href]", x = "notification-panel__footer-link";
function S({ items: o = [], count: S = 0, max: C, onRead: w, onMarkAllRead: T, allHref: E, preferencesHref: D, renderLink: O = l, label: k, countLabel: A, panelLabel: j, unreadLabel: M, emptyLabel: N, allLabel: P, preferencesLabel: F, markAllReadLabel: I, open: L, defaultOpen: R, onOpenChange: z, className: B }) {
	let V = e("notificationPanel", v), H = f(), U = p(null), [W, G] = m([]), K = (e) => e.unread && !W.includes(e.id), q = o.some(K), J = (e) => {
		K(e) && (G((t) => [...t, e.id]), w(e.id));
	}, Y = () => {
		G(o.map((e) => e.id)), T?.();
	}, X = d(() => {
		let e = U.current;
		return e ? e.querySelector(".notification-panel__item-action") ?? e.querySelector(b) : null;
	}, []), Z = (e, t) => {
		e || G([]), z?.(e, t);
	}, Q = `${H}-title`, $ = V("panel", j);
	return /* @__PURE__ */ g(s, {
		trigger: /* @__PURE__ */ g(u, {
			count: S,
			max: C,
			label: k,
			countLabel: A,
			className: B
		}),
		label: $,
		align: "end",
		sideOffset: y,
		open: L,
		defaultOpen: R,
		onOpenChange: Z,
		initialFocus: X,
		className: "notification-panel",
		children: /* @__PURE__ */ _("div", {
			className: "notification-panel__body",
			ref: U,
			children: [
				/* @__PURE__ */ g(n, { children: /* @__PURE__ */ g(i, {
					level: 2,
					size: 3,
					id: Q,
					children: $
				}) }),
				o.length === 0 ? /* @__PURE__ */ g("div", {
					className: "notification-panel__empty",
					children: /* @__PURE__ */ g(a, {
						size: "small",
						children: V("empty", N)
					})
				}) : /* @__PURE__ */ g("ul", {
					className: "notification-panel__list",
					"aria-labelledby": Q,
					children: o.map((e, r) => {
						let i = K(e), a = `${H}-t-${r}`;
						return /* @__PURE__ */ g("li", {
							className: "notification-panel__item",
							children: /* @__PURE__ */ _("button", {
								type: "button",
								className: "notification-panel__item-action",
								"aria-disabled": i ? void 0 : !0,
								onClick: () => J(e),
								children: [/* @__PURE__ */ g("span", {
									className: "notification-panel__indicator",
									children: i && /* @__PURE__ */ _(h, { children: [/* @__PURE__ */ g(t, {
										name: "dot",
										size: "sm",
										className: "notification-panel__dot"
									}), /* @__PURE__ */ g(n, { children: V("unread", M) })] })
								}), /* @__PURE__ */ _("span", {
									className: "notification-panel__item-text",
									children: [
										/* @__PURE__ */ g(c, {
											id: a,
											tone: i ? "default" : "muted",
											className: "notification-panel__item-title",
											children: e.title
										}),
										e.body && /* @__PURE__ */ g(c, {
											tone: "muted",
											className: "notification-panel__item-body",
											children: e.body
										}),
										/* @__PURE__ */ g(c, {
											tone: "muted",
											className: "notification-panel__item-time",
											children: e.time
										})
									]
								})]
							})
						}, e.id);
					})
				}),
				T && q && /* @__PURE__ */ g("div", {
					className: "notification-panel__mark-all",
					children: /* @__PURE__ */ g(r, {
						variant: "outline",
						size: "sm",
						block: !0,
						onClick: Y,
						children: V("markAllRead", I)
					})
				}),
				/* @__PURE__ */ g("div", {
					className: "notification-panel__footer",
					children: /* @__PURE__ */ _("div", {
						className: "notification-panel__footer-links",
						children: [O({
							href: E,
							className: x,
							children: V("all", P)
						}), O({
							href: D,
							className: x,
							children: V("preferences", F)
						})]
					})
				})
			]
		})
	});
}
//#endregion
export { S as NotificationPanel };
