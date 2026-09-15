'use client';
import './public-page-shell.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Container as t } from "./container.js";
import { ErrorBoundary as n } from "./error-boundary.js";
import { SiteShell as r } from "./site-shell.js";
import { forwardRef as i } from "react";
import { Fragment as a, jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/templates/PublicPageShell/PublicPageShell.tsx
var c = i(function({ children: i, header: c, footer: l, preferences: u, preferencesLabel: d, preferencesWidth: f = "xl", mainWidth: p = "xl", mainSpace: m = "xl", mainFlush: h = !1, id: g = "main-content", shell: _ = !0 }, v) {
	let y = e("publicPageShell");
	if (!_) return /* @__PURE__ */ o(a, { children: i });
	let b = u && /* @__PURE__ */ o(t, {
		as: "section",
		width: f,
		className: "public-page-shell__preferences",
		"aria-label": y("preferences", d),
		children: /* @__PURE__ */ o("div", {
			className: "public-page-shell__preferences-row",
			children: u
		})
	});
	return /* @__PURE__ */ o(r, {
		ref: v,
		header: c && /* @__PURE__ */ o(n, { children: c }),
		footer: (b || l) && /* @__PURE__ */ s(a, { children: [b && /* @__PURE__ */ o(n, { children: b }), l && /* @__PURE__ */ o(n, { children: l })] }),
		children: /* @__PURE__ */ o(t, {
			as: "main",
			id: g,
			tabIndex: -1,
			width: p,
			space: m,
			flush: h,
			children: i
		})
	});
});
//#endregion
export { c as PublicPageShell };
