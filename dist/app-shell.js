'use client';
import './app-shell.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { SkipLink as t } from "./skip-link.js";
import { t as n } from "./_shared/css-properties.js";
import { TooltipProvider as r } from "./tooltip.js";
import { n as i, t as a } from "./_shared/appshellcontext.js";
import { useCallback as o, useEffect as s, useMemo as c, useState as l } from "react";
import { jsx as u, jsxs as d } from "react/jsx-runtime";
//#region src/stories/sections/AppShell/AppShell.tsx
var f = "(min-width: 1024px)";
function p() {
	let [e, t] = l(() => typeof window > "u" || typeof window.matchMedia != "function" ? !0 : window.matchMedia(f).matches);
	return s(() => {
		if (typeof window.matchMedia != "function") return;
		let e = window.matchMedia(f), n = () => t(e.matches);
		return n(), e.addEventListener("change", n), () => e.removeEventListener("change", n);
	}, []), e;
}
function m({ banner: i, header: f, sidebar: m, children: h, contentFlush: g = !1, defaultSidebar: _ = "open", sidebarState: v, onSidebarChange: y, defaultSidebarWidth: b, onSidebarWidthChange: x, skipLabel: S }) {
	let C = e("appShell"), w = p(), [T, E] = l(_), [D, O] = l(!1), [k, A] = l(b), j = w ? v ?? T : D ? "open" : "closed", M = o((e) => {
		w ? (E(e), y?.(e)) : O(e === "open");
	}, [w, y]), N = o(() => M(j === "open" ? "closed" : "open"), [M, j]), P = o(() => M("closed"), [M]), F = o((e) => {
		A(e), x?.(e);
	}, [x]);
	s(() => {
		if (w || !D) return;
		let e = (e) => {
			e.key === "Escape" && O(!1);
		};
		document.addEventListener("keydown", e);
		let t = document.body.style.overflow;
		return document.body.style.overflow = "hidden", () => {
			document.removeEventListener("keydown", e), document.body.style.overflow = t;
		};
	}, [w, D]);
	let I = c(() => ({
		sidebar: j,
		setSidebar: M,
		sidebarWidth: k ?? 0,
		setSidebarWidth: F,
		toggleSidebar: N,
		closeSidebar: P,
		isDesktop: w
	}), [
		j,
		M,
		k,
		F,
		N,
		P,
		w
	]), [L, R] = l(0), z = o((e) => {
		if (!e) return;
		let t = () => R(e.getBoundingClientRect().height);
		if (t(), typeof ResizeObserver > "u") return;
		let n = new ResizeObserver(t);
		return n.observe(e), () => {
			n.disconnect(), R(0);
		};
	}, []), B = n({
		"--app-shell-sidebar-width": k ? `${k}px` : void 0,
		"--app-shell-banner-height": i ? `${L}px` : void 0
	}), V = !w && D;
	return /* @__PURE__ */ u(a.Provider, {
		value: I,
		children: /* @__PURE__ */ d(r, { children: [/* @__PURE__ */ u(t, {
			href: "#main-content",
			children: C("skipToContent", S)
		}), /* @__PURE__ */ d("div", {
			ref: B,
			className: "app-shell",
			"data-sidebar": j,
			children: [
				i && /* @__PURE__ */ u("div", {
					ref: z,
					className: "app-shell__banner",
					children: i
				}),
				f,
				/* @__PURE__ */ d("div", {
					className: "app-shell__body",
					children: [
						m,
						V && /* @__PURE__ */ u("div", {
							className: "app-shell__backdrop",
							onClick: P,
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ u("main", {
							id: "main-content",
							tabIndex: -1,
							className: g ? "app-shell__content app-shell__content--flush" : "app-shell__content",
							inert: V || void 0,
							children: h
						})
					]
				})
			]
		})] })
	});
}
//#endregion
export { m as AppShell, i as useAppShell };
