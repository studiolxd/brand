'use client';
import './user-menu.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { n } from "./_shared/portal-container.js";
import { Avatar as r } from "./avatar.js";
import { NumberBadge as i } from "./number-badge.js";
import { n as a } from "./_shared/dropdownitems.js";
import { Fragment as o, jsx as s, jsxs as c } from "react/jsx-runtime";
import { Menu as l } from "@base-ui/react/menu";
//#region src/stories/molecules/UserMenu/UserMenu.tsx
function u(e) {
	let t = parseFloat(e);
	return Number.isNaN(t) ? 0 : e.endsWith("rem") ? t * parseFloat(getComputedStyle(document.documentElement).fontSize) : t;
}
function d() {
	let e = document.documentElement;
	return u(getComputedStyle(e).getPropertyValue("--user-menu-offset").trim());
}
function f({ children: e, ...t }) {
	return /* @__PURE__ */ s("a", {
		...t,
		children: e
	});
}
function p(e) {
	return ["user-menu__item", e ? "user-menu__item--destructive" : ""].filter(Boolean).join(" ");
}
function m({ name: u, email: m, avatarUrl: h, notificationCount: g, items: _ = [], label: v, compact: y = !1, renderLink: b = f, onOpenChange: x, defaultOpen: S }) {
	let C = e("userMenu"), w = n(void 0);
	return /* @__PURE__ */ c(l.Root, {
		onOpenChange: (e) => x?.(e),
		defaultOpen: S,
		children: [/* @__PURE__ */ c(l.Trigger, {
			className: ["user-menu__trigger", y ? "user-menu__trigger--compact" : ""].filter(Boolean).join(" "),
			"aria-label": v ?? C("trigger")(u),
			children: [
				/* @__PURE__ */ c("span", {
					className: "user-menu__avatar-wrap",
					children: [/* @__PURE__ */ s(r, {
						src: h,
						name: u,
						alt: "",
						size: "sm"
					}), !!g && g > 0 && /* @__PURE__ */ s(i, {
						count: g,
						variant: "danger",
						"aria-label": C("unread")(g),
						className: "user-menu__notification-badge"
					})]
				}),
				!y && /* @__PURE__ */ s("span", {
					className: "user-menu__name",
					children: u
				}),
				/* @__PURE__ */ s(t, {
					name: "chevron",
					size: "sm",
					className: "user-menu__chevron"
				})
			]
		}), /* @__PURE__ */ s(l.Portal, {
			container: w,
			children: /* @__PURE__ */ s(l.Positioner, {
				className: "user-menu__positioner",
				sideOffset: d,
				align: "start",
				children: /* @__PURE__ */ c(l.Popup, {
					className: "user-menu__content",
					children: [/* @__PURE__ */ c("div", {
						className: "user-menu__header",
						children: [/* @__PURE__ */ s("span", {
							className: "user-menu__header-name",
							children: u
						}), /* @__PURE__ */ s("span", {
							className: "user-menu__header-email",
							children: m
						})]
					}), _.length > 0 && /* @__PURE__ */ c(o, { children: [/* @__PURE__ */ s(l.Separator, { className: "user-menu__separator" }), a({
						items: _,
						itemClass: p,
						separatorClass: "user-menu__separator",
						renderLink: b
					})] })]
				})
			})
		})]
	});
}
//#endregion
export { m as UserMenu };
