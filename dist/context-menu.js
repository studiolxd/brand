'use client';
import './context-menu.css';
import { DotsButton as e } from "./dots-button.js";
import { t } from "./_shared/dropdownItems.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import * as i from "@radix-ui/react-dropdown-menu";
//#region src/stories/molecules/ContextMenu/ContextMenu.tsx
function a({ href: e, children: t, className: r }) {
	return /* @__PURE__ */ n("a", {
		href: e,
		className: r,
		children: t
	});
}
function o(e) {
	return ["context-menu__item", e ? "context-menu__item--destructive" : ""].filter(Boolean).join(" ");
}
function s({ items: s, renderLink: c = a, onOpenChange: l, side: u = "bottom", align: d = "end", minWidth: f = "10rem", maxWidth: p, triggerSize: m = "md", triggerOrientation: h = "horizontal", triggerAriaLabel: g = "Más opciones" }) {
	return /* @__PURE__ */ r(i.Root, {
		onOpenChange: l,
		children: [/* @__PURE__ */ n(i.Trigger, {
			asChild: !0,
			children: /* @__PURE__ */ n(e, {
				size: m,
				orientation: h,
				"aria-label": g
			})
		}), /* @__PURE__ */ n(i.Portal, { children: /* @__PURE__ */ n(i.Content, {
			className: "context-menu__content",
			side: u,
			align: d,
			sideOffset: 4,
			style: {
				minWidth: f,
				...p ? { maxWidth: p } : {}
			},
			children: t({
				items: s,
				itemClass: o,
				separatorClass: "context-menu__separator",
				renderLink: c
			})
		}) })]
	});
}
//#endregion
export { s as ContextMenu };
