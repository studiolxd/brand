import './project-card.css';
import { Heading as e } from "./heading.js";
import { Tag as t } from "./tag.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/molecules/ProjectCard/ProjectCard.tsx
function i({ project: i, className: a }) {
	let { category: o, tagVariant: s = "default", photo: c, photoAlt: l, title: u, description: d, href: f, ctaLabel: p = "Leer más" } = i;
	return /* @__PURE__ */ r("a", {
		className: ["project-card", a].filter(Boolean).join(" "),
		href: f,
		"aria-label": u,
		children: [
			/* @__PURE__ */ n(t, {
				variant: s,
				children: o
			}),
			/* @__PURE__ */ n(e, {
				level: 3,
				className: "project-card__title",
				children: u
			}),
			/* @__PURE__ */ n("div", {
				className: "project-card__image-wrap",
				children: /* @__PURE__ */ n("img", {
					src: c,
					alt: l ?? u,
					className: "project-card__image"
				})
			}),
			/* @__PURE__ */ n("p", {
				className: "project-card__description",
				children: d
			}),
			/* @__PURE__ */ n("span", {
				className: "project-card__cta button button--primary",
				"aria-hidden": "true",
				children: p
			})
		]
	});
}
//#endregion
export { i as ProjectCard };
