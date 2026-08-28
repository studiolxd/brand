'use client';
import './user-menu.css';
import { Icon as e } from "./icon.js";
import { Avatar as t } from "./avatar.js";
import { NumberBadge as n } from "./number-badge.js";
import { n as r } from "./_shared/dropdownItems.js";
import { Fragment as i, jsx as a, jsxs as o } from "react/jsx-runtime";
import { Menu as s } from "@base-ui/react/menu";
//#region src/stories/molecules/UserMenu/UserMenu.tsx
function c({ children: e, ...t }) {
	return /* @__PURE__ */ a("a", {
		...t,
		children: e
	});
}
function l(e) {
	return ["user-menu__item", e ? "user-menu__item--destructive" : ""].filter(Boolean).join(" ");
}
function u({ name: u, email: d, avatarUrl: f, notificationCount: p, items: m = [], label: h, compact: g = !1, renderLink: _ = c, onOpenChange: v, defaultOpen: y }) {
	return /* @__PURE__ */ o(s.Root, {
		onOpenChange: (e) => v?.(e),
		defaultOpen: y,
		children: [/* @__PURE__ */ o(s.Trigger, {
			className: ["user-menu__trigger", g ? "user-menu__trigger--compact" : ""].filter(Boolean).join(" "),
			"aria-label": h ?? `Cuenta de ${u}`,
			children: [
				/* @__PURE__ */ o("span", {
					className: "user-menu__avatar-wrap",
					children: [/* @__PURE__ */ a(t, {
						src: f,
						name: u,
						alt: "",
						size: "sm"
					}), !!p && p > 0 && /* @__PURE__ */ a(n, {
						count: p,
						variant: "danger",
						"aria-label": `${p} notificaciones sin leer`,
						className: "user-menu__notification-badge"
					})]
				}),
				!g && /* @__PURE__ */ a("span", {
					className: "user-menu__name",
					children: u
				}),
				/* @__PURE__ */ a(e, {
					name: "chevron",
					size: "sm",
					className: "user-menu__chevron"
				})
			]
		}), /* @__PURE__ */ a(s.Portal, { children: /* @__PURE__ */ a(s.Positioner, {
			className: "user-menu__positioner",
			sideOffset: 4,
			align: "start",
			children: /* @__PURE__ */ o(s.Popup, {
				className: "user-menu__content",
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
					renderLink: _
				})] })]
			})
		}) })]
	});
}
//#endregion
export { u as UserMenu };
