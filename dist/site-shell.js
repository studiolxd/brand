import './site-shell.css';
import { jsx as e, jsxs as t } from "react/jsx-runtime";
//#region src/stories/sections/SiteShell/SiteShell.tsx
function n({ header: n, footer: r, children: i, className: a }) {
	return /* @__PURE__ */ t("div", {
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
}
//#endregion
export { n as SiteShell };
