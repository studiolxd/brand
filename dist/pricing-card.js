import './pricing-card.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Arrow as n } from "./arrow.js";
import { Button as r } from "./button.js";
import { Heading as i } from "./heading.js";
import { List as a } from "./list.js";
import { Paragraph as o } from "./paragraph.js";
import { Tag as s } from "./tag.js";
import { forwardRef as c } from "react";
import { jsx as l, jsxs as u } from "react/jsx-runtime";
//#region src/stories/organisms/PricingCard/PricingCard.tsx
var d = c(function({ planName: c, price: d, priceSuffix: f, description: p, features: m, featured: h = !1, featuredLabel: g, href: _, external: v = !1, ctaLabel: y, footerLabel: b, footerVariant: x = "primary", onFooterClick: S, className: C }, w) {
	let T = [
		"pricing-card",
		h ? "pricing-card--featured" : "",
		C ?? ""
	].filter(Boolean).join(" "), E = /* @__PURE__ */ u("div", {
		className: ["pricing-card__body", _ !== void 0 || b ? "pricing-card__body--with-footer" : ""].filter(Boolean).join(" "),
		children: [
			h && g && /* @__PURE__ */ l(s, {
				className: "pricing-card__featured-label",
				children: g
			}),
			c && /* @__PURE__ */ l(i, {
				level: 3,
				size: 1,
				className: "pricing-card__plan-name",
				children: c
			}),
			(d || f) && /* @__PURE__ */ u("div", {
				className: "pricing-card__price-row",
				children: [d && /* @__PURE__ */ l("span", {
					className: "pricing-card__price",
					children: d
				}), f && /* @__PURE__ */ l("span", {
					className: "pricing-card__price-suffix",
					children: f
				})]
			}),
			p && /* @__PURE__ */ l(o, {
				className: "pricing-card__description",
				children: p
			}),
			m && m.length > 0 && /* @__PURE__ */ l(a, {
				type: "plain",
				className: "pricing-card__features",
				children: m.map((t) => /* @__PURE__ */ u("li", {
					className: "pricing-card__feature",
					children: [t.icon && /* @__PURE__ */ l(e, {
						name: t.icon,
						size: "sm"
					}), /* @__PURE__ */ l("span", { children: t.text })]
				}, t.text))
			})
		]
	});
	return _ === void 0 ? /* @__PURE__ */ u("div", {
		ref: w,
		className: T,
		children: [E, b && /* @__PURE__ */ l(r, {
			variant: x,
			onClick: S,
			className: "pricing-card__footer-button",
			children: b
		})]
	}) : /* @__PURE__ */ u("a", {
		ref: w,
		href: _,
		className: T,
		...v ? {
			target: "_blank",
			rel: "noopener noreferrer"
		} : {},
		children: [
			E,
			/* @__PURE__ */ l(t, { children: y }),
			/* @__PURE__ */ l(n, {
				size: "lg",
				className: "pricing-card__arrow"
			})
		]
	});
});
//#endregion
export { d as PricingCard };
