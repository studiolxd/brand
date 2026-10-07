import '../publicpageshell.css';
import { n as e } from "./brandmessagescontext.js";
import { Container as t } from "../container.js";
import { ErrorBoundary as n } from "../error-boundary.js";
import { SiteShell as r } from "../site-shell.js";
import { forwardRef as i } from "react";
import { Fragment as a, jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/messages/es/publicPageShell.ts
var c = { preferences: "Preferencias" }, l = i(function({ children: i, header: l, footer: u, preferences: d, preferencesLabel: f, preferencesWidth: p = "xl", mainWidth: m = "xl", mainSpace: h = "xl", mainFlush: g = !1, id: _ = "main-content", shell: v = !0, className: y }, b) {
	let x = e("publicPageShell", c);
	if (!v) return /* @__PURE__ */ o(a, { children: i });
	let S = d && /* @__PURE__ */ o(t, {
		as: "section",
		width: p,
		className: "public-page-shell__preferences",
		"aria-label": x("preferences", f),
		children: /* @__PURE__ */ o("div", {
			className: "public-page-shell__preferences-row",
			children: d
		})
	});
	return /* @__PURE__ */ o(r, {
		ref: b,
		className: y,
		header: l && /* @__PURE__ */ o(n, { children: l }),
		footer: (S || u) && /* @__PURE__ */ s(a, { children: [S && /* @__PURE__ */ o(n, { children: S }), u && /* @__PURE__ */ o(n, { children: u })] }),
		children: /* @__PURE__ */ o(t, {
			as: "main",
			id: _,
			tabIndex: -1,
			width: m,
			space: h,
			flush: g,
			children: i
		})
	});
});
//#endregion
export { c as n, l as t };
