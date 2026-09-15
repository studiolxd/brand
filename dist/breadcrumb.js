'use client';
import './breadcrumb.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/stories/molecules/Breadcrumb/Breadcrumb.tsx
function r({ children: e, ...n }) {
	return /* @__PURE__ */ t("a", {
		...n,
		children: e
	});
}
function i({ items: i, renderLink: a = r, separator: o = "/", ariaLabel: s, className: c }) {
	let l = e("breadcrumb");
	return /* @__PURE__ */ t("nav", {
		"aria-label": l("label", s),
		className: ["breadcrumb", c].filter(Boolean).join(" "),
		children: /* @__PURE__ */ t("ol", {
			className: "breadcrumb__list",
			children: i.map((e, r) => {
				let s = r === i.length - 1;
				return /* @__PURE__ */ n("li", {
					className: ["breadcrumb__item", s ? "breadcrumb__item--current" : ""].filter(Boolean).join(" "),
					children: [s || !e.href ? /* @__PURE__ */ t("span", {
						className: s ? "breadcrumb__current" : "breadcrumb__static",
						...s ? { "aria-current": "page" } : {},
						children: e.label
					}) : a({
						href: e.href,
						children: e.label,
						className: "breadcrumb__link"
					}), !s && /* @__PURE__ */ t("span", {
						className: "breadcrumb__separator",
						"aria-hidden": "true",
						children: o
					})]
				}, `${e.label}-${r}`);
			})
		})
	});
}
//#endregion
export { i as Breadcrumb };
