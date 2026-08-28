import './hero.css';
import { t as e } from "./_shared/form-size.js";
import { Container as t } from "./container.js";
import { Inline as n } from "./inline.js";
import { Heading as r } from "./heading.js";
import { Paragraph as i } from "./paragraph.js";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/sections/Hero/Hero.tsx
function s({ title: s, description: c, actions: l, width: u = "xl", className: d, id: f }) {
	return /* @__PURE__ */ a("section", {
		id: f,
		className: ["hero", d].filter(Boolean).join(" "),
		children: /* @__PURE__ */ o(t, {
			width: u,
			innerClassName: "hero__inner",
			children: [
				/* @__PURE__ */ a(r, {
					level: 1,
					size: 10,
					className: "hero__title",
					children: s
				}),
				c && /* @__PURE__ */ a(i, {
					size: "large",
					className: "hero__description",
					children: c
				}),
				l && /* @__PURE__ */ a(n, {
					className: "hero__actions",
					children: /* @__PURE__ */ a(e.Provider, {
						value: "lg",
						children: l
					})
				})
			]
		})
	});
}
//#endregion
export { s as Hero };
