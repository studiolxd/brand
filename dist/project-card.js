'use client';
import './project-card.css';
import { n as e } from "./_shared/env.js";
import { r as t } from "./_shared/brandmessagescontext.js";
import { Heading as n } from "./heading.js";
import { Paragraph as r } from "./paragraph.js";
import { Tag as i } from "./tag.js";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
import { useRender as s } from "@base-ui/react/use-render";
//#region src/stories/messages/es/projectCard.ts
var c = { tags: "Categorías" };
//#endregion
//#region src/stories/molecules/ProjectCard/ProjectCard.tsx
function l(t) {
	t.variant !== void 0 && e("ProjectCard", "tags[].variant", "`tags[].tone`");
	let n = t.tone ?? t.variant ?? "neutral";
	return n === "danger" ? "error" : n;
}
function u({ title: e, description: u, media: d, tags: f, href: p, render: m, headingLevel: h = 3, headingSize: g = 5, tagsLabel: _, className: v, id: y }) {
	let b = t("projectCard", c), x = s({
		render: m,
		enabled: m !== void 0,
		props: {
			className: "project-card__link",
			children: e
		}
	}) ?? (p === void 0 ? e : /* @__PURE__ */ a("a", {
		href: p,
		className: "project-card__link",
		children: e
	}));
	return /* @__PURE__ */ o("article", {
		id: y,
		className: ["project-card", v].filter(Boolean).join(" "),
		children: [
			d && /* @__PURE__ */ a("div", {
				className: "project-card__media",
				children: /* @__PURE__ */ a("img", {
					src: d.src,
					alt: d.alt
				})
			}),
			f && f.length > 0 && /* @__PURE__ */ a("ul", {
				className: "project-card__tags",
				"aria-label": b("tags", _),
				children: f.map((e) => /* @__PURE__ */ a("li", { children: /* @__PURE__ */ a(i, {
					tone: l(e),
					children: e.label
				}) }, e.id ?? e.label))
			}),
			/* @__PURE__ */ a(n, {
				level: h,
				size: g,
				className: "project-card__title",
				children: x
			}),
			u && /* @__PURE__ */ a(r, {
				className: "project-card__description",
				children: u
			})
		]
	});
}
//#endregion
export { u as ProjectCard };
