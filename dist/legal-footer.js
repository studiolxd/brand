import './legal-footer.css';
import { Container as e } from "./container.js";
import { Heading as t } from "./heading.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/sections/LegalFooter/LegalFooter.tsx
function i({ children: e, ...t }) {
	return /* @__PURE__ */ n("a", {
		...t,
		children: e
	});
}
function a({ label: a = "Legal", title: o, links: s, renderLink: c = i, width: l = "xl", surface: u, className: d }) {
	return /* @__PURE__ */ r(e, {
		as: "footer",
		width: l,
		surface: u,
		className: ["legal-footer", d].filter(Boolean).join(" "),
		innerClassName: "legal-footer__inner",
		children: [o && /* @__PURE__ */ n(t, {
			level: 2,
			size: 6,
			className: "legal-footer__title",
			children: o
		}), /* @__PURE__ */ n("nav", {
			"aria-label": a,
			children: /* @__PURE__ */ n("ul", {
				className: "legal-footer__links",
				children: s.map((e) => /* @__PURE__ */ n("li", { children: c({
					href: e.href,
					className: "legal-footer__link link--ink",
					children: e.label
				}) }, e.id))
			})
		})]
	});
}
//#endregion
export { a as LegalFooter };
