'use client';
import './user-menu.css';
import { Icon as e } from "./icon.js";
import { Avatar as t } from "./avatar.js";
import { t as n } from "./_shared/dropdownItems.js";
import { Fragment as r, jsx as i, jsxs as a } from "react/jsx-runtime";
import * as o from "@radix-ui/react-dropdown-menu";
//#region src/stories/molecules/UserMenu/UserMenu.tsx
function s({ href: e, children: t, className: n }) {
	return /* @__PURE__ */ i("a", {
		href: e,
		className: n,
		children: t
	});
}
function c(e) {
	return ["user-menu__item", e ? "user-menu__item--destructive" : ""].filter(Boolean).join(" ");
}
function l({ name: l, email: u, avatarUrl: d, items: f = [], renderLink: p = s, onOpenChange: m, defaultOpen: h }) {
	return /* @__PURE__ */ a(o.Root, {
		onOpenChange: m,
		defaultOpen: h,
		children: [/* @__PURE__ */ i(o.Trigger, {
			asChild: !0,
			children: /* @__PURE__ */ a("button", {
				type: "button",
				className: "user-menu__trigger",
				children: [
					/* @__PURE__ */ i(t, {
						src: d,
						name: l,
						alt: "",
						size: "sm",
						className: "user-menu__avatar"
					}),
					/* @__PURE__ */ i("span", {
						className: "user-menu__name",
						children: l
					}),
					/* @__PURE__ */ i(e, {
						name: "chevron",
						size: "sm",
						className: "user-menu__chevron"
					})
				]
			})
		}), /* @__PURE__ */ i(o.Portal, { children: /* @__PURE__ */ a(o.Content, {
			className: "user-menu__content",
			sideOffset: 4,
			align: "start",
			children: [/* @__PURE__ */ a("div", {
				className: "user-menu__header",
				children: [/* @__PURE__ */ i("span", {
					className: "user-menu__header-name",
					children: l
				}), /* @__PURE__ */ i("span", {
					className: "user-menu__header-email",
					children: u
				})]
			}), f.length > 0 && /* @__PURE__ */ a(r, { children: [/* @__PURE__ */ i(o.Separator, { className: "user-menu__separator" }), n({
				items: f,
				itemClass: c,
				separatorClass: "user-menu__separator",
				renderLink: p
			})] })]
		}) })]
	});
}
//#endregion
export { l as UserMenu };
