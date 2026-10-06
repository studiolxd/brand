'use client';
import './site-nav.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Heading as t } from "./heading.js";
import { Tag as n } from "./tag.js";
import { t as r } from "./_shared/default-render-link.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/stories/molecules/SiteNav/SiteNav.tsx
function o(e, t) {
	return t || (e === "_blank" ? "noopener noreferrer" : void 0);
}
var s = 5;
function c({ groups: c, label: l, renderLink: u = r, className: d }) {
	let f = e("siteNav"), p = ["site-nav", d].filter(Boolean).join(" "), m = c.reduce((e, t) => e + (t.columns ?? 1), 0), h = Math.min(m, s) || 1;
	return /* @__PURE__ */ i("nav", {
		className: p,
		"aria-label": f("label", l),
		"data-columns": h,
		children: c.map((e) => /* @__PURE__ */ a("div", {
			className: "site-nav__group",
			"data-group-columns": e.columns === 2 ? 2 : void 0,
			children: [/* @__PURE__ */ i(t, {
				level: 2,
				size: 6,
				className: "site-nav__label",
				children: e.href ? u({
					href: e.href,
					className: "site-nav__label-link",
					children: e.label
				}) : e.label
			}), /* @__PURE__ */ i("ul", {
				className: "site-nav__list",
				children: e.items.map((e) => /* @__PURE__ */ a("li", {
					className: "site-nav__item",
					children: [e.disabled ? /* @__PURE__ */ i("span", {
						className: "site-nav__link site-nav__link--disabled",
						role: "link",
						"aria-disabled": "true",
						children: e.label
					}) : u({
						href: e.href,
						className: ["site-nav__link", e.current ? "site-nav__link--current" : ""].filter(Boolean).join(" "),
						"aria-current": e.current ? "page" : void 0,
						target: e.target,
						rel: o(e.target, e.rel),
						children: e.label
					}), e.badge && /* @__PURE__ */ i(n, {
						variant: e.disabled ? "neutral" : "info",
						className: "site-nav__badge",
						children: e.badge
					})]
				}, e.id))
			})]
		}, e.id))
	});
}
//#endregion
export { c as SiteNav };
