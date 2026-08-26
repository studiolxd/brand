'use client';
import './app-shell.css';
import { TooltipProvider as e } from "./tooltip.js";
import { n as t, t as n } from "./_shared/AppShellContext.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { useCallback as a, useEffect as o, useMemo as s, useState as c } from "react";
//#region src/stories/sections/AppShell/AppShell.tsx
var l = "(min-width: 1024px)";
function u() {
	let [e, t] = c(() => typeof window > "u" ? !0 : window.matchMedia(l).matches);
	return o(() => {
		let e = window.matchMedia(l), n = () => t(e.matches);
		return n(), e.addEventListener("change", n), () => e.removeEventListener("change", n);
	}, []), e;
}
function d({ header: t, sidebar: l, children: d, defaultSidebar: f = "open", sidebarState: p, onSidebarChange: m, defaultSidebarWidth: h, onSidebarWidthChange: g }) {
	let _ = u(), [v, y] = c(f), [b, x] = c(!1), [S, C] = c(h), w = _ ? p ?? v : b ? "open" : "closed", T = a((e) => {
		_ ? (y(e), m?.(e)) : x(e === "open");
	}, [_, m]), E = a(() => T(w === "open" ? "closed" : "open"), [T, w]), D = a(() => T("closed"), [T]), O = a((e) => {
		C(e), g?.(e);
	}, [g]);
	o(() => {
		if (_ || !b) return;
		let e = (e) => {
			e.key === "Escape" && x(!1);
		};
		document.addEventListener("keydown", e);
		let t = document.body.style.overflow;
		return document.body.style.overflow = "hidden", () => {
			document.removeEventListener("keydown", e), document.body.style.overflow = t;
		};
	}, [_, b]);
	let k = s(() => ({
		sidebar: w,
		setSidebar: T,
		sidebarWidth: S ?? 0,
		setSidebarWidth: O,
		toggleSidebar: E,
		closeSidebar: D,
		isDesktop: _
	}), [
		w,
		T,
		S,
		O,
		E,
		D,
		_
	]), A = !_ && b;
	return /* @__PURE__ */ r(n.Provider, {
		value: k,
		children: /* @__PURE__ */ r(e, { children: /* @__PURE__ */ i("div", {
			className: "app-shell",
			"data-sidebar": w,
			style: S ? { "--app-shell-sidebar-width": `${S}px` } : void 0,
			children: [t, /* @__PURE__ */ i("div", {
				className: "app-shell__body",
				children: [
					l,
					A && /* @__PURE__ */ r("div", {
						className: "app-shell__backdrop",
						onClick: D,
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ r("main", {
						className: "app-shell__content",
						inert: A || void 0,
						children: d
					})
				]
			})]
		}) })
	});
}
//#endregion
export { d as AppShell, t as useAppShell };
