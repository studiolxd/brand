'use client';
import './notification-list.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { VisuallyHidden as n } from "./visually-hidden.js";
import { Button as r } from "./button.js";
import { Text as i } from "./text.js";
import { t as a } from "./_shared/default-render-link.js";
import { Fragment as o, jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/stories/molecules/NotificationList/NotificationList.tsx
function l({ items: l, renderLink: u = a, renderActions: d, onItemClick: f, onMarkRead: p, label: m, unreadLabel: h, markReadLabel: g, className: _ }) {
	let v = e("notificationList");
	return l.length === 0 ? null : /* @__PURE__ */ s("ul", {
		className: ["notification-list", _].filter(Boolean).join(" "),
		"aria-label": v("label", m),
		children: l.map((e) => {
			let a = e.unread, l = d?.(e);
			return /* @__PURE__ */ c("li", {
				className: "notification-list__item",
				children: [
					/* @__PURE__ */ s("span", {
						className: "notification-list__indicator",
						children: a && /* @__PURE__ */ c(o, { children: [/* @__PURE__ */ s(t, {
							name: "dot",
							size: "sm",
							className: "notification-list__dot"
						}), /* @__PURE__ */ s(n, { children: e.unreadLabel ?? v("unread", h) })] })
					}),
					/* @__PURE__ */ c("div", {
						className: "notification-list__text",
						children: [e.href ? u({
							href: e.href,
							className: "notification-list__title",
							onClick: f ? () => f(e) : void 0,
							children: e.title
						}) : /* @__PURE__ */ s(i, {
							className: "notification-list__title",
							children: e.title
						}), e.body && /* @__PURE__ */ s(i, {
							tone: "muted",
							className: "notification-list__body",
							children: e.body
						})]
					}),
					(p || l) && /* @__PURE__ */ c("div", {
						className: "notification-list__actions",
						children: [p && a && /* @__PURE__ */ s(r, {
							variant: "text",
							size: "sm",
							onClick: () => p(e.id),
							children: v("markRead", g)
						}), l]
					}),
					e.timeDateTime ? /* @__PURE__ */ s("time", {
						className: "notification-list__time",
						dateTime: e.timeDateTime,
						children: e.time
					}) : /* @__PURE__ */ s("span", {
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
