'use client';
import './user-menu.css';
import { Icon as e } from "./icon.js";
import { Avatar as t } from "./avatar.js";
import { t as n } from "./_shared/Separator.js";
import { NumberBadge as r } from "./number-badge.js";
import { a as i, i as a, n as o, o as s, r as c, s as l } from "./_shared/dropdownItems.js";
import { Fragment as u, jsx as d, jsxs as f } from "react/jsx-runtime";
//#region src/stories/molecules/UserMenu/UserMenu.tsx
function p({ children: e, ...t }) {
	return /* @__PURE__ */ d("a", {
		...t,
		children: e
	});
}
function m(e) {
	return ["user-menu__item", e ? "user-menu__item--destructive" : ""].filter(Boolean).join(" ");
}
function h({ name: h, email: g, avatarUrl: _, notificationCount: v, items: y = [], label: b, compact: x = !1, renderLink: S = p, onOpenChange: C, defaultOpen: w }) {
	return /* @__PURE__ */ f(a, {
		onOpenChange: (e) => C?.(e),
		defaultOpen: w,
		children: [/* @__PURE__ */ f(c, {
			className: ["user-menu__trigger", x ? "user-menu__trigger--compact" : ""].filter(Boolean).join(" "),
			"aria-label": b ?? `Cuenta de ${h}`,
			children: [
				/* @__PURE__ */ f("span", {
					className: "user-menu__avatar-wrap",
					children: [/* @__PURE__ */ d(t, {
						src: _,
						name: h,
						alt: "",
						size: "sm"
					}), !!v && v > 0 && /* @__PURE__ */ d(r, {
						count: v,
						variant: "danger",
						"aria-label": `${v} notificaciones sin leer`,
						className: "user-menu__notification-badge"
					})]
				}),
				!x && /* @__PURE__ */ d("span", {
					className: "user-menu__name",
					children: h
				}),
				/* @__PURE__ */ d(e, {
					name: "chevron",
					size: "sm",
					className: "user-menu__chevron"
				})
			]
		}), /* @__PURE__ */ d(s, { children: /* @__PURE__ */ d(i, {
			className: "user-menu__positioner",
			sideOffset: 4,
			align: "start",
			children: /* @__PURE__ */ f(l, {
				className: "user-menu__content",
				children: [/* @__PURE__ */ f("div", {
					className: "user-menu__header",
					children: [/* @__PURE__ */ d("span", {
						className: "user-menu__header-name",
						children: h
					}), /* @__PURE__ */ d("span", {
						className: "user-menu__header-email",
						children: g
					})]
				}), y.length > 0 && /* @__PURE__ */ f(u, { children: [/* @__PURE__ */ d(n, { className: "user-menu__separator" }), o({
					items: y,
					itemClass: m,
					separatorClass: "user-menu__separator",
					renderLink: S
				})] })]
			})
		}) })]
	});
}
//#endregion
export { h as UserMenu };
