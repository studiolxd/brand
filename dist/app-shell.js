'use client';
import './app-shell.css';
import { n as e, t } from "./_shared/SidebarContext.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { useEffect as i, useState as a } from "react";
//#region src/stories/sections/AppShell/AppShell.tsx
function o({ sidebar: e, children: o, defaultCollapsed: s }) {
	let [c, l] = a(s ?? !1);
	return i(() => {
		s === void 0 && l(window.innerWidth < 1024);
	}, [s]), /* @__PURE__ */ n(t.Provider, {
		value: {
			collapsed: c,
			setCollapsed: l
		},
		children: /* @__PURE__ */ r("div", {
			className: "app-shell",
			children: [e, /* @__PURE__ */ n("div", {
				className: "app-shell__content",
				children: o
			})]
		})
	});
}
//#endregion
export { o as AppShell, e as useSidebar };
