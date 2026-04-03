import './project-card.css';
import { Button as e } from "./button.js";
import { Heading as t } from "./heading.js";
import { Tag as n } from "./tag.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/molecules/ProjectCard/ProjectCard.tsx
function a({ project: a, hideTag: o = !1, className: s }) {
	let { category: c, tagVariant: l = "default", photo: u, photoAlt: d, title: f, description: p, href: m, ctaLabel: h = "Leer más" } = a, g = /* @__PURE__ */ r("div", {
		className: "project-card__image-wrap",
		children: /* @__PURE__ */ r("img", {
			src: u,
			alt: d ?? f,
			className: "project-card__image"
		})
	});
	return /* @__PURE__ */ i("div", {
		className: ["project-card", s].filter(Boolean).join(" "),
		children: [
			!o && /* @__PURE__ */ r(n, {
				variant: l,
				children: c
			}),
			/* @__PURE__ */ r(t, {
				level: 3,
				className: "project-card__title",
				children: m ? /* @__PURE__ */ r("a", {
					href: m,
					className: "project-card__title-link",
					children: f
				}) : f
			}),
			m ? /* @__PURE__ */ r("a", {
				href: m,
				className: "project-card__image-link",
				tabIndex: -1,
				"aria-hidden": "true",
				children: g
			}) : g,
			/* @__PURE__ */ r("p", {
				className: "project-card__description",
				children: p
			}),
			/* @__PURE__ */ r("div", {
				className: "project-card__cta",
				children: /* @__PURE__ */ r(e, {
					href: m,
					children: h
				})
			})
		]
	});
}
//#endregion
export { a as ProjectCard };
