'use client';
import './app-header.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { MenuButton as t } from "./menu-button.js";
import { t as n } from "./_shared/appshellcontext.js";
import { useContext as r, useState as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/sections/AppHeader/AppHeader.tsx
function s({ children: e, ...t }) {
	return /* @__PURE__ */ a("a", {
		...t,
		children: e
	});
}
function c({ logo: c, logoHref: l = "/", logoLabel: u, renderLogoLink: d = s, start: f, notifications: p, end: m, menuLabel: h, menuCloseLabel: g, sidebarId: _ }) {
	let v = r(n), [y, b] = i(!1), x = v ? v.sidebar === "open" : y, S = v ? v.toggleSidebar : () => b((e) => !e), C = e("appHeader");
	return /* @__PURE__ */ o("header", {
		className: "app-header",
		children: [
			/* @__PURE__ */ a(t, {
				isOpen: x,
				onClick: S,
				label: h,
				closeLabel: g,
				"aria-controls": _,
				"aria-expanded": x
			}),
			c && d({
				href: l,
				className: "app-header__logo",
				"aria-label": C("logo", u),
				children: c
			}),
			/* @__PURE__ */ a("div", {
				className: "app-header__start",
				children: f
			}),
			p && /* @__PURE__ */ a("div", {
				className: "app-header__notifications",
				children: p
			}),
			m && /* @__PURE__ */ a("div", {
				className: "app-header__end",
				children: m
			})
		]
	});
}
//#endregion
export { c as AppHeader };
