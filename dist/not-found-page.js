'use client';
import { Container as e } from "./container.js";
import { Stack as t } from "./stack.js";
import { ErrorBoundary as n } from "./error-boundary.js";
import { PageIntro as r } from "./page-intro.js";
import { SiteShell as i } from "./site-shell.js";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/templates/NotFoundPage/NotFoundPage.tsx
function s({ title: s, description: c, homeLink: l, header: u, footer: d, id: f = "main-content", shell: p = !0 }) {
	let m = /* @__PURE__ */ o(t, { children: [/* @__PURE__ */ a(r, {
		title: s,
		description: c
	}), l] });
	return p ? /* @__PURE__ */ a(i, {
		header: u && /* @__PURE__ */ a(n, { children: u }),
		footer: d && /* @__PURE__ */ a(n, { children: d }),
		children: /* @__PURE__ */ a(e, {
			as: "main",
			id: f,
			tabIndex: -1,
			space: "xl",
			children: m
		})
	}) : m;
}
//#endregion
export { s as NotFoundPage };
