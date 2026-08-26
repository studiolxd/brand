'use client';
import './app-shell.css';
import { n as e } from "./_shared/Tooltip.js";
import { n as t, t as n } from "./_shared/AppShellContext.js";
import { useCallback as r, useEffect as i, useMemo as a, useState as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/stories/sections/AppShell/AppShell.tsx
var l = "(min-width: 1024px)";
function u() {
	let [e, t] = o(() => typeof window > "u" ? !0 : window.matchMedia(l).matches);
	return i(() => {
		let e = window.matchMedia(l), n = () => t(e.matches);
		return n(), e.addEventListener("change", n), () => e.removeEventListener("change", n);
	}, []), e;
}
function d({ header: t, sidebar: l, children: d, defaultSidebar: f = "open", sidebarState: p, onSidebarChange: m, defaultSidebarWidth: h, onSidebarWidthChange: g }) {
	let _ = u(), [v, y] = o(f), [b, x] = o(!1), [S, C] = o(h), w = _ ? p ?? v : b ? "open" : "closed", T = r((e) => {
		_ ? (y(e), m?.(e)) : x(e === "open");
	}, [_, m]), E = r(() => T(w === "open" ? "closed" : "open"), [T, w]), D = r(() => T("closed"), [T]), O = r((e) => {
		C(e), g?.(e);
	}, [g]);
	i(() => {
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
	let k = a(() => ({
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
	return /* @__PURE__ */ s(n.Provider, {
		value: k,
		children: /* @__PURE__ */ s(e, { children: /* @__PURE__ */ c("div", {
			className: "app-shell",
			"data-sidebar": w,
			style: S ? { "--app-shell-sidebar-width": `${S}px` } : void 0,
			children: [t, /* @__PURE__ */ c("div", {
				className: "app-shell__body",
				children: [
					l,
					A && /* @__PURE__ */ s("div", {
						className: "app-shell__backdrop",
						onClick: D,
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ s("main", {
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
