'use client';
import { Container as e } from "./container.js";
import { Columns as t } from "./columns.js";
import { Stack as n } from "./stack.js";
import { Paragraph as r } from "./paragraph.js";
import { ErrorBoundary as i } from "./error-boundary.js";
import { PageIntro as a } from "./page-intro.js";
import { SiteShell as o } from "./site-shell.js";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/stories/templates/ErrorPage/ErrorPage.tsx
function l({ title: l, description: u, homeAction: d, retryDescription: f, retryAction: p, header: m, footer: h, id: g = "main-content", shell: _ = !0 }) {
	let v = /* @__PURE__ */ c(t, {
		className: "error-page__content",
		children: [/* @__PURE__ */ c(n, { children: [/* @__PURE__ */ s(a, {
			title: l,
			description: u
		}), d] }), /* @__PURE__ */ c(n, { children: [f && /* @__PURE__ */ s(r, {
			size: "large",
			children: f
		}), p] })]
	});
	return _ ? /* @__PURE__ */ s(o, {
		header: m && /* @__PURE__ */ s(i, { children: m }),
		footer: h && /* @__PURE__ */ s(i, { children: h }),
		children: /* @__PURE__ */ s(e, {
			as: "main",
			id: g,
			tabIndex: -1,
			space: "xl",
			children: v
		})
	}) : v;
}
//#endregion
export { l as ErrorPage };
