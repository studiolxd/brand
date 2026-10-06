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
import { NotificationButton as u } from "./notification-button.js";
import { useCallback as d, useId as f, useRef as p, useState as m } from "react";
import { Fragment as h, jsx as g, jsxs as _ } from "react/jsx-runtime";
//#region src/stories/molecules/NotificationPanel/NotificationPanel.tsx
var v = o("--notification-panel-offset"), y = "button, a[href]", b = "notification-panel__footer-link";
function x({ items: o = [], count: x = 0, max: S, onRead: C, onMarkAllRead: w, allHref: T, preferencesHref: E, renderLink: D = l, label: O, countLabel: k, panelLabel: A, unreadLabel: j, emptyLabel: M, allLabel: N, preferencesLabel: P, markAllReadLabel: F, open: I, defaultOpen: L, onOpenChange: R, className: z }) {
	let B = e("notificationPanel"), V = f(), H = p(null), [U, W] = m([]), G = (e) => e.unread && !U.includes(e.id), K = o.some(G), q = (e) => {
		G(e) && (W((t) => [...t, e.id]), C(e.id));
	}, J = () => {
		W(o.map((e) => e.id)), w?.();
	}, Y = d(() => {
		let e = H.current;
		return e ? e.querySelector(".notification-panel__item-action") ?? e.querySelector(y) : null;
	}, []), X = (e, t) => {
		e || W([]), R?.(e, t);
	}, Z = `${V}-title`, Q = B("panel", A);
	return /* @__PURE__ */ g(s, {
		trigger: /* @__PURE__ */ g(u, {
			count: x,
			max: S,
			label: O,
			countLabel: k
		}),
		label: Q,
		align: "end",
		sideOffset: v,
		open: I,
		defaultOpen: L,
		onOpenChange: X,
		initialFocus: Y,
		className: ["notification-panel", z].filter(Boolean).join(" "),
		children: /* @__PURE__ */ _("div", {
			className: "notification-panel__body",
			ref: H,
			children: [
				/* @__PURE__ */ g(n, { children: /* @__PURE__ */ g(i, {
					level: 2,
					size: 3,
					id: Z,
					children: Q
				}) }),
				o.length === 0 ? /* @__PURE__ */ g("div", {
					className: "notification-panel__empty",
					children: /* @__PURE__ */ g(a, {
						size: "small",
						children: B("empty", M)
					})
				}) : /* @__PURE__ */ g("ul", {
					className: "notification-panel__list",
					"aria-labelledby": Z,
					children: o.map((e, r) => {
						let i = G(e), a = `${V}-t-${r}`;
						return /* @__PURE__ */ g("li", {
							className: "notification-panel__item",
							children: /* @__PURE__ */ _("button", {
								type: "button",
								className: "notification-panel__item-action",
								"aria-disabled": i ? void 0 : !0,
								onClick: () => q(e),
								children: [/* @__PURE__ */ g("span", {
									className: "notification-panel__indicator",
									children: i && /* @__PURE__ */ _(h, { children: [/* @__PURE__ */ g(t, {
										name: "dot",
										size: "sm",
										className: "notification-panel__dot"
									}), /* @__PURE__ */ g(n, { children: B("unread", j) })] })
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
				w && K && /* @__PURE__ */ g("div", {
					className: "notification-panel__mark-all",
					children: /* @__PURE__ */ g(r, {
						variant: "outline",
						size: "sm",
						block: !0,
						onClick: J,
						children: B("markAllRead", F)
					})
				}),
				/* @__PURE__ */ g("div", {
					className: "notification-panel__footer",
					children: /* @__PURE__ */ _("div", {
						className: "notification-panel__footer-links",
						children: [D({
							href: T,
							className: b,
							children: B("all", N)
						}), D({
							href: E,
							className: b,
							children: B("preferences", P)
						})]
					})
				})
			]
		})
	});
}
//#endregion
export { x as NotificationPanel };
