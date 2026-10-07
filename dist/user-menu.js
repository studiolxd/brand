'use client';
import './user-menu.css';
import { r as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { n } from "./_shared/portal-container.js";
import { Avatar as r } from "./avatar.js";
import { t as i } from "./_shared/side-offset.js";
import { NumberBadge as a } from "./number-badge.js";
import { t as o } from "./_shared/default-render-link.js";
import { t as s } from "./_shared/dropdownitems.js";
import { Fragment as c, jsx as l, jsxs as u } from "react/jsx-runtime";
import { Menu as d } from "@base-ui/react/menu";
//#region src/stories/messages/es/userMenu.ts
var f = {
	trigger: (e) => `Cuenta de ${e}`,
	unread: (e) => `${e} notificaciones sin leer`
}, p = i("--user-menu-offset");
function m(e) {
	return ["user-menu__item", e ? "user-menu__item--destructive" : ""].filter(Boolean).join(" ");
}
function h({ name: i, email: h, avatarUrl: g, notificationCount: _, items: v = [], label: y, compact: b = !1, renderLink: x = o, onOpenChange: S, defaultOpen: C, className: w }) {
	let T = e("userMenu", f), E = n(void 0);
	return /* @__PURE__ */ u(d.Root, {
		onOpenChange: (e) => S?.(e),
		defaultOpen: C,
		children: [/* @__PURE__ */ u(d.Trigger, {
			className: [
				"user-menu__trigger",
				b ? "user-menu__trigger--compact" : "",
				w
			].filter(Boolean).join(" "),
			"aria-label": y ?? T("trigger")(i),
			children: [
				/* @__PURE__ */ u("span", {
					className: "user-menu__avatar-wrap",
					children: [/* @__PURE__ */ l(r, {
						src: g,
						name: i,
						alt: "",
						size: "sm"
					}), !!_ && _ > 0 && /* @__PURE__ */ l(a, {
						count: _,
						tone: "error",
						"aria-label": T("unread")(_),
						className: "user-menu__notification-badge"
					})]
				}),
				!b && /* @__PURE__ */ l("span", {
					className: "user-menu__name",
					children: i
				}),
				/* @__PURE__ */ l(t, {
					name: "chevron",
					size: "sm",
					className: "user-menu__chevron"
				})
			]
		}), /* @__PURE__ */ l(d.Portal, {
			container: E,
			children: /* @__PURE__ */ l(d.Positioner, {
				className: "user-menu__positioner",
				sideOffset: p,
				align: "start",
				children: /* @__PURE__ */ u(d.Popup, {
					className: "user-menu__content",
					children: [/* @__PURE__ */ u("div", {
						className: "user-menu__header",
						children: [/* @__PURE__ */ l(r, {
							src: g,
							name: i,
							alt: "",
							size: "md",
							className: "user-menu__header-avatar"
						}), /* @__PURE__ */ u("div", {
							className: "user-menu__header-text",
							children: [/* @__PURE__ */ l("span", {
								className: "user-menu__header-name",
								children: i
							}), /* @__PURE__ */ l("span", {
								className: "user-menu__header-email",
								children: h
							})]
						})]
					}), v.length > 0 && /* @__PURE__ */ u(c, { children: [/* @__PURE__ */ l(d.Separator, { className: "user-menu__separator" }), s({
						items: v,
						itemClass: m,
						separatorClass: "user-menu__separator",
						blockClass: "user-menu",
						renderLink: x
					})] })]
				})
			})
		})]
	});
}
//#endregion
export { h as UserMenu };
