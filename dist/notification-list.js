'use client';
import './notification-list.css';
import { r as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { VisuallyHidden as n } from "./visually-hidden.js";
import { Button as r } from "./button.js";
import { Text as i } from "./text.js";
import { t as a } from "./_shared/default-render-link.js";
import { Fragment as o, jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/stories/messages/es/notificationList.ts
var l = {
	label: "Notificaciones",
	unread: "Sin leer",
	markRead: "Marcar como leída"
};
//#endregion
//#region src/stories/molecules/NotificationList/NotificationList.tsx
function u({ items: u, renderLink: d = a, renderActions: f, onItemClick: p, onMarkRead: m, label: h, unreadLabel: g, markReadLabel: _, className: v }) {
	let y = e("notificationList", l);
	return u.length === 0 ? null : /* @__PURE__ */ s("ul", {
		className: ["notification-list", v].filter(Boolean).join(" "),
		"aria-label": y("label", h),
		children: u.map((e) => {
			let a = e.unread, l = f?.(e);
			return /* @__PURE__ */ c("li", {
				className: "notification-list__item",
				children: [
					/* @__PURE__ */ s("span", {
						className: "notification-list__indicator",
						children: a && /* @__PURE__ */ c(o, { children: [/* @__PURE__ */ s(t, {
							name: "dot",
							size: "sm",
							className: "notification-list__dot"
						}), /* @__PURE__ */ s(n, { children: e.unreadLabel ?? y("unread", g) })] })
					}),
					/* @__PURE__ */ c("div", {
						className: "notification-list__text",
						children: [e.href ? d({
							href: e.href,
							className: "notification-list__title",
							onClick: p ? () => p(e) : void 0,
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
					(m || l) && /* @__PURE__ */ c("div", {
						className: "notification-list__actions",
						children: [m && a && /* @__PURE__ */ s(r, {
							variant: "text",
							size: "sm",
							onClick: () => m(e.id),
							children: y("markRead", _)
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
export { u as NotificationList };
