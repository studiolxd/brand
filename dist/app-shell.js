'use client';
import './app-shell.css';
import { n as e, t } from "./_shared/SidebarContext.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { useState as i } from "react";
//#region src/stories/sections/AppShell/AppShell.tsx
function a(e) {
	return e === void 0 ? typeof window > "u" ? !1 : window.matchMedia("(min-width: 1024px)").matches : e;
}
function o({ sidebar: e, children: o, defaultOpen: s }) {
	let [c, l] = i(() => a(s));
	return /* @__PURE__ */ n(t.Provider, {
		value: {
			open: c,
			setOpen: l
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
