import './legal-footer.css';
import { Container as e } from "./container.js";
import { Heading as t } from "./heading.js";
import { t as n } from "./_shared/default-render-link.js";
import { LegalFooterNav as r } from "./legal-footer-nav.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/stories/sections/LegalFooter/LegalFooter.tsx
function o({ label: o, title: s, links: c, renderLink: l = n, width: u = "xl", surface: d, as: f = "footer", className: p }) {
	return /* @__PURE__ */ i(f, {
		className: [
			"legal-footer",
			d === "dark" && "surface-dark",
			p
		].filter(Boolean).join(" "),
		children: /* @__PURE__ */ a(e, {
			width: u,
			innerClassName: "legal-footer__inner",
			children: [s && /* @__PURE__ */ i(t, {
				level: 2,
				size: 6,
				className: "legal-footer__title",
				children: s
			}), /* @__PURE__ */ i(r, {
				label: o,
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
