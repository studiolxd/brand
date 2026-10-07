'use client';
import './app-shell.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { SkipLink as t } from "./skip-link.js";
import { t as n } from "./_shared/css-properties.js";
import { TooltipProvider as r } from "./tooltip.js";
import { t as i } from "./_shared/media-query.js";
import { n as a, t as o } from "./_shared/appshellcontext.js";
import { useCallback as s, useEffect as c, useMemo as l, useState as u } from "react";
import { jsx as d, jsxs as f } from "react/jsx-runtime";
//#region src/stories/messages/es/appShell.ts
var p = { skipToContent: "Saltar al contenido principal" }, m = "(min-width: 1024px)";
function h({ banner: a, header: h, sidebar: g, children: _, contentFlush: v = !1, defaultSidebar: y = "open", sidebarState: b, onSidebarChange: x, defaultSidebarWidth: S, onSidebarWidthChange: C, skipLabel: w, className: T }) {
	let E = e("appShell", p), D = i(m), O = D ?? !0, [k, A] = u(y), [j, M] = u(!1), [N, P] = u(S), F = O ? b ?? k : j ? "open" : "closed", I = s((e) => {
		O ? (A(e), x?.(e)) : M(e === "open");
	}, [O, x]), L = s(() => I(F === "open" ? "closed" : "open"), [I, F]), R = s(() => I("closed"), [I]), z = s((e) => {
		P(e), C?.(e);
	}, [C]);
	c(() => {
		if (O || !j) return;
		let e = (e) => {
			e.key === "Escape" && M(!1);
		};
		document.addEventListener("keydown", e);
		let t = document.body.style.overflow;
		return document.body.style.overflow = "hidden", () => {
			document.removeEventListener("keydown", e), document.body.style.overflow = t;
		};
	}, [O, j]);
	let B = l(() => ({
		sidebar: F,
		setSidebar: I,
		sidebarWidth: N ?? 0,
		setSidebarWidth: z,
		toggleSidebar: L,
		closeSidebar: R,
		isDesktop: O
	}), [
		F,
		I,
		N,
		z,
		L,
		R,
		O
	]), [V, H] = u(0), U = s((e) => {
		if (!e) return;
		let t = () => H(e.getBoundingClientRect().height);
		if (t(), typeof ResizeObserver > "u") return;
		let n = new ResizeObserver(t);
		return n.observe(e), () => {
			n.disconnect(), H(0);
		};
	}, []), W = n({
		"--app-shell-sidebar-width": N ? `${N}px` : void 0,
		"--app-shell-banner-height": a ? `${V}px` : void 0
	}), G = !O && j;
	return /* @__PURE__ */ d(o.Provider, {
		value: B,
		children: /* @__PURE__ */ f(r, { children: [/* @__PURE__ */ d(t, {
			href: "#main-content",
			children: E("skipToContent", w)
		}), /* @__PURE__ */ f("div", {
			ref: W,
			className: ["app-shell", T].filter(Boolean).join(" "),
			"data-sidebar": F,
			"data-layout": D === null ? void 0 : O ? "column" : "drawer",
			children: [
				a && /* @__PURE__ */ d("div", {
					ref: U,
					className: "app-shell__banner",
					children: a
				}),
				h,
				/* @__PURE__ */ f("div", {
					className: "app-shell__body",
					children: [
						g,
						G && /* @__PURE__ */ d("div", {
							className: "app-shell__backdrop",
							onClick: R,
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ d("main", {
							id: "main-content",
							tabIndex: -1,
							className: v ? "app-shell__content app-shell__content--flush" : "app-shell__content",
							inert: G || void 0,
							children: _
						})
					]
				})
			]
		})] })
	});
}
//#endregion
export { h as AppShell, a as useAppShell };
