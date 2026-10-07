import '../legalfooter.css';
import { r as e } from "./brandmessagescontext.js";
import { Container as t } from "../container.js";
import { Heading as n } from "../heading.js";
import { t as r } from "./default-render-link.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/stories/messages/es/legalFooter.ts
var o = { label: "Legal" };
//#endregion
//#region src/stories/sections/LegalFooter/LegalFooter.tsx
function s({ label: s, title: c, links: l, renderLink: u = r, width: d = "xl", surface: f, as: p = "footer", className: m }) {
	let h = e("legalFooter", o);
	return /* @__PURE__ */ i(p, {
		className: [
			"legal-footer",
			f === "dark" && "surface-dark",
			m
		].filter(Boolean).join(" "),
		children: /* @__PURE__ */ a(t, {
			width: d,
			innerClassName: "legal-footer__inner",
			children: [c && /* @__PURE__ */ i(n, {
				level: 2,
				size: 6,
				className: "legal-footer__title",
				children: c
			}), /* @__PURE__ */ i("nav", {
				"aria-label": h("label", s),
				children: /* @__PURE__ */ i("ul", {
					className: "legal-footer__links",
					children: l.map((e) => /* @__PURE__ */ i("li", { children: u({
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
export { s as t };
