'use client';
import './app-shell.css';
import { SkipLink as e } from "./skip-link.js";
import { TooltipProvider as t } from "./tooltip.js";
import { n, t as r } from "./_shared/AppShellContext.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { useCallback as o, useEffect as s, useMemo as c, useState as l } from "react";
//#region src/stories/sections/AppShell/AppShell.tsx
var u = "(min-width: 1024px)";
function d() {
	let [e, t] = l(() => typeof window > "u" ? !0 : window.matchMedia(u).matches);
	return s(() => {
		let e = window.matchMedia(u), n = () => t(e.matches);
		return n(), e.addEventListener("change", n), () => e.removeEventListener("change", n);
	}, []), e;
}
function f({ header: n, sidebar: u, children: f, defaultSidebar: p = "open", sidebarState: m, onSidebarChange: h, defaultSidebarWidth: g, onSidebarWidthChange: _, skipLabel: v = "Saltar al contenido principal" }) {
	let y = d(), [b, x] = l(p), [S, C] = l(!1), [w, T] = l(g), E = y ? m ?? b : S ? "open" : "closed", D = o((e) => {
		y ? (x(e), h?.(e)) : C(e === "open");
	}, [y, h]), O = o(() => D(E === "open" ? "closed" : "open"), [D, E]), k = o(() => D("closed"), [D]), A = o((e) => {
		T(e), _?.(e);
	}, [_]);
	s(() => {
		if (y || !S) return;
		let e = (e) => {
			e.key === "Escape" && C(!1);
		};
		document.addEventListener("keydown", e);
		let t = document.body.style.overflow;
		return document.body.style.overflow = "hidden", () => {
			document.removeEventListener("keydown", e), document.body.style.overflow = t;
		};
	}, [y, S]);
	let j = c(() => ({
		sidebar: E,
		setSidebar: D,
		sidebarWidth: w ?? 0,
		setSidebarWidth: A,
		toggleSidebar: O,
		closeSidebar: k,
		isDesktop: y
	}), [
		E,
		D,
		w,
		A,
		O,
		k,
		y
	]), M = !y && S;
	return /* @__PURE__ */ i(r.Provider, {
		value: j,
		children: /* @__PURE__ */ a(t, { children: [/* @__PURE__ */ i(e, {
			href: "#main-content",
			children: v
		}), /* @__PURE__ */ a("div", {
			className: "app-shell",
			"data-sidebar": E,
			style: w ? { "--app-shell-sidebar-width": `${w}px` } : void 0,
			children: [n, /* @__PURE__ */ a("div", {
				className: "app-shell__body",
				children: [
					u,
					M && /* @__PURE__ */ i("div", {
						className: "app-shell__backdrop",
						onClick: k,
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ i("main", {
						id: "main-content",
						tabIndex: -1,
						className: "app-shell__content",
						inert: M || void 0,
						children: f
					})
				]
			})]
		})] })
	});
}
//#endregion
export { f as AppShell, n as useAppShell };
