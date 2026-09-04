'use client';
import { Container as e } from "./container.js";
import { ErrorBoundary as t } from "./error-boundary.js";
import { SiteShell as n } from "./site-shell.js";
import { Fragment as r, jsx as i } from "react/jsx-runtime";
//#region src/stories/templates/PublicPageShell/PublicPageShell.tsx
function a({ children: a, header: o, footer: s, id: c = "main-content", shell: l = !0 }) {
	return l ? /* @__PURE__ */ i(n, {
		header: o && /* @__PURE__ */ i(t, { children: o }),
		footer: s && /* @__PURE__ */ i(t, { children: s }),
		children: /* @__PURE__ */ i(e, {
			as: "main",
			id: c,
			tabIndex: -1,
			space: "xl",
			children: a
		})
	}) : /* @__PURE__ */ i(r, { children: a });
}
//#endregion
export { a as PublicPageShell };
