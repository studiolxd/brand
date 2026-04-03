'use client';
import './project-carousel.css';
import { Carousel as e, CarouselSlide as t } from "./carousel.js";
import { ProjectCard as n } from "./project-card.js";
import { jsx as r } from "react/jsx-runtime";
//#region src/stories/organisms/ProjectCarousel/ProjectCarousel.tsx
function i({ projects: i, hideTags: a = !1, className: o }) {
	return /* @__PURE__ */ r(e, {
		options: { align: "center" },
		className: ["project-carousel", o].filter(Boolean).join(" "),
		children: i.map((e) => /* @__PURE__ */ r(t, { children: /* @__PURE__ */ r(n, {
			project: e,
			hideTag: a
		}) }, e.id))
	});
}
//#endregion
export { i as ProjectCarousel };
