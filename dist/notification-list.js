'use client';
import './notification-list.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Button as n } from "./button.js";
import { Text as r } from "./text.js";
import { Fragment as i, jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/molecules/NotificationList/NotificationList.tsx
function s({ children: e, ...t }) {
	return /* @__PURE__ */ a("a", {
		...t,
		children: e
	});
}
function c({ items: c, renderLink: l = s, renderActions: u, onItemClick: d, onMarkRead: f, label: p = "Notificaciones", unreadLabel: m = "Sin leer", markReadLabel: h = "Marcar como leída", className: g }) {
	return c.length === 0 ? null : /* @__PURE__ */ a("ul", {
		className: ["notification-list", g].filter(Boolean).join(" "),
		"aria-label": p,
		children: c.map((s) => {
			let c = s.unread, p = u?.(s);
			return /* @__PURE__ */ o("li", {
				className: "notification-list__item",
				children: [
					/* @__PURE__ */ a("span", {
						className: "notification-list__indicator",
						children: c && /* @__PURE__ */ o(i, { children: [/* @__PURE__ */ a(e, {
							name: "dot",
							size: "sm",
							className: "notification-list__dot"
						}), /* @__PURE__ */ a(t, { children: s.unreadLabel ?? m })] })
					}),
					/* @__PURE__ */ o("div", {
						className: "notification-list__text",
						children: [s.href ? l({
							href: s.href,
							className: "notification-list__title",
							onClick: d ? () => d(s) : void 0,
							children: s.title
						}) : /* @__PURE__ */ a(r, {
							className: "notification-list__title",
							children: s.title
						}), s.body && /* @__PURE__ */ a(r, {
							tone: "muted",
							className: "notification-list__body",
							children: s.body
						})]
					}),
					(f || p) && /* @__PURE__ */ o("div", {
						className: "notification-list__actions",
						children: [f && c && /* @__PURE__ */ a(n, {
							variant: "text",
							size: "sm",
							onClick: () => f(s.id),
							children: h
						}), p]
					}),
					s.timeDateTime ? /* @__PURE__ */ a("time", {
						className: "notification-list__time",
						dateTime: s.timeDateTime,
						children: s.time
					}) : /* @__PURE__ */ a("span", {
						className: "notification-list__time",
						children: s.time
					})
				]
			}, s.id);
		})
	});
}
//#endregion
export { c as NotificationList };
