import './card-square.css';
import { VisuallyHidden as e } from "./visually-hidden.js";
import { Arrow as t } from "./arrow.js";
import { Heading as n } from "./heading.js";
import { Paragraph as r } from "./paragraph.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/stories/molecules/CardSquare/CardSquare.tsx
function o({ href: o, title: s, description: c, ctaLabel: l, color: u, image: d }) {
	return /* @__PURE__ */ a("a", {
		href: o,
		className: ["card-square", `card-square--${u}`].join(" "),
		children: [/* @__PURE__ */ i("img", {
			className: "card-square__image",
			src: d.src,
			alt: d.alt
		}), /* @__PURE__ */ a("div", {
			className: "card-square__body",
			children: [
				/* @__PURE__ */ i(n, {
					level: 2,
					size: 8,
					className: "card-square__title",
					children: s
				}),
				/* @__PURE__ */ i(r, {
					size: "large",
					className: "card-square__description",
					children: c
				}),
				/* @__PURE__ */ i(t, {
					className: "card-square__arrow",
					size: "lg"
				}),
				/* @__PURE__ */ i(e, { children: l })
			]
		})]
	});
}
//#endregion
export { o as CardSquare };
