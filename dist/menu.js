'use client';
import './menu.css';
import { t as e } from "./_shared/css-properties.js";
import { n as t, t as n } from "./_shared/dropdownItems.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { Menu as a } from "@base-ui/react/menu";
//#region src/stories/molecules/Menu/Menu.tsx
function o(e) {
	return ["menu__item", e ? "menu__item--destructive" : ""].filter(Boolean).join(" ");
}
function s({ trigger: s, items: c, value: l, onValueChange: u, renderLink: d = n, open: f, defaultOpen: p, onOpenChange: m, openOnHover: h = !1, hoverDelay: g = 150, side: _ = "bottom", align: v = "start", sideOffset: y = 4, minWidth: b = "10rem", maxWidth: x, size: S = "md", className: C }) {
	let w = s, T = typeof w.props?.id == "string" ? w.props.id : void 0, E = e({
		"min-width": b,
		"max-width": x
	});
	return /* @__PURE__ */ i(a.Root, {
		open: f,
		defaultOpen: p,
		onOpenChange: (e) => m?.(e),
		children: [/* @__PURE__ */ r(a.Trigger, {
			id: T,
			render: w,
			openOnHover: h,
			delay: g
		}), /* @__PURE__ */ r(a.Portal, { children: /* @__PURE__ */ r(a.Positioner, {
			className: "menu__positioner",
			side: _,
			align: v,
			sideOffset: y,
			children: /* @__PURE__ */ r(a.Popup, {
				ref: E,
				className: [
					"menu__content",
					S === "md" ? "" : `menu__content--${S}`,
					C
				].filter(Boolean).join(" "),
				children: t({
					items: c,
					itemClass: o,
					separatorClass: "menu__separator",
					labelClass: "menu__label",
					radioValue: l,
					onRadioValueChange: u,
					renderLink: d
				})
			})
		}) })]
	});
}
//#endregion
export { s as Menu };
