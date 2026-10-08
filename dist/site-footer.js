import './site-footer.css';
import { Container as e } from "./container.js";
import { Heading as t } from "./heading.js";
import { List as n } from "./list.js";
import { t as r } from "./_shared/logo.js";
import { Paragraph as i } from "./paragraph.js";
import { t as a } from "./_shared/default-render-link.js";
import { LegalFooter as o } from "./legal-footer.js";
import { cloneElement as s, isValidElement as c } from "react";
import { jsx as l, jsxs as u } from "react/jsx-runtime";
//#region src/stories/sections/SiteFooter/SiteFooter.tsx
function d({ logo: o = /* @__PURE__ */ l(r, { size: "lg" }), tagline: s, columns: c, renderLink: d = a, aside: p, legal: m, columnTitleLevel: h = 2, surface: g = "dark", width: _ = "xl", className: v, id: y }) {
	return /* @__PURE__ */ l("footer", {
		id: y,
		className: [
			"site-footer",
			g === "dark" && "surface-dark",
			v
		].filter(Boolean).join(" "),
		children: /* @__PURE__ */ u(e, {
			width: _,
			innerClassName: "site-footer__inner",
			children: [
				/* @__PURE__ */ u("div", {
					className: "site-footer__brand",
					children: [o, s && /* @__PURE__ */ l(i, {
						size: "lg",
						className: "site-footer__tagline",
						children: s
					})]
				}),
				(c?.length || p) && /* @__PURE__ */ u("div", {
					className: "site-footer__body",
					children: [c?.map((e) => /* @__PURE__ */ u("nav", {
						className: "site-footer__column",
						"aria-label": e.title,
						children: [/* @__PURE__ */ l(t, {
							level: h,
							size: 3,
							className: "site-footer__column-title",
							children: e.title
						}), /* @__PURE__ */ l(n, {
							type: "plain",
							className: "site-footer__links",
							children: e.links.map((e) => /* @__PURE__ */ l("li", { children: d({
								href: e.href,
								className: "site-footer__link link--ink",
								children: e.label,
								...e.external ? {
									target: "_blank",
									rel: "noopener noreferrer"
								} : {}
							}) }, e.id ?? e.href))
						})]
					}, e.id ?? e.title)), p && /* @__PURE__ */ l("div", {
						className: "site-footer__aside",
						children: p
					})]
				}),
				m && /* @__PURE__ */ l("div", {
					className: "site-footer__legal",
					children: f(m)
				})
			]
		})
	});
}
function f(e) {
	return c(e) && e.type === o ? s(e, { as: "div" }) : e;
}
//#endregion
export { d as SiteFooter };
