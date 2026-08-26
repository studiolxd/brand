import './site-nav.css';
import { Heading as e } from "./heading.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/stories/molecules/SiteNav/SiteNav.tsx
function r({ href: e, children: n, className: r, "aria-current": i }) {
	return /* @__PURE__ */ t("a", {
		href: e,
		className: r,
		"aria-current": i,
		children: n
	});
}
function i({ groups: i, label: a = "Navegación del sitio", renderLink: o = r, className: s }) {
	return /* @__PURE__ */ t("nav", {
		className: ["site-nav", s].filter(Boolean).join(" "),
		"aria-label": a,
		children: i.map((r) => /* @__PURE__ */ n("div", {
			className: "site-nav__group",
			children: [/* @__PURE__ */ t(e, {
				level: 2,
				size: 6,
				className: "site-nav__label",
				children: r.href ? o({
					href: r.href,
					className: "site-nav__label-link",
					children: r.label
				}) : r.label
			}), /* @__PURE__ */ t("ul", {
				className: "site-nav__list",
				children: r.items.map((e) => /* @__PURE__ */ t("li", {
					className: "site-nav__item",
					children: o({
						href: e.href,
						className: ["site-nav__link", e.current ? "site-nav__link--current" : ""].filter(Boolean).join(" "),
						"aria-current": e.current ? "page" : void 0,
						children: e.label
					})
				}, e.id))
			})]
		}, r.id))
	});
}
//#endregion
export { i as SiteNav };
