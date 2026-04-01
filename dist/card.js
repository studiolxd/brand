import './card.css';
import { Arrow as e } from "./arrow.js";
import { Heading as t } from "./heading.js";
import { VisuallyHidden as n } from "./visually-hidden.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/molecules/Card/Card.tsx
function a({ href: a, title: o, description: s, ctaLabel: c, color: l }) {
	return /* @__PURE__ */ i("a", {
		href: a,
		className: ["card", `card--${l}`].join(" "),
		children: [
			/* @__PURE__ */ r(t, {
				level: 2,
				size: 8,
				weight: "semibold",
				children: o
			}),
			/* @__PURE__ */ r("p", { children: s }),
			/* @__PURE__ */ r(n, { children: c }),
			/* @__PURE__ */ r(e, { size: "lg" })
		]
	});
}
//#endregion
export { a as Card };
