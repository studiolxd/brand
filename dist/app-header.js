'use client';
import './app-header.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { MenuButton as t } from "./menu-button.js";
import { t as n } from "./_shared/default-render-link.js";
import { t as r } from "./_shared/appshellcontext.js";
import { useContext as i, useState as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/sections/AppHeader/AppHeader.tsx
function c({ logo: c, logoHref: l = "/", logoLabel: u, renderLogoLink: d = n, start: f, notifications: p, end: m, menuLabel: h, menuCloseLabel: g, sidebarId: _, className: v }) {
	let y = i(r), [b, x] = a(!1), S = y ? y.sidebar === "open" : b, C = y ? y.toggleSidebar : () => x((e) => !e), w = e("appHeader");
	return /* @__PURE__ */ s("header", {
		className: ["app-header", v].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ o(t, {
				isOpen: S,
				onClick: C,
				label: h,
				closeLabel: g,
				"aria-controls": _,
				"aria-expanded": S
			}),
			c && d({
				href: l,
				className: "app-header__logo",
				"aria-label": w("logo", u),
				children: c
			}),
			/* @__PURE__ */ o("div", {
				className: "app-header__start",
				children: f
			}),
			p && /* @__PURE__ */ o("div", {
				className: "app-header__notifications",
				children: p
			}),
			m && /* @__PURE__ */ o("div", {
				className: "app-header__end",
				children: m
			})
		]
	});
}
//#endregion
export { c as AppHeader };
