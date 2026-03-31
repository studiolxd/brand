import './card-split.css';
import { Arrow as e } from "./arrow.js";
import { Heading as t } from "./heading.js";
import { VisuallyHidden as n } from "./visually-hidden.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/molecules/CardSplit/CardSplit.tsx
function a({ href: a, title: o, description: s, ctaLabel: c, color: l, image: u }) {
	return /* @__PURE__ */ i("a", {
		href: a,
		className: ["card-split", `card-split--${l}`].join(" "),
		children: [/* @__PURE__ */ i("div", {
			className: "card-split__primary",
			children: [
				/* @__PURE__ */ r(t, {
					level: 2,
					weight: "semibold",
					className: "card-split__title",
					children: o
				}),
				/* @__PURE__ */ r("p", {
					className: "card-split__description",
					children: s
				}),
				/* @__PURE__ */ r(e, {
					className: "card-split__arrow",
					size: "lg"
				}),
				/* @__PURE__ */ r(n, { children: c })
			]
		}), /* @__PURE__ */ r("div", {
			className: "card-split__photo",
			children: /* @__PURE__ */ r("img", {
				src: u.src,
				alt: u.alt
			})
		})]
	});
}
//#endregion
export { a as CardSplit };
