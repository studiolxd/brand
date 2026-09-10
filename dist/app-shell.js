'use client';
import './app-shell.css';
import { SkipLink as e } from "./skip-link.js";
import { TooltipProvider as t } from "./tooltip.js";
import { t as n } from "./_shared/css-properties.js";
import { n as r, t as i } from "./_shared/AppShellContext.js";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
import { useCallback as s, useEffect as c, useMemo as l, useState as u } from "react";
//#region src/stories/sections/AppShell/AppShell.tsx
var d = "(min-width: 1024px)";
function f() {
	let [e, t] = u(() => typeof window > "u" ? !0 : window.matchMedia(d).matches);
	return c(() => {
		let e = window.matchMedia(d), n = () => t(e.matches);
		return n(), e.addEventListener("change", n), () => e.removeEventListener("change", n);
	}, []), e;
}
function p({ header: r, sidebar: d, children: p, defaultSidebar: m = "open", sidebarState: h, onSidebarChange: g, defaultSidebarWidth: _, onSidebarWidthChange: v, skipLabel: y = "Saltar al contenido principal" }) {
	let b = f(), [x, S] = u(m), [C, w] = u(!1), [T, E] = u(_), D = b ? h ?? x : C ? "open" : "closed", O = s((e) => {
		b ? (S(e), g?.(e)) : w(e === "open");
	}, [b, g]), k = s(() => O(D === "open" ? "closed" : "open"), [O, D]), A = s(() => O("closed"), [O]), j = s((e) => {
		E(e), v?.(e);
	}, [v]);
	c(() => {
		if (b || !C) return;
		let e = (e) => {
			e.key === "Escape" && w(!1);
		};
		document.addEventListener("keydown", e);
		let t = document.body.style.overflow;
		return document.body.style.overflow = "hidden", () => {
			document.removeEventListener("keydown", e), document.body.style.overflow = t;
		};
	}, [b, C]);
	let M = l(() => ({
		sidebar: D,
		setSidebar: O,
		sidebarWidth: T ?? 0,
		setSidebarWidth: j,
		toggleSidebar: k,
		closeSidebar: A,
		isDesktop: b
	}), [
		D,
		O,
		T,
		j,
		k,
		A,
		b
	]), N = n({ "--app-shell-sidebar-width": T ? `${T}px` : void 0 }), P = !b && C;
	return /* @__PURE__ */ a(i.Provider, {
		value: M,
		children: /* @__PURE__ */ o(t, { children: [/* @__PURE__ */ a(e, {
			href: "#main-content",
			children: y
		}), /* @__PURE__ */ o("div", {
			ref: N,
			className: "app-shell",
			"data-sidebar": D,
			children: [r, /* @__PURE__ */ o("div", {
				className: "app-shell__body",
				children: [
					d,
					P && /* @__PURE__ */ a("div", {
						className: "app-shell__backdrop",
						onClick: A,
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ a("main", {
						id: "main-content",
						tabIndex: -1,
						className: "app-shell__content",
						inert: P || void 0,
						children: p
					})
				]
			})]
		})] })
	});
}
//#endregion
export { p as AppShell, r as useAppShell };
