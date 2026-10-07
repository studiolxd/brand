'use client';
import './breadcrumb.css';
import { r as e } from "./_shared/brandmessagescontext.js";
import { t } from "./_shared/default-render-link.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/messages/es/breadcrumb.ts
var i = { label: "Migas de pan" };
//#endregion
//#region src/stories/molecules/Breadcrumb/Breadcrumb.tsx
function a({ items: a, renderLink: o = t, separator: s = "/", ariaLabel: c, className: l }) {
	let u = e("breadcrumb", i);
	return /* @__PURE__ */ n("nav", {
		"aria-label": u("label", c),
		className: ["breadcrumb", l].filter(Boolean).join(" "),
		children: /* @__PURE__ */ n("ol", {
			className: "breadcrumb__list",
			children: a.map((e, t) => {
				let i = t === a.length - 1;
				return /* @__PURE__ */ r("li", {
					className: ["breadcrumb__item", i ? "breadcrumb__item--current" : ""].filter(Boolean).join(" "),
					children: [i || !e.href ? /* @__PURE__ */ n("span", {
						className: i ? "breadcrumb__current" : "breadcrumb__static",
						...i ? { "aria-current": "page" } : {},
						children: e.label
					}) : o({
						href: e.href,
						children: e.label,
						className: "breadcrumb__link"
					}), !i && /* @__PURE__ */ n("span", {
						className: "breadcrumb__separator",
						"aria-hidden": "true",
						children: s
					})]
				}, `${e.label}-${t}`);
			})
		})
	});
}
//#endregion
export { a as Breadcrumb };
