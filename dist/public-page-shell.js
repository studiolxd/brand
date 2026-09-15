'use client';
import './public-page-shell.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Container as t } from "./container.js";
import { ErrorBoundary as n } from "./error-boundary.js";
import { SiteShell as r } from "./site-shell.js";
import { forwardRef as i } from "react";
import { Fragment as a, jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/templates/PublicPageShell/PublicPageShell.tsx
var c = i(function({ children: i, header: c, footer: l, preferences: u, preferencesLabel: d, id: f = "main-content", shell: p = !0 }, m) {
	let h = e("publicPageShell");
	if (!p) return /* @__PURE__ */ o(a, { children: i });
	let g = u && /* @__PURE__ */ o(t, {
		as: "section",
		className: "public-page-shell__preferences",
		"aria-label": h("preferences", d),
		children: /* @__PURE__ */ o("div", {
			className: "public-page-shell__preferences-row",
			children: u
		})
	});
	return /* @__PURE__ */ o(r, {
		ref: m,
		header: c && /* @__PURE__ */ o(n, { children: c }),
		footer: (g || l) && /* @__PURE__ */ s(a, { children: [g && /* @__PURE__ */ o(n, { children: g }), l && /* @__PURE__ */ o(n, { children: l })] }),
		children: /* @__PURE__ */ o(t, {
			as: "main",
			id: f,
			tabIndex: -1,
			space: "xl",
			children: i
		})
	});
});
//#endregion
export { c as PublicPageShell };
