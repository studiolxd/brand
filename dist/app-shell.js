'use client';
import './app-shell.css';
import { n as e, t } from "./_shared/SidebarContext.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { useCallback as i, useEffect as a, useState as o } from "react";
//#region src/stories/sections/AppShell/AppShell.tsx
var s = "(max-width: 1023px)", c = "sidebar-collapsed";
function l({ sidebar: e, children: l, defaultCollapsed: u, storageKey: d = c }) {
	let [f, p] = o(u ?? !1), [m, h] = o(!1);
	a(() => {
		window.matchMedia(s).matches ? p(!0) : p(u === void 0 ? localStorage.getItem(d) === "true" : u), h(!0);
		let e = window.matchMedia(s), t = (e) => {
			e.matches ? p(!0) : p(localStorage.getItem(d) === "true");
		};
		return e.addEventListener("change", t), () => e.removeEventListener("change", t);
	}, []);
	let g = i((e) => {
		p(e), window.matchMedia(s).matches || localStorage.setItem(d, String(e));
	}, [d]);
	return /* @__PURE__ */ n(t.Provider, {
		value: {
			collapsed: f,
			setCollapsed: g
		},
		children: /* @__PURE__ */ r("div", {
			className: "app-shell",
			"data-mounted": m || void 0,
			children: [e, /* @__PURE__ */ n("div", {
				className: "app-shell__content",
				children: l
			})]
		})
	});
}
//#endregion
export { l as AppShell, e as useSidebar };
