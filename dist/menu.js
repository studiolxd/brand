'use client';
import './menu.css';
import { n as e, t } from "./_shared/dropdownItems.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { Menu as i } from "@base-ui/react/menu";
//#region src/stories/molecules/Menu/Menu.tsx
function a(e) {
	return ["menu__item", e ? "menu__item--destructive" : ""].filter(Boolean).join(" ");
}
function o({ trigger: o, items: s, value: c, onValueChange: l, renderLink: u = t, open: d, defaultOpen: f, onOpenChange: p, openOnHover: m = !1, hoverDelay: h = 150, side: g = "bottom", align: _ = "start", sideOffset: v = 4, minWidth: y = "10rem", maxWidth: b, size: x = "md", className: S }) {
	let C = o, w = typeof C.props?.id == "string" ? C.props.id : void 0;
	return /* @__PURE__ */ r(i.Root, {
		open: d,
		defaultOpen: f,
		onOpenChange: (e) => p?.(e),
		children: [/* @__PURE__ */ n(i.Trigger, {
			id: w,
			render: C,
			openOnHover: m,
			delay: h
		}), /* @__PURE__ */ n(i.Portal, { children: /* @__PURE__ */ n(i.Positioner, {
			className: "menu__positioner",
			side: g,
			align: _,
			sideOffset: v,
			children: /* @__PURE__ */ n(i.Popup, {
				className: [
					"menu__content",
					x === "md" ? "" : `menu__content--${x}`,
					S
				].filter(Boolean).join(" "),
				style: {
					minWidth: y,
					...b ? { maxWidth: b } : {}
				},
				children: e({
					items: s,
					itemClass: a,
					separatorClass: "menu__separator",
					labelClass: "menu__label",
					radioValue: c,
					onRadioValueChange: l,
					renderLink: u
				})
			})
		}) })]
	});
}
//#endregion
export { o as Menu };
