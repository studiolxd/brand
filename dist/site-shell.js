import './site-shell.css';
import { jsx as e, jsxs as t } from "react/jsx-runtime";
import { forwardRef as n } from "react";
//#region src/stories/sections/SiteShell/SiteShell.tsx
var r = n(function({ header: n, footer: r, children: i, className: a }, o) {
	return /* @__PURE__ */ t("div", {
		ref: o,
		className: ["site-shell", a].filter(Boolean).join(" "),
		children: [
			n,
			/* @__PURE__ */ e("div", {
				className: "site-shell__main",
				children: i
			}),
			r
		]
	});
});
//#endregion
export { r as SiteShell };
