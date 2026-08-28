'use client';
import './project-card.css';
import { Heading as e } from "./heading.js";
import { Paragraph as t } from "./paragraph.js";
import { Tag as n } from "./tag.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { useRender as a } from "@base-ui/react/use-render";
//#region src/stories/molecules/ProjectCard/ProjectCard.tsx
function o({ title: o, description: s, media: c, tags: l, href: u, render: d, headingLevel: f = 3, headingSize: p = 5, tagsLabel: m = "Categorías", className: h, id: g }) {
	let _ = a({
		render: d,
		enabled: d !== void 0,
		props: {
			className: "project-card__link",
			children: o
		}
	}) ?? (u === void 0 ? o : /* @__PURE__ */ r("a", {
		href: u,
		className: "project-card__link",
		children: o
	}));
	return /* @__PURE__ */ i("article", {
		id: g,
		className: ["project-card", h].filter(Boolean).join(" "),
		children: [
			c && /* @__PURE__ */ r("div", {
				className: "project-card__media",
				children: /* @__PURE__ */ r("img", {
					src: c.src,
					alt: c.alt
				})
			}),
			l && l.length > 0 && /* @__PURE__ */ r("ul", {
				className: "project-card__tags",
				"aria-label": m,
				children: l.map((e) => /* @__PURE__ */ r("li", { children: /* @__PURE__ */ r(n, {
					variant: e.variant ?? "neutral",
					children: e.label
				}) }, e.id ?? e.label))
			}),
			/* @__PURE__ */ r(e, {
				level: f,
				size: p,
				className: "project-card__title",
				children: _
			}),
			s && /* @__PURE__ */ r(t, {
				className: "project-card__description",
				children: s
			})
		]
	});
}
//#endregion
export { o as ProjectCard };
