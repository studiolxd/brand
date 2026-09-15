'use client';
import './project-card.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Heading as t } from "./heading.js";
import { Paragraph as n } from "./paragraph.js";
import { Tag as r } from "./tag.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { useRender as o } from "@base-ui/react/use-render";
//#region src/stories/molecules/ProjectCard/ProjectCard.tsx
function s({ title: s, description: c, media: l, tags: u, href: d, render: f, headingLevel: p = 3, headingSize: m = 5, tagsLabel: h, className: g, id: _ }) {
	let v = e("projectCard"), y = o({
		render: f,
		enabled: f !== void 0,
		props: {
			className: "project-card__link",
			children: s
		}
	}) ?? (d === void 0 ? s : /* @__PURE__ */ i("a", {
		href: d,
		className: "project-card__link",
		children: s
	}));
	return /* @__PURE__ */ a("article", {
		id: _,
		className: ["project-card", g].filter(Boolean).join(" "),
		children: [
			l && /* @__PURE__ */ i("div", {
				className: "project-card__media",
				children: /* @__PURE__ */ i("img", {
					src: l.src,
					alt: l.alt
				})
			}),
			u && u.length > 0 && /* @__PURE__ */ i("ul", {
				className: "project-card__tags",
				"aria-label": v("tags", h),
				children: u.map((e) => /* @__PURE__ */ i("li", { children: /* @__PURE__ */ i(r, {
					variant: e.variant ?? "neutral",
					children: e.label
				}) }, e.id ?? e.label))
			}),
			/* @__PURE__ */ i(t, {
				level: p,
				size: m,
				className: "project-card__title",
				children: y
			}),
			c && /* @__PURE__ */ i(n, {
				className: "project-card__description",
				children: c
			})
		]
	});
}
//#endregion
export { s as ProjectCard };
