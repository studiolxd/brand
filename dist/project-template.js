'use client';
import './project-template.css';
import { Button as e } from "./button.js";
import { Heading as t } from "./heading.js";
import { Tag as n } from "./tag.js";
import { i as r, n as i, r as a, t as o } from "./_shared/navigation.js";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/stories/pages/Project/Project.tsx
function l({ category: l, tagVariant: u = "default", photo: d, photoAlt: f, title: p, description: m, sections: h, navItems: g = i, featuredLink: _ = o }) {
	return /* @__PURE__ */ c("div", {
		className: "project-page",
		children: [
			/* @__PURE__ */ s(r, {
				navItems: g,
				featuredLink: _,
				actions: /* @__PURE__ */ s(e, {
					href: "https://academy.studiolxd.com",
					variant: "primary",
					external: !0,
					children: "Entra a la academia"
				})
			}),
			/* @__PURE__ */ s("main", {
				id: "main-content",
				className: "project-page__main",
				children: /* @__PURE__ */ s("div", {
					className: "project-page__body",
					children: /* @__PURE__ */ c("article", {
						className: "project-detail",
						children: [
							/* @__PURE__ */ s(n, {
								variant: u,
								children: l
							}),
							/* @__PURE__ */ s(t, {
								level: 1,
								className: "project-detail__title",
								children: p
							}),
							/* @__PURE__ */ s("p", {
								className: "project-detail__intro",
								children: m
							}),
							/* @__PURE__ */ s("img", {
								src: d,
								alt: f ?? p,
								className: "project-detail__photo",
								width: 1200,
								height: 800
							}),
							/* @__PURE__ */ s("div", {
								className: "project-detail__content",
								children: h.map((e) => /* @__PURE__ */ c("section", {
									className: "project-detail__section",
									children: [/* @__PURE__ */ s(t, {
										level: 2,
										className: "project-detail__section-title",
										children: e.title
									}), /* @__PURE__ */ s("p", {
										className: "project-detail__section-body",
										children: e.body
									})]
								}, e.title))
							})
						]
					})
				})
			}),
			/* @__PURE__ */ s(a, {})
		]
	});
}
//#endregion
export { l as Project };
