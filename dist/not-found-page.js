'use client';
import { Stack as e } from "./stack.js";
import { PageIntro as t } from "./page-intro.js";
import { PublicPageShell as n } from "./public-page-shell.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/templates/NotFoundPage/NotFoundPage.tsx
function a({ title: a, description: o, homeLink: s, header: c, footer: l, id: u = "main-content", shell: d = !0 }) {
	return /* @__PURE__ */ r(n, {
		header: c,
		footer: l,
		id: u,
		shell: d,
		children: /* @__PURE__ */ i(e, { children: [/* @__PURE__ */ r(t, {
			title: a,
			description: o
		}), s] })
	});
}
//#endregion
export { a as NotFoundPage };
