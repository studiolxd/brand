'use client';
import './public-page-shell.css';
import { Container as e } from "./container.js";
import { ErrorBoundary as t } from "./error-boundary.js";
import { SiteShell as n } from "./site-shell.js";
import { Fragment as r, jsx as i, jsxs as a } from "react/jsx-runtime";
import { forwardRef as o } from "react";
//#region src/stories/templates/PublicPageShell/PublicPageShell.tsx
var s = o(function({ children: o, header: s, footer: c, preferences: l, preferencesLabel: u = "Preferencias", id: d = "main-content", shell: f = !0 }, p) {
	if (!f) return /* @__PURE__ */ i(r, { children: o });
	let m = l && /* @__PURE__ */ i(e, {
		as: "section",
		className: "public-page-shell__preferences",
		"aria-label": u,
		children: /* @__PURE__ */ i("div", {
			className: "public-page-shell__preferences-row",
			children: l
		})
	});
	return /* @__PURE__ */ i(n, {
		ref: p,
		header: s && /* @__PURE__ */ i(t, { children: s }),
		footer: (m || c) && /* @__PURE__ */ a(r, { children: [m && /* @__PURE__ */ i(t, { children: m }), c && /* @__PURE__ */ i(t, { children: c })] }),
		children: /* @__PURE__ */ i(e, {
			as: "main",
			id: d,
			tabIndex: -1,
			space: "xl",
			children: o
		})
	});
});
//#endregion
export { s as PublicPageShell };
