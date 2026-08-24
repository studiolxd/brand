'use client';
import './app-shell.css';
"use client";
import { n as e, t } from "./_shared/AppShellContext.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { useEffect as i, useState as a } from "react";
//#region src/stories/sections/AppShell/AppShell.tsx
var o = "(min-width: 1024px)";
function s({ sidebar: e, header: s, children: c }) {
	let [l, u] = a(!1);
	return i(() => {
		let e = window.matchMedia(o), t = () => {
			e.matches && u(!1);
		};
		return e.addEventListener("change", t), () => e.removeEventListener("change", t);
	}, []), /* @__PURE__ */ n(t.Provider, {
		value: {
			menuOpen: l,
			setMenuOpen: u
		},
		children: /* @__PURE__ */ r("div", {
			className: "app-shell",
			"data-menu-open": l || void 0,
			children: [
				s,
				e,
				/* @__PURE__ */ n("div", {
					className: "app-shell__content",
					inert: l || void 0,
					children: c
				})
			]
		})
	});
}
//#endregion
export { s as AppShell, e as useAppShell };
