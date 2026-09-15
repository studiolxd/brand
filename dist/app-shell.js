'use client';
import './app-shell.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { SkipLink as t } from "./skip-link.js";
import { TooltipProvider as n } from "./tooltip.js";
import { t as r } from "./_shared/css-properties.js";
import { n as i, t as a } from "./_shared/appshellcontext.js";
import { useCallback as o, useEffect as s, useMemo as c, useState as l } from "react";
import { jsx as u, jsxs as d } from "react/jsx-runtime";
//#region src/stories/sections/AppShell/AppShell.tsx
var f = "(min-width: 1024px)";
function p() {
	let [e, t] = l(() => typeof window > "u" ? !0 : window.matchMedia(f).matches);
	return s(() => {
		let e = window.matchMedia(f), n = () => t(e.matches);
		return n(), e.addEventListener("change", n), () => e.removeEventListener("change", n);
	}, []), e;
}
function m({ header: i, sidebar: f, children: m, defaultSidebar: h = "open", sidebarState: g, onSidebarChange: _, defaultSidebarWidth: v, onSidebarWidthChange: y, skipLabel: b }) {
	let x = e("appShell"), S = p(), [C, w] = l(h), [T, E] = l(!1), [D, O] = l(v), k = S ? g ?? C : T ? "open" : "closed", A = o((e) => {
		S ? (w(e), _?.(e)) : E(e === "open");
	}, [S, _]), j = o(() => A(k === "open" ? "closed" : "open"), [A, k]), M = o(() => A("closed"), [A]), N = o((e) => {
		O(e), y?.(e);
	}, [y]);
	s(() => {
		if (S || !T) return;
		let e = (e) => {
			e.key === "Escape" && E(!1);
		};
		document.addEventListener("keydown", e);
		let t = document.body.style.overflow;
		return document.body.style.overflow = "hidden", () => {
			document.removeEventListener("keydown", e), document.body.style.overflow = t;
		};
	}, [S, T]);
	let P = c(() => ({
		sidebar: k,
		setSidebar: A,
		sidebarWidth: D ?? 0,
		setSidebarWidth: N,
		toggleSidebar: j,
		closeSidebar: M,
		isDesktop: S
	}), [
		k,
		A,
		D,
		N,
		j,
		M,
		S
	]), F = r({ "--app-shell-sidebar-width": D ? `${D}px` : void 0 }), I = !S && T;
	return /* @__PURE__ */ u(a.Provider, {
		value: P,
		children: /* @__PURE__ */ d(n, { children: [/* @__PURE__ */ u(t, {
			href: "#main-content",
			children: x("skipToContent", b)
		}), /* @__PURE__ */ d("div", {
			ref: F,
			className: "app-shell",
			"data-sidebar": k,
			children: [i, /* @__PURE__ */ d("div", {
				className: "app-shell__body",
				children: [
					f,
					I && /* @__PURE__ */ u("div", {
						className: "app-shell__backdrop",
						onClick: M,
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ u("main", {
						id: "main-content",
						tabIndex: -1,
						className: "app-shell__content",
						inert: I || void 0,
						children: m
					})
				]
			})]
		})] })
	});
}
//#endregion
export { m as AppShell, i as useAppShell };
