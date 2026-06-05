'use client';
import './user-menu.css';
import { Icon as e } from "./icon.js";
import { Avatar as t } from "./avatar.js";
import { NumberBadge as n } from "./number-badge.js";
import { t as r } from "./_shared/dropdownItems.js";
import { Fragment as i, jsx as a, jsxs as o } from "react/jsx-runtime";
import * as s from "@radix-ui/react-dropdown-menu";
//#region src/stories/molecules/UserMenu/UserMenu.tsx
function c({ href: e, children: t, className: n }) {
	return /* @__PURE__ */ a("a", {
		href: e,
		className: n,
		children: t
	});
}
function l(e) {
	return ["user-menu__item", e ? "user-menu__item--destructive" : ""].filter(Boolean).join(" ");
}
function u({ name: u, email: d, avatarUrl: f, notificationCount: p, items: m = [], renderLink: h = c, onOpenChange: g, defaultOpen: _ }) {
	return /* @__PURE__ */ o(s.Root, {
		onOpenChange: g,
		defaultOpen: _,
		children: [/* @__PURE__ */ a(s.Trigger, {
			asChild: !0,
			children: /* @__PURE__ */ o("button", {
				type: "button",
				className: "user-menu__trigger",
				children: [
					/* @__PURE__ */ o("span", {
						className: "user-menu__avatar-wrap",
						children: [/* @__PURE__ */ a(t, {
							src: f,
							name: u,
							alt: "",
							size: "sm",
							className: "user-menu__avatar"
						}), !!p && p > 0 && /* @__PURE__ */ a(n, {
							count: p,
							variant: "danger",
							"aria-label": `${p} notificaciones sin leer`,
							className: "user-menu__notification-badge"
						})]
					}),
					/* @__PURE__ */ a("span", {
						className: "user-menu__name",
						children: u
					}),
					/* @__PURE__ */ a(e, {
						name: "chevron",
						size: "sm",
						className: "user-menu__chevron"
					})
				]
			})
		}), /* @__PURE__ */ a(s.Portal, { children: /* @__PURE__ */ o(s.Content, {
			className: "user-menu__content",
			sideOffset: 4,
			align: "start",
			children: [/* @__PURE__ */ o("div", {
				className: "user-menu__header",
				children: [/* @__PURE__ */ a("span", {
					className: "user-menu__header-name",
					children: u
				}), /* @__PURE__ */ a("span", {
					className: "user-menu__header-email",
					children: d
				})]
			}), m.length > 0 && /* @__PURE__ */ o(i, { children: [/* @__PURE__ */ a(s.Separator, { className: "user-menu__separator" }), r({
				items: m,
				itemClass: l,
				separatorClass: "user-menu__separator",
				renderLink: h
			})] })]
		}) })]
	});
}
//#endregion
export { u as UserMenu };
