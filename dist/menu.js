'use client';
import './menu.css';
import { n as e } from "./_shared/portal-container.js";
import { t } from "./_shared/css-properties.js";
import { n, t as r } from "./_shared/dropdownitems.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { Menu as o } from "@base-ui/react/menu";
//#region src/stories/molecules/Menu/Menu.tsx
function s(e) {
	return ["menu__item", e ? "menu__item--destructive" : ""].filter(Boolean).join(" ");
}
function c({ trigger: c, items: l, value: u, onValueChange: d, renderLink: f = r, open: p, defaultOpen: m, onOpenChange: h, openOnHover: g = !1, hoverDelay: _ = 150, side: v = "bottom", align: y = "start", sideOffset: b = 4, minWidth: x = "10rem", maxWidth: S, size: C = "md", container: w, className: T }) {
	let E = e(w), D = c, O = typeof D.props?.id == "string" ? D.props.id : void 0, k = t({
		"min-width": x,
		"max-width": S
	});
	return /* @__PURE__ */ a(o.Root, {
		open: p,
		defaultOpen: m,
		onOpenChange: (e) => h?.(e),
		children: [/* @__PURE__ */ i(o.Trigger, {
			id: O,
			render: D,
			openOnHover: g,
			delay: _
		}), /* @__PURE__ */ i(o.Portal, {
			container: E,
			children: /* @__PURE__ */ i(o.Positioner, {
				className: "menu__positioner",
				side: v,
				align: y,
				sideOffset: b,
				children: /* @__PURE__ */ i(o.Popup, {
					ref: k,
					className: [
						"menu__content",
						C === "md" ? "" : `menu__content--${C}`,
						T
					].filter(Boolean).join(" "),
					children: n({
						items: l,
						itemClass: s,
						separatorClass: "menu__separator",
						labelClass: "menu__label",
						blockClass: "menu",
						radioValue: u,
						onRadioValueChange: d,
						renderLink: f
					})
				})
			})
		})]
	});
}
//#endregion
export { c as Menu };
