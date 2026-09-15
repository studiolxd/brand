'use client';
import './app-shell.css';
import { SkipLink as e } from "./skip-link.js";
import { TooltipProvider as t } from "./tooltip.js";
import { t as n } from "./_shared/css-properties.js";
import { n as r, t as i } from "./_shared/appshellcontext.js";
import { useCallback as a, useEffect as o, useMemo as s, useState as c } from "react";
import { jsx as l, jsxs as u } from "react/jsx-runtime";
//#region src/stories/sections/AppShell/AppShell.tsx
var d = "(min-width: 1024px)";
function f() {
	let [e, t] = c(() => typeof window > "u" ? !0 : window.matchMedia(d).matches);
	return o(() => {
		let e = window.matchMedia(d), n = () => t(e.matches);
		return n(), e.addEventListener("change", n), () => e.removeEventListener("change", n);
	}, []), e;
}
function p({ header: r, sidebar: d, children: p, defaultSidebar: m = "open", sidebarState: h, onSidebarChange: g, defaultSidebarWidth: _, onSidebarWidthChange: v, skipLabel: y = "Saltar al contenido principal" }) {
	let b = f(), [x, S] = c(m), [C, w] = c(!1), [T, E] = c(_), D = b ? h ?? x : C ? "open" : "closed", O = a((e) => {
		b ? (S(e), g?.(e)) : w(e === "open");
	}, [b, g]), k = a(() => O(D === "open" ? "closed" : "open"), [O, D]), A = a(() => O("closed"), [O]), j = a((e) => {
		E(e), v?.(e);
	}, [v]);
	o(() => {
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
	let M = s(() => ({
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
	return /* @__PURE__ */ l(i.Provider, {
		value: M,
		children: /* @__PURE__ */ u(t, { children: [/* @__PURE__ */ l(e, {
			href: "#main-content",
			children: y
		}), /* @__PURE__ */ u("div", {
			ref: N,
			className: "app-shell",
			"data-sidebar": D,
			children: [r, /* @__PURE__ */ u("div", {
				className: "app-shell__body",
				children: [
					d,
					P && /* @__PURE__ */ l("div", {
						className: "app-shell__backdrop",
						onClick: A,
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ l("main", {
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
