'use client';
import './app-shell.css';
import { n as e, t } from "./_shared/SidebarContext.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { useState as i } from "react";
//#region src/stories/sections/AppShell/AppShell.tsx
function a({ sidebar: e, children: a, defaultCollapsed: o = !1 }) {
	let [s, c] = i(o);
	return /* @__PURE__ */ n(t.Provider, {
		value: {
			collapsed: s,
			setCollapsed: c
		},
		children: /* @__PURE__ */ r("div", {
			className: "app-shell",
			children: [e, /* @__PURE__ */ n("div", {
				className: "app-shell__content",
				children: a
			})]
		})
	});
}
//#endregion
export { a as AppShell, e as useSidebar };
