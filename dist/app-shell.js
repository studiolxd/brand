'use client';
import './app-shell.css';
import { n as e, t } from "./_shared/SidebarContext.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { useCallback as i, useEffect as a, useState as o, useSyncExternalStore as s } from "react";
//#region src/stories/sections/AppShell/AppShell.tsx
var c = "(max-width: 1023px)", l = "sidebar-collapsed";
function u(e) {
	let t = window.matchMedia(c);
	return t.addEventListener("change", e), () => t.removeEventListener("change", e);
}
var d = () => window.matchMedia(c).matches, f = () => !1, p = /* @__PURE__ */ new Set();
function m(e) {
	return p.add(e), window.addEventListener("storage", e), () => {
		p.delete(e), window.removeEventListener("storage", e);
	};
}
function h(e, t) {
	localStorage.setItem(e, t), p.forEach((e) => e());
}
var g = () => null;
function _({ sidebar: e, children: p, defaultCollapsed: _, storageKey: v = l }) {
	let y = s(u, d, f), b = s(m, () => localStorage.getItem(v), g), [x, S] = o(null), [C, w] = o(!1);
	a(() => {
		let e = requestAnimationFrame(() => w(!0)), t = u(() => S(null));
		return () => {
			cancelAnimationFrame(e), t();
		};
	}, []);
	let T = x ?? (y ? !0 : _ === void 0 ? b === "true" : _), E = i((e) => {
		S(e), window.matchMedia(c).matches || h(v, String(e));
	}, [v]);
	return /* @__PURE__ */ n(t.Provider, {
		value: {
			collapsed: T,
			setCollapsed: E
		},
		children: /* @__PURE__ */ r("div", {
			className: "app-shell",
			"data-mounted": C || void 0,
			children: [e, /* @__PURE__ */ n("div", {
				className: "app-shell__content",
				children: p
			})]
		})
	});
}
//#endregion
export { _ as AppShell, e as useSidebar };
