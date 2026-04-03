import './project-card.css';
import { Button as e } from "./button.js";
import { Heading as t } from "./heading.js";
import { Tag as n } from "./tag.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/molecules/ProjectCard/ProjectCard.tsx
function a({ project: a, className: o }) {
	let { category: s, tagVariant: c = "default", photo: l, photoAlt: u, title: d, description: f, href: p, ctaLabel: m = "Leer más" } = a, h = /* @__PURE__ */ r("div", {
		className: "project-card__image-wrap",
		children: /* @__PURE__ */ r("img", {
			src: l,
			alt: u ?? d,
			className: "project-card__image"
		})
	});
	return /* @__PURE__ */ i("div", {
		className: ["project-card", o].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ r(n, {
				variant: c,
				children: s
			}),
			/* @__PURE__ */ r(t, {
				level: 3,
				className: "project-card__title",
				children: p ? /* @__PURE__ */ r("a", {
					href: p,
					className: "project-card__title-link",
					children: d
				}) : d
			}),
			p ? /* @__PURE__ */ r("a", {
				href: p,
				className: "project-card__image-link",
				tabIndex: -1,
				"aria-hidden": "true",
				children: h
			}) : h,
			/* @__PURE__ */ r("p", {
				className: "project-card__description",
				children: f
			}),
			/* @__PURE__ */ r("div", {
				className: "project-card__cta",
				children: /* @__PURE__ */ r(e, {
					href: p,
					children: m
				})
			})
		]
	});
}
//#endregion
export { a as ProjectCard };
