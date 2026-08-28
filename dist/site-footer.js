import './site-footer.css';
import { Container as e } from "./container.js";
import { Heading as t } from "./heading.js";
import { List as n } from "./list.js";
import { Logo as r } from "./logo.js";
import { Paragraph as i } from "./paragraph.js";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/sections/SiteFooter/SiteFooter.tsx
function s({ children: e, ...t }) {
	return /* @__PURE__ */ a("a", {
		...t,
		children: e
	});
}
function c({ logo: c = /* @__PURE__ */ a(r, { size: "lg" }), tagline: l, columns: u, renderLink: d = s, aside: f, legal: p, columnTitleLevel: m = 2, surface: h = "dark", width: g = "xl", className: _, id: v }) {
	return /* @__PURE__ */ a("footer", {
		id: v,
		className: [
			"site-footer",
			h === "dark" && "surface-dark",
			_
		].filter(Boolean).join(" "),
		children: /* @__PURE__ */ o(e, {
			width: g,
			innerClassName: "site-footer__inner",
			children: [
				/* @__PURE__ */ o("div", {
					className: "site-footer__brand",
					children: [c, l && /* @__PURE__ */ a(i, {
						size: "large",
						className: "site-footer__tagline",
						children: l
					})]
				}),
				(u?.length || f) && /* @__PURE__ */ o("div", {
					className: "site-footer__body",
					children: [u?.map((e) => /* @__PURE__ */ o("nav", {
						className: "site-footer__column",
						"aria-label": e.title,
						children: [/* @__PURE__ */ a(t, {
							level: m,
							size: 3,
							className: "site-footer__column-title",
							children: e.title
						}), /* @__PURE__ */ a(n, {
							type: "plain",
							className: "site-footer__links",
							children: e.links.map((e) => /* @__PURE__ */ a("li", { children: d({
								href: e.href,
								className: "site-footer__link link--ink",
								children: e.label,
								...e.external ? {
									target: "_blank",
									rel: "noopener noreferrer"
								} : {}
							}) }, e.id ?? e.href))
						})]
					}, e.id ?? e.title)), f && /* @__PURE__ */ a("div", {
						className: "site-footer__aside",
						children: f
					})]
				}),
				p && /* @__PURE__ */ a("div", {
					className: "site-footer__legal",
					children: p
				})
			]
		})
	});
}
//#endregion
export { c as SiteFooter };
