'use client';
import './app-header.css';
import { r as e } from "./_shared/brandmessagescontext.js";
import { t } from "./_shared/menubutton.js";
import { t as n } from "./_shared/default-render-link.js";
import { t as r } from "./_shared/appshellcontext.js";
import { useContext as i, useState as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/messages/es/appHeader.ts
var c = { logo: "Ir al inicio" };
//#endregion
//#region src/stories/sections/AppHeader/AppHeader.tsx
function l({ logo: l, logoHref: u = "/", logoLabel: d, renderLogoLink: f = n, start: p, notifications: m, end: h, menuLabel: g, menuCloseLabel: _, sidebarId: v, className: y }) {
	let b = i(r), [x, S] = a(!1), C = b ? b.sidebar === "open" : x, w = b ? b.toggleSidebar : () => S((e) => !e), T = e("appHeader", c);
	return /* @__PURE__ */ s("header", {
		className: ["app-header", y].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ o(t, {
				isOpen: C,
				onClick: w,
				label: g,
				closeLabel: _,
				"aria-controls": v,
				"aria-expanded": C
			}),
			l && f({
				href: u,
				className: "app-header__logo",
				"aria-label": T("logo", d),
				children: l
			}),
			/* @__PURE__ */ o("div", {
				className: "app-header__start",
				children: p
			}),
			m && /* @__PURE__ */ o("div", {
				className: "app-header__notifications",
				children: m
			}),
			h && /* @__PURE__ */ o("div", {
				className: "app-header__end",
				children: h
			})
		]
	});
}
//#endregion
export { l as AppHeader };
