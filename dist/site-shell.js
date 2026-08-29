import './site-shell.css';
import { forwardRef as e } from "react";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/stories/sections/SiteShell/SiteShell.tsx
var r = e(function({ header: e, footer: r, children: i, className: a }, o) {
	return /* @__PURE__ */ n("div", {
		ref: o,
		className: ["site-shell", a].filter(Boolean).join(" "),
		children: [
			e,
			/* @__PURE__ */ t("div", {
				className: "site-shell__main",
				children: i
			}),
			r
		]
	});
});
//#endregion
export { r as SiteShell };
