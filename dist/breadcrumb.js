'use client';
import './breadcrumb.css';
import { n as e } from "./_shared/env.js";
import { n as t } from "./_shared/brandmessagescontext.js";
import { t as n } from "./_shared/default-render-link.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/messages/es/breadcrumb.ts
var a = { label: "Migas de pan" };
//#endregion
//#region src/stories/molecules/Breadcrumb/Breadcrumb.tsx
function o({ items: o, renderLink: s = n, separator: c = "/", "aria-label": l, ariaLabel: u, className: d }) {
	u !== void 0 && e("Breadcrumb", "ariaLabel", "`aria-label`");
	let f = l ?? u, p = t("breadcrumb", a);
	return /* @__PURE__ */ r("nav", {
		"aria-label": p("label", f),
		className: ["breadcrumb", d].filter(Boolean).join(" "),
		children: /* @__PURE__ */ r("ol", {
			className: "breadcrumb__list",
			children: o.map((e, t) => {
				let n = t === o.length - 1;
				return /* @__PURE__ */ i("li", {
					className: ["breadcrumb__item", n ? "breadcrumb__item--current" : ""].filter(Boolean).join(" "),
					children: [n || !e.href ? /* @__PURE__ */ r("span", {
						className: n ? "breadcrumb__current" : "breadcrumb__static",
						...n ? { "aria-current": "page" } : {},
						children: e.label
					}) : s({
						href: e.href,
						children: e.label,
						className: "breadcrumb__link"
					}), !n && /* @__PURE__ */ r("span", {
						className: "breadcrumb__separator",
						"aria-hidden": "true",
						children: c
					})]
				}, `${e.label}-${t}`);
			})
		})
	});
}
//#endregion
export { o as Breadcrumb };
