import './card-split.css';
import { VisuallyHidden as e } from "./visually-hidden.js";
import { Arrow as t } from "./arrow.js";
import { Heading as n } from "./heading.js";
import { Paragraph as r } from "./paragraph.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/stories/molecules/CardSplit/CardSplit.tsx
function o({ href: o, title: s, description: c, ctaLabel: l, color: u, image: d }) {
	return /* @__PURE__ */ a("a", {
		href: o,
		className: ["card-split", `card-split--${u}`].join(" "),
		children: [/* @__PURE__ */ a("div", {
			className: "card-split__primary",
			children: [
				/* @__PURE__ */ i(n, {
					level: 2,
					size: 8,
					className: "card-split__title",
					children: s
				}),
				/* @__PURE__ */ i(r, {
					size: "large",
					className: "card-split__description",
					children: c
				}),
				/* @__PURE__ */ i(t, {
					className: "card-split__arrow",
					size: "lg"
				}),
				/* @__PURE__ */ i(e, { children: l })
			]
		}), /* @__PURE__ */ i("div", {
			className: "card-split__photo",
			children: /* @__PURE__ */ i("img", {
				src: d.src,
				alt: d.alt
			})
		})]
	});
}
//#endregion
export { o as CardSplit };
