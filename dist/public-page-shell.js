'use client';
import './public-page-shell.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Container as t } from "./container.js";
import { ErrorBoundary as n } from "./error-boundary.js";
import { SiteShell as r } from "./site-shell.js";
import { forwardRef as i } from "react";
import { Fragment as a, jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/templates/PublicPageShell/PublicPageShell.tsx
var c = i(function({ children: i, header: c, footer: l, preferences: u, preferencesLabel: d, mainWidth: f = "xl", mainSpace: p = "xl", mainFlush: m = !1, id: h = "main-content", shell: g = !0 }, _) {
	let v = e("publicPageShell");
	if (!g) return /* @__PURE__ */ o(a, { children: i });
	let y = u && /* @__PURE__ */ o(t, {
		as: "section",
		className: "public-page-shell__preferences",
		"aria-label": v("preferences", d),
		children: /* @__PURE__ */ o("div", {
			className: "public-page-shell__preferences-row",
			children: u
		})
	});
	return /* @__PURE__ */ o(r, {
		ref: _,
		header: c && /* @__PURE__ */ o(n, { children: c }),
		footer: (y || l) && /* @__PURE__ */ s(a, { children: [y && /* @__PURE__ */ o(n, { children: y }), l && /* @__PURE__ */ o(n, { children: l })] }),
		children: /* @__PURE__ */ o(t, {
			as: "main",
			id: h,
			tabIndex: -1,
			width: f,
			space: p,
			flush: m,
			children: i
		})
	});
});
//#endregion
export { c as PublicPageShell };
