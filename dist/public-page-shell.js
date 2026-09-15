'use client';
import './public-page-shell.css';
import { Container as e } from "./container.js";
import { ErrorBoundary as t } from "./error-boundary.js";
import { SiteShell as n } from "./site-shell.js";
import { forwardRef as r } from "react";
import { Fragment as i, jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/templates/PublicPageShell/PublicPageShell.tsx
var s = r(function({ children: r, header: s, footer: c, preferences: l, preferencesLabel: u = "Preferencias", id: d = "main-content", shell: f = !0 }, p) {
	if (!f) return /* @__PURE__ */ a(i, { children: r });
	let m = l && /* @__PURE__ */ a(e, {
		as: "section",
		className: "public-page-shell__preferences",
		"aria-label": u,
		children: /* @__PURE__ */ a("div", {
			className: "public-page-shell__preferences-row",
			children: l
		})
	});
	return /* @__PURE__ */ a(n, {
		ref: p,
		header: s && /* @__PURE__ */ a(t, { children: s }),
		footer: (m || c) && /* @__PURE__ */ o(i, { children: [m && /* @__PURE__ */ a(t, { children: m }), c && /* @__PURE__ */ a(t, { children: c })] }),
		children: /* @__PURE__ */ a(e, {
			as: "main",
			id: d,
			tabIndex: -1,
			space: "xl",
			children: r
		})
	});
});
//#endregion
export { s as PublicPageShell };
