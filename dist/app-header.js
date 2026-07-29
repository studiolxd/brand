'use client';
import './app-header.css';
import { Hamburger as e } from "./hamburger.js";
import { t } from "./_shared/AppShellContext.js";
import { Fragment as n, jsx as r, jsxs as i } from "react/jsx-runtime";
import { useContext as a, useEffect as o, useRef as s, useState as c } from "react";
//#region src/stories/sections/AppHeader/AppHeader.tsx
function l({ center: l, end: u, children: d, menuLabel: f = "Menú de navegación", panelId: p = "app-header-panel" }) {
	let m = a(t), [h, g] = c(!1), _ = m ? m.menuOpen : h, v = m ? m.setMenuOpen : g, y = s(null);
	return o(() => {
		if (!_) return;
		let e = (e) => {
			e.key === "Escape" && (v(!1), y.current?.focus());
		};
		return document.addEventListener("keydown", e), () => document.removeEventListener("keydown", e);
	}, [_, v]), /* @__PURE__ */ i(n, { children: [/* @__PURE__ */ i("header", {
		className: "app-header",
		children: [
			/* @__PURE__ */ r(e, {
				ref: y,
				isOpen: _,
				onClick: () => v(!_),
				label: f,
				"aria-controls": p
			}),
			/* @__PURE__ */ r("div", {
				className: "app-header__center",
				children: l
			}),
			/* @__PURE__ */ r("div", {
				className: "app-header__end",
				children: u
			})
		]
	}), /* @__PURE__ */ r("div", {
		className: "app-header__panel",
		id: p,
		hidden: !_,
		children: d
	})] });
}
//#endregion
export { l as AppHeader };
