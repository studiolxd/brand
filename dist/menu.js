'use client';
import './menu.css';
import { t as e } from "./_shared/dropdownItems.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import * as r from "@radix-ui/react-dropdown-menu";
//#region src/stories/molecules/Menu/Menu.tsx
function i({ href: e, children: n, className: r }) {
	return /* @__PURE__ */ t("a", {
		href: e,
		className: r,
		children: n
	});
}
function a(e) {
	return ["menu__item", e ? "menu__item--destructive" : ""].filter(Boolean).join(" ");
}
function o({ trigger: o, items: s, value: c, onValueChange: l, renderLink: u = i, open: d, defaultOpen: f, onOpenChange: p, side: m = "bottom", align: h = "start", sideOffset: g = 4, minWidth: _ = "10rem", maxWidth: v, className: y }) {
	return /* @__PURE__ */ n(r.Root, {
		open: d,
		defaultOpen: f,
		onOpenChange: p,
		children: [/* @__PURE__ */ t(r.Trigger, {
			asChild: !0,
			children: o
		}), /* @__PURE__ */ t(r.Portal, { children: /* @__PURE__ */ t(r.Content, {
			className: ["menu__content", y].filter(Boolean).join(" "),
			side: m,
			align: h,
			sideOffset: g,
			style: {
				minWidth: _,
				...v ? { maxWidth: v } : {}
			},
			children: e({
				items: s,
				itemClass: a,
				separatorClass: "menu__separator",
				labelClass: "menu__label",
				radioIndicatorClass: "menu__radio-indicator",
				radioValue: c,
				onRadioValueChange: l,
				renderLink: u
			})
		}) })]
	});
}
//#endregion
export { o as Menu };
