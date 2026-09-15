'use client';
import './notification-panel.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { VisuallyHidden as n } from "./visually-hidden.js";
import { Button as r } from "./button.js";
import { Heading as i } from "./heading.js";
import { Paragraph as a } from "./paragraph.js";
import { Popover as o } from "./popover.js";
import { Text as s } from "./text.js";
import { NotificationButton as c } from "./notification-button.js";
import { useCallback as l, useId as u, useRef as d, useState as f } from "react";
import { Fragment as p, jsx as m, jsxs as h } from "react/jsx-runtime";
//#region src/stories/molecules/NotificationPanel/NotificationPanel.tsx
function g(e) {
	let t = parseFloat(e);
	return Number.isNaN(t) ? 0 : e.endsWith("rem") ? t * parseFloat(getComputedStyle(document.documentElement).fontSize) : t;
}
function _() {
	let e = document.documentElement;
	return g(getComputedStyle(e).getPropertyValue("--notification-panel-offset").trim());
}
function v({ children: e, ...t }) {
	return /* @__PURE__ */ m("a", {
		...t,
		children: e
	});
}
var y = "button, a[href]", b = "notification-panel__footer-link";
function x({ items: g = [], count: x = 0, max: S, onRead: C, onMarkAllRead: w, allHref: T, preferencesHref: E, renderLink: D = v, label: O, countLabel: k, panelLabel: A, unreadLabel: j, emptyLabel: M, allLabel: N, preferencesLabel: P, markAllReadLabel: F, open: I, defaultOpen: L, onOpenChange: R, className: z }) {
	let B = e("notificationPanel"), V = u(), H = d(null), [U, W] = f([]), G = (e) => e.unread && !U.includes(e.id), K = g.some(G), q = (e) => {
		G(e) && (W((t) => [...t, e.id]), C(e.id));
	}, J = () => {
		W(g.map((e) => e.id)), w?.();
	}, Y = l(() => {
		let e = H.current;
		return e ? e.querySelector(".notification-panel__item-action") ?? e.querySelector(y) : null;
	}, []), X = (e, t) => {
		e || W([]), R?.(e, t);
	}, Z = `${V}-title`, Q = B("panel", A);
	return /* @__PURE__ */ m(o, {
		trigger: /* @__PURE__ */ m(c, {
			count: x,
			max: S,
			label: O,
			countLabel: k
		}),
		label: Q,
		align: "end",
		sideOffset: _,
		open: I,
		defaultOpen: L,
		onOpenChange: X,
		initialFocus: Y,
		className: ["notification-panel", z].filter(Boolean).join(" "),
		children: /* @__PURE__ */ h("div", {
			className: "notification-panel__body",
			ref: H,
			children: [
				/* @__PURE__ */ m(n, { children: /* @__PURE__ */ m(i, {
					level: 2,
					size: 3,
					id: Z,
					children: Q
				}) }),
				g.length === 0 ? /* @__PURE__ */ m("div", {
					className: "notification-panel__empty",
					children: /* @__PURE__ */ m(a, {
						size: "small",
						children: B("empty", M)
					})
				}) : /* @__PURE__ */ m("ul", {
					className: "notification-panel__list",
					"aria-labelledby": Z,
					children: g.map((e, r) => {
						let i = G(e), a = `${V}-t-${r}`;
						return /* @__PURE__ */ m("li", {
							className: "notification-panel__item",
							children: /* @__PURE__ */ h("button", {
								type: "button",
								className: "notification-panel__item-action",
								"aria-disabled": i ? void 0 : !0,
								onClick: () => q(e),
								children: [/* @__PURE__ */ m("span", {
									className: "notification-panel__indicator",
									children: i && /* @__PURE__ */ h(p, { children: [/* @__PURE__ */ m(t, {
										name: "dot",
										size: "sm",
										className: "notification-panel__dot"
									}), /* @__PURE__ */ m(n, { children: B("unread", j) })] })
								}), /* @__PURE__ */ h("span", {
									className: "notification-panel__item-text",
									children: [
										/* @__PURE__ */ m(s, {
											id: a,
											tone: i ? "default" : "muted",
											className: "notification-panel__item-title",
											children: e.title
										}),
										e.body && /* @__PURE__ */ m(s, {
											tone: "muted",
											className: "notification-panel__item-body",
											children: e.body
										}),
										/* @__PURE__ */ m(s, {
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
				w && K && /* @__PURE__ */ m("div", {
					className: "notification-panel__mark-all",
					children: /* @__PURE__ */ m(r, {
						variant: "outline",
						size: "sm",
						block: !0,
						onClick: J,
						children: B("markAllRead", F)
					})
				}),
				/* @__PURE__ */ m("div", {
					className: "notification-panel__footer",
					children: /* @__PURE__ */ h("div", {
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
