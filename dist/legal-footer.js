'use client';
import './legal-footer.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Container as t } from "./container.js";
import { Heading as n } from "./heading.js";
import { t as r } from "./_shared/default-render-link.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/stories/sections/LegalFooter/LegalFooter.tsx
function o({ label: o, title: s, links: c, renderLink: l = r, width: u = "xl", surface: d, className: f }) {
	let p = e("legalFooter");
	return /* @__PURE__ */ i("footer", {
		className: [
			"legal-footer",
			d === "dark" && "surface-dark",
			f
		].filter(Boolean).join(" "),
		children: /* @__PURE__ */ a(t, {
			width: u,
			innerClassName: "legal-footer__inner",
			children: [s && /* @__PURE__ */ i(n, {
				level: 2,
				size: 6,
				className: "legal-footer__title",
				children: s
			}), /* @__PURE__ */ i("nav", {
				"aria-label": p("label", o),
				children: /* @__PURE__ */ i("ul", {
					className: "legal-footer__links",
					children: c.map((e) => /* @__PURE__ */ i("li", { children: l({
						href: e.href,
						className: "legal-footer__link link--ink",
						children: e.label
					}) }, e.id))
				})
			})]
		})
	});
}
//#endregion
export { o as LegalFooter };
