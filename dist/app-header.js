'use client';
import './app-header.css';
import { MenuButton as e } from "./menu-button.js";
import { t } from "./_shared/AppShellContext.js";
import { useContext as n, useState as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/stories/sections/AppHeader/AppHeader.tsx
function o({ start: o, notifications: s, end: c, menuLabel: l = "Menú de navegación", sidebarId: u }) {
	let d = n(t), [f, p] = r(!1), m = d ? d.sidebar === "open" : f;
	return /* @__PURE__ */ a("header", {
		className: "app-header",
		children: [
			/* @__PURE__ */ i(e, {
				isOpen: m,
				onClick: d ? d.toggleSidebar : () => p((e) => !e),
				label: l,
				"aria-controls": u,
				"aria-expanded": m
			}),
			/* @__PURE__ */ i("div", {
				className: "app-header__start",
				children: o
			}),
			s && /* @__PURE__ */ i("div", {
				className: "app-header__notifications",
				children: s
			}),
			c && /* @__PURE__ */ i("div", {
				className: "app-header__end",
				children: c
			})
		]
	});
}
//#endregion
export { o as AppHeader };
