'use client';
import './context-menu.css';
import { DotsButton as e } from "./dots-button.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import * as r from "@radix-ui/react-dropdown-menu";
//#region src/stories/molecules/ContextMenu/ContextMenu.tsx
function i({ href: e, children: n, className: r }) {
	return /* @__PURE__ */ t("a", {
		href: e,
		className: r,
		children: n
	});
}
function a(e) {
	return ["context-menu__item", e ? "context-menu__item--destructive" : ""].filter(Boolean).join(" ");
}
function o({ items: o, renderLink: s = i, onOpenChange: c, side: l = "bottom", align: u = "end", minWidth: d = "10rem", maxWidth: f, triggerSize: p = "md", triggerOrientation: m = "horizontal", triggerAriaLabel: h = "Más opciones" }) {
	return /* @__PURE__ */ n(r.Root, {
		onOpenChange: c,
		children: [/* @__PURE__ */ t(r.Trigger, {
			asChild: !0,
			children: /* @__PURE__ */ t(e, {
				size: p,
				orientation: m,
				"aria-label": h
			})
		}), /* @__PURE__ */ t(r.Portal, { children: /* @__PURE__ */ t(r.Content, {
			className: "context-menu__content",
			side: l,
			align: u,
			sideOffset: 4,
			style: {
				minWidth: d,
				...f ? { maxWidth: f } : {}
			},
			children: o.map((e, n) => e.type === "separator" ? /* @__PURE__ */ t(r.Separator, { className: "context-menu__separator" }, n) : e.type === "link" ? e.disabled ? /* @__PURE__ */ t(r.Item, {
				className: a(e.destructive),
				disabled: !0,
				children: e.label
			}, n) : /* @__PURE__ */ t(r.Item, {
				asChild: !0,
				children: s({
					href: e.href,
					children: e.label,
					className: a(e.destructive)
				})
			}, n) : /* @__PURE__ */ t(r.Item, {
				className: a(e.destructive),
				disabled: e.disabled,
				onSelect: e.disabled ? void 0 : e.onClick,
				children: e.label
			}, n))
		}) })]
	});
}
//#endregion
export { o as ContextMenu };
