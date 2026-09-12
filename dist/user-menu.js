'use client';
import './user-menu.css';
import { Icon as e } from "./icon.js";
import { Avatar as t } from "./avatar.js";
import { NumberBadge as n } from "./number-badge.js";
import { n as r } from "./_shared/dropdownitems.js";
import { Fragment as i, jsx as a, jsxs as o } from "react/jsx-runtime";
import { Menu as s } from "@base-ui/react/menu";
//#region src/stories/molecules/UserMenu/UserMenu.tsx
function c(e) {
	let t = parseFloat(e);
	return Number.isNaN(t) ? 0 : e.endsWith("rem") ? t * parseFloat(getComputedStyle(document.documentElement).fontSize) : t;
}
function l() {
	let e = document.documentElement;
	return c(getComputedStyle(e).getPropertyValue("--user-menu-offset").trim());
}
function u({ children: e, ...t }) {
	return /* @__PURE__ */ a("a", {
		...t,
		children: e
	});
}
function d(e) {
	return ["user-menu__item", e ? "user-menu__item--destructive" : ""].filter(Boolean).join(" ");
}
function f({ name: c, email: f, avatarUrl: p, notificationCount: m, items: h = [], label: g, compact: _ = !1, renderLink: v = u, onOpenChange: y, defaultOpen: b }) {
	return /* @__PURE__ */ o(s.Root, {
		onOpenChange: (e) => y?.(e),
		defaultOpen: b,
		children: [/* @__PURE__ */ o(s.Trigger, {
			className: ["user-menu__trigger", _ ? "user-menu__trigger--compact" : ""].filter(Boolean).join(" "),
			"aria-label": g ?? `Cuenta de ${c}`,
			children: [
				/* @__PURE__ */ o("span", {
					className: "user-menu__avatar-wrap",
					children: [/* @__PURE__ */ a(t, {
						src: p,
						name: c,
						alt: "",
						size: "sm"
					}), !!m && m > 0 && /* @__PURE__ */ a(n, {
						count: m,
						variant: "danger",
						"aria-label": `${m} notificaciones sin leer`,
						className: "user-menu__notification-badge"
					})]
				}),
				!_ && /* @__PURE__ */ a("span", {
					className: "user-menu__name",
					children: c
				}),
				/* @__PURE__ */ a(e, {
					name: "chevron",
					size: "sm",
					className: "user-menu__chevron"
				})
			]
		}), /* @__PURE__ */ a(s.Portal, { children: /* @__PURE__ */ a(s.Positioner, {
			className: "user-menu__positioner",
			sideOffset: l,
			align: "start",
			children: /* @__PURE__ */ o(s.Popup, {
				className: "user-menu__content",
				children: [/* @__PURE__ */ o("div", {
					className: "user-menu__header",
					children: [/* @__PURE__ */ a("span", {
						className: "user-menu__header-name",
						children: c
					}), /* @__PURE__ */ a("span", {
						className: "user-menu__header-email",
						children: f
					})]
				}), h.length > 0 && /* @__PURE__ */ o(i, { children: [/* @__PURE__ */ a(s.Separator, { className: "user-menu__separator" }), r({
					items: h,
					itemClass: d,
					separatorClass: "user-menu__separator",
					renderLink: v
				})] })]
			})
		}) })]
	});
}
//#endregion
export { f as UserMenu };
