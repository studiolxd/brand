import './hero.css';
import { Container as e } from "./container.js";
import { Inline as t } from "./inline.js";
import { Heading as n } from "./heading.js";
import { Paragraph as r } from "./paragraph.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/stories/sections/Hero/Hero.tsx
function o({ title: o, description: s, actions: c, className: l, id: u }) {
	return /* @__PURE__ */ a(e, {
		as: "section",
		width: "xl",
		space: "2xl",
		id: u,
		className: ["hero", l].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ i(n, {
				level: 1,
				size: 10,
				className: "hero__title",
				children: o
			}),
			s && /* @__PURE__ */ i(r, {
				size: "large",
				className: "hero__description",
				children: s
			}),
			c && /* @__PURE__ */ i(t, {
				className: "hero__actions",
				children: c
			})
		]
	});
}
//#endregion
export { o as Hero };
