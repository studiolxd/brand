import './card-square.css';
import { Arrow as e } from "./arrow.js";
import { Heading as t } from "./heading.js";
import { VisuallyHidden as n } from "./visually-hidden.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/molecules/CardSquare/CardSquare.tsx
function a({ href: a, title: o, description: s, ctaLabel: c, color: l, image: u }) {
	return /* @__PURE__ */ i("a", {
		href: a,
		className: ["card-square", `card-square--${l}`].join(" "),
		children: [/* @__PURE__ */ r("img", {
			className: "card-square__image",
			src: u.src,
			alt: u.alt
		}), /* @__PURE__ */ i("div", {
			className: "card-square__body",
			children: [
				/* @__PURE__ */ r(t, {
					level: 2,
					weight: "semibold",
					className: "card-square__title",
					children: o
				}),
				/* @__PURE__ */ r("p", {
					className: "card-square__description",
					children: s
				}),
				/* @__PURE__ */ r(e, {
					className: "card-square__arrow",
					size: "lg"
				}),
				/* @__PURE__ */ r(n, { children: c })
			]
		})]
	});
}
//#endregion
export { a as CardSquare };
