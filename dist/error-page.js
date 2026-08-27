'use client';
import { Container as e } from "./container.js";
import { Stack as t } from "./stack.js";
import { Inline as n } from "./inline.js";
import { ErrorBoundary as r } from "./error-boundary.js";
import { PageIntro as i } from "./page-intro.js";
import { SiteShell as a } from "./site-shell.js";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/templates/ErrorPage/ErrorPage.tsx
function c({ title: c, description: l, actions: u, header: d, footer: f, id: p = "main-content", shell: m = !0 }) {
	let h = /* @__PURE__ */ s(t, { children: [/* @__PURE__ */ o(i, {
		title: c,
		description: l
	}), /* @__PURE__ */ o(n, {
		className: "error-page__actions",
		children: u
	})] });
	return m ? /* @__PURE__ */ o(a, {
		header: d && /* @__PURE__ */ o(r, { children: d }),
		footer: f && /* @__PURE__ */ o(r, { children: f }),
		children: /* @__PURE__ */ o(e, {
			as: "main",
			id: p,
			tabIndex: -1,
			space: "xl",
			children: h
		})
	}) : h;
}
//#endregion
export { c as ErrorPage };
