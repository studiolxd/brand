import './pricing-card.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Arrow as n } from "./arrow.js";
import { Button as r } from "./button.js";
import { Heading as i } from "./heading.js";
import { List as a } from "./list.js";
import { Paragraph as o } from "./paragraph.js";
import { Tag as s } from "./tag.js";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
import { forwardRef as u } from "react";
//#region src/stories/organisms/PricingCard/PricingCard.tsx
var d = u(function({ planName: u, price: d, priceSuffix: f, description: p, features: m, featured: h = !1, featuredLabel: g, href: _, external: v = !1, ctaLabel: y, footerLabel: b, footerVariant: x = "primary", onFooterClick: S, className: C }, w) {
	let T = [
		"pricing-card",
		h ? "pricing-card--featured" : "",
		C ?? ""
	].filter(Boolean).join(" "), E = /* @__PURE__ */ l("div", {
		className: ["pricing-card__body", _ !== void 0 || b ? "pricing-card__body--with-footer" : ""].filter(Boolean).join(" "),
		children: [
			h && g && /* @__PURE__ */ c(s, {
				className: "pricing-card__featured-label",
				children: g
			}),
			u && /* @__PURE__ */ c(i, {
				level: 3,
				size: 1,
				className: "pricing-card__plan-name",
				children: u
			}),
			(d || f) && /* @__PURE__ */ l("div", {
				className: "pricing-card__price-row",
				children: [d && /* @__PURE__ */ c("span", {
					className: "pricing-card__price",
					children: d
				}), f && /* @__PURE__ */ c("span", {
					className: "pricing-card__price-suffix",
					children: f
				})]
			}),
			p && /* @__PURE__ */ c(o, {
				className: "pricing-card__description",
				children: p
			}),
			m && m.length > 0 && /* @__PURE__ */ c(a, {
				type: "plain",
				className: "pricing-card__features",
				children: m.map((t) => /* @__PURE__ */ l("li", {
					className: "pricing-card__feature",
					children: [t.icon && /* @__PURE__ */ c(e, {
						name: t.icon,
						size: "sm"
					}), /* @__PURE__ */ c("span", { children: t.text })]
				}, t.text))
			})
		]
	});
	return _ === void 0 ? /* @__PURE__ */ l("div", {
		ref: w,
		className: T,
		children: [E, b && /* @__PURE__ */ c(r, {
			variant: x,
			onClick: S,
			className: "pricing-card__footer-button",
			children: b
		})]
	}) : /* @__PURE__ */ l("a", {
		ref: w,
		href: _,
		className: T,
		...v ? {
			target: "_blank",
			rel: "noopener noreferrer"
		} : {},
		children: [
			E,
			/* @__PURE__ */ c(t, { children: y }),
			/* @__PURE__ */ c(n, {
				size: "lg",
				className: "pricing-card__arrow"
			})
		]
	});
});
//#endregion
export { d as PricingCard };
