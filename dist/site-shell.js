'use client';
import './site-shell.css';
import { t as e } from "./_shared/portal-container.js";
import { t } from "./_shared/assign-ref.js";
import { forwardRef as n, useCallback as r, useState as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/sections/SiteShell/SiteShell.tsx
var s = n(function({ header: n, footer: s, children: c, className: l }, u) {
	let [d, f] = i(null);
	return /* @__PURE__ */ a("div", {
		ref: r((e) => {
			f(e), t(u, e);
		}, [u]),
		className: ["site-shell", l].filter(Boolean).join(" "),
		children: /* @__PURE__ */ o(e.Provider, {
			value: d,
			children: [
				n,
				/* @__PURE__ */ a("div", {
					className: "site-shell__main",
					children: c
				}),
				s
			]
		})
	});
});
//#endregion
export { s as SiteShell };
