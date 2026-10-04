'use client';
import './app-shell.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { SkipLink as t } from "./skip-link.js";
import { t as n } from "./_shared/css-properties.js";
import { TooltipProvider as r } from "./tooltip.js";
import { n as i, t as a } from "./_shared/appshellcontext.js";
import { t as o } from "./_shared/media-query.js";
import { useCallback as s, useEffect as c, useMemo as l, useState as u } from "react";
import { jsx as d, jsxs as f } from "react/jsx-runtime";
//#region src/stories/sections/AppShell/AppShell.tsx
var p = "(min-width: 1024px)";
function m({ banner: i, header: m, sidebar: h, children: g, contentFlush: _ = !1, defaultSidebar: v = "open", sidebarState: y, onSidebarChange: b, defaultSidebarWidth: x, onSidebarWidthChange: S, skipLabel: C }) {
	let w = e("appShell"), T = o(p), E = T ?? !0, [D, O] = u(v), [k, A] = u(!1), [j, M] = u(x), N = E ? y ?? D : k ? "open" : "closed", P = s((e) => {
		E ? (O(e), b?.(e)) : A(e === "open");
	}, [E, b]), F = s(() => P(N === "open" ? "closed" : "open"), [P, N]), I = s(() => P("closed"), [P]), L = s((e) => {
		M(e), S?.(e);
	}, [S]);
	c(() => {
		if (E || !k) return;
		let e = (e) => {
			e.key === "Escape" && A(!1);
		};
		document.addEventListener("keydown", e);
		let t = document.body.style.overflow;
		return document.body.style.overflow = "hidden", () => {
			document.removeEventListener("keydown", e), document.body.style.overflow = t;
		};
	}, [E, k]);
	let R = l(() => ({
		sidebar: N,
		setSidebar: P,
		sidebarWidth: j ?? 0,
		setSidebarWidth: L,
		toggleSidebar: F,
		closeSidebar: I,
		isDesktop: E
	}), [
		N,
		P,
		j,
		L,
		F,
		I,
		E
	]), [z, B] = u(0), V = s((e) => {
		if (!e) return;
		let t = () => B(e.getBoundingClientRect().height);
		if (t(), typeof ResizeObserver > "u") return;
		let n = new ResizeObserver(t);
		return n.observe(e), () => {
			n.disconnect(), B(0);
		};
	}, []), H = n({
		"--app-shell-sidebar-width": j ? `${j}px` : void 0,
		"--app-shell-banner-height": i ? `${z}px` : void 0
	}), U = !E && k;
	return /* @__PURE__ */ d(a.Provider, {
		value: R,
		children: /* @__PURE__ */ f(r, { children: [/* @__PURE__ */ d(t, {
			href: "#main-content",
			children: w("skipToContent", C)
		}), /* @__PURE__ */ f("div", {
			ref: H,
			className: "app-shell",
			"data-sidebar": N,
			"data-layout": T === null ? void 0 : E ? "column" : "drawer",
			children: [
				i && /* @__PURE__ */ d("div", {
					ref: V,
					className: "app-shell__banner",
					children: i
				}),
				m,
				/* @__PURE__ */ f("div", {
					className: "app-shell__body",
					children: [
						h,
						U && /* @__PURE__ */ d("div", {
							className: "app-shell__backdrop",
							onClick: I,
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ d("main", {
							id: "main-content",
							tabIndex: -1,
							className: _ ? "app-shell__content app-shell__content--flush" : "app-shell__content",
							inert: U || void 0,
							children: g
						})
					]
				})
			]
		})] })
	});
}
//#endregion
export { m as AppShell, i as useAppShell };
