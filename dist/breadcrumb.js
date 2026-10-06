'use client';
import './breadcrumb.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { t } from "./_shared/default-render-link.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/molecules/Breadcrumb/Breadcrumb.tsx
function i({ items: i, renderLink: a = t, separator: o = "/", ariaLabel: s, className: c }) {
	let l = e("breadcrumb");
	return /* @__PURE__ */ n("nav", {
		"aria-label": l("label", s),
		className: ["breadcrumb", c].filter(Boolean).join(" "),
		children: /* @__PURE__ */ n("ol", {
			className: "breadcrumb__list",
			children: i.map((e, t) => {
				let s = t === i.length - 1;
				return /* @__PURE__ */ r("li", {
					className: ["breadcrumb__item", s ? "breadcrumb__item--current" : ""].filter(Boolean).join(" "),
					children: [s || !e.href ? /* @__PURE__ */ n("span", {
						className: s ? "breadcrumb__current" : "breadcrumb__static",
						...s ? { "aria-current": "page" } : {},
						children: e.label
					}) : a({
						href: e.href,
						children: e.label,
						className: "breadcrumb__link"
					}), !s && /* @__PURE__ */ n("span", {
						className: "breadcrumb__separator",
						"aria-hidden": "true",
						children: o
					})]
				}, `${e.label}-${t}`);
			})
		})
	});
}
//#endregion
export { i as Breadcrumb };
