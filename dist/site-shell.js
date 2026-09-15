'use client';
import './site-shell.css';
import { t as e } from "./_shared/portal-container.js";
import { forwardRef as t, useCallback as n, useState as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/stories/sections/SiteShell/SiteShell.tsx
var o = t(function({ header: t, footer: o, children: s, className: c }, l) {
	let [u, d] = r(null);
	return /* @__PURE__ */ i("div", {
		ref: n((e) => {
			d(e), typeof l == "function" ? l(e) : l && (l.current = e);
		}, [l]),
		className: ["site-shell", c].filter(Boolean).join(" "),
		children: /* @__PURE__ */ a(e.Provider, {
			value: u,
			children: [
				t,
				/* @__PURE__ */ i("div", {
					className: "site-shell__main",
					children: s
				}),
				o
			]
		})
	});
});
//#endregion
export { o as SiteShell };
