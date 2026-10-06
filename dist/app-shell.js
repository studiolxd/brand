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
function m({ banner: i, header: m, sidebar: h, children: g, contentFlush: _ = !1, defaultSidebar: v = "open", sidebarState: y, onSidebarChange: b, defaultSidebarWidth: x, onSidebarWidthChange: S, skipLabel: C, className: w }) {
	let T = e("appShell"), E = o(p), D = E ?? !0, [O, k] = u(v), [A, j] = u(!1), [M, N] = u(x), P = D ? y ?? O : A ? "open" : "closed", F = s((e) => {
		D ? (k(e), b?.(e)) : j(e === "open");
	}, [D, b]), I = s(() => F(P === "open" ? "closed" : "open"), [F, P]), L = s(() => F("closed"), [F]), R = s((e) => {
		N(e), S?.(e);
	}, [S]);
	c(() => {
		if (D || !A) return;
		let e = (e) => {
			e.key === "Escape" && j(!1);
		};
		document.addEventListener("keydown", e);
		let t = document.body.style.overflow;
		return document.body.style.overflow = "hidden", () => {
			document.removeEventListener("keydown", e), document.body.style.overflow = t;
		};
	}, [D, A]);
	let z = l(() => ({
		sidebar: P,
		setSidebar: F,
		sidebarWidth: M ?? 0,
		setSidebarWidth: R,
		toggleSidebar: I,
		closeSidebar: L,
		isDesktop: D
	}), [
		P,
		F,
		M,
		R,
		I,
		L,
		D
	]), [B, V] = u(0), H = s((e) => {
		if (!e) return;
		let t = () => V(e.getBoundingClientRect().height);
		if (t(), typeof ResizeObserver > "u") return;
		let n = new ResizeObserver(t);
		return n.observe(e), () => {
			n.disconnect(), V(0);
		};
	}, []), U = n({
		"--app-shell-sidebar-width": M ? `${M}px` : void 0,
		"--app-shell-banner-height": i ? `${B}px` : void 0
	}), W = !D && A;
	return /* @__PURE__ */ d(a.Provider, {
		value: z,
		children: /* @__PURE__ */ f(r, { children: [/* @__PURE__ */ d(t, {
			href: "#main-content",
			children: T("skipToContent", C)
		}), /* @__PURE__ */ f("div", {
			ref: U,
			className: ["app-shell", w].filter(Boolean).join(" "),
			"data-sidebar": P,
			"data-layout": E === null ? void 0 : D ? "column" : "drawer",
			children: [
				i && /* @__PURE__ */ d("div", {
					ref: H,
					className: "app-shell__banner",
					children: i
				}),
				m,
				/* @__PURE__ */ f("div", {
					className: "app-shell__body",
					children: [
						h,
						W && /* @__PURE__ */ d("div", {
							className: "app-shell__backdrop",
							onClick: L,
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ d("main", {
							id: "main-content",
							tabIndex: -1,
							className: _ ? "app-shell__content app-shell__content--flush" : "app-shell__content",
							inert: W || void 0,
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
