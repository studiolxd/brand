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
function m({ banner: i, header: f, sidebar: m, children: h, defaultSidebar: g = "open", sidebarState: _, onSidebarChange: v, defaultSidebarWidth: y, onSidebarWidthChange: b, skipLabel: x }) {
	let S = e("appShell"), C = p(), [w, T] = l(g), [E, D] = l(!1), [O, k] = l(y), A = C ? _ ?? w : E ? "open" : "closed", j = o((e) => {
		C ? (T(e), v?.(e)) : D(e === "open");
	}, [C, v]), M = o(() => j(A === "open" ? "closed" : "open"), [j, A]), N = o(() => j("closed"), [j]), P = o((e) => {
		k(e), b?.(e);
	}, [b]);
	s(() => {
		if (C || !E) return;
		let e = (e) => {
			e.key === "Escape" && D(!1);
		};
		document.addEventListener("keydown", e);
		let t = document.body.style.overflow;
		return document.body.style.overflow = "hidden", () => {
			document.removeEventListener("keydown", e), document.body.style.overflow = t;
		};
	}, [C, E]);
	let F = c(() => ({
		sidebar: A,
		setSidebar: j,
		sidebarWidth: O ?? 0,
		setSidebarWidth: P,
		toggleSidebar: M,
		closeSidebar: N,
		isDesktop: C
	}), [
		A,
		j,
		O,
		P,
		M,
		N,
		C
	]), [I, L] = l(0), R = o((e) => {
		if (!e) return;
		let t = () => L(e.getBoundingClientRect().height);
		if (t(), typeof ResizeObserver > "u") return;
		let n = new ResizeObserver(t);
		return n.observe(e), () => {
			n.disconnect(), L(0);
		};
	}, []), z = n({
		"--app-shell-sidebar-width": O ? `${O}px` : void 0,
		"--app-shell-banner-height": i ? `${I}px` : void 0
	}), B = !C && E;
	return /* @__PURE__ */ u(a.Provider, {
		value: F,
		children: /* @__PURE__ */ d(r, { children: [/* @__PURE__ */ u(t, {
			href: "#main-content",
			children: S("skipToContent", x)
		}), /* @__PURE__ */ d("div", {
			ref: z,
			className: "app-shell",
			"data-sidebar": A,
			children: [
				i && /* @__PURE__ */ u("div", {
					ref: R,
					className: "app-shell__banner",
					children: i
				}),
				f,
				/* @__PURE__ */ d("div", {
					className: "app-shell__body",
					children: [
						m,
						B && /* @__PURE__ */ u("div", {
							className: "app-shell__backdrop",
							onClick: N,
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ u("main", {
							id: "main-content",
							tabIndex: -1,
							className: "app-shell__content",
							inert: B || void 0,
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
