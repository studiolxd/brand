'use client';
import './notification-list.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { VisuallyHidden as n } from "./visually-hidden.js";
import { Button as r } from "./button.js";
import { Text as i } from "./text.js";
import { Fragment as a, jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/molecules/NotificationList/NotificationList.tsx
function c({ children: e, ...t }) {
	return /* @__PURE__ */ o("a", {
		...t,
		children: e
	});
}
function l({ items: l, renderLink: u = c, renderActions: d, onItemClick: f, onMarkRead: p, label: m, unreadLabel: h, markReadLabel: g, className: _ }) {
	let v = e("notificationList");
	return l.length === 0 ? null : /* @__PURE__ */ o("ul", {
		className: ["notification-list", _].filter(Boolean).join(" "),
		"aria-label": v("label", m),
		children: l.map((e) => {
			let c = e.unread, l = d?.(e);
			return /* @__PURE__ */ s("li", {
				className: "notification-list__item",
				children: [
					/* @__PURE__ */ o("span", {
						className: "notification-list__indicator",
						children: c && /* @__PURE__ */ s(a, { children: [/* @__PURE__ */ o(t, {
							name: "dot",
							size: "sm",
							className: "notification-list__dot"
						}), /* @__PURE__ */ o(n, { children: e.unreadLabel ?? v("unread", h) })] })
					}),
					/* @__PURE__ */ s("div", {
						className: "notification-list__text",
						children: [e.href ? u({
							href: e.href,
							className: "notification-list__title",
							onClick: f ? () => f(e) : void 0,
							children: e.title
						}) : /* @__PURE__ */ o(i, {
							className: "notification-list__title",
							children: e.title
						}), e.body && /* @__PURE__ */ o(i, {
							tone: "muted",
							className: "notification-list__body",
							children: e.body
						})]
					}),
					(p || l) && /* @__PURE__ */ s("div", {
						className: "notification-list__actions",
						children: [p && c && /* @__PURE__ */ o(r, {
							variant: "text",
							size: "sm",
							onClick: () => p(e.id),
							children: v("markRead", g)
						}), l]
					}),
					e.timeDateTime ? /* @__PURE__ */ o("time", {
						className: "notification-list__time",
						dateTime: e.timeDateTime,
						children: e.time
					}) : /* @__PURE__ */ o("span", {
						className: "notification-list__time",
						children: e.time
					})
				]
			}, e.id);
		})
	});
}
//#endregion
export { l as NotificationList };
