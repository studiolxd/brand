'use client';
import './site-nav.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Heading as t } from "./heading.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/molecules/SiteNav/SiteNav.tsx
function i({ href: e, children: t, className: r, "aria-current": i, target: a, rel: o }) {
	return /* @__PURE__ */ n("a", {
		href: e,
		className: r,
		"aria-current": i,
		target: a,
		rel: o,
		children: t
	});
}
function a(e, t) {
	return t || (e === "_blank" ? "noopener noreferrer" : void 0);
}
var o = 5;
function s({ groups: s, label: c, renderLink: l = i, className: u }) {
	let d = e("siteNav"), f = ["site-nav", u].filter(Boolean).join(" "), p = Math.min(s.length, o) || 1;
	return /* @__PURE__ */ n("nav", {
		className: f,
		"aria-label": d("label", c),
		"data-columns": p,
		children: s.map((e) => /* @__PURE__ */ r("div", {
			className: "site-nav__group",
			children: [/* @__PURE__ */ n(t, {
				level: 2,
				size: 6,
				className: "site-nav__label",
				children: e.href ? l({
					href: e.href,
					className: "site-nav__label-link",
					children: e.label
				}) : e.label
			}), /* @__PURE__ */ n("ul", {
				className: "site-nav__list",
				children: e.items.map((e) => /* @__PURE__ */ n("li", {
					className: "site-nav__item",
					children: l({
						href: e.href,
						className: ["site-nav__link", e.current ? "site-nav__link--current" : ""].filter(Boolean).join(" "),
						"aria-current": e.current ? "page" : void 0,
						target: e.target,
						rel: a(e.target, e.rel),
						children: e.label
					})
				}, e.id))
			})]
		}, e.id))
	});
}
//#endregion
export { s as SiteNav };
