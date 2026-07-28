import './pricing-card.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Arrow as n } from "./arrow.js";
import { Button as r } from "./button.js";
import { Heading as i } from "./heading.js";
import { List as a } from "./list.js";
import { Paragraph as o } from "./paragraph.js";
import { Tag as s } from "./tag.js";
import { Fragment as c, jsx as l, jsxs as u } from "react/jsx-runtime";
import { forwardRef as d } from "react";
//#region src/stories/organisms/PricingCard/PricingCard.tsx
var f = d(function({ planName: d, price: f, priceSuffix: p, description: m, features: h, featured: g = !1, featuredLabel: _, href: v, external: y = !1, ctaLabel: b, footerLabel: x, footerVariant: S = "primary", onFooterClick: C, className: w }, T) {
	let E = [
		"pricing-card",
		g ? "pricing-card--featured" : "",
		w ?? ""
	].filter(Boolean).join(" "), D = /* @__PURE__ */ u(c, { children: [
		g && _ && /* @__PURE__ */ l(s, {
			className: "pricing-card__featured-label",
			children: _
		}),
		d && /* @__PURE__ */ l(i, {
			level: 3,
			size: 1,
			className: "pricing-card__plan-name",
			children: d
		}),
		(f || p) && /* @__PURE__ */ u("div", {
			className: "pricing-card__price-row",
			children: [f && /* @__PURE__ */ l("span", {
				className: "pricing-card__price",
				children: f
			}), p && /* @__PURE__ */ l("span", {
				className: "pricing-card__price-suffix",
				children: p
			})]
		}),
		m && /* @__PURE__ */ l(o, {
			className: "pricing-card__description",
			children: m
		}),
		h && h.length > 0 && /* @__PURE__ */ l(a, {
			type: "plain",
			className: "pricing-card__features",
			children: h.map((t) => /* @__PURE__ */ u("li", {
				className: "pricing-card__feature",
				children: [t.icon && /* @__PURE__ */ l(e, {
					name: t.icon,
					size: "sm"
				}), /* @__PURE__ */ l("span", { children: t.text })]
			}, t.text))
		})
	] });
	return v === void 0 ? /* @__PURE__ */ u("div", {
		ref: T,
		className: E,
		children: [D, x && /* @__PURE__ */ l(r, {
			variant: S,
			onClick: C,
			className: "pricing-card__footer-button",
			children: x
		})]
	}) : /* @__PURE__ */ u("a", {
		ref: T,
		href: v,
		className: E,
		...y ? {
			target: "_blank",
			rel: "noopener noreferrer"
		} : {},
		children: [
			D,
			/* @__PURE__ */ l(t, { children: b }),
			/* @__PURE__ */ l(n, {
				size: "lg",
				className: "pricing-card__arrow"
			})
		]
	});
});
//#endregion
export { f as PricingCard };
