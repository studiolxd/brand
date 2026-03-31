'use client';
import './projects-section.css';
import { Carousel as e, CarouselSlide as t } from "./carousel.js";
import { Heading as n } from "./heading.js";
import { Tag as r } from "./tag.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/stories/sections/ProjectsSection/ProjectsSection.tsx
function o({ title: o = "Proyectos", projects: s }) {
	return /* @__PURE__ */ a("section", {
		className: "projects-section",
		children: [/* @__PURE__ */ i(n, {
			level: 2,
			weight: "semibold",
			children: o
		}), /* @__PURE__ */ i(e, {
			options: { align: "center" },
			children: s.map((e) => /* @__PURE__ */ i(t, { children: /* @__PURE__ */ a("a", {
				className: "project-card",
				href: e.href,
				"aria-label": e.title,
				children: [
					/* @__PURE__ */ i(r, {
						variant: e.tagVariant ?? "default",
						children: e.category
					}),
					/* @__PURE__ */ i(n, {
						level: 3,
						className: "project-card__title",
						children: e.title
					}),
					/* @__PURE__ */ i("div", {
						className: "project-card__image-wrap",
						children: /* @__PURE__ */ i("img", {
							src: e.photo,
							alt: e.photoAlt ?? e.title,
							className: "project-card__image"
						})
					}),
					/* @__PURE__ */ i("p", {
						className: "project-card__description",
						children: e.description
					}),
					/* @__PURE__ */ i("span", {
						className: "project-card__cta button button--primary",
						"aria-hidden": "true",
						children: "Leer más"
					})
				]
			}) }, e.id))
		})]
	});
}
//#endregion
export { o as ProjectsSection };
