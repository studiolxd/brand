'use client';
import './menu.css';
import { a as e, i as t, n, o as r, r as i, s as a, t as o } from "./_shared/dropdownItems.js";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/stories/molecules/Menu/Menu.tsx
function l(e) {
	return ["menu__item", e ? "menu__item--destructive" : ""].filter(Boolean).join(" ");
}
function u({ trigger: u, items: d, value: f, onValueChange: p, renderLink: m = o, open: h, defaultOpen: g, onOpenChange: _, openOnHover: v = !1, hoverDelay: y = 150, side: b = "bottom", align: x = "start", sideOffset: S = 4, minWidth: C = "10rem", maxWidth: w, className: T }) {
	return /* @__PURE__ */ c(t, {
		open: h,
		defaultOpen: g,
		onOpenChange: (e) => _?.(e),
		children: [/* @__PURE__ */ s(i, {
			render: u,
			openOnHover: v,
			delay: y
		}), /* @__PURE__ */ s(r, { children: /* @__PURE__ */ s(e, {
			className: "menu__positioner",
			side: b,
			align: x,
			sideOffset: S,
			children: /* @__PURE__ */ s(a, {
				className: ["menu__content", T].filter(Boolean).join(" "),
				style: {
					minWidth: C,
					...w ? { maxWidth: w } : {}
				},
				children: n({
					items: d,
					itemClass: l,
					separatorClass: "menu__separator",
					labelClass: "menu__label",
					radioValue: f,
					onRadioValueChange: p,
					renderLink: m
				})
			})
		}) })]
	});
}
//#endregion
export { u as Menu };
