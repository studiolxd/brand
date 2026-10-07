'use client';
import './project-card.css';
import { r as e } from "./_shared/brandmessagescontext.js";
import { Heading as t } from "./heading.js";
import { Paragraph as n } from "./paragraph.js";
import { Tag as r } from "./tag.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { useRender as o } from "@base-ui/react/use-render";
//#region src/stories/messages/es/projectCard.ts
var s = { tags: "Categorías" };
//#endregion
//#region src/stories/molecules/ProjectCard/ProjectCard.tsx
function c({ title: c, description: l, media: u, tags: d, href: f, render: p, headingLevel: m = 3, headingSize: h = 5, tagsLabel: g, className: _, id: v }) {
	let y = e("projectCard", s), b = o({
		render: p,
		enabled: p !== void 0,
		props: {
			className: "project-card__link",
			children: c
		}
	}) ?? (f === void 0 ? c : /* @__PURE__ */ i("a", {
		href: f,
		className: "project-card__link",
		children: c
	}));
	return /* @__PURE__ */ a("article", {
		id: v,
		className: ["project-card", _].filter(Boolean).join(" "),
		children: [
			u && /* @__PURE__ */ i("div", {
				className: "project-card__media",
				children: /* @__PURE__ */ i("img", {
					src: u.src,
					alt: u.alt
				})
			}),
			d && d.length > 0 && /* @__PURE__ */ i("ul", {
				className: "project-card__tags",
				"aria-label": y("tags", g),
				children: d.map((e) => /* @__PURE__ */ i("li", { children: /* @__PURE__ */ i(r, {
					variant: e.variant ?? "neutral",
					children: e.label
				}) }, e.id ?? e.label))
			}),
			/* @__PURE__ */ i(t, {
				level: m,
				size: h,
				className: "project-card__title",
				children: b
			}),
			l && /* @__PURE__ */ i(n, {
				className: "project-card__description",
				children: l
			})
		]
	});
}
//#endregion
export { c as ProjectCard };
