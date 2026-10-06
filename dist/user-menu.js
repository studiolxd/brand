'use client';
import './user-menu.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { n } from "./_shared/portal-container.js";
import { Avatar as r } from "./avatar.js";
import { t as i } from "./_shared/side-offset.js";
import { NumberBadge as a } from "./number-badge.js";
import { t as o } from "./_shared/default-render-link.js";
import { t as s } from "./_shared/dropdownitems.js";
import { Fragment as c, jsx as l, jsxs as u } from "react/jsx-runtime";
import { Menu as d } from "@base-ui/react/menu";
//#region src/stories/molecules/UserMenu/UserMenu.tsx
var f = i("--user-menu-offset");
function p(e) {
	return ["user-menu__item", e ? "user-menu__item--destructive" : ""].filter(Boolean).join(" ");
}
function m({ name: i, email: m, avatarUrl: h, notificationCount: g, items: _ = [], label: v, compact: y = !1, renderLink: b = o, onOpenChange: x, defaultOpen: S, className: C }) {
	let w = e("userMenu"), T = n(void 0);
	return /* @__PURE__ */ u(d.Root, {
		onOpenChange: (e) => x?.(e),
		defaultOpen: S,
		children: [/* @__PURE__ */ u(d.Trigger, {
			className: [
				"user-menu__trigger",
				y ? "user-menu__trigger--compact" : "",
				C
			].filter(Boolean).join(" "),
			"aria-label": v ?? w("trigger")(i),
			children: [
				/* @__PURE__ */ u("span", {
					className: "user-menu__avatar-wrap",
					children: [/* @__PURE__ */ l(r, {
						src: h,
						name: i,
						alt: "",
						size: "sm"
					}), !!g && g > 0 && /* @__PURE__ */ l(a, {
						count: g,
						variant: "danger",
						"aria-label": w("unread")(g),
						className: "user-menu__notification-badge"
					})]
				}),
				!y && /* @__PURE__ */ l("span", {
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
			container: T,
			children: /* @__PURE__ */ l(d.Positioner, {
				className: "user-menu__positioner",
				sideOffset: f,
				align: "start",
				children: /* @__PURE__ */ u(d.Popup, {
					className: "user-menu__content",
					children: [/* @__PURE__ */ u("div", {
						className: "user-menu__header",
						children: [/* @__PURE__ */ l(r, {
							src: h,
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
								children: m
							})]
						})]
					}), _.length > 0 && /* @__PURE__ */ u(c, { children: [/* @__PURE__ */ l(d.Separator, { className: "user-menu__separator" }), s({
						items: _,
						itemClass: p,
						separatorClass: "user-menu__separator",
						blockClass: "user-menu",
						renderLink: b
					})] })]
				})
			})
		})]
	});
}
//#endregion
export { m as UserMenu };
