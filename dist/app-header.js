'use client';
import './app-header.css';
import { MenuButton as e } from "./menu-button.js";
import { t } from "./_shared/AppShellContext.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { useContext as i, useState as a } from "react";
//#region src/stories/sections/AppHeader/AppHeader.tsx
function o({ start: o, notifications: s, end: c, menuLabel: l = "Menú de navegación", menuCloseLabel: u, sidebarId: d }) {
	let f = i(t), [p, m] = a(!1), h = f ? f.sidebar === "open" : p;
	return /* @__PURE__ */ r("header", {
		className: "app-header",
		children: [
			/* @__PURE__ */ n(e, {
				isOpen: h,
				onClick: f ? f.toggleSidebar : () => m((e) => !e),
				label: l,
				closeLabel: u,
				"aria-controls": d,
				"aria-expanded": h
			}),
			/* @__PURE__ */ n("div", {
				className: "app-header__start",
				children: o
			}),
			s && /* @__PURE__ */ n("div", {
				className: "app-header__notifications",
				children: s
			}),
			c && /* @__PURE__ */ n("div", {
				className: "app-header__end",
				children: c
			})
		]
	});
}
//#endregion
export { o as AppHeader };
