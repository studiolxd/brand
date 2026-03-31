'use client';
import './reviews-section.css';
import { Avatar as e } from "./avatar.js";
import { Carousel as t, CarouselSlide as n } from "./carousel.js";
import { Heading as r } from "./heading.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/stories/sections/ReviewsSection/ReviewsSection.tsx
function o({ id: o, title: s = "Lo que dice nuestro alumnado", reviews: c }) {
	return /* @__PURE__ */ a("section", {
		id: o,
		className: "reviews-section surface-dark",
		children: [/* @__PURE__ */ i(r, {
			level: 2,
			weight: "semibold",
			children: s
		}), /* @__PURE__ */ i(t, {
			options: {
				align: "center",
				loop: !0
			},
			gradientColor: "var(--color-background-dark)",
			children: c.map((t) => /* @__PURE__ */ i(n, { children: /* @__PURE__ */ a("article", {
				className: "review-card",
				children: [/* @__PURE__ */ a("div", {
					className: "review-card__author",
					children: [/* @__PURE__ */ i(e, {
						src: t.photo,
						alt: t.author,
						size: "xl",
						className: "review-card__avatar"
					}), /* @__PURE__ */ a("div", {
						className: "review-card__identity",
						children: [/* @__PURE__ */ i(r, {
							level: 3,
							className: "review-card__name",
							children: t.author
						}), /* @__PURE__ */ i(r, {
							level: 4,
							className: "review-card__role",
							children: t.role
						})]
					})]
				}), /* @__PURE__ */ i("blockquote", {
					className: "review-card__quote",
					children: t.quote
				})]
			}) }, t.id))
		})]
	});
}
//#endregion
export { o as ReviewsSection };
