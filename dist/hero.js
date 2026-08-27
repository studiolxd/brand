import './hero.css';
import { Container as e } from "./container.js";
import { Heading as t } from "./heading.js";
import { Paragraph as n } from "./paragraph.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/sections/Hero/Hero.tsx
function a({ title: a, description: o, actions: s, className: c, id: l }) {
	return /* @__PURE__ */ i(e, {
		as: "section",
		width: "xl",
		space: "2xl",
		id: l,
		className: ["hero", c].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ r(t, {
				level: 1,
				size: 10,
				className: "hero__title",
				children: a
			}),
			o && /* @__PURE__ */ r(n, {
				size: "large",
				className: "hero__description",
				children: o
			}),
			s && /* @__PURE__ */ r("div", {
				className: "hero__actions",
				children: s
			})
		]
	});
}
//#endregion
export { a as Hero };
