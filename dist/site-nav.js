import './site-nav.css';
import { Heading as e } from "./heading.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/stories/molecules/SiteNav/SiteNav.tsx
function r({ href: e, children: n, className: r, "aria-current": i, target: a, rel: o }) {
	return /* @__PURE__ */ t("a", {
		href: e,
		className: r,
		"aria-current": i,
		target: a,
		rel: o,
		children: n
	});
}
function i(e, t) {
	return t || (e === "_blank" ? "noopener noreferrer" : void 0);
}
var a = 5;
function o({ groups: o, label: s = "Navegación del sitio", renderLink: c = r, className: l }) {
	let u = ["site-nav", l].filter(Boolean).join(" "), d = Math.min(o.length, a) || 1, f = { "--site-nav-wide-columns": d };
	return /* @__PURE__ */ t("nav", {
		className: u,
		"aria-label": s,
		style: f,
		children: o.map((r) => /* @__PURE__ */ n("div", {
			className: "site-nav__group",
			children: [/* @__PURE__ */ t(e, {
				level: 2,
				size: 6,
				className: "site-nav__label",
				children: r.href ? c({
					href: r.href,
					className: "site-nav__label-link",
					children: r.label
				}) : r.label
			}), /* @__PURE__ */ t("ul", {
				className: "site-nav__list",
				children: r.items.map((e) => /* @__PURE__ */ t("li", {
					className: "site-nav__item",
					children: c({
						href: e.href,
						className: ["site-nav__link", e.current ? "site-nav__link--current" : ""].filter(Boolean).join(" "),
						"aria-current": e.current ? "page" : void 0,
						target: e.target,
						rel: i(e.target, e.rel),
						children: e.label
					})
				}, e.id))
			})]
		}, r.id))
	});
}
//#endregion
export { o as SiteNav };
